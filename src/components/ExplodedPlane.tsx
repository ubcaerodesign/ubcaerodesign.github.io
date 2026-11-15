import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { createTimeline } from 'animejs';

/* ── Tunables ─────────────────────────────── */
const MODEL_SIZE = 4;        // longest side of the assembled plane, in scene units
const EXPLODE_FACTOR = 1.15; // how far parts travel, relative to their distance from the centre
const VERTICAL_BOOST = 2;    // extra spread on the vertical axis (planes are flat)
const PART_MS = 1000;        // duration of each part's move on the timeline
const STAGGER_MS = 300;      // spread of start times across all parts
const START_YAW = -0.6;      // plane rotation at the top of the section (radians)
const END_YAW = 0.5;         // plane rotation at the bottom of the section (radians)
const MAX_SPLIT_ISLANDS = 24;
const DRACO_PATH = 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/';

export interface AircraftPlacements {
  overall?: string;
  flight?: string;
  designReport?: string;
  presentation?: string;
}

export interface AircraftEntry {
  id: string;
  /** Full season label, e.g. '2025–2026' */
  year: string;
  /** Compact season label for the rail, e.g. '2025–26' */
  shortYear: string;
  name: string;
  /** Short tag for the rail, e.g. 'MCR' | 'ADV' | 'REG' | 'OPEN' */
  classCode: string;
  /** Full class name for the detail card */
  aircraftClass: string;
  summary: string;
  placements?: AircraftPlacements;
  /** Path to `.glb` under `public/`, e.g. `${import.meta.env.BASE_URL}models/toothless.glb`. */
  modelUrl?: string;
}

interface ExplodedPlaneProps {
  fleet: AircraftEntry[];
  initialId?: string;
}

type Status = 'idle' | 'loading' | 'ready' | 'empty' | 'error';

/** Maps scroll progress `0..1` -> explosion amount `0..1..0` (explode, hold, then reassemble). */
function getExplodeAmount(p: number): number {
  if (p <= 0 || p >= 1) return 0;
  if (p < 0.42) return p / 0.42;
  if (p <= 0.58) return 1;
  return (1 - p) / 0.42;
}

/* ── Geometry & part extraction helpers ───── */

function hasRenderableMesh(obj: THREE.Object3D): boolean {
  let found = false;
  obj.traverse((child) => {
    if (found) return;
    const mesh = child as THREE.Mesh;
    if (mesh.isMesh && mesh.geometry) {
      const pos = mesh.geometry.getAttribute('position');
      if (pos && pos.count > 0) found = true;
    }
  });
  return found;
}

function disposeObjectTree(root: THREE.Object3D) {
  root.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (!mesh.isMesh) return;
    mesh.geometry?.dispose();
    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    for (const mat of materials) {
      if (!mat) continue;
      for (const value of Object.values(mat)) {
        if (value instanceof THREE.Texture) value.dispose();
      }
      mat.dispose();
    }
  });
}

function buildSubGeometry(
  source: THREE.BufferGeometry,
  triIndices: number[],
  triMaterialIds: number[] | null
): THREE.BufferGeometry {
  const srcIndex = source.index;
  const posAttr = source.getAttribute('position');
  const remap = new Map<number, number>();
  const oldVertices: number[] = [];

  const orderedTris =
    triMaterialIds && triMaterialIds.length > 0
      ? [...triIndices].sort((a, b) => triMaterialIds[a] - triMaterialIds[b])
      : triIndices;

  const remappedIndices = new Array<number>(orderedTris.length * 3);

  for (let i = 0; i < orderedTris.length; i++) {
    const t = orderedTris[i];
    for (let c = 0; c < 3; c++) {
      const oldV = srcIndex ? srcIndex.getX(t * 3 + c) : t * 3 + c;
      let newV = remap.get(oldV);
      if (newV === undefined) {
        newV = oldVertices.length;
        remap.set(oldV, newV);
        oldVertices.push(oldV);
      }
      remappedIndices[i * 3 + c] = newV;
    }
  }

  const subGeo = new THREE.BufferGeometry();
  const usedCount = oldVertices.length;

  for (const [attrName, attr] of Object.entries(source.attributes)) {
    const itemSize = attr.itemSize;
    if (attr instanceof THREE.InterleavedBufferAttribute) {
      const srcArray = attr.data.array as unknown as ArrayLike<number>;
      const stride = attr.data.stride;
      const offset = attr.offset;
      const ArrayCtor = attr.data.array.constructor as new (len: number) => THREE.TypedArray & {
        [index: number]: number;
      };
      const dstArray = new ArrayCtor(usedCount * itemSize);
      for (let i = 0; i < usedCount; i++) {
        const srcBase = oldVertices[i] * stride + offset;
        const dstBase = i * itemSize;
        for (let c = 0; c < itemSize; c++) {
          dstArray[dstBase + c] = srcArray[srcBase + c];
        }
      }
      subGeo.setAttribute(attrName, new THREE.BufferAttribute(dstArray, itemSize, attr.normalized));
    } else {
      const srcArray = attr.array as unknown as ArrayLike<number>;
      const ArrayCtor = attr.array.constructor as new (len: number) => THREE.TypedArray & {
        [index: number]: number;
      };
      const dstArray = new ArrayCtor(usedCount * itemSize);
      for (let i = 0; i < usedCount; i++) {
        const srcBase = oldVertices[i] * itemSize;
        const dstBase = i * itemSize;
        for (let c = 0; c < itemSize; c++) {
          dstArray[dstBase + c] = srcArray[srcBase + c];
        }
      }
      subGeo.setAttribute(attrName, new THREE.BufferAttribute(dstArray, itemSize, attr.normalized));
    }
  }

  if (posAttr && usedCount > 0) {
    const IndexCtor = usedCount > 65535 ? Uint32Array : Uint16Array;
    const indexArray = new IndexCtor(remappedIndices.length);
    for (let i = 0; i < remappedIndices.length; i++) {
      indexArray[i] = remappedIndices[i];
    }
    subGeo.setIndex(new THREE.BufferAttribute(indexArray, 1));
  }

  if (triMaterialIds && triMaterialIds.length > 0) {
    let runStart = 0;
    let currentMat = triMaterialIds[orderedTris[0]];
    for (let i = 1; i < orderedTris.length; i++) {
      const mat = triMaterialIds[orderedTris[i]];
      if (mat !== currentMat) {
        subGeo.addGroup(runStart * 3, (i - runStart) * 3, currentMat);
        runStart = i;
        currentMat = mat;
      }
    }
    subGeo.addGroup(runStart * 3, (orderedTris.length - runStart) * 3, currentMat);
  }

  subGeo.computeBoundingBox();
  subGeo.computeBoundingSphere();
  return subGeo;
}

