import { useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import {
  type AircraftEntry,
  type AircraftMediaItem,
  type AircraftPlacements,
  getAircraftMedia,
} from './../data/fleet';
import AircraftPlaceholder from './../assets/aircraft/placeholder.svg';

interface FleetTimelineProps {
  fleet: AircraftEntry[];
  initialId?: string;
}

interface YearGroup {
  key: string;
  year: string;
  shortYear: string;
  aircraft: AircraftEntry[];
}

type PodiumTier = 'gold' | 'silver' | 'bronze';

const loadedImageUrls = new Set<string>();
const pendingPreloads = new Set<string>();

function preloadImage(url: string) {
  if (loadedImageUrls.has(url) || pendingPreloads.has(url)) return;
  pendingPreloads.add(url);
  const img = new Image();
  img.decoding = 'async';
  img.onload = () => {
    loadedImageUrls.add(url);
    pendingPreloads.delete(url);
  };
  img.onerror = () => {
    pendingPreloads.delete(url);
  };
  img.src = url;
}

function preloadMediaItems(items: AircraftMediaItem[], limit?: number) {
  let count = 0;
  for (const item of items) {
    if (item.type !== 'image') continue;
    preloadImage(item.url);
    count += 1;
    if (limit !== undefined && count >= limit) break;
  }
}

function preloadYearGroup(group?: YearGroup, imagesPerAircraft?: number) {
  if (!group) return;
  for (const aircraft of group.aircraft) {
    preloadMediaItems(getAircraftMedia(aircraft), imagesPerAircraft);
  }
}

function getPlacementTier(value?: string): PodiumTier | null {
  if (!value) return null;
  if (/\b1st\b/i.test(value)) return 'gold';
  if (/\b2nd\b/i.test(value)) return 'silver';
  if (/\b3rd\b/i.test(value)) return 'bronze';
  return null;
}

const PODIUM_BADGE_STYLES: Record<PodiumTier, { badge: string; value: string }> = {
  gold: {
    badge:
      'text-amber-100/90 bg-amber-400/15 border border-amber-400/45 shadow-[0_0_16px_rgba(251,191,36,0.28)]',
    value: 'text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.65)]',
  },
  silver: {
    badge:
      'text-slate-100/90 bg-slate-300/15 border border-slate-300/45 shadow-[0_0_16px_rgba(226,232,240,0.25)]',
    value: 'text-white drop-shadow-[0_0_8px_rgba(226,232,240,0.65)]',
  },
  bronze: {
    badge:
      'text-orange-100/90 bg-amber-700/20 border border-amber-600/45 shadow-[0_0_16px_rgba(217,119,6,0.28)]',
    value: 'text-amber-400 drop-shadow-[0_0_8px_rgba(217,119,6,0.6)]',
  },
};

function formatPlacementBadges(placements?: AircraftPlacements): { label: string; value: string }[] {
  if (!placements) return [];
  const items: { label: string; value: string }[] = [];
  if (placements.overall) items.push({ label: 'Overall', value: placements.overall });
  if (placements.flight) items.push({ label: 'Flight', value: placements.flight });
  if (placements.designReport) items.push({ label: 'Design Report', value: placements.designReport });
  if (placements.presentation) items.push({ label: 'Presentation', value: placements.presentation });
  return items.filter((item) => getPlacementTier(item.value) !== null);
}

function groupFleetByYear(fleet: AircraftEntry[]): YearGroup[] {
  const groups: YearGroup[] = [];
  const byYear = new Map<string, YearGroup>();

  for (const entry of fleet) {
    const existing = byYear.get(entry.year);
    if (existing) {
      existing.aircraft.push(entry);
    } else {
      const group: YearGroup = {
        key: entry.year,
        year: entry.year,
        shortYear: entry.shortYear,
        aircraft: [entry],
      };
      byYear.set(entry.year, group);
      groups.push(group);
    }
  }

  return groups;
}

function MediaPlaceholder({ aircraft }: { aircraft: AircraftEntry }) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-6 py-12 text-center select-none overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(201,214,234,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(201,214,234,0.6) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-full border border-white/15 bg-white/[0.03] flex items-center justify-center mb-5 shadow-[0_0_50px_rgba(0,53,101,0.45)]">
        <img
          src={AircraftPlaceholder}
          alt=""
          aria-hidden="true"
          className="w-10 h-10 md:w-11 md:h-11 opacity-60"
        />
      </div>

      <p className="relative z-10 font-titillium font-semibold text-aero-yellow/80 text-xs tracking-[0.25em] uppercase mb-2">
        {aircraft.year} · {aircraft.aircraftClass}
      </p>
      <p className="relative z-10 font-titillium font-semibold text-2xl md:text-4xl text-white/95 tracking-wide mb-2">
        {aircraft.name}
      </p>
      <p className="relative z-10 font-lato text-xs md:text-sm text-white/45 tracking-wider uppercase">
        Media Placeholder · Photos & footage coming soon
      </p>

      {import.meta.env.DEV && (
        <p className="relative z-10 mt-3 font-mono text-[11px] text-aero-light-blue/60 bg-white/5 border border-white/10 rounded-md px-3 py-1">
          Drop images or videos into src/assets/aircraft/{aircraft.id}/
        </p>
      )}
    </div>
  );
}

