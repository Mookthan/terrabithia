import CloseButton from '@/components/ui/CloseButton';

/**
 * Dimmed backdrop + white dialog sheet (bottom sheet on phones). Clicking the backdrop closes it.
 * The close button stays put while only the body scrolls. `flush` drops the body's top padding so a
 * sticky header can sit flush with the top edge; `maxH` / `width` size the sheet.
 */
export default function Sheet({
  onClose, children, z = 3000, width = 'w-[min(520px,100%)]', maxH = 'max-h-[min(92dvh,760px)]', flush = false,
}) {
  return (
    <div
      className="bd-fade fixed inset-0 text-[14px] flex items-center justify-center bg-[rgba(14,40,36,.45)] p-5 backdrop-blur-[3px] max-[640px]:items-end max-[640px]:p-0"
      style={{ zIndex: z }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        role="dialog"
        aria-modal="true"
        className={`bd-sheet relative flex flex-col overflow-hidden rounded-box bg-white shadow-pop max-[640px]:max-h-[92dvh] max-[640px]:rounded-b-none ${maxH} ${width}`}
      >
        <CloseButton onClick={onClose} className="absolute right-3 top-3 z-[6]" />
        <div
          className={`min-h-0 flex-1 overflow-auto overscroll-contain px-[22px] pb-6 max-[640px]:px-4 max-[640px]:pb-[calc(22px+env(safe-area-inset-bottom))] ${flush ? '' : 'pt-[22px] max-[640px]:pt-5'}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
