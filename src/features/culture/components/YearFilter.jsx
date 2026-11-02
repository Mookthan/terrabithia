import { useCallback, useRef, useState } from 'react';
import CheckMark from '@/components/ui/CheckMark';
import DropPanel from '@/components/ui/DropPanel';
import { FilterButton } from '@/components/ui/TextButton';
import useClickOutside from '@/hooks/useClickOutside';
import { ACTIVITY_YEARS } from '../data';

function Option({ on, onClick, children }) {
  return (
    <div
      role="radio"
      aria-checked={on}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
      className="flex cursor-pointer items-center gap-[9px] rounded-ctl px-1.5 py-[5px] text-[13px] font-semibold text-ink hover:bg-teal-veil"
    >
      <CheckMark state={on} />
      {children}
    </div>
  );
}

/** "ตัวกรอง ⌄" dropdown: all years or one Buddhist-era year (`year` null = all). */
export default function YearFilter({ year, onYear }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const close = useCallback(() => setOpen(false), []);
  useClickOutside(ref, close, open);
  const pick = (y) => { onYear(y); setOpen(false); };
  return (
    <div ref={ref} className="relative max-[640px]:flex-none">
      <FilterButton
        open={open}
        count={year ? 1 : 0}
        onClick={() => setOpen((o) => !o)}
        className="max-[640px]:px-1 max-[640px]:text-[13.5px]"
      />
      <DropPanel open={open} className="absolute right-0 top-[115%] z-30 min-w-[150px] text-left" innerClassName="p-2.5">
        <Option on={!year} onClick={() => pick(null)}>ทุกปี</Option>
        {ACTIVITY_YEARS.map((y) => <Option key={y} on={year === y} onClick={() => pick(y)}>{`ปี ${y}`}</Option>)}
      </DropPanel>
    </div>
  );
}
