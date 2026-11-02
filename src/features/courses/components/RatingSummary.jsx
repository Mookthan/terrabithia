import { CRS_BARS } from '../data';
import Stars from './Stars';

/** Overall rating and the per-aspect bars. */
export default function RatingSummary() {
  return (
    <>
      <div className="mb-2 mt-4 flex items-center justify-center gap-2">
        <Stars n={4} big />
        <b className="text-[13px]">4.0 (50 รีวิว)</b>
      </div>
      <div className="mx-auto mb-1 grid max-w-[300px] gap-1">
        {CRS_BARS.map(([label, v]) => (
          <div key={label} className="grid grid-cols-[90px_1fr] items-center gap-2 text-[12px] text-ink">
            <span className="text-right">{label}</span>
            <div className="h-3.5 overflow-hidden rounded-[3px] bg-white">
              <i className="block h-full bg-teal-bright" style={{ width: `${v}%` }} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
