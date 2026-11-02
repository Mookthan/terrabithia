import Avatar from './Avatar';
import Stars from './Stars';

export default function ReviewCard({ review: r }) {
  return (
    <div data-reveal className="mb-3.5 rounded-ctl bg-white px-[18px] py-4 shadow-card">
      <div className="flex items-center gap-3">
        <Avatar src={r.a} name={r.n} bg={r.c} />
        <div className="flex flex-1 flex-col text-[13px] text-ink">
          <b>{r.n}</b>
          <small className="text-[11.5px] text-ink">{r.r}</small>
        </div>
        <em className="self-start text-[11.5px] not-italic text-ink">{r.d}</em>
      </div>
      <div className="mb-1.5 mt-2.5 flex items-center gap-1.5">
        <Stars n={r.s} />
        <small className="text-[11px] text-ink">{r.s.toFixed(1)}</small>
      </div>
      <div className="mb-1.5 mt-2.5 text-[12.5px] font-bold text-ink">{r.h}</div>
      <p className="text-[12px] leading-[1.75] text-ink">{r.x}</p>
    </div>
  );
}
