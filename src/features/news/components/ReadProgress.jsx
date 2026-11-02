import { useEffect, useState } from 'react';

/**
 * Fixed reading-progress bar under the header plus a "N% อ่านจบ" pill.
 * 100% is reached when `endRef` (the "other news" band) reaches the bottom of the viewport.
 */
export default function ReadProgress({ endRef }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const update = () => {
      const top = window.scrollY || document.documentElement.scrollTop;
      const band = endRef.current;
      const end = band
        ? band.getBoundingClientRect().top + top - window.innerHeight
        : document.documentElement.scrollHeight - window.innerHeight;
      setPct(end > 0 ? Math.min(100, Math.max(0, Math.round((top / end) * 100))) : 100);
    };
    update();
    const t = setTimeout(update, 300);
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { clearTimeout(t); window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, [endRef]);

  return (
    <>
      <div className="fixed left-0 right-0 top-[calc(var(--hh,78px)-8px)] z-[70]">
        <div className="h-1 origin-left bg-[linear-gradient(90deg,#27AE97,#8EBA3E)]" style={{ transform: `scaleX(${pct / 100})` }} />
      </div>
      <div className="fixed right-[18px] top-[calc(var(--hh,78px)+2px)] z-[71] rounded-full bg-navy px-[11px] py-[6px] text-[11px] font-bold leading-none text-white">
        {`${pct}% อ่านจบ`}
      </div>
    </>
  );
}
