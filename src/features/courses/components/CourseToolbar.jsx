import { useCallback, useRef } from 'react';
import { Search } from 'lucide-react';
import { FilterButton } from '@/components/ui/TextButton';
import useClickOutside from '@/hooks/useClickOutside';
import { FILTER_OPTIONS } from '../data';
import '../courses.css';
import DropPanel from '@/components/ui/DropPanel';

/**
 * Search box + filter dropdown above a course list; `wide` spans the catalogue grid instead of the 900px table.
 * Without `children` the dropdown is the single course-type list; with them it shows that panel instead.
 */
export default function CourseToolbar({ placeholder, query, onQuery, filter, onFilter, open, onOpenChange, wide = false, count = 0, children }) {
  const wrapRef = useRef(null);
  const close = useCallback(() => onOpenChange(false), [onOpenChange]);
  useClickOutside(wrapRef, close, open);

  return (
    <div className={`mx-auto mb-6 flex ${wide ? '' : 'max-w-[900px]'} items-center gap-4 max-[640px]:mb-4 max-[640px]:flex-nowrap max-[640px]:gap-2.5`}>
      <div className="flex min-w-[200px] flex-1 items-center gap-2.5 rounded-ctl border border-[#d8d8d0] bg-white px-3.5 text-muted max-[640px]:min-w-0 max-[640px]:flex-[1_1_0] max-[640px]:gap-2 max-[640px]:rounded-ctl max-[640px]:px-2.5">
        <Search className="lc max-[640px]:!h-4 max-[640px]:!w-4" />
        <input
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder={placeholder}
          className="flex-1 border-none bg-transparent py-3 text-[14px] text-ink outline-none placeholder:text-faint max-[640px]:w-full max-[640px]:min-w-0 max-[640px]:py-2 max-[640px]:text-[13px]"
        />
      </div>
      <div ref={wrapRef} className="relative max-[640px]:flex-none">
        <FilterButton open={open} count={count} onClick={() => onOpenChange(!open)} className="max-[640px]:px-1 max-[640px]:text-[13.5px]" />
        <DropPanel open={open} className="absolute right-0 top-[calc(100%+6px)] z-40 min-w-[170px]" innerClassName="p-1.5">
          {children ?? FILTER_OPTIONS.map(([k, label]) => (
            <button
              key={k}
              type="button"
              onClick={() => { onFilter(k); onOpenChange(false); }}
              className={`block w-full rounded-ctl px-3 py-[9px] text-left text-[13px] transition-colors hover:bg-teal-veil ${filter === k ? 'font-bold text-teal-bright' : 'text-ink'}`}
            >
              {label}
            </button>
          ))}
        </DropPanel>
      </div>
    </div>
  );
}
