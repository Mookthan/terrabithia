import { useState } from 'react';
import CheckMark from '@/components/ui/CheckMark';
import { FilterButton } from '@/components/ui/TextButton';
import { DEPTS } from '@/data/departments';
import { NEWS_LIKED, NEWS_SORTS } from '../data';
import { setLikedOnly, setSort, toggleAllDepts, toggleDept, useNewsState } from '../newsStore';
import '../news.css';
import DropPanel from '@/components/ui/DropPanel';

/** true, false or 'part' (some of the keys are ticked). */
function groupState(filter, keys) {
  const n = keys.filter((k) => filter[k]).length;
  if (n === 0) return false;
  return n === keys.length ? true : 'part';
}
const ALL_KEYS = DEPTS.flatMap((d) => [d.k, ...(d.c || []).map((ch) => ch.k)]);

function Row({ on, sub, onClick, children }) {
  return (
    <div
      role="checkbox"
      aria-checked={on === 'part' ? 'mixed' : !!on}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
      className={`flex cursor-pointer items-center gap-[9px] rounded-ctl px-1.5 py-[5px] text-ink hover:bg-teal-veil ${sub ? 'pl-[30px] text-[12.5px] font-normal' : 'text-[13px] font-semibold'}`}
    >
      <CheckMark state={on === 'part' ? 'part' : !!on} />
      {children}
    </div>
  );
}

/** Titled radio list; sits above the department checklist with a divider. */
function RadioGroup({ title, name, options, value, onChange }) {
  return (
    <div className="mb-1.5 border-b border-line pb-1.5" role="radiogroup" aria-label={title}>
      <div className="px-1.5 pb-1 text-[12px] font-bold text-ink">{title}</div>
      {options.map(([k, l]) => (
        <label key={k} className="flex cursor-pointer items-center gap-[9px] rounded-ctl px-1.5 py-[5px] text-[13px] text-ink hover:bg-teal-veil">
          <input type="radio" name={name} checked={value === k} onChange={() => onChange(k)} />{l}
        </label>
      ))}
    </div>
  );
}

/** "Filter" button with the sort choice, all / hearted news and the department checklist. */
export default function NewsFilter() {
  const [open, setOpen] = useState(false);
  const { filter, likedOnly, sort } = useNewsState();
  return (
    <div className="relative max-[640px]:flex-none">
      <FilterButton open={open} onClick={() => setOpen((o) => !o)} className="max-[640px]:px-1 max-[640px]:text-[13.5px]" />
      <DropPanel open={open} className="absolute right-0 top-[115%] z-30 min-w-[230px] text-left" innerClassName="max-h-[340px] overflow-y-auto p-2.5">
        {/* Sort and hearted sit first so they are seen without scrolling the long department list. */}
        <RadioGroup title="เรียงตาม" name="newsSort" options={NEWS_SORTS} value={sort} onChange={setSort} />
        <RadioGroup title="ข่าวที่ถูกใจ" name="newsLiked" options={NEWS_LIKED} value={likedOnly ? 'hearted' : 'all'} onChange={(k) => setLikedOnly(k === 'hearted')} />
        <Row on={groupState(filter, ALL_KEYS)} onClick={toggleAllDepts}>แผนกทั้งหมด</Row>
        {DEPTS.map((d) => (
          <div key={d.k}>
            <Row on={d.c ? groupState(filter, d.c.map((ch) => ch.k)) : filter[d.k]} onClick={() => toggleDept(d.k)}>{d.l}</Row>
            {(d.c || []).map((ch) => (
              <Row key={ch.k} sub on={filter[ch.k]} onClick={() => toggleDept(ch.k)}>{ch.l}</Row>
            ))}
          </div>
        ))}
      </DropPanel>
    </div>
  );
}
