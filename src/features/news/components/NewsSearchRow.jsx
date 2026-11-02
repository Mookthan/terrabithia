import { Search, X } from 'lucide-react';
import NewsFilter from './NewsFilter';

/** Keyword search box + department filter. */
export default function NewsSearchRow({ q, onQ }) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-3 max-[640px]:flex-nowrap max-[640px]:gap-[10px]">
      <label className="flex min-w-[220px] flex-1 items-center gap-2.5 rounded-ctl border border-line bg-white px-4 text-muted transition-colors duration-200 focus-within:border-teal-bright max-[640px]:min-w-0 max-[640px]:px-3">
        <Search className="h-[18px] w-[18px] flex-none" aria-hidden="true" />
        <input
          type="search"
          value={q}
          onChange={(e) => onQ(e.target.value)}
          placeholder="ค้นหาข่าวสารบริษัทและกิจกรรมล่าสุด"
          aria-label="ค้นหาข่าว"
          autoComplete="off"
          className="w-full min-w-0 border-none bg-transparent py-[11px] text-[13.5px] text-ink outline-none placeholder:text-muted max-[640px]:py-2 max-[640px]:text-[13px] [&::-webkit-search-cancel-button]:hidden"
        />
        {q && (
          <button
            type="button"
            onClick={() => onQ('')}
            aria-label="ล้างคำค้นหา"
            className="grid h-6 w-6 flex-none cursor-pointer place-items-center rounded-full border-0 bg-transparent text-muted hover:bg-teal-veil hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </label>
      <NewsFilter />
    </div>
  );
}
