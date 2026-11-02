import { ChevronLeft } from 'lucide-react';
import { OUTLINE_HOVER } from './TextButton';

/** The site's one "ย้อนกลับ" button: white pill-card with a left chevron. */
export default function BackButton({ onClick, className = '', style }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={style}
      className={`inline-flex cursor-pointer items-center gap-1 whitespace-nowrap rounded-ctl border border-line bg-white px-4 py-2 text-[13px] leading-[1.2] text-ink ${OUTLINE_HOVER} ${className}`}
    >
      <ChevronLeft className="lc !h-[1.05em] !w-[1.05em]" aria-hidden="true" /> ย้อนกลับ
    </button>
  );
}
