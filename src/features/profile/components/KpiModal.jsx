import { Lock } from 'lucide-react';
import { TEXT_LINK } from '@/components/ui/TextButton';
import { KPIS, KPI_YEAR } from '../data';
import { evalLock, useEvalLock } from '../evalLock';
import ModalShell from './ModalShell';

/** Score cell: locked with the evaluation result; "รอประเมิน" while the year is running. */
function Score({ score, open }) {
  if (score == null) return <span className="text-muted">รอประเมิน</span>;
  if (!open) return <span className="inline-flex items-center gap-1 text-muted"><span className="tracking-[.15em]" aria-hidden="true">●●</span><Lock className="lc !h-3 !w-3" aria-label="ซ่อนอยู่" /></span>;
  return <b className="text-ink">{`${score.toFixed(1)} / 5`}</b>;
}

/** One year's KPIs: weight, target, progress bar and (locked) score; `compact` drops the heading for inline use. */
export function KpiList({ year = KPI_YEAR, compact = false }) {
  const { open } = useEvalLock();
  const items = KPIS[year] || [];
  const hasScores = items.some((k) => k.score != null);
  return (
    <>
      {!compact && <h2 className="pr-8 text-[19px] font-bold text-ink">{`KPI ปี ${year}`}</h2>}
      <p className={`text-[12px] text-muted ${compact ? '' : 'mt-0.5'}`}>{`${items.length} ตัวชี้วัด · น้ำหนักรวม ${items.reduce((s, k) => s + k.w, 0)}%`}</p>
      <ul className={`m-0 list-none divide-y divide-line p-0 ${compact ? 'mt-1' : 'mt-3'}`}>
        {items.map((k) => (
          <li key={k.n} className={compact ? 'py-2.5' : 'py-3.5'}>
            <div className="flex items-start justify-between gap-3">
              <b className={`${compact ? 'text-[13px]' : 'text-[14px]'} text-ink`}>{k.n}</b>
              <span className="flex-none rounded-full bg-teal-soft px-2 py-0.5 text-[11.5px] font-bold text-teal-hover">{`${k.w}%`}</span>
            </div>
            <div className="mt-0.5 text-[12px] text-muted">{`เป้าหมาย: ${k.target}`}</div>
            <div className="mt-2 flex items-center gap-3 text-[12px]">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-cream" role="progressbar" aria-valuenow={k.progress} aria-valuemin={0} aria-valuemax={100}>
                <div className="h-full rounded-full bg-teal-bright" style={{ width: `${k.progress}%` }} />
              </div>
              <span className="w-[38px] flex-none text-right text-muted">{`${k.progress}%`}</span>
              <span className="w-[86px] flex-none text-right"><Score score={k.score} open={open} /></span>
            </div>
          </li>
        ))}
      </ul>
      {hasScores && !open && (
        <div className="mt-3 flex justify-end">
          <button type="button" className={`${TEXT_LINK} text-[13px] font-semibold`} onClick={evalLock.ask}>ดูคะแนน</button>
        </div>
      )}
    </>
  );
}

/** KPI popup from the profile work card. */
export default function KpiModal({ year = KPI_YEAR, onClose }) {
  return (
    <ModalShell label={`KPI ปี ${year}`} width="w-[560px]" onClose={onClose}>
      <KpiList year={year} />
    </ModalShell>
  );
}