/**
 * Splits a single merged Mesh into disconnected geometric islands (or material
 * groups if the entire mesh is one watertight shell). Replaces `mesh` in its
 * parent with a Group so transforms remain identical.
 */
function splitMeshIntoParts(mesh: THREE.Mesh): THREE.Object3D[] {
  if ((mesh as THREE.SkinnedMesh).isSkinnedMesh) return [mesh];
  const parent = mesh.parent;
  const geometry = mesh.geometry;
  const posAttr = geometry?.getAttribute('position');
  if (!parent || !geometry || !posAttr || posAttr.count < 3) return [mesh];

  const srcIndex = geometry.index;
  const triCount = srcIndex ? Math.floor(srcIndex.count / 3) : Math.floor(posAttr.count / 3);
  if (triCount < 2) return [mesh];

  geometry.computeBoundingBox();
  const bbox = geometry.boundingBox;
  const localSize = bbox ? bbox.getSize(new THREE.Vector3()) : new THREE.Vector3(1, 1, 1);
  const maxDim = Math.max(localSize.x, localSize.y, localSize.z) || 1;
  const quantScale = 1e4 / maxDim;

  const spatialMap = new Map<string, number>();
  const ufParent: number[] = [];
  const tmpVec = new THREE.Vector3();

  const find = (x: number): number => {
    while (ufParent[x] !== x) {
      ufParent[x] = ufParent[ufParent[x]];
      x = ufParent[x];
    }
    return x;
  };
  const union = (a: number, b: number) => {
    const ra = find(a);
    const rb = find(b);
    if (ra !== rb) ufParent[rb] = ra;
  };

  const triFirstSpatial = new Int32Array(triCount);

  for (let t = 0; t < triCount; t++) {
    let s0 = 0;
    let s1 = 0;
    let s2 = 0;
    for (let c = 0; c < 3; c++) {
      const vIdx = srcIndex ? srcIndex.getX(t * 3 + c) : t * 3 + c;
      tmpVec.fromBufferAttribute(posAttr, vIdx);
      const key = `${Math.round(tmpVec.x * quantScale)},${Math.round(tmpVec.y * quantScale)},${Math.round(tmpVec.z * quantScale)}`;
      let sId = spatialMap.get(key);
      if (sId === undefined) {
        sId = ufParent.length;
        ufParent.push(sId);
        spatialMap.set(key, sId);
      }
      if (c === 0) s0 = sId;
      else if (c === 1) s1 = sId;
      else s2 = sId;
    }
    union(s0, s1);
    union(s1, s2);
    triFirstSpatial[t] = s0;
  }

  const componentMap = new Map<number, number[]>();
  for (let t = 0; t < triCount; t++) {
    const root = find(triFirstSpatial[t]);
    let list = componentMap.get(root);
    if (!list) {
      list = [];
      componentMap.set(root, list);
    }
    list.push(t);
  }

  let triMaterialIds: number[] | null = null;
  if (Array.isArray(mesh.material) && geometry.groups.length > 0) {
    triMaterialIds = new Array<number>(triCount).fill(0);
    for (const grp of geometry.groups) {
      const startTri = Math.floor(grp.start / 3);
      const endTri = grp.count === Infinity ? triCount : Math.min(triCount, Math.floor((grp.start + grp.count) / 3));
      const matIdx = grp.materialIndex ?? 0;
      for (let t = startTri; t < endTri; t++) triMaterialIds[t] = matIdx;
    }
  }

  let buckets = [...componentMap.values()];

  if (buckets.length <= 1 && triMaterialIds && geometry.groups.length > 1) {
    const byMat = new Map<number, number[]>();
    for (let t = 0; t < triCount; t++) {
      const m = triMaterialIds[t];
      let list = byMat.get(m);
      if (!list) {
        list = [];
        byMat.set(m, list);
      }
      list.push(t);
    }
    buckets = [...byMat.values()];
  }

  if (buckets.length <= 1) return [mesh];

  if (buckets.length > MAX_SPLIT_ISLANDS) {
    const stats = buckets.map((tris) => {
      const box = new THREE.Box3();
      for (const t of tris) {
        for (let c = 0; c < 3; c++) {
          const vIdx = srcIndex ? srcIndex.getX(t * 3 + c) : t * 3 + c;
          tmpVec.fromBufferAttribute(posAttr, vIdx);
          box.expandByPoint(tmpVec);
        }
      }
      return { tris, count: tris.length, center: box.getCenter(new THREE.Vector3()) };
    });
    stats.sort((a, b) => b.count - a.count);

    const minMajorCount = Math.max(12, Math.floor(triCount * 0.008));
    const kept = stats.filter((s, idx) => idx < 6 || (idx < MAX_SPLIT_ISLANDS && s.count >= minMajorCount));
    const keptSet = new Set(kept);

    for (const item of stats) {
      if (keptSet.has(item)) continue;
      let nearest = kept[0];
      let bestDist = Infinity;
      for (const target of kept) {
        const d = item.center.distanceToSquared(target.center);
        if (d < bestDist) {
          bestDist = d;
          nearest = target;
        }
      }
      nearest.tris.push(...item.tris);
    }

    buckets = kept.map((k) => k.tris);
  }

  if (buckets.length <= 1) return [mesh];

  const group = new THREE.Group();
  group.name = mesh.name;
  group.position.copy(mesh.position);
  group.quaternion.copy(mesh.quaternion);
  group.scale.copy(mesh.scale);

  const created: THREE.Object3D[] = [];
  buckets.forEach((tris, idx) => {
    const subGeo = buildSubGeometry(geometry, tris, triMaterialIds);
    const partMesh = new THREE.Mesh(subGeo, mesh.material);
    partMesh.name = mesh.name ? `${mesh.name}_part_${idx + 1}` : `part_${idx + 1}`;
    partMesh.castShadow = mesh.castShadow;
    partMesh.receiveShadow = mesh.receiveShadow;
    group.add(partMesh);
    created.push(partMesh);
  });

  parent.add(group);
  parent.remove(mesh);
  geometry.dispose();
  return created;
}

