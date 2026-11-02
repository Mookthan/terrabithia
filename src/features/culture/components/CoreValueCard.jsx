import { useRef } from 'react';
import useInViewOnce from '../hooks/useInViewOnce';
import '../culture.css';

/** One core value: big letter above a floating arch card. */
export default function CoreValueCard({ value, index, floatSec }) {
  const ref = useRef(null);
  const inView = useInViewOnce(ref);
  const { l, en, th, Icon, c1, c2, pts } = value;
  return (
    <div ref={ref} className={`cv-col text-center ${inView ? 'cv-in' : ''}`} style={{ '--i': index }}>
      <div className="mb-[14px] text-[88px] font-semibold leading-none text-ink max-[620px]:mb-[10px] max-[620px]:text-[56px]">{l}</div>
      <div className="cv-float" style={{ '--f': `${floatSec}s`, '--fd': `${(index * 0.35).toFixed(2)}s` }}>
        <div
          className="overflow-hidden rounded-[125px_125px_14px_14px] bg-[linear-gradient(180deg,var(--c2),#fff)] pb-[22px] shadow-card transition-[transform,box-shadow] duration-[450ms] ease-[cubic-bezier(.175,.885,.32,1.275)] [container-type:inline-size] hover:-translate-y-[10px] hover:scale-[1.03] hover:shadow-pop"
          style={{ '--c1': c1, '--c2': c2 }}
        >
          <div className="mb-[22px] flex aspect-square flex-col items-center justify-center gap-[1.4cqw] rounded-full bg-[var(--c1)] text-ink">
            <Icon className="lc !mb-[2cqw] !h-[24cqw] !w-[24cqw]" />
            <b className="whitespace-nowrap text-[length:10cqw] font-medium leading-[1.15] text-[#1B5C57]">{en}</b>
            <span className="whitespace-nowrap text-[length:5.6cqw] leading-[1.2]">{th}</span>
          </div>
          <div className="px-4">
            {pts.map((p) => (
              <div key={p.h} className="mb-[18px] last:mb-0">
                <h4 className="mb-1.5 text-[length:7.6cqw] font-semibold text-ink">{p.h}</h4>
                <p className="text-[length:5.2cqw] leading-[1.45] text-ink">{p.t}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
