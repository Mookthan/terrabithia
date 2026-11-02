import { useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft } from 'lucide-react';
import useTopEscape from '@/hooks/useTopEscape';
import { portalTarget } from '@/lib/portalTarget';

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Phone-only full-screen page that slides in over a popup and slides back out on "‹ ย้อนกลับ" / Esc
 * (mook 2026-10-29: on phones a second layer reads better than folding long content inside a small card;
 * desktop folds in place). Same 6px teal strip on top as the site header.
 */
export default function PhoneSheet({ title, onClose, children }) {
  const [leaving, setLeaving] = useState(false);
  const close = useCallback(() => (reduced() ? onClose() : setLeaving(true)), [onClose]);
  useTopEscape(close);
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className={`phone-sheet fixed inset-0 z-[2800] flex flex-col bg-white ${leaving ? 'is-leaving' : ''}`}
      onAnimationEnd={() => { if (leaving) onClose(); }}
    >
      <div className="h-1.5 flex-none bg-teal-bright" aria-hidden="true" />
      <div className="flex flex-none items-center gap-1 border-b border-line px-2 py-2">
        <button
          type="button"
          onClick={close}
          className="inline-flex cursor-pointer items-center gap-0.5 rounded-ctl border-0 bg-transparent px-2 py-2 text-[14px] font-semibold text-teal-bright transition-colors duration-200 hover:bg-teal-veil hover:text-teal-hover"
        >
          <ChevronLeft className="lc !h-5 !w-5" aria-hidden="true" />ย้อนกลับ
        </button>
        <b className="min-w-0 flex-1 truncate pr-3 text-right text-[14px] text-ink">{title}</b>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-[max(20px,env(safe-area-inset-bottom))] pt-4">{children}</div>
    </div>,
    portalTarget(),
  );
}
