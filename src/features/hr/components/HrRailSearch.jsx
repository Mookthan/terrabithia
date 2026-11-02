import { Search, X } from 'lucide-react';

/** Search box at the top of the HR rail; filters topics by title and content. */
export default function HrRailSearch({ q, onQ }) {
  return (
    <div className="px-[14px] pb-2 pt-3">
      <label className="flex items-center gap-2 rounded-ctl border border-line bg-white px-3 text-muted transition-colors duration-200 focus-within:border-teal-bright">
        <Search className="h-4 w-4 flex-none" aria-hidden="true" />
        <input
          type="search"
          value={q}
          onChange={(e) => onQ(e.target.value)}
          placeholder="ค้นหาเรื่อง HR"
          aria-label="ค้นหาเรื่อง HR"
          autoComplete="off"
          className="w-full min-w-0 border-none bg-transparent py-2 text-[13px] text-ink outline-none placeholder:text-muted [&::-webkit-search-cancel-button]:hidden"
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
    </div>
  );
}
