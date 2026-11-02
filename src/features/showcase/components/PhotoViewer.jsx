import { createPortal } from 'react-dom';
import { portalTarget } from '@/lib/portalTarget';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useEscape from '@/hooks/useEscape';
import useBodyLock from '@/hooks/useBodyLock';
import AlbumPicture from './AlbumPicture';
import CloseButton from '@/components/ui/CloseButton';
import PhotoReact from './PhotoReact';

const navCls = 'absolute top-1/2 grid h-11 w-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full border-[1.5px] border-white/50 bg-white/15 text-white transition-colors hover:bg-white/30 max-[600px]:top-auto max-[600px]:bottom-6 max-[600px]:translate-y-0';

/** Full-screen view of one album photo with its caption; arrows and ← → keys step through. `owner` adds reactions. */
export default function PhotoViewer({ photos, index, onIndex, onClose, owner }) {
  useEscape(onClose);
  useBodyLock(true);
  const p = photos[index];
  const step = (d) => onIndex((index + d + photos.length) % photos.length);
  if (!p) return null;
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      onKeyDown={(e) => { if (e.key === 'ArrowLeft') step(-1); if (e.key === 'ArrowRight') step(1); }}
      ref={(el) => el?.focus()}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-[2200] flex flex-col items-center justify-center gap-3 bg-[rgba(10,15,20,.85)] p-4 outline-none backdrop-blur-[3px]"
    >
      <CloseButton tone="float" onClick={onClose} className="absolute right-[14px] top-[14px]" />
      <AlbumPicture photo={p} className={`rounded-box shadow-pop ${p.src ? 'max-h-[78vh] max-w-[min(900px,92vw)] object-contain' : 'h-[min(420px,60vh)] w-[min(600px,86vw)]'}`} iconClassName="!h-28 !w-28" />
      {p.cap && <div className="text-[14px] text-white">{p.cap}</div>}
      {owner && <PhotoReact owner={owner} photoId={p.id} />}
      <div className="text-[12px] text-white/70">{`${index + 1} / ${photos.length}`}</div>
      {photos.length > 1 && (
        <>
          <button type="button" aria-label="รูปก่อนหน้า" onClick={() => step(-1)} className={`${navCls} left-5`}><ChevronLeft className="lc" /></button>
          <button type="button" aria-label="รูปถัดไป" onClick={() => step(1)} className={`${navCls} right-5`}><ChevronRight className="lc" /></button>
        </>
      )}
    </div>,
    portalTarget(),
  );
}
