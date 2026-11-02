import { useEffect, useRef } from 'react';
import { ORG_PEOPLE } from '@/data/org';
import { CAC_COLOR, MY_DEPT, orgKids, orgNode } from '../data';
import { cacSearchText } from '../hooks/useCacChart';
import EmptyState from '@/components/ui/EmptyState';

const row = 'flex cursor-pointer flex-wrap items-center gap-2 rounded-ctl p-[6px] text-[12.5px] hover:bg-teal-veil';
const Dot = () => <span className="h-[9px] w-[9px] flex-none rounded-full" style={{ background: CAC_COLOR }} />;

/** Department checklist of my team (CAC), narrowed by the search query. */
export default function CacFilterList({ query, sel, onToggleDept, onToggleAll }) {
  const q = query.trim().toLowerCase();
  const hit = (id) => cacSearchText(id, orgNode(id)?.label).includes(q);
  const depts = orgKids('cac');
  const nsel = depts.filter((d) => sel.has(d.id)).length;
  const allRef = useRef(null);
  useEffect(() => { if (allRef.current) allRef.current.indeterminate = nsel > 0 && nsel < depts.length; });

  const rows = depts.map((d) => {
    const ppl = orgKids(d.id).filter((x) => q && hit(x.id));
    if (q && !hit(d.id) && !hit('cac') && !ppl.length) return null;
    return (
      <label key={d.id} className={`${row} pl-7`}>
        <input type="checkbox" checked={sel.has(d.id)} onChange={() => onToggleDept(d.id)} />
        <Dot />
        <span>{d.label}</span>
        {d.id === MY_DEPT && <span className="rounded-ctl bg-[rgba(39,174,151,.14)] px-2 py-px text-[10.5px] text-teal-hover">แผนกของฉัน</span>}
        <small className="ml-auto text-[11px] text-muted">{`${d.count || 0} คน`}</small>
        {ppl.length > 0 && (
          <em className="basis-full pl-[17px] text-[11px] not-italic text-teal-bright">
            พบ: {ppl.slice(0, 3).map((x) => ORG_PEOPLE[x.id]?.nick || x.label).join(', ')}{ppl.length > 3 ? ` +${ppl.length - 3}` : ''}
          </em>
        )}
      </label>
    );
  }).filter(Boolean);

  if (q && !rows.length) return <EmptyState>ไม่พบแผนกหรือชื่อในทีมของคุณ</EmptyState>;
  return (
    <>
      <label className={`${row} mt-[6px] text-[13px]`}>
        <input ref={allRef} type="checkbox" checked={nsel === depts.length && depts.length > 0} onChange={onToggleAll} />
        <Dot />
        <b>CAC</b>
        <small className="ml-auto text-[11px] text-muted">ทีมของฉัน</small>
      </label>
      {rows}
    </>
  );
}

