import { ChevronRight, History } from 'lucide-react';

/** Green "วันนี้ในอดีต ›" link in the today card; opens the memories popup (mook 2026-10-29: link only, no photos). */
export default function MemoryStack({ items, onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`ดูวันนี้ในอดีต ${items.length} เรื่อง`}
      className="group flex flex-none cursor-pointer items-center gap-1 rounded-ctl border-0 bg-transparent px-2 py-1.5 text-[13px] font-semibold text-teal-bright transition-colors duration-200 hover:bg-teal-veil hover:text-teal-hover"
    >
      <History className="lc !h-[15px] !w-[15px]" aria-hidden="true" />
      วันนี้ในอดีต
      <ChevronRight className="lc !h-[15px] !w-[15px]" aria-hidden="true" />
    </button>
  );
}
