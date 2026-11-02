import { useEffect } from 'react';

/** Eases `targetRef` towards a small 3D tilt following the pointer over `areaRef` (mouse devices only). */
export default function usePointerTilt(areaRef, targetRef) {
  useEffect(() => {
    const wrap = areaRef.current, grid = targetRef.current;
    if (!wrap || !grid) return undefined;
    if (!window.matchMedia('(hover:hover)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    const step = () => {
      cx += (tx - cx) * 0.07; cy += (ty - cy) * 0.07;
      grid.style.transform = `rotateX(${cx}deg) rotateY(${cy}deg)`;
      raf = Math.abs(tx - cx) > 0.02 || Math.abs(ty - cy) > 0.02 ? requestAnimationFrame(step) : 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(step); };
    const onMove = (e) => {
      const r = wrap.getBoundingClientRect();
      tx = ((e.clientY - r.top) / r.height - 0.5) * -6;
      ty = ((e.clientX - r.left) / r.width - 0.5) * 8;
      kick();
    };
    const onLeave = () => { tx = 0; ty = 0; kick(); };
    wrap.addEventListener('pointermove', onMove);
    wrap.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      wrap.removeEventListener('pointermove', onMove);
      wrap.removeEventListener('pointerleave', onLeave);
    };
  }, [areaRef, targetRef]);
}
