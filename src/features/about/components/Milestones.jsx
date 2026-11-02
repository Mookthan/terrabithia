import { useEffect, useRef } from 'react';
import { MILESTONES, MILESTONE_IMG } from '../data';
import '../about.css';

/** Sticky cards shrink and dim slightly as the next card slides over them. */
function useStackShrink(stackRef) {
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = 0;
      const cards = stackRef.current ? [...stackRef.current.children] : [];
      cards.forEach((e, i) => {
        const n = cards[i + 1];
        let p = 0;
        if (n) {
          const a = e.getBoundingClientRect(), b = n.getBoundingClientRect();
          p = Math.max(0, Math.min(1, 1 - (b.top - a.top - 14) / a.height));
        }
        e.style.scale = (1 - 0.06 * p).toFixed(4);
        e.style.filter = p > 0.001 ? `brightness(${(1 - 0.2 * p).toFixed(3)})` : '';
      });
    };
    const req = () => { if (!raf) raf = requestAnimationFrame(tick); };
    window.addEventListener('scroll', req, { passive: true });
    window.addEventListener('resize', req);
    req();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', req);
      window.removeEventListener('resize', req);
    };
  }, [stackRef]);
}

export default function Milestones() {
  const stackRef = useRef(null);
  useStackShrink(stackRef);
  return (
    <div className="mt-14 border-t border-[#cfd6cc] pt-[30px]">
      <h2 className="mb-5 text-xl font-bold text-ink">Company Milestone</h2>
      <div className="mb-9 overflow-hidden rounded-ctl shadow-card">
        <img src={MILESTONE_IMG} alt="Our Journey: Terrabit milestones 2010-2026" className="block h-auto w-full" />
      </div>
      <div ref={stackRef} className="relative pb-10">
        {MILESTONES.map((m, i) => (
          <div
            key={m.y + m.t}
            data-reveal
            className="ms-card sticky mb-[26px] flex items-center gap-7 rounded-box border-l-[6px] border-teal-bright bg-white px-8 py-[26px] shadow-card max-[700px]:flex-col max-[700px]:items-start max-[700px]:gap-2.5 max-[700px]:p-5"
            style={{ '--i': i }}
          >
            <div className="min-w-[150px] text-[clamp(34px,4.6vw,60px)] font-bold leading-none text-ink max-[700px]:min-w-0">{m.y}</div>
            <div>
              <h4 className="mb-1 text-[19px] font-semibold text-ink">{m.t}</h4>
              <p className="mb-2.5 text-sm leading-[1.55] text-ink">{m.d}</p>
              <div className="flex flex-wrap gap-2">
                {m.tags.map((t) => (
                  <span key={t} className="rounded-full bg-[#E6F4F1] px-3 py-[3px] text-xs text-[#1B7A6B]">{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
