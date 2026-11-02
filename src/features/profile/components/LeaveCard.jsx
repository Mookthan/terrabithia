import { fmtDays } from '@/data/leave';
import LeaveBar from '@/components/leave/LeaveBar';
import CountUp from '@/components/ui/CountUp';

/**
 * One leave entitlement: name, days left and a used/total bar.
 * `wide` is its colour on the 3-column grid, `narrow` on 2 or 1 columns.
 */
export default function LeaveCard({ leave, wide = leave.c, narrow = leave.c }) {
  return (
    <div
      data-reveal
      className="flex min-h-[200px] flex-col justify-between gap-[26px] rounded-box bg-[var(--tone-n)] p-[22px] min-[901px]:bg-[var(--tone-w)]"
      style={{ '--tone-w': wide, '--tone-n': narrow }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="text-[20px] leading-[1.3] text-ink">{leave.l}</div>
        <div className="shrink-0 text-right text-ink">
          <small className="block text-[14px] leading-[1.1]">เหลือ</small>
          <CountUp as="b" className="block whitespace-nowrap text-[30px] font-medium leading-[1.1]" value={leave.r} format={(n) => `${fmtDays(n)} ${leave.u}`} />
        </div>
      </div>
      <LeaveBar leave={leave} />
    </div>
  );
}
