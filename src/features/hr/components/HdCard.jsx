import HdBody from './HdBody';

const CB = 'flex flex-1 flex-col items-center gap-1.5 text-[16px] leading-[1.8] text-ink max-[700px]:[&_br]:hidden [&_a:hover]:text-teal-hover [&_a]:text-teal-bright [&_a]:underline';

/** Card body padding/alignment, following the prototype's cascade. */
function bodyClass(c, inSection) {
  if (inSection) return `${CB} justify-center px-[18px] pb-5 pt-[18px] text-center`;
  if (!c.h) return `${CB} items-start justify-center px-[22px] py-[26px] text-left`;
  if (c.list) return `${CB} items-start justify-start px-7 pb-[26px] pt-6 text-left`;
  return `${CB} justify-center px-5 pb-[26px] pt-6 text-center`;
}

/** One white HR document card, optionally split into sub-sections. */
export default function HdCard({ c }) {
  return (
    <div data-reveal className="hr-card flex flex-col overflow-hidden rounded-box bg-white shadow-card">
      {c.h && <div className="bg-[#CFE3FC] px-3.5 py-[13px] text-center text-[18px] font-semibold text-ink">{c.h}</div>}
      {c.secs
        ? c.secs.map((x, i) => (
          <div key={i} className="contents">
            <div className="border-t border-white bg-[#E4F0FE] px-3.5 py-2.5 text-center text-[16px] text-ink">{x.h}</div>
            <div className={bodyClass(x, true)}><HdBody c={x} /></div>
          </div>
        ))
        : <div className={bodyClass(c, false)}><HdBody c={c} /></div>}
    </div>
  );
}
