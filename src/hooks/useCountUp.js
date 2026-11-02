import { useEffect, useRef, useState } from 'react';

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Number that counts up from 0 the first time its element scrolls into view, then glides from the
 * old value to the new one whenever `value` changes (coins earned, leave rotating). Whole numbers stay
 * whole while counting; decimals count in 0.1 steps. Returns [ref for the element, number to show].
 */
export default function useCountUp(value, duration = 900) {
  const ref = useRef(null);
  const shown = useRef(null); // last drawn value; null = has not been seen yet
  const [v, setV] = useState(() => (reduced() ? value : 0));

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced() || !('IntersectionObserver' in window)) { shown.current = value; setV(value); return undefined; }
    const snap = (x) => (Number.isInteger(value) ? Math.round(x) : Math.round(x * 10) / 10);
    let raf = 0;
    let io;
    const run = (from) => {
      const t0 = performance.now();
      const step = (t) => {
        const k = Math.min(1, (t - t0) / duration);
        const x = from + (value - from) * (1 - (1 - k) ** 3);
        shown.current = x;
        setV(k < 1 ? snap(x) : value);
        if (k < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };
    if (shown.current === null) {
      io = new IntersectionObserver(([en]) => {
        if (!en.isIntersecting) return;
        io.disconnect();
        run(0);
      }, { threshold: 0.3 });
      io.observe(el);
    } else if (shown.current !== value) {
      run(shown.current);
    }
    return () => { cancelAnimationFrame(raf); io?.disconnect(); };
  }, [value, duration]);

  return [ref, v];
}
