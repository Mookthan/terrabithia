import { useMemo, useState } from 'react';
import { HR_GROUPS } from '@/data/hrGroups';
import { searchHr } from '../hrSearch';
import HrHomeButton from './HrHomeButton';
import HrRailGroup from './HrRailGroup';
import HrRailSearch from './HrRailSearch';

/**
 * Left navigation: a search box, HR announcements + the three knowledge groups. While a search is typed the
 * groups give way to the matching topics. Sticks under the header on desktop while the content scrolls (mook 2026-10-29).
 */
export default function HrRail({ sel, openGroup, onHome, onToggleGroup, onSelectItem }) {
  const [q, setQ] = useState('');
  const hits = useMemo(() => searchHr(q), [q]);
  const searching = q.trim() !== '';

  return (
    <aside className="bg-[#DDF7F0] pb-[68px] max-[860px]:pb-1.5 min-[861px]:sticky min-[861px]:top-[calc(var(--hh)-8px)] min-[861px]:max-h-[calc(100vh-var(--hh)+8px)] min-[861px]:overflow-y-auto">
      <HrRailSearch q={q} onQ={setQ} />
      {searching ? (
        <div className="hr-sres">
          {hits.length === 0 && <p className="px-[18px] py-2 text-[13px] text-muted">ไม่พบหัวข้อที่ตรงกับคำค้นหา</p>}
          {hits.map((h) => {
            const active = sel && sel.g === h.g && sel.i === h.i;
            return (
              <button
                key={`${h.g}:${h.i}`}
                type="button"
                onClick={() => onSelectItem(h.g, h.i)}
                className={`block w-full px-[18px] py-1.5 text-left transition-[background,color] duration-[.25s] ${
                  active ? 'bg-teal-bright text-white hover:!bg-teal-hover' : 'text-ink hover:bg-white/50'
                }`}
              >
                <span className="block text-[13px] font-semibold">{h.t}</span>
                <span className={`block text-[11.5px] ${active ? 'text-white/80' : 'text-muted'}`}>{h.group}</span>
              </button>
            );
          })}
        </div>
      ) : (
        <>
          <HrHomeButton active={!sel} onClick={onHome} />
          {HR_GROUPS.map((g) => (
            <HrRailGroup
              key={g.k}
              group={g}
              open={openGroup === g.k}
              activeIndex={sel && sel.g === g.k ? sel.i : -1}
              onToggle={() => onToggleGroup(g.k)}
              onSelect={(i) => onSelectItem(g.k, i)}
            />
          ))}
        </>
      )}
    </aside>
  );
}
