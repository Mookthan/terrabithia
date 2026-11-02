import { useCallback, useRef, useState } from 'react';
import { Building2, ChevronDown, ListChecks, Search, Users, UsersRound } from 'lucide-react';
import DropPanel from '@/components/ui/DropPanel';
import useClickOutside from '@/hooks/useClickOutside';
import { OUTLINE_HOVER } from '@/components/ui/TextButton';
import { BRANCH_KEYS, orgDeptsOf } from '@/features/about/orgModel';
import OrgFilterList from '@/features/about/components/org/OrgFilterList';
import { VIS_OPTIONS, visLabel } from '../data';

export const VIS_ICONS = { dept: Users, branch: UsersRound, company: Building2, custom: ListChecks };
const rowCls = 'flex w-full cursor-pointer items-center gap-2.5 rounded-ctl border-0 bg-transparent px-2.5 py-2 text-left transition-colors hover:bg-teal-veil';
const QUICK = VIS_OPTIONS.filter((o) => o.k !== 'custom');

/** Picked department ids → stored ids: departments plus each division whose departments are all picked. */
function toIds(depts) {
  const whole = BRANCH_KEYS.filter((k) => orgDeptsOf(k).every((d) => depts.has(d)));
  return [...whole, ...depts];
}

/**
 * Button + dropdown for who can see the album: quick choices (team / division / company), then the
 * org chart's searchable division → department checklist. Ticking departments switches to `custom`;
 * clearing them all falls back to the whole company. On phones the panel spans the parent row (positioned).
 */
export default function VisibilityPicker({ vis, onChange }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const wrapRef = useRef(null);
  const close = useCallback(() => setOpen(false), []);
  useClickOutside(wrapRef, close, open);
  const Icon = VIS_ICONS[vis.k];
  const sel = new Set(vis.k === 'custom' ? vis.ids.filter((i) => !BRANCH_KEYS.includes(i)) : []);

  const pick = (depts) => onChange(depts.size ? { k: 'custom', ids: toIds(depts) } : { k: 'company', ids: [] });
  const toggleDept = (d) => { const next = new Set(sel); if (!next.delete(d)) next.add(d); pick(next); };
  const toggleChief = (k) => {
    const ds = orgDeptsOf(k);
    const all = ds.every((d) => sel.has(d));
    const next = new Set(sel);
    ds.forEach((d) => (all ? next.delete(d) : next.add(d)));
    pick(next);
  };

  return (
    <div ref={wrapRef} className="relative max-[640px]:static">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex cursor-pointer items-center gap-2 rounded-ctl border border-line bg-white px-3 py-2 text-[13px] font-semibold text-ink ${OUTLINE_HOVER}`}
      >
        <Icon className="lc !h-4 !w-4" aria-hidden="true" />{visLabel(vis)}<ChevronDown className={`lc !h-4 !w-4 text-teal-bright transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      <DropPanel open={open} className="absolute left-0 top-[calc(100%+6px)] z-40 w-[340px] max-[640px]:right-0 max-[640px]:w-auto" innerClassName="p-2.5">
        <div className="px-1.5 pb-1 text-[12px] font-semibold text-muted">ใครเห็นอัลบั้มนี้ได้บ้าง</div>
        {QUICK.map((o) => {
          const I = VIS_ICONS[o.k];
          const on = vis.k === o.k;
          return (
            <button key={o.k} type="button" role="menuitemradio" aria-checked={on} className={rowCls} onClick={() => { onChange({ k: o.k, ids: [] }); close(); }}>
              <I className={`lc !h-4 !w-4 flex-none ${on ? 'text-teal-bright' : 'text-muted'}`} aria-hidden="true" />
              <span className={`text-[13px] ${on ? 'font-bold text-teal-bright' : 'text-ink'}`}>{o.l}</span>
              <span className="ml-auto text-[11px] text-muted">{o.d}</span>
            </button>
          );
        })}

        <div className="mt-1.5 border-t border-line pt-2.5">
          <div className={`mb-1.5 px-1.5 text-[12px] font-semibold ${vis.k === 'custom' ? 'text-teal-bright' : 'text-muted'}`}>หรือเลือกทีมหรือฝ่าย</div>
          <div className="flex items-center gap-2 rounded-ctl border border-[#d8d8d0] bg-white px-3 text-muted">
            <Search className="lc !h-4 !w-4 flex-none" aria-hidden="true" />
            <input
              className="w-full min-w-0 border-none bg-transparent py-2 text-[13px] text-ink outline-none placeholder:text-faint"
              placeholder="ค้นหาแผนก ทีม หรือชื่อ"
              value={q}
              autoComplete="off"
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <div className="mt-1 max-h-[min(42vh,300px)] overflow-auto">
            <OrgFilterList q={q.trim().toLowerCase()} sel={sel} onToggleDept={toggleDept} onToggleChief={toggleChief} />
          </div>
          <div className="mt-2 flex items-center justify-between gap-2 border-t border-line pt-2 text-[11.5px] text-muted">
            <span>{sel.size ? `เลือก ${sel.size} แผนก` : 'ยังไม่ได้เลือก'}</span>
            {sel.size > 0 && (
              <button type="button" className="cursor-pointer rounded-ctl border-0 bg-transparent px-2 py-[5px] text-[12.5px] text-teal-bright transition-colors duration-200 hover:bg-teal-veil hover:!text-teal-hover" onClick={() => pick(new Set())}>
                ล้างที่เลือก
              </button>
            )}
          </div>
        </div>
      </DropPanel>
    </div>
  );
}
