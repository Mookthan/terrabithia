import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import CloseButton from '@/components/ui/CloseButton';

const NAV = 'absolute top-1/2 h-11 w-11 -translate-y-1/2 cursor-pointer rounded-full border-0 bg-white/90 text-[26px] text-ink';

/** Full-screen photo viewer: ‹ › buttons, arrow keys, Escape or a tap outside closes it. */
export default function AnnLightbox({ photos, index, onIndex, onClose }) {
  const n = photos.length;
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') onIndex((index - 1 + n) % n);
      else if (e.key === 'ArrowRight') onIndex((index + 1) % n);
      else return;
      e.stopPropagation();
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [index, n, onIndex, onClose]);

  return createPortal(
    <div
      className="ann-fade fixed inset-0 z-[3200] flex items-center justify-center bg-[rgba(10,24,30,.88)] px-4 py-14"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <CloseButton tone="float" onClick={onClose} className="absolute right-[14px] top-[14px]" />
      <button type="button" onClick={() => onIndex((index - 1 + n) % n)} aria-label="ก่อนหน้า" className={`${NAV} left-3`}>‹</button>
      <img src={photos[index]} alt="" className="max-h-full max-w-[min(920px,100%)] rounded-ctl shadow-pop" />
      <button type="button" onClick={() => onIndex((index + 1) % n)} aria-label="ถัดไป" className={`${NAV} right-3`}>›</button>
      <span className="absolute bottom-[18px] left-1/2 -translate-x-1/2 text-[13px] font-semibold text-white">{index + 1} / {n}</span>
    </div>,
    document.body,
  );
}
