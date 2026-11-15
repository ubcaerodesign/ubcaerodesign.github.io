import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { createTimeline } from 'animejs';

/* ── Tunables ─────────────────────────────── */
const MODEL_SIZE = 4;        // longest side of the assembled plane, in scene units
const EXPLODE_FACTOR = 1.1;  // how far parts travel, relative to their distance from the centre
const VERTICAL_BOOST = 2;    // extra spread on the vertical axis (planes are flat)
const PART_MS = 1000;        // duration of each part's move on the timeline
const STAGGER_MS = 300;      // spread of start times across all parts
const START_YAW = -0.6;      // plane rotation at the top of the section (radians)
const END_YAW = 0.5;         // plane rotation at the bottom of the section (radians)
const DRACO_PATH = 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/';

/** Captions shown as the visitor scrolls. `from` is scroll progress (0–1). */
const STAGES = [
  {
    from: 0,
    label: 'Assembled',
    title: 'THE COMPLETE AIRCRAFT',
    text: 'One of our past aircraft, exactly as it flew. Scroll to take it apart.',
  },
  {
    from: 0.15,
    label: 'Separating',
    title: 'EVERY SYSTEM, EXPOSED',
    text: 'Airframe, wings, tail and propulsion each begin to separate. Replace this with a real description of your aircraft.',
  },
  {
    from: 0.7,
    label: 'Exploded',
    title: 'DESIGNED PART BY PART',
    text: 'Every component was designed, built and tested by students. Replace this with real details about the build.',
  },
];

interface ExplodedPlaneProps {
  modelUrl: string;
}

type Status = 'idle' | 'loading' | 'ready' | 'error';

/**
 * The objects that get moved apart. Walks down through wrapper nodes that have
 * a single child, then treats each child as one part, so subassemblies move as
 * a unit instead of every fastener flying off on its own.
 */
function getParts(root: THREE.Object3D): THREE.Object3D[] {
  let node = root;
  while (node.children.length === 1) node = node.children[0];
  return node.children.length ? [...node.children] : [root];
}