/**
 * Finds the parts to explode: ignores cameras/lights/empties, unwraps single-child
 * wrappers and coarse groups (< 4 parts), and splits merged single-mesh exports.
 */
function getParts(root: THREE.Object3D): THREE.Object3D[] {
  let parts: THREE.Object3D[] = [root];

  while (true) {
    const next: THREE.Object3D[] = [];
    let expanded = false;
    for (const obj of parts) {
      const children = obj.children.filter(hasRenderableMesh);
      if (children.length === 1) {
        next.push(children[0]);
        expanded = true;
      } else if (children.length > 1 && parts.length < 4) {
        next.push(...children);
        expanded = true;
      } else {
        next.push(obj);
      }
    }
    parts = next;
    if (!expanded) break;
  }

  if (parts.length < 3) {
    const refined: THREE.Object3D[] = [];
    for (const part of parts) {
      if ((part as THREE.Mesh).isMesh) {
        refined.push(...splitMeshIntoParts(part as THREE.Mesh));
      } else {
        refined.push(part);
      }
    }
    return refined;
  }

  return parts;
}

function formatPlacementBadges(placements?: AircraftPlacements): { label: string; value: string }[] {
  if (!placements) return [];
  const items: { label: string; value: string }[] = [];
  if (placements.overall) items.push({ label: 'Overall', value: placements.overall });
  if (placements.flight) items.push({ label: 'Flight', value: placements.flight });
  if (placements.designReport) items.push({ label: 'Design Report', value: placements.designReport });
  if (placements.presentation) items.push({ label: 'Presentation', value: placements.presentation });
  return items;
}

/* ── Component ────────────────────────────── */

interface EngineContext {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  pivot: THREE.Group;
  loader: GLTFLoader;
  renderFrame: () => void;
}

