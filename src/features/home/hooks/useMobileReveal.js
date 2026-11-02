import { useEffect, useState } from 'react';

/**
 * Phones only: hides the dashboard cards ([data-home-card]) and reveals each one as it
 * scrolls into view. Returns true while active (the root then gets `home-mrev`).
 */
export default function useMobileReveal(rootRef) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !window.matchMedia('(max-width: 640px)').matches) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return undefined;
    setActive(true);
    const cards = [...root.querySelectorAll('[data-home-card]')];
    const show = (el) => { el.dataset.mshow = ''; };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -12% 0px' });
    cards.forEach((c) => io.observe(c));
    const t = setTimeout(() => cards.forEach(show), 8000);
    return () => { io.disconnect(); clearTimeout(t); };
  }, [rootRef]);
  return active;
}