export default function ExplodedPlane({ modelUrl }: ExplodedPlaneProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const holder = stageRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !holder || !canvas) return;

    let disposed = false;
    let started = false;
    let teardown: (() => void) | null = null;

    const start = async () => {
      setStatus('loading');

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
      let resizeObserver: ResizeObserver | null = null;
      let activeTimeline: ReturnType<typeof createTimeline> | null = null;
      let cleaned = false;

      const cleanup = () => {
        if (cleaned) return;
        cleaned = true;
        cancelAnimationFrame(frame);
        resizeObserver?.disconnect();
        activeTimeline?.revert();
        scene.traverse((obj) => {
          const mesh = obj as THREE.Mesh;
          if (!mesh.isMesh) return;
          mesh.geometry.dispose();
          const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          materials.forEach((material) => material.dispose());
        });
        envTexture.dispose();
        pmrem.dispose();
        draco.dispose();
        renderer.dispose();
      };
      teardown = cleanup;

      const resize = () => {
        const w = holder.clientWidth;
        const h = holder.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        // Pull the camera back on narrow screens so the exploded plane still fits.
        const tanHalfFov = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
        baseDistance = Math.max(9, 3.8 / (tanHalfFov * camera.aspect));
      };

      let model: THREE.Object3D;
      try {
        model = (await loader.loadAsync(modelUrl)).scene;
      } catch {
        if (!disposed) setStatus('error');
        cleanup();
        return;
      }
      if (disposed) return;

      // Scale the model to a known size and centre it on the origin.
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      model.scale.multiplyScalar(MODEL_SIZE / Math.max(size.x, size.y, size.z));
      model.updateMatrixWorld(true);
      box.setFromObject(model);
      model.position.sub(box.getCenter(new THREE.Vector3()));
      pivot.add(model);
      pivot.updateMatrixWorld(true);

      // Work out where each part goes: away from the model centre, in world space,
      // then converted into the part's own local space.
      const moves: { obj: THREE.Object3D; home: THREE.Vector3; offset: THREE.Vector3 }[] = [];
      for (const obj of getParts(model)) {
        const parent = obj.parent;
        const partBox = new THREE.Box3().setFromObject(obj);
        if (!parent || partBox.isEmpty()) continue;

        const worldCentre = partBox.getCenter(new THREE.Vector3());
        const delta = worldCentre.clone().multiplyScalar(EXPLODE_FACTOR);
        delta.y *= VERTICAL_BOOST;

        const from = parent.worldToLocal(worldCentre.clone());
        const to = parent.worldToLocal(worldCentre.clone().add(delta));
        moves.push({ obj, home: obj.position.clone(), offset: to.sub(from) });
      }

      if (import.meta.env.DEV) {
        console.log(
          `[ExplodedPlane] ${moves.length} parts:`,
          moves.map(({ obj }) => obj.name || '(unnamed)')
        );
      }

      pivot.rotation.set(0, START_YAW, 0);

      const timeline = createTimeline({ autoplay: false, defaults: { ease: 'inOutQuad' } });
      activeTimeline = timeline;
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
      timeline.add(pivot.rotation, { y: END_YAW, duration: PART_MS + STAGGER_MS, ease: 'linear' }, 0);

      resize();
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(holder);
      setStatus('ready');

      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      let current = 0;
      let activeStage = 0;

      const tick = () => {
        frame = requestAnimationFrame(tick);

        const rect = wrapper.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;

        // 0 when the section reaches the top of the screen, 1 when it ends.
        const scrollable = rect.height - window.innerHeight;
        const target = scrollable > 0 ? THREE.MathUtils.clamp(-rect.top / scrollable, 0, 1) : 0;
        current = reducedMotion ? target : current + (target - current) * 0.1;
        if (Math.abs(target - current) < 0.0005) current = target;

        timeline.seek(current * timeline.duration);

        camera.position.set(0, baseDistance * 0.15, baseDistance * (1 + 0.2 * current));
        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);

        let next = 0;
        STAGES.forEach((s, i) => {
          if (current >= s.from) next = i;
        });
        if (next !== activeStage) {
          activeStage = next;
          setStage(next);
        }
      };
      tick();
    };

    // Only fetch the model once the section is close to the viewport.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          observer.disconnect();
          void start();
        }
      },
      { rootMargin: '600px 0px' }
    );
    observer.observe(wrapper);

    return () => {
      disposed = true;
      observer.disconnect();
      teardown?.();
    };
  }, [modelUrl]);

  return (
    <div ref={wrapperRef} className="relative h-[300vh]">
      <div ref={stageRef} className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] max-w-full bg-aero-mid-blue/20 blur-[150px] rounded-full pointer-events-none" />

        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Interactive exploded view of a UBC AeroDesign aircraft"
          className={clsx(
            'relative block w-full h-full transition-opacity duration-1000',
            status === 'ready' ? 'opacity-100' : 'opacity-0'
          )}
        />

        {status !== 'ready' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-lato text-sm tracking-[0.2em] uppercase text-white/40">
              {status === 'error' ? '3D model unavailable' : 'Loading aircraft model'}
            </p>
          </div>
        )}

        {/* Captions */}
        <div className="absolute bottom-8 md:bottom-12 left-0 right-0 md:right-auto md:max-w-md">
          <div className="glass-panel rounded-2xl p-6 md:p-8">
            <div className="grid">
              {STAGES.map((s, i) => (
                <div
                  key={s.label}
                  className={clsx(
                    'col-start-1 row-start-1 transition-opacity duration-500',
                    i === stage ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  )}
                >
                  <p className="font-lato text-aero-yellow text-xs tracking-widest uppercase mb-2">{s.label}</p>
                  <h3 className="font-titillium font-semibold text-xl text-white tracking-wide mb-3 leading-snug">{s.title}</h3>
                  <p className="font-lato text-white/55 text-sm leading-relaxed">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stage dots */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-3">
          {STAGES.map((s, i) => (
            <span
              key={s.label}
              className={clsx(
                'w-1.5 rounded-full transition-all duration-300',
                i === stage ? 'bg-white h-6' : 'bg-white/30 h-1.5'
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}