export default function ExplodedPlane({ fleet, initialId }: ExplodedPlaneProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const scrubberRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const engineRef = useRef<EngineContext | null>(null);
  const timelineRef = useRef<ReturnType<typeof createTimeline> | null>(null);
  const progressRef = useRef(0);
  const loadCounterRef = useRef(0);
  const firstScrollRef = useRef(true);

  const orbitRef = useRef({
    targetYaw: 0,
    targetPitch: 0,
    currentYaw: 0,
    currentPitch: 0,
  });
  const orbitDragRef = useRef<{
    pointerId: number;
    pointerType: string;
    lastX: number;
    lastY: number;
  } | null>(null);

  const railDragRef = useRef<{
    pointerId: number;
    startX: number;
    startScrollLeft: number;
    dragging: boolean;
  } | null>(null);
  const suppressClickRef = useRef(false);

  const defaultIndex = (() => {
    if (initialId) {
      const idx = fleet.findIndex((a) => a.id === initialId);
      if (idx >= 0) return idx;
    }
    return Math.max(0, fleet.length - 1);
  })();

  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const [inView, setInView] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [isOrbiting, setIsOrbiting] = useState(false);
  const [hasOrbited, setHasOrbited] = useState(false);
  const [isDraggingRail, setIsDraggingRail] = useState(false);
  const [isScrubbing, setIsScrubbing] = useState(false);

  const activeAircraft = fleet[activeIndex] ?? fleet[0];
  const placementBadges = formatPlacementBadges(activeAircraft?.placements);
  const scrubPercent = fleet.length > 1 ? (activeIndex / (fleet.length - 1)) * 100 : 100;

  const resetOrbit = () => {
    orbitRef.current.targetYaw = 0;
    orbitRef.current.targetPitch = 0;
    setHasOrbited(false);
  };

  // Keep the selected plane centered inside the horizontal timeline rail (without scrolling the page).
  useEffect(() => {
    const rail = railRef.current;
    const btn = activeAircraft ? itemRefs.current[activeAircraft.id] : null;
    if (!rail || !btn) return;
    const targetLeft = btn.offsetLeft - rail.clientWidth / 2 + btn.offsetWidth / 2;
    rail.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: firstScrollRef.current || isScrubbing ? 'auto' : 'smooth',
    });
    firstScrollRef.current = false;
  }, [activeAircraft, isScrubbing]);

  // Global pointer handlers for drag-to-scroll on the horizontal timeline rail.
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const drag = railDragRef.current;
      const rail = railRef.current;
      if (!drag || !rail || e.pointerId !== drag.pointerId) return;

      const dx = e.clientX - drag.startX;
      if (!drag.dragging && Math.abs(dx) > 6) {
        drag.dragging = true;
        setIsDraggingRail(true);
      }
      if (drag.dragging) {
        rail.scrollLeft = drag.startScrollLeft - dx;
      }
    };

    const handlePointerEnd = (e: PointerEvent) => {
      const drag = railDragRef.current;
      if (!drag || e.pointerId !== drag.pointerId) return;
      if (drag.dragging) {
        suppressClickRef.current = true;
        requestAnimationFrame(() => {
          suppressClickRef.current = false;
        });
      }
      railDragRef.current = null;
      setIsDraggingRail(false);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerEnd);
    window.addEventListener('pointercancel', handlePointerEnd);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerEnd);
      window.removeEventListener('pointercancel', handlePointerEnd);
    };
  }, []);

  // 1. Wait until the section approaches the viewport before creating WebGL resources.
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || inView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '600px 0px' }
    );
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, [inView]);

  // 2. Initialize WebGL renderer, camera, lighting, and scroll-driven rAF loop once.
  useEffect(() => {
    if (!inView) return;
    const wrapper = wrapperRef.current;
    const holder = stageRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !holder || !canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch {
      setStatus('error');
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(5, 8, 6);
    scene.add(keyLight);

    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    const pivot = new THREE.Group();
    scene.add(pivot);

    const draco = new DRACOLoader();
    draco.setDecoderPath(DRACO_PATH);
    const loader = new GLTFLoader();
    loader.setDRACOLoader(draco);

    let baseDistance = 9;
    let frame = 0;

    const renderFrame = () => {
      const p = progressRef.current;
      const explode = getExplodeAmount(p);
      if (timelineRef.current) {
        timelineRef.current.seek(explode * timelineRef.current.duration);
      }
      const orbit = orbitRef.current;
      pivot.rotation.y = START_YAW + (END_YAW - START_YAW) * p + orbit.currentYaw;
      pivot.rotation.x = orbit.currentPitch;
      camera.position.set(0, baseDistance * 0.18, baseDistance * (1 + 0.22 * explode));
      camera.lookAt(0, -0.22, 0);
      renderer.render(scene, camera);
    };

    const resize = () => {
      const w = holder.clientWidth;
      const h = holder.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      const tanHalfFov = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      baseDistance = Math.max(9.5, 4.0 / (tanHalfFov * camera.aspect));
      renderFrame();
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(holder);

    engineRef.current = { renderer, scene, camera, pivot, loader, renderFrame };

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let current = progressRef.current;

    const tick = () => {
      frame = requestAnimationFrame(tick);

      const rect = wrapper.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      const scrollable = rect.height - window.innerHeight;
      const target = scrollable > 0 ? THREE.MathUtils.clamp(-rect.top / scrollable, 0, 1) : 0;
      // Settle faster when reaching the bottom release boundary so the plane closes before leaving view.
      const damp = target >= 0.995 || target <= 0.005 ? 0.25 : 0.14;
      current = reducedMotion ? target : current + (target - current) * damp;
      if (Math.abs(target - current) < 0.0005) current = target;
      progressRef.current = current;

      const orbit = orbitRef.current;
      if (reducedMotion) {
        orbit.currentYaw = orbit.targetYaw;
        orbit.currentPitch = orbit.targetPitch;
      } else {
        orbit.currentYaw += (orbit.targetYaw - orbit.currentYaw) * 0.16;
        if (Math.abs(orbit.targetYaw - orbit.currentYaw) < 0.0005) orbit.currentYaw = orbit.targetYaw;
        orbit.currentPitch += (orbit.targetPitch - orbit.currentPitch) * 0.16;
        if (Math.abs(orbit.targetPitch - orbit.currentPitch) < 0.0005) orbit.currentPitch = orbit.targetPitch;
      }

      renderFrame();
    };
    tick();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      timelineRef.current?.revert();
      timelineRef.current = null;
      disposeObjectTree(pivot);
      pivot.clear();
      envTexture.dispose();
      pmrem.dispose();
      draco.dispose();
      renderer.dispose();
      engineRef.current = null;
    };
  }, [inView]);

  // 3. Load/swap the active aircraft's GLB model whenever the user switches years.
  useEffect(() => {
    const engine = engineRef.current;
    if (!inView || !engine) return;

    const myLoadId = ++loadCounterRef.current;
    const { pivot, loader, renderFrame } = engine;

    timelineRef.current?.revert();
    timelineRef.current = null;
    disposeObjectTree(pivot);
    pivot.clear();
    pivot.rotation.set(0, START_YAW, 0);

    if (!activeAircraft?.modelUrl) {
      setStatus('empty');
      renderFrame();
      return;
    }

    setStatus('loading');
    renderFrame();

    const modelUrl = activeAircraft.modelUrl;

    void (async () => {
      let model: THREE.Object3D;
      try {
        model = (await loader.loadAsync(modelUrl)).scene;
      } catch {
        if (myLoadId === loadCounterRef.current) setStatus('error');
        return;
      }

      if (myLoadId !== loadCounterRef.current) {
        disposeObjectTree(model);
        return;
      }

      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const maxAxis = Math.max(size.x, size.y, size.z) || 1;
      model.scale.multiplyScalar(MODEL_SIZE / maxAxis);
      model.updateMatrixWorld(true);
      box.setFromObject(model);
      model.position.sub(box.getCenter(new THREE.Vector3()));
      pivot.rotation.set(0, 0, 0);
      pivot.add(model);
      pivot.updateMatrixWorld(true);

      const parts = getParts(model);
      pivot.updateMatrixWorld(true);

      const partEntries = parts
        .map((obj) => {
          const partBox = new THREE.Box3().setFromObject(obj);
          if (!obj.parent || partBox.isEmpty()) return null;
          const partSize = partBox.getSize(new THREE.Vector3());
          return {
            obj,
            parent: obj.parent,
            worldCentre: partBox.getCenter(new THREE.Vector3()),
            volume: partSize.x * partSize.y * partSize.z,
          };
        })
        .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

      let coreIdx = 0;
      let bestCoreScore = -Infinity;
      partEntries.forEach((entry, idx) => {
        const score = entry.volume - entry.worldCentre.lengthSq() * 0.5;
        if (score > bestCoreScore) {
          bestCoreScore = score;
          coreIdx = idx;
        }
      });

      const moves: { obj: THREE.Object3D; home: THREE.Vector3; offset: THREE.Vector3 }[] = [];
      partEntries.forEach(({ obj, parent, worldCentre }, idx) => {
        const delta = worldCentre.clone().multiplyScalar(EXPLODE_FACTOR);
        delta.y *= VERTICAL_BOOST;

        if (idx !== coreIdx && delta.length() < 0.35) {
          const dirY = worldCentre.y >= -0.02 ? 1 : -1;
          delta.set(delta.x * 1.5, dirY * 0.9, delta.z * 1.5);
        }

        const from = parent.worldToLocal(worldCentre.clone());
        const to = parent.worldToLocal(worldCentre.clone().add(delta));
        const offset = to.sub(from);

        if (Number.isFinite(offset.x) && Number.isFinite(offset.y) && Number.isFinite(offset.z)) {
          moves.push({ obj, home: obj.position.clone(), offset });
        }
      });

      if (import.meta.env.DEV) {
        console.log(
          `[ExplodedPlane] ${activeAircraft.name}: ${moves.length} parts:`,
          moves.map(({ obj }) => obj.name || '(unnamed)')
        );
      }

      const timeline = createTimeline({ autoplay: false, defaults: { ease: 'inOutQuad' } });
      timelineRef.current = timeline;
      moves.forEach(({ obj, home, offset }, i) => {
        timeline.add(
          obj.position,
          {
            x: home.x + offset.x,
            y: home.y + offset.y,
            z: home.z + offset.z,
            duration: PART_MS,
          },
          (i / Math.max(1, moves.length - 1)) * STAGGER_MS
        );
      });

      renderFrame();
      setStatus('ready');
    })();
  }, [inView, activeAircraft]);

  const scrubToClientX = (clientX: number) => {
    const track = scrubberRef.current;
    if (!track || fleet.length <= 1) return;
    const rect = track.getBoundingClientRect();
    if (rect.width <= 0) return;
    const ratio = THREE.MathUtils.clamp((clientX - rect.left) / rect.width, 0, 1);
    const nextIdx = Math.round(ratio * (fleet.length - 1));
    setActiveIndex((prev) => (prev === nextIdx ? prev : nextIdx));
  };

  const endOrbitDrag = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const drag = orbitDragRef.current;
    if (!drag || e.pointerId !== drag.pointerId) return;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    orbitDragRef.current = null;
    setIsOrbiting(false);
  };

  const canGoOlder = activeIndex > 0;
  const canGoNewer = activeIndex < fleet.length - 1;

  return (
    <div ref={wrapperRef} className="relative h-[400vh]">
      <div ref={stageRef} className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] max-w-full bg-aero-mid-blue/20 blur-[150px] rounded-full pointer-events-none" />

        <canvas
          ref={canvasRef}
          role="img"
          aria-label={`Interactive 3D view of ${activeAircraft?.name ?? 'a UBC AeroDesign aircraft'}`}
          onPointerDown={(e) => {
            if (status !== 'ready') return;
            if (e.pointerType === 'mouse' && e.button !== 0) return;
            if (e.pointerType !== 'touch') {
              e.currentTarget.setPointerCapture(e.pointerId);
            }
            orbitDragRef.current = {
              pointerId: e.pointerId,
              pointerType: e.pointerType,
              lastX: e.clientX,
              lastY: e.clientY,
            };
            setIsOrbiting(true);
          }}
          onPointerMove={(e) => {
            const drag = orbitDragRef.current;
            if (!drag || e.pointerId !== drag.pointerId) return;
            const dx = e.clientX - drag.lastX;
            const dy = e.clientY - drag.lastY;
            drag.lastX = e.clientX;
            drag.lastY = e.clientY;

            orbitRef.current.targetYaw += dx * 0.008;
            // Let vertical touch swipes scroll the page; allow full pitch on mouse/pen drag.
            if (drag.pointerType !== 'touch') {
              orbitRef.current.targetPitch = THREE.MathUtils.clamp(
                orbitRef.current.targetPitch + dy * 0.006,
                -1.05,
                1.05
              );
            }

            if (
              Math.abs(orbitRef.current.targetYaw) > 0.03 ||
              Math.abs(orbitRef.current.targetPitch) > 0.03
            ) {
              setHasOrbited(true);
            }
          }}
          onPointerUp={endOrbitDrag}
          onPointerCancel={endOrbitDrag}
          onPointerLeave={(e) => {
            if (!e.currentTarget.hasPointerCapture(e.pointerId)) {
              endOrbitDrag(e);
            }
          }}
          className={clsx(
            'relative block w-full h-full touch-pan-y select-none transition-opacity duration-700',
            status === 'ready' ? 'opacity-100' : 'opacity-0',
            status === 'ready' && (isOrbiting ? 'cursor-grabbing' : 'cursor-grab')
          )}
        />

        {/* Loading / Archival / Error Overlay */}
        {status !== 'ready' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none pb-44 md:pb-24">
            {status === 'empty' ? (
              <div className="max-w-lg pointer-events-auto">
                <p className="font-titillium font-semibold text-aero-yellow/80 text-xs tracking-[0.25em] uppercase mb-2">
                  {activeAircraft.year} · {activeAircraft.aircraftClass}
                </p>
                <p className="font-titillium font-semibold text-3xl md:text-5xl text-white/95 tracking-wide mb-4">
                  {activeAircraft.name}
                </p>

                {placementBadges.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-2 mb-5">
                    {placementBadges.map((badge) => (
                      <span
                        key={badge.label}
                        className="font-lato text-[11px] tracking-wider uppercase text-aero-light-blue bg-white/5 border border-white/10 rounded-full px-3 py-1"
                      >
                        {badge.label}: <strong className="text-white font-semibold">{badge.value}</strong>
                      </span>
                    ))}
                  </div>
                )}

                <p className="font-lato text-sm text-white/40 mb-6">
                  3D CAD model archival in progress.
                </p>

                {fleet.some((a) => Boolean(a.modelUrl)) && (
                  <button
                    type="button"
                    onClick={() => {
                      const latestWithModel = [...fleet].reverse().findIndex((a) => Boolean(a.modelUrl));
                      if (latestWithModel >= 0) setActiveIndex(fleet.length - 1 - latestWithModel);
                    }}
                    className="cursor-pointer font-titillium font-semibold text-xs tracking-[0.18em] uppercase px-5 py-2.5 rounded-full border border-white/25 text-white/85 hover:text-white hover:border-white/60 hover:bg-white/5 transition-all"
                  >
                    Return to Toothless (3D View)
                  </button>
                )}
              </div>
            ) : (
              <p className="font-lato text-sm tracking-[0.2em] uppercase text-white/40">
                {status === 'error' ? '3D model unavailable' : `Loading ${activeAircraft?.name ?? 'aircraft model'}`}
              </p>
            )}
          </div>
        )}

        {/* Bottom Overlay Bar: Aircraft Caption (Left) + Draggable Timeline Scrubber (Right) */}
        <div className="absolute bottom-5 md:bottom-10 inset-x-0 flex flex-col-reverse md:flex-row md:items-end justify-between gap-3 md:gap-6 pointer-events-none">
          {/* Bottom-Left: Active Aircraft Caption + Drag-to-View Hint */}
          <div className="pointer-events-auto w-full md:max-w-sm lg:max-w-md">
            <div className="glass-panel rounded-2xl p-4 md:p-7">
              <div className="flex items-center justify-between gap-3 mb-2">
                <p className="font-lato text-aero-yellow text-[11px] md:text-xs tracking-[0.18em] uppercase">
                  {activeAircraft.year} · {activeAircraft.aircraftClass}
                </p>
                {status === 'ready' ? (
                  hasOrbited ? (
                    <button
                      type="button"
                      onClick={resetOrbit}
                      className="cursor-pointer font-lato text-[10px] tracking-widest uppercase text-white/80 hover:text-white border border-white/25 hover:border-white/60 rounded-full px-2.5 py-0.5 shrink-0 transition-colors"
                    >
                      Reset view
                    </button>
                  ) : (
                    <span className="font-lato text-[10px] tracking-widest uppercase text-white/55 border border-white/15 rounded-full px-2.5 py-0.5 shrink-0">
                      Drag to view
                    </span>
                  )
                ) : (
                  <span className="font-lato text-[10px] tracking-widest uppercase text-white/50 border border-white/15 rounded-full px-2.5 py-0.5 shrink-0">
                    Archive
                  </span>
                )}
              </div>

              <h3 className="font-titillium font-semibold text-lg md:text-xl text-white tracking-wide mb-1.5 md:mb-2 leading-snug">
                {activeAircraft.name}
              </h3>
              <p className="font-lato text-white/60 text-xs md:text-sm leading-relaxed max-h-24 md:max-h-36 overflow-y-auto pr-1 [scrollbar-width:thin]">
                {activeAircraft.summary}
              </p>
              {placementBadges.length > 0 && (
                <div className="hidden md:flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/10">
                  {placementBadges.map((badge) => (
                    <span
                      key={badge.label}
                      className="font-lato text-[10px] tracking-wider uppercase text-white/60 bg-white/5 rounded-md px-2 py-0.5"
                    >
                      {badge.label}: <strong className="text-white/90">{badge.value}</strong>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bottom-Right: Draggable Fleet Time-Travel Scrubber */}
          <div className="pointer-events-auto w-full md:w-auto md:max-w-[420px] lg:max-w-[480px]">
            <div className="glass-panel rounded-2xl p-4 md:p-5 select-none">
              <div className="flex items-center justify-between gap-4 mb-3">
                <div>
                  <p className="font-lato text-aero-yellow text-[10px] tracking-[0.2em] uppercase">
                    Fleet Archive ({activeIndex + 1}/{fleet.length})
                  </p>
                  <p className="font-titillium font-semibold text-xs md:text-sm text-white/85 tracking-wider uppercase">
                    Drag Or Click To Travel Back
                  </p>
                </div>

                <div className="flex items-center gap-1.5">
                  {activeIndex !== fleet.length - 1 && (
                    <button
                      type="button"
                      onClick={() => setActiveIndex(fleet.length - 1)}
                      className="cursor-pointer font-titillium font-semibold text-[10px] tracking-[0.15em] uppercase px-2.5 h-8 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/50 hover:bg-white/10 transition-all mr-1"
                    >
                      Latest
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => canGoOlder && setActiveIndex((i) => i - 1)}
                    disabled={!canGoOlder}
                    aria-label="Previous (older) aircraft"
                    className={clsx(
                      'w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-200',
                      canGoOlder
                        ? 'cursor-pointer border-white/25 text-white hover:bg-white/10 hover:border-white/50'
                        : 'border-white/10 text-white/20 cursor-not-allowed'
                    )}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => canGoNewer && setActiveIndex((i) => i + 1)}
                    disabled={!canGoNewer}
                    aria-label="Next (newer) aircraft"
                    className={clsx(
                      'w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-200',
                      canGoNewer
                        ? 'cursor-pointer border-white/25 text-white hover:bg-white/10 hover:border-white/50'
                        : 'border-white/10 text-white/20 cursor-not-allowed'
                    )}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Draggable Horizontal Year Rail */}
              <div
                ref={railRef}
                onPointerDown={(e) => {
                  if (e.pointerType === 'mouse' && e.button !== 0) return;
                  const rail = railRef.current;
                  if (!rail) return;
                  railDragRef.current = {
                    pointerId: e.pointerId,
                    startX: e.clientX,
                    startScrollLeft: rail.scrollLeft,
                    dragging: false,
                  };
                }}
                onClickCapture={(e) => {
                  if (suppressClickRef.current) {
                    e.preventDefault();
                    e.stopPropagation();
                  }
                }}
                onDragStart={(e) => e.preventDefault()}
                className={clsx(
                  'relative overflow-x-auto touch-pan-y [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
                  isDraggingRail ? 'cursor-grabbing' : 'cursor-grab'
                )}
              >
                <div className="relative inline-flex items-start gap-1.5 min-w-full pb-1">
                  <div className="absolute top-[11px] left-8 right-8 h-px bg-white/15 pointer-events-none" />

                  {fleet.map((item, idx) => {
                    const isActive = idx === activeIndex;
                    return (
                      <button
                        key={item.id}
                        ref={(el) => {
                          itemRefs.current[item.id] = el;
                        }}
                        type="button"
                        onClick={() => setActiveIndex(idx)}
                        aria-current={isActive ? 'true' : undefined}
                        className="cursor-pointer group relative z-10 flex flex-col items-center min-w-[78px] px-2 pt-1.5 pb-1 rounded-xl transition-colors duration-200 hover:bg-white/5"
                      >
                        <span
                          className={clsx(
                            'rounded-full transition-all duration-300 mb-2',
                            isActive
                              ? 'w-3 h-3 bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)] ring-4 ring-white/20'
                              : item.modelUrl
                                ? 'w-2 h-2 mt-0.5 bg-aero-light-blue/75 group-hover:bg-white'
                                : 'w-2 h-2 mt-0.5 bg-white/25 group-hover:bg-white/60'
                          )}
                        />
                        <span
                          className={clsx(
                            'font-titillium font-semibold text-xs tracking-wide transition-colors whitespace-nowrap',
                            isActive ? 'text-white' : 'text-white/55 group-hover:text-white/85'
                          )}
                        >
                          {item.shortYear}
                        </span>
                        <span
                          className={clsx(
                            'font-lato text-[9px] tracking-[0.12em] uppercase truncate max-w-[72px] mt-0.5 transition-colors',
                            isActive ? 'text-aero-light-blue' : 'text-white/35 group-hover:text-white/60'
                          )}
                        >
                          {item.name}
                        </span>
                        <span className="font-lato text-[8px] tracking-widest uppercase text-white/25">
                          {item.classCode}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dedicated Draggable Scrubber Track */}
              <div className="mt-3 pt-2.5 border-t border-white/10">
                <div
                  ref={scrubberRef}
                  role="slider"
                  tabIndex={0}
                  aria-label="Timeline scrubber"
                  aria-valuemin={0}
                  aria-valuemax={Math.max(0, fleet.length - 1)}
                  aria-valuenow={activeIndex}
                  aria-valuetext={`${activeAircraft.year} ${activeAircraft.name}`}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowLeft') {
                      e.preventDefault();
                      setActiveIndex((i) => Math.max(0, i - 1));
                    } else if (e.key === 'ArrowRight') {
                      e.preventDefault();
                      setActiveIndex((i) => Math.min(fleet.length - 1, i + 1));
                    } else if (e.key === 'Home') {
                      e.preventDefault();
                      setActiveIndex(0);
                    } else if (e.key === 'End') {
                      e.preventDefault();
                      setActiveIndex(fleet.length - 1);
                    }
                  }}
                  onPointerDown={(e) => {
                    if (e.pointerType === 'mouse' && e.button !== 0) return;
                    e.currentTarget.setPointerCapture(e.pointerId);
                    setIsScrubbing(true);
                    scrubToClientX(e.clientX);
                  }}
                  onPointerMove={(e) => {
                    if (!isScrubbing) return;
                    scrubToClientX(e.clientX);
                  }}
                  onPointerUp={(e) => {
                    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
                      e.currentTarget.releasePointerCapture(e.pointerId);
                    }
                    setIsScrubbing(false);
                  }}
                  onPointerCancel={(e) => {
                    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
                      e.currentTarget.releasePointerCapture(e.pointerId);
                    }
                    setIsScrubbing(false);
                  }}
                  className={clsx(
                    'relative h-6 flex items-center touch-none focus:outline-none focus-visible:ring-1 focus-visible:ring-white/50 rounded-full',
                    isScrubbing ? 'cursor-grabbing' : 'cursor-pointer'
                  )}
                >
                  {/* Track */}
                  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-white/25 to-white/90 rounded-full"
                      style={{ width: `${scrubPercent}%` }}
                    />
                  </div>
                  {/* Draggable Handle */}
                  <div
                    className={clsx(
                      'absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)] transition-transform duration-150',
                      isScrubbing ? 'scale-125 ring-4 ring-white/25' : 'hover:scale-110'
                    )}
                    style={{ left: `${scrubPercent}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] font-lato tracking-widest uppercase text-white/35 mt-0.5">
                  <span>{fleet[0]?.shortYear}</span>
                  <span className="text-white/55">{activeAircraft.shortYear} · {activeAircraft.name}</span>
                  <span>{fleet[fleet.length - 1]?.shortYear}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}