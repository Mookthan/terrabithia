import { CRS_STATS, CRS_TYPES } from '../data';
import '../courses.css';
import CountUp from '@/components/ui/CountUp';
import useCountUp from '@/hooks/useCountUp';

function Gauge({ stat }) {
  const target = Math.round((stat.done / stat.all) * 100);
  // The ring fills and the % counts up together the first time the row is seen.
  const [ref, p] = useCountUp(target, 1100);
  return (
    <div className="flex items-center gap-3.5 max-[640px]:min-w-0 max-[640px]:flex-col max-[640px]:gap-2 max-[640px]:text-center">
      <div ref={ref} className="crs-gauge" style={{ '--c': stat.c, '--v': p }}>
        <span>{`${p} %`}</span>
      </div>
      <div className="flex flex-col items-start leading-[1.25] max-[640px]:items-center" style={{ color: stat.c }}>
        <small className="text-[11px] max-[640px]:whitespace-nowrap max-[640px]:text-[10.5px]">{CRS_TYPES[stat.t].l}</small>
        <CountUp as="b" className="text-[24px] font-medium max-[640px]:text-[20px]" value={stat.done} format={(n) => `${n}/${stat.all}`} duration={1100} />
        <small className="text-[11px] max-[640px]:whitespace-nowrap max-[640px]:text-[10.5px]">{`เหลืออีก ${stat.all - stat.done} คอร์ส`}</small>
      </div>
    </div>
  );
}

/** Progress per course type plus the overall total. `className` replaces the bottom margin. */
export default function GaugeRow({ className = 'mb-[30px]' }) {
  const done = CRS_STATS.reduce((a, s) => a + s.done, 0);
  const all = CRS_STATS.reduce((a, s) => a + s.all, 0);
  return (
    <div className={`${className} flex flex-wrap items-center justify-center gap-9 max-[640px]:grid max-[640px]:grid-cols-3 max-[640px]:items-start max-[640px]:justify-items-center max-[640px]:gap-x-1.5 max-[640px]:gap-y-[18px] max-[640px]:px-2.5`}>
      {CRS_STATS.map((s) => <Gauge key={s.t} stat={s} />)}
      <div className="text-center text-[17px] leading-[1.3] text-ink max-[640px]:col-span-full max-[640px]:-order-1 max-[640px]:flex max-[640px]:items-baseline max-[640px]:justify-center max-[640px]:gap-2 max-[640px]:pb-1 max-[640px]:text-[16px]">
        เรียนแล้ว
        <CountUp as="b" className="block text-[30px] font-semibold max-[640px]:inline max-[640px]:text-[26px]" value={done} format={(n) => `${n}/${all}`} duration={1100} />
        คอร์ส
      </div>
    </div>
  );
}