function AircraftMediaStage({
  aircraft,
  className,
}: {
  aircraft: AircraftEntry;
  className?: string;
}) {
  const [mediaIndex, setMediaIndex] = useState(0);
  const [loadedUrl, setLoadedUrl] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const mediaList = getAircraftMedia(aircraft);
  const currentMedia = mediaList[mediaIndex] ?? mediaList[0];
  const overallTier = getPlacementTier(aircraft.placements?.overall);
  const hasMultipleMedia = mediaList.length > 1;

  const isImageLoaded =
    currentMedia?.type === 'image' &&
    (loadedUrl === currentMedia.url || loadedImageUrls.has(currentMedia.url));

  useEffect(() => {
    setMediaIndex(0);
  }, [aircraft.id]);

  // If the image was already cached by the browser, mark it loaded immediately.
  useEffect(() => {
    const img = imgRef.current;
    if (img && currentMedia?.type === 'image' && img.complete && img.naturalWidth > 0) {
      loadedImageUrls.add(currentMedia.url);
      setLoadedUrl(currentMedia.url);
    }
  }, [currentMedia?.url, currentMedia?.type]);

  // Preload adjacent media items in this aircraft's gallery.
  useEffect(() => {
    if (mediaList.length <= 1) return;
    const nextItem = mediaList[(mediaIndex + 1) % mediaList.length];
    const prevItem = mediaList[(mediaIndex - 1 + mediaList.length) % mediaList.length];
    if (nextItem?.type === 'image') preloadImage(nextItem.url);
    if (prevItem?.type === 'image') preloadImage(prevItem.url);
  }, [mediaIndex, mediaList]);

  return (
    <div
      className={clsx(
        'relative w-full rounded-2xl overflow-hidden border bg-[#040d17] transition-all duration-500',
        overallTier === 'gold' && 'border-amber-400/40 shadow-[0_0_45px_rgba(251,191,36,0.16)]',
        overallTier === 'silver' && 'border-slate-300/40 shadow-[0_0_45px_rgba(226,232,240,0.14)]',
        overallTier === 'bronze' && 'border-amber-600/45 shadow-[0_0_45px_rgba(217,119,6,0.16)]',
        !overallTier && 'border-white/10',
        className
      )}
    >
      <div
        className={clsx(
          'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] max-w-full blur-[140px] rounded-full pointer-events-none transition-colors duration-500',
          overallTier === 'gold' && 'bg-amber-400/20',
          overallTier === 'silver' && 'bg-slate-300/20',
          overallTier === 'bronze' && 'bg-amber-600/20',
          !overallTier && 'bg-aero-mid-blue/20'
        )}
      />

      {currentMedia ? (
        currentMedia.type === 'video' ? (
          <video
            key={currentMedia.url}
            src={currentMedia.url}
            controls
            playsInline
            preload="metadata"
            className="relative z-10 w-full h-full object-contain"
          />
        ) : (
          <>
            {!isImageLoaded && (
              <div
                aria-hidden="true"
                className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
              >
                <div className="w-8 h-8 rounded-full border-2 border-white/15 border-t-white/75 animate-spin" />
              </div>
            )}
            <img
              src={currentMedia.url}
              alt=""
              aria-hidden="true"
              loading="eager"
              decoding="async"
              className={clsx(
                'absolute inset-0 w-full h-full object-cover scale-110 blur-2xl pointer-events-none transition-opacity duration-300',
                isImageLoaded ? 'opacity-25' : 'opacity-0'
              )}
            />
            <img
              ref={imgRef}
              key={currentMedia.url}
              src={currentMedia.url}
              alt={`${aircraft.name} — ${currentMedia.alt}`}
              loading="eager"
              decoding="async"
              onLoad={() => {
                loadedImageUrls.add(currentMedia.url);
                setLoadedUrl(currentMedia.url);
              }}
              className={clsx(
                'relative z-10 w-full h-full object-contain transition-opacity duration-200',
                isImageLoaded ? 'opacity-100' : 'opacity-0'
              )}
            />
          </>
        )
      ) : (
        <MediaPlaceholder aircraft={aircraft} />
      )}

      {mediaList.length > 0 && (
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 px-3 py-1">
          <span className="font-lato text-[11px] tracking-widest uppercase text-white/80">
            {currentMedia.type === 'video' ? 'Video' : 'Photo'} {mediaIndex + 1} / {mediaList.length}
          </span>
        </div>
      )}

      {hasMultipleMedia && (
        <>
          <button
            type="button"
            onClick={() => setMediaIndex((i) => (i - 1 + mediaList.length) % mediaList.length)}
            aria-label={`Previous media for ${aircraft.name}`}
            className="cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/45 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => setMediaIndex((i) => (i + 1) % mediaList.length)}
            aria-label={`Next media for ${aircraft.name}`}
            className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/45 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 rounded-full bg-black/45 backdrop-blur-sm px-3 py-1.5 border border-white/10">
            {mediaList.map((item, idx) => (
              <button
                key={item.url}
                type="button"
                onClick={() => setMediaIndex(idx)}
                aria-label={`View ${item.type} ${idx + 1} of ${aircraft.name}`}
                className={clsx(
                  'cursor-pointer h-1.5 rounded-full transition-all duration-300',
                  idx === mediaIndex ? 'bg-white w-6' : 'bg-white/40 w-1.5 hover:bg-white/70'
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function AircraftCaptionCard({
  aircraft,
  className,
  summaryClassName,
}: {
  aircraft: AircraftEntry;
  className?: string;
  summaryClassName?: string;
}) {
  const mediaList = getAircraftMedia(aircraft);
  const placementBadges = formatPlacementBadges(aircraft.placements);

  return (
    <div className={clsx('glass-panel rounded-2xl p-5 md:p-6 flex flex-col justify-between min-w-0', className)}>
      <div className="flex flex-col min-h-0 flex-1">
        <div className="flex items-center justify-between gap-3 mb-2">
          <p className="font-lato text-aero-yellow text-[11px] md:text-xs tracking-[0.18em] uppercase">
            {aircraft.year} · {aircraft.aircraftClass}
          </p>
          <span className="font-lato text-[10px] tracking-widest uppercase text-white/55 border border-white/15 rounded-full px-2.5 py-0.5 shrink-0">
            {mediaList.length > 0 ? `${mediaList.length} Media` : 'Placeholder'}
          </span>
        </div>

        <h3 className="font-titillium font-semibold text-xl md:text-2xl text-white tracking-wide mb-2 leading-snug">
          {aircraft.name}
        </h3>

        <div className={clsx('overflow-y-auto pr-2 aero-scrollbar space-y-3', summaryClassName)}>
          <p className="font-lato text-white/60 text-xs md:text-sm leading-relaxed">
            {aircraft.summary}
          </p>

          {aircraft.subEntries && aircraft.subEntries.length > 0 && (
            <div className="pt-2 border-t border-white/10 space-y-1">
              {aircraft.subEntries.map((entry, idx) => {
                const tier = getPlacementTier(entry.result);
                return (
                  <div
                    key={`${entry.year}-${entry.aircraftClass}-${idx}`}
                    className="flex items-baseline justify-between gap-3 text-[11px] font-lato"
                  >
                    <span className="text-white/75 shrink-0">
                      {entry.year} · <span className="text-aero-light-blue/80">{entry.aircraftClass}</span>
                    </span>
                    <span
                      className={clsx(
                        'text-right',
                        tier === 'gold' && 'text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.55)]',
                        tier === 'silver' && 'text-slate-200 drop-shadow-[0_0_8px_rgba(226,232,240,0.5)]',
                        tier === 'bronze' && 'text-amber-400 drop-shadow-[0_0_8px_rgba(217,119,6,0.5)]',
                        !tier && 'text-white/50'
                      )}
                    >
                      {entry.result}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {placementBadges.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-white/10 shrink-0">
          {placementBadges.map((badge) => {
            const tier = getPlacementTier(badge.value);
            return (
              <span
                key={badge.label}
                className={clsx(
                  'font-lato text-[10px] tracking-wider uppercase rounded-md px-2 py-0.5 transition-all duration-300',
                  tier
                    ? PODIUM_BADGE_STYLES[tier].badge
                    : 'text-white/60 bg-white/5 border border-transparent'
                )}
              >
                {badge.label}:{' '}
                <strong className={tier ? PODIUM_BADGE_STYLES[tier].value : 'text-white/90'}>
                  {badge.value}
                </strong>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function FleetTimeline({ fleet, initialId }: FleetTimelineProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const scrubberRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const railDragRef = useRef<{
    pointerId: number;
    startX: number;
    startScrollLeft: number;
    dragging: boolean;
  } | null>(null);
  const suppressClickRef = useRef(false);
  const firstScrollRef = useRef(true);

  const yearGroups = useMemo(() => groupFleetByYear(fleet), [fleet]);

  const defaultIndex = (() => {
    if (initialId) {
      const idx = yearGroups.findIndex((g) => g.aircraft.some((a) => a.id === initialId));
      if (idx >= 0) return idx;
    }
    return Math.max(0, yearGroups.length - 1);
  })();

  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const [isDraggingRail, setIsDraggingRail] = useState(false);
  const [isScrubbing, setIsScrubbing] = useState(false);

  const clampedIndex = Math.min(activeIndex, Math.max(0, yearGroups.length - 1));
  const activeGroup = yearGroups[clampedIndex] ?? yearGroups[0];
  const scrubPercent = yearGroups.length > 1 ? (clampedIndex / (yearGroups.length - 1)) * 100 : 100;

  // Keep the selected year centered inside the horizontal timeline rail.
  useEffect(() => {
    const rail = railRef.current;
    const btn = activeGroup ? itemRefs.current[activeGroup.key] : null;
    if (!rail || !btn) return;
    const targetLeft = btn.offsetLeft - rail.clientWidth / 2 + btn.offsetWidth / 2;
    rail.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: firstScrollRef.current || isScrubbing ? 'auto' : 'smooth',
    });
    firstScrollRef.current = false;
  }, [activeGroup, isScrubbing]);

  // Preload active season photos + neighboring seasons' cover photos for snappy switching.
  useEffect(() => {
    if (!activeGroup) return;
    const delay = isScrubbing ? 120 : 0;
    const timer = window.setTimeout(() => {
      preloadYearGroup(activeGroup);
      preloadYearGroup(yearGroups[clampedIndex - 1], 2);
      preloadYearGroup(yearGroups[clampedIndex + 1], 2);
      preloadYearGroup(yearGroups[clampedIndex - 2], 1);
      preloadYearGroup(yearGroups[clampedIndex + 2], 1);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [activeGroup, clampedIndex, isScrubbing, yearGroups]);

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

  if (!activeGroup) return null;

  const scrubToClientX = (clientX: number) => {
    const track = scrubberRef.current;
    if (!track || yearGroups.length <= 1) return;
    const rect = track.getBoundingClientRect();
    if (rect.width <= 0) return;
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const nextIdx = Math.round(ratio * (yearGroups.length - 1));
    setActiveIndex((prev) => (prev === nextIdx ? prev : nextIdx));
  };

  const canGoOlder = clampedIndex > 0;
  const canGoNewer = clampedIndex < yearGroups.length - 1;
  const isSingleAircraft = activeGroup.aircraft.length === 1;
  const activeNamesLabel = activeGroup.aircraft.map((a) => a.name).join(' & ');

  return (
    <div className="space-y-5">
      {/* Top: Draggable Timeline Rail & Scrubber */}
      <div className="glass-panel rounded-2xl p-5 md:p-6 select-none flex flex-col justify-between">
        <div className="flex items-center justify-between gap-4 mb-3">
          <div>
            <p className="font-lato text-aero-yellow text-[10px] tracking-[0.2em] uppercase">
              Fleet Archive ({clampedIndex + 1}/{yearGroups.length})
            </p>
            <p className="font-titillium font-semibold text-xs md:text-sm text-white/85 tracking-wider uppercase">
              Drag Or Click To Travel Back
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            {clampedIndex !== yearGroups.length - 1 && (
              <button
                type="button"
                onClick={() => setActiveIndex(yearGroups.length - 1)}
                className="cursor-pointer font-titillium font-semibold text-[10px] tracking-[0.15em] uppercase px-2.5 h-8 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/50 hover:bg-white/10 transition-all mr-1"
              >
                Latest
              </button>
            )}
            <button
              type="button"
              onClick={() => canGoOlder && setActiveIndex((i) => i - 1)}
              disabled={!canGoOlder}
              aria-label="Previous (older) season"
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
              aria-label="Next (newer) season"
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
          <div className="relative inline-flex items-start justify-between gap-1.5 min-w-full pb-1">
            <div className="absolute top-3 -translate-y-1/2 left-11 right-11 h-px bg-white/15 pointer-events-none" />

            {yearGroups.map((group, idx) => {
              const isActive = idx === clampedIndex;
              const hasMedia = group.aircraft.some((a) => getAircraftMedia(a).length > 0);
              const classLabel = group.aircraft.map((a) => a.classCode).join(' · ');

              return (
                <button
                  key={group.key}
                  ref={(el) => {
                    itemRefs.current[group.key] = el;
                  }}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  onMouseEnter={() => preloadYearGroup(group, 1)}
                  onFocus={() => preloadYearGroup(group, 1)}
                  aria-current={isActive ? 'true' : undefined}
                  className="cursor-pointer group relative z-10 flex flex-col items-center w-[88px] shrink-0 px-1 pt-1.5 pb-1 rounded-xl transition-colors duration-200 hover:bg-white/5"
                >
                  <span
                    className={clsx(
                      'rounded-full transition-all duration-300 mb-2',
                      isActive
                        ? 'w-3 h-3 bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)] ring-4 ring-white/20'
                        : hasMedia
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
                    {group.shortYear}
                  </span>
                  <div className="flex flex-col items-center mt-0.5 w-full">
                    {group.aircraft.map((aircraft) => (
                      <span
                        key={aircraft.id}
                        className={clsx(
                          'font-lato text-[9px] tracking-[0.06em] uppercase truncate max-w-[80px] leading-tight transition-colors',
                          isActive ? 'text-aero-light-blue' : 'text-white/35 group-hover:text-white/60'
                        )}
                      >
                        {aircraft.name}
                      </span>
                    ))}
                  </div>
                  <span className="font-lato text-[8px] tracking-widest uppercase text-white/25 mt-0.5 whitespace-nowrap">
                    {classLabel}
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
            aria-valuemax={Math.max(0, yearGroups.length - 1)}
            aria-valuenow={clampedIndex}
            aria-valuetext={`${activeGroup.year} — ${activeNamesLabel}`}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') {
                e.preventDefault();
                setActiveIndex((i) => Math.max(0, i - 1));
              } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                setActiveIndex((i) => Math.min(yearGroups.length - 1, i + 1));
              } else if (e.key === 'Home') {
                e.preventDefault();
                setActiveIndex(0);
              } else if (e.key === 'End') {
                e.preventDefault();
                setActiveIndex(yearGroups.length - 1);
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
              'relative h-6 mx-2 sm:mx-4 xl:mx-11 flex items-center touch-none focus:outline-none focus-visible:ring-1 focus-visible:ring-white/50 rounded-full',
              isScrubbing ? 'cursor-grabbing' : 'cursor-pointer'
            )}
          >
            <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-white/25 to-white/90 rounded-full"
                style={{ width: `${scrubPercent}%` }}
              />
            </div>
            <div
              className={clsx(
                'absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)] transition-transform duration-150',
                isScrubbing ? 'scale-125 ring-4 ring-white/25' : 'hover:scale-110'
              )}
              style={{ left: `${scrubPercent}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] font-lato tracking-widest uppercase text-white/35 mt-0.5 gap-3 xl:px-5">
            <span className="shrink-0">{yearGroups[0]?.shortYear}</span>
            <span className="text-white/55 truncate text-center">
              {activeGroup.shortYear} · {activeNamesLabel}
            </span>
            <span className="shrink-0">{yearGroups[yearGroups.length - 1]?.shortYear}</span>
          </div>
        </div>
      </div>

      {/* Bottom: Selected Season Aircraft (Side-by-Side when multiple planes share a year) */}
      {isSingleAircraft ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          <div className="lg:col-span-8">
            <AircraftMediaStage
              key={activeGroup.aircraft[0].id}
              aircraft={activeGroup.aircraft[0]}
              className="h-[340px] sm:h-[440px] lg:h-[480px]"
            />
          </div>
          <AircraftCaptionCard
            aircraft={activeGroup.aircraft[0]}
            className="lg:col-span-4 lg:h-[480px]"
            summaryClassName="max-h-40 lg:max-h-none lg:flex-1 lg:min-h-0"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
          {activeGroup.aircraft.map((aircraft) => (
            <div key={aircraft.id} className="flex flex-col gap-4 min-w-0">
              <AircraftMediaStage
                aircraft={aircraft}
                className="h-[280px] sm:h-[340px] lg:h-[380px] shrink-0"
              />
              <AircraftCaptionCard
                aircraft={aircraft}
                className="flex-1"
                summaryClassName="max-h-36 md:max-h-44"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}