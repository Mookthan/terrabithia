import Fold from '@/components/ui/Fold';
import { KPI_YEAR } from '@/features/profile/data';

/** What this role has to achieve this year: KPI name and target only (no weights, progress or scores, mook 2026-10-29). */
export function OrgKpiBody({ items, boxed = true }) {
  return (
    <div className={boxed ? 'mt-2 rounded-ctl bg-cream px-3 py-2.5' : ''}>
      {boxed && <p className="text-[12px] text-muted">{`เป้าหมายของตำแหน่งนี้ในปี ${KPI_YEAR}`}</p>}
      <ul className="m-0 list-none divide-y divide-line p-0">
        {items.map((k) => (
          <li key={k.n} className="py-2">
            <b className="text-[13px] text-ink">{k.n}</b>
            <div className="text-[12px] text-muted">{`เป้าหมาย: ${k.target}`}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The same list folded open inside the person card (desktop). */
export default function OrgKpiSheet({ open, items }) {
  return <Fold open={open}><OrgKpiBody items={items} /></Fold>;
}
