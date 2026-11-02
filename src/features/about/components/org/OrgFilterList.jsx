import { useEffect, useRef } from 'react';
import { BR, ORG_PEOPLE } from '@/data/org';
import { BRANCH_KEYS, orgDeptsOf, orgHaystack, orgKids, orgNode } from '../../orgModel';
import EmptyState from '@/components/ui/EmptyState';

/** Chief checkbox: checked when all its departments are picked, indeterminate when some are. */
function ChiefCheckbox({ depts, sel, onChange }) {
  const ref = useRef(null);
  const n = depts.filter((d) => sel.has(d)).length;
  useEffect(() => { if (ref.current) ref.current.indeterminate = n > 0 && n < depts.length; }, [n, depts.length]);
  return <input ref={ref} type="checkbox" checked={n === depts.length && depts.length > 0} onChange={onChange} />;
}

const rowCls = 'flex cursor-pointer flex-wrap items-center gap-2 rounded-ctl p-1.5 hover:bg-teal-veil';
const Dot = ({ color }) => <span className="h-[9px] w-[9px] flex-none rounded-full" style={{ background: color }} />;
const Small = ({ children }) => <small className="ml-auto text-[11px] text-muted">{children}</small>;

/** Branch → department checklist, narrowed by the search query `q` (lower-case). */
export default function OrgFilterList({ q, sel, onToggleDept, onToggleChief, quietEmpty = false }) {
  const hit = (id) => orgHaystack(id).includes(q);

  const groups = BRANCH_KEYS.map((k) => {
    const ds = orgDeptsOf(k);
    const chiefHit = !q || hit(k);
    const rows = ds.map((did) => {
      const node = orgNode(did);
      const ppl = orgKids(did).filter((x) => q && hit(x.id));
      if (q && !chiefHit && !hit(did) && !ppl.length) return null;
      return (
        <label key={did} className={`${rowCls} pl-7 text-[12.5px]`}>
          <input type="checkbox" checked={sel.has(did)} onChange={() => onToggleDept(did)} />
          <Dot color={BR[k].color} />
          <span>{node.label}</span>
          <Small>{`${node.count || 0} คน`}</Small>
          {ppl.length > 0 && (
            <em className="basis-full pl-[17px] text-[11px] not-italic text-teal-bright">
              {`พบ: ${ppl.slice(0, 3).map((x) => ORG_PEOPLE[x.id]?.nick || x.label).join(', ')}${ppl.length > 3 ? ` +${ppl.length - 3}` : ''}`}
            </em>
          )}
        </label>
      );
    }).filter(Boolean);
    if (q && !chiefHit && !rows.length) return null;
    return (
      <div key={k}>
        <label className={`${rowCls} mt-1.5 text-[13px]`}>
          <ChiefCheckbox depts={ds} sel={sel} onChange={() => onToggleChief(k)} />
          <Dot color={BR[k].color} />
          <b>{k.toUpperCase()}</b>
          <Small>{`${ORG_PEOPLE[k]?.nick || ''}${BR[k].count ? ` · ${BR[k].count} คน` : ''}`}</Small>
        </label>
        {rows}
      </div>
    );
  }).filter(Boolean);

  // Nothing to say when people who can help are already listed above.
  if (!groups.length) return quietEmpty ? null : <EmptyState>ไม่พบแผนกหรือชื่อที่ค้นหา</EmptyState>;
  return <div>{groups}</div>;
}
