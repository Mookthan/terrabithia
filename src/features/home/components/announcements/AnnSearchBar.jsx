import { Search } from 'lucide-react';
import { FilterButton } from '@/components/ui/TextButton';

/** Keyword box + "ตัวกรอง" button (with the number of active filters). The panel itself is rendered by the parent. */
export default function AnnSearchBar({ filter, open, onToggle }) {
  const { f, active, setQ } = filter;
  return (
    <div className="flex min-w-0 flex-1 items-center gap-[10px] max-[640px]:order-3 max-[640px]:basis-full">
      <div className="flex min-w-0 flex-1 items-center gap-2.5 rounded-ctl bg-white pl-3.5 pr-2 text-muted shadow-card">
        <Search className="h-[18px] w-[18px] flex-none" aria-hidden="true" />
        <input
          value={f.q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="ค้นหาประกาศ"
          aria-label="ค้นหาประกาศ"
          autoComplete="off"
          className="w-full min-w-0 border-none bg-transparent py-3 text-[14px] text-ink outline-none placeholder:text-faint"
        />
      </div>
      <FilterButton open={open} count={active} onClick={(e) => { e.stopPropagation(); onToggle(); }} className="flex-none max-[640px]:px-1 max-[640px]:text-[13.5px]" />
    </div>
  );
}
