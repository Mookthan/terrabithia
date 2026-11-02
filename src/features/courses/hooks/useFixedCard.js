import { useEffect } from 'react';

/**
 * Keeps `cardRef` fixed on screen while the page scrolls (desktop), aligned to
 * its placeholder `phRef`; on screens ≤900px the card stays in the flow.
 */
export default function useFixedCard(phRef, cardRef) {
  useEffect(() => {
    const place = () => {
      const ph = phRef.current;
      const c = cardRef.current;
      if (!ph || !c) return;
      if (window.innerWidth <= 900) { c.style.cssText = ''; return; }
      // Desktop zoom (html { zoom }) : the rect is in screen px but styles are in CSS px, so divide by it.
      const z = parseFloat(getComputedStyle(document.documentElement).zoom) || 1;
      const headerH = parseFloat(document.body.style.paddingTop) || 0;
      const r = ph.getBoundingClientRect();
      const top = Math.max(r.top / z, headerH + 16);
      Object.assign(c.style, {
        position: 'fixed',
        left: `${r.left / z}px`,
        width: `${r.width / z}px`,
        top: `${top}px`,
        maxHeight: `${window.innerHeight / z - top - 16}px`,
      });
    };
    place();
    // The page-enter animation shifts the layout briefly; settle again after it.
    const t = setTimeout(place, 400);
    window.addEventListener('scroll', place, { passive: true });
    window.addEventListener('resize', place);
    return () => {
      clearTimeout(t);
      window.removeEventListener('scroll', place);
      window.removeEventListener('resize', place);
    };
  }, [phRef, cardRef]);
}
