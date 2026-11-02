import { useCallback, useRef } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import useClickOutside from '@/hooks/useClickOutside';
import OrgFilterList from './OrgFilterList';
import OrgHelpers from './OrgHelpers';
import { findHelpers, useAllSkills } from '@/features/showcase/skills';
import DropPanel from '@/components/ui/DropPanel';

/**
 * Search box + fold-down department filter above the org chart.
 * Typing opens the panel and narrows the list; Enter (or a pause) highlights the first match in the chart.
 * A task or skill typed here ("ทำ dashboard") also lists people who can help with it, above the departments.
 */
export default function OrgSearchBar({
  fullscreen, query, onQuery, onSearch, open, setOpen, sel, onToggleDept, onToggleChief, onClear, onPerson,
}) {
  const ref = useRef(null);
  const close = useCallback(() => setOpen(false), [setOpen]);
  useClickOutside(ref, close, open);
  const toggle = (e) => { e.stopPropagation(); setOpen((o) => !o); };
  const q = query.trim().toLowerCase();
  useAllSkills(); // re-rank helpers when someone endorses
  const helpers = onPerson ? findHelpers(q) : [];

  return (
    <div
      ref={ref}
      className={`org-top relative flex flex-wrap content-start items-center ${
        fullscreen
          ? 'm-0 w-[calc(50%-40px)] py-3 pb-2.5 pl-3.5 pr-[70px] max-[640px]:w-[calc(100%-64px)] max-[640px]:pr-16'
          : 'mb-4 w-1/2 min-w-[300px] max-[640px]:w-full max-[640px]:min-w-0'
      }`}
    >
      <div
        className="flex min-w-0 flex-[0_0_100%] cursor-pointer items-center gap-2.5 rounded-ctl border border-[#d8d8d0] bg-white pl-3.5 pr-1 text-muted max-[640px]:gap-2 max-[640px]:rounded-ctl max-[640px]:pl-2.5"
        onClick={toggle}
      >
        <span className="flex"><Search className="lc !h-[18px] !w-[18px] max-[640px]:!hidden" /></span>
        <input
          className="w-full min-w-0 flex-1 cursor-pointer border-none bg-transparent py-3 text-sm text-ink outline-none placeholder:text-faint max-[640px]:py-2 max-[640px]:text-[13px]"
          placeholder="ค้นหาแผนก ชื่อ ตำแหน่ง หรือเรื่องที่อยากหาคนช่วย"
          value={query}
          autoComplete="off"
          onChange={(e) => { onQuery(e.target.value); setOpen(true); }}
          onKeyDown={(e) => { if (e.key === 'Enter') onSearch(); }}
        />
        <button
          type="button"
          className="inline-flex cursor-pointer items-center gap-1 whitespace-nowrap rounded-ctl border-0 bg-transparent px-2.5 py-2 text-sm leading-[1.2] text-teal-bright transition-[background-color,color] duration-200 hover:bg-teal-veil hover:!text-teal-hover"
          onClick={toggle}
          aria-label="ตัวกรอง"
          title="ตัวกรอง"
        >
          {sel.size > 0 && (
            <span className="mr-0.5 min-w-[18px] rounded-ctl bg-teal-bright px-1.5 py-px text-[11px] text-white">{String(sel.size)}</span>
          )}
          <ChevronDown className="lc org-fchev !block !h-[18px] !w-[18px] text-teal-bright transition-transform duration-300" />
        </button>
      </div>

      <DropPanel
        open={open}
        innerClassName="p-2.5"
        className={`org-fpanel absolute top-full z-[8] mt-1.5 ${
          fullscreen ? 'left-3.5 right-[70px] max-[640px]:right-16' : 'left-0 right-0'
        }`}
      >
            <div className="max-h-[min(58vh,440px)] overflow-auto">
              <OrgHelpers list={helpers} onPerson={(id) => { setOpen(false); onPerson(id); }} />
              <OrgFilterList q={q} quietEmpty={helpers.length > 0} sel={sel} onToggleDept={onToggleDept} onToggleChief={onToggleChief} />
            </div>
            <div className="mt-2 flex items-center justify-between gap-2 border-t border-line pt-2 text-[11.5px] text-muted">
              <span>{sel.size ? `เลือก ${sel.size} แผนก` : 'ยังไม่ได้เลือก (แสดงระดับแผนก)'}</span>
              <button
                type="button"
                className="cursor-pointer rounded-ctl border-0 bg-transparent px-2 py-[5px] text-[12.5px] text-teal-bright transition-colors duration-200 hover:bg-teal-veil hover:!text-teal-hover"
                onClick={onClear}
              >
                ล้างตัวกรอง
              </button>
          </div>
      </DropPanel>
    </div>
  );
}
