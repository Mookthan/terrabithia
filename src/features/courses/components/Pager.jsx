import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LAST_PAGE, PAGER } from '../data';

const BTN = 'h-[26px] w-[26px] rounded-ctl border-none text-[11px] font-semibold';

/** Static review pager (prototype: pages don't change the list). */
export default function Pager({ page, onPage }) {
  return (
    <div className="mb-[34px] mt-2 flex justify-end gap-1.5">
      <button type="button" aria-label="ก่อนหน้า" onClick={() => onPage(Math.max(1, page - 1))} className={`${BTN} bg-white text-ink`}>
        <ChevronLeft className="lc !h-[13px] !w-[13px] align-middle" />
      </button>
      {PAGER.map((p) => (p === '…'
        ? <span key="dots" className="self-center text-[11px] text-[#888]">…</span>
        : (
          <button
            key={p}
            type="button"
            onClick={() => onPage(p)}
            className={`${BTN} ${p === page ? 'bg-teal-bright text-white transition-colors duration-200 hover:!bg-teal-hover' : 'bg-white text-ink'}`}
          >
            {p}
          </button>
        )))}
      <button type="button" aria-label="ถัดไป" onClick={() => onPage(Math.min(LAST_PAGE, page + 1))} className={`${BTN} bg-white text-ink`}>
        <ChevronRight className="lc !h-[13px] !w-[13px] align-middle" />
      </button>
    </div>
  );
}
