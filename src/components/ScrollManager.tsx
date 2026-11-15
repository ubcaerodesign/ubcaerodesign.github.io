import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Centralises scroll behaviour for route changes.
 *
 * React Router does not scroll to `#hash` targets on its own, so links like
 * `/recruitment#faq` would otherwise land at whatever offset the previous page
 * happened to be at. This handles both cases:
 *
 *   - no hash  → jump to the top of the new page
 *   - a hash   → scroll the matching section into view, below the fixed navbar
 *
 * Two things to know before changing this:
 *
 *   1. Pages must NOT scroll on mount themselves. A `window.scrollTo(0, 0)`
 *      in a page component overrides the hash target, which is what broke
 *      every anchored footer link.
 *   2. The offset lives in CSS as `scroll-margin-top` on `section[id]`, not
 *      here. Browsers also do their own fragment scrolling as the app
 *      hydrates, so if this file used a different number the two would fight
 *      and the landing position would come out flaky.
 */

/** Only used if a target somehow has no `scroll-margin-top`. */
const FALLBACK_OFFSET = 112;

/** How long to keep correcting the target while images finish loading. */
const SETTLE_MS = 2000;

/** Reads the offset from CSS so JS and the browser always agree. */
function anchorOffset(el: Element) {
  return parseFloat(getComputedStyle(el).scrollMarginTop) || FALLBACK_OFFSET;
}

export default function ScrollManager() {
  const { pathname, hash, key, state } = useLocation();
  const previousPathname = useRef<string | null>(null);

  useEffect(() => {
    const samePage = previousPathname.current === pathname;
    previousPathname.current = pathname;

    if (samePage && (state as { preserveScroll?: boolean } | null)?.preserveScroll) return;

    if (!hash) {
      window.scrollTo({ top: 0, left: 0 });
      return;
    }

    const id = decodeURIComponent(hash.slice(1));

    const targetTop = () => {
      const el = document.getElementById(id);
      if (!el) return null;
      return Math.max(0, el.getBoundingClientRect().top + window.scrollY - anchorOffset(el));
    };

    // Already on this page, so the section is laid out and a smooth scroll
    // reads as a deliberate jump rather than a teleport.
    if (samePage) {
      const top = targetTop();
      if (top !== null) window.scrollTo({ top, left: 0, behavior: 'smooth' });
      return;
    }

    // Arriving fresh: land on the section immediately, then keep correcting,
    // because images above it load late and push it down as they arrive.
    let frame = 0;
    let stopped = false;
    const deadline = Date.now() + SETTLE_MS;

    // If the visitor starts scrolling, stop fighting them.
    const surrender = () => { stopped = true; };
    window.addEventListener('wheel', surrender, { passive: true });
    window.addEventListener('touchstart', surrender, { passive: true });
    window.addEventListener('keydown', surrender);

    const tick = () => {
      if (stopped) return;
      const top = targetTop();
      if (top !== null && Math.abs(top - window.scrollY) > 2) {
        window.scrollTo({ top, left: 0, behavior: 'instant' });
      }
      if (Date.now() < deadline) frame = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      stopped = true;
      cancelAnimationFrame(frame);
      window.removeEventListener('wheel', surrender);
      window.removeEventListener('touchstart', surrender);
      window.removeEventListener('keydown', surrender);
    };
  }, [pathname, hash, key]);

  return null;
}
