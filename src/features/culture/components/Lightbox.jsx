import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import CloseButton from '@/components/ui/CloseButton';
import useBodyLock from '@/hooks/useBodyLock';

/** Builds the downloadable SVG (gradient + white icon) for one placeholder photo. */
function photoSvgUrl(photo, iconEl) {
  const [c1, c2] = photo.g.split(',');
  let icon = '';
  if (iconEl) {
    const svg = iconEl.cloneNode(true);
    svg.removeAttribute('class');
    Object.entries({ x: 250, y: 170, width: 300, height: 300, stroke: '#fff', 'stroke-width': 1.4 })
      .forEach(([k, v]) => svg.setAttribute(k, v));
    icon = new XMLSerializer().serializeToString(svg);
  }
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${c1}'/><stop offset='1' stop-color='${c2}'/></linearGradient></defs><rect width='800' height='600' fill='url(#g)'/>${icon}</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

const FINE_POINTER = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const SWIPE_PX = 50;

const navCls = 'absolute top-1/2 z-[2] flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-[1.5px] border-white/50 bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/30 max-[600px]:h-9 max-[600px]:w-9';

/** One small photo in the strip under the big view. */
function Thumb({ photo, active, onPick }) {
  return (
    <button
      type="button"
      onClick={onPick}
      aria-current={active || undefined}
      className={`h-14 w-[76px] flex-none cursor-pointer overflow-hidden rounded-ctl border-2 p-0 transition-[opacity,border-color] duration-200 max-[600px]:h-11 max-[600px]:w-[60px] ${
        active ? 'border-teal-bright opacity-100' : 'border-transparent opacity-55 hover:opacity-90'
      }`}
    >
      {photo.src ? (
        <img src={photo.src} alt="" loading="lazy" draggable={false} className="block h-full w-full object-cover" />
      ) : (
        <span className="flex h-full w-full items-center justify-center text-[18px]" style={{ background: `linear-gradient(135deg,${photo.g})` }}>
          <photo.Icon className="lc text-white" strokeWidth={1.6} />
        </span>
      )}
    </button>
  );
}

/**
 * Full-screen photo viewer (`index` null = closed): ‹ › buttons, arrow keys, swipe on touch, and a strip of
 * small photos to jump to any other one without closing (mook 2026-10-30). Download: mint cursor ball on the
 * photo for mice, a mint button for touch.
 */
export default function Lightbox({ photos, name = 'terrabithia-photo', index, onClose, onNav, onPick }) {
  const imgRef = useRef(null);
  const stripRef = useRef(null);
  const touch = useRef(null);
  const open = index !== null;
  const photo = open ? photos[index] : null;
  const download = () => {
    const a = document.createElement('a');
    a.href = photo.src || photoSvgUrl(photo, imgRef.current?.querySelector('svg'));
    a.download = `${name}-${index + 1}.${photo.src ? 'jpg' : 'svg'}`;
    a.click();
  };

  useBodyLock(open);
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') onNav(-1);
      else if (e.key === 'ArrowRight') onNav(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose, onNav]);
  // Keep the current photo's thumbnail in view.
  useEffect(() => {
    stripRef.current?.children[index]?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }, [index]);

  const onTouchStart = (e) => { touch.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touch.current === null) return;
    const dx = e.changedTouches[0].clientX - touch.current;
    touch.current = null;
    if (Math.abs(dx) > SWIPE_PX) onNav(dx < 0 ? 1 : -1);
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[95] flex flex-col bg-[rgba(10,15,20,.9)] backdrop-blur-[3px]">
      <div className="flex flex-none items-center justify-between px-[18px] pb-1 pt-[14px]">
        <span className="text-[13px] font-semibold text-white/80" data-nt>{`${index + 1} / ${photos.length}`}</span>
        <CloseButton tone="float" onClick={onClose} />
      </div>

      <div
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="relative flex min-h-0 flex-1 items-center justify-center px-[84px] py-3 max-[600px]:px-3"
      >
        <button type="button" aria-label="รูปก่อนหน้า" onClick={() => onNav(-1)} className={`${navCls} left-[22px] max-[600px]:left-2`}>
          <ChevronLeft className="lc !h-[1.3em] !w-[1.3em]" />
        </button>
        {photo.src ? (
          <img
            key={photo.src}
            src={photo.src}
            alt=""
            draggable={false}
            onClick={() => { if (FINE_POINTER()) download(); }}
            data-cursor="ดาวน์โหลด"
            data-cursor-icon="download"
            className="lbx-in block max-h-full max-w-full rounded-ctl object-contain shadow-pop"
          />
        ) : (
          <div
            ref={imgRef}
            key={index}
            onClick={() => { if (FINE_POINTER()) download(); }}
            data-cursor="ดาวน์โหลด"
            data-cursor-icon="download"
            className="lbx-in flex aspect-[4/3] max-h-full w-[min(600px,100%)] items-center justify-center rounded-ctl text-[90px] shadow-pop"
            style={{ background: `linear-gradient(135deg,${photo.g})` }}
          >
            <photo.Icon className="lc text-white opacity-[.92]" strokeWidth={1.4} />
          </div>
        )}
        <button type="button" aria-label="รูปถัดไป" onClick={() => onNav(1)} className={`${navCls} right-[22px] max-[600px]:right-2`}>
          <ChevronRight className="lc !h-[1.3em] !w-[1.3em]" />
        </button>
      </div>

      <div className="flex flex-none flex-col items-center gap-3 pb-[max(14px,env(safe-area-inset-bottom))] pt-1">
        <button
          type="button"
          onClick={download}
          className="flex cursor-pointer items-center gap-2 rounded-ctl border-0 bg-teal-bright px-5 py-2.5 text-[14px] font-semibold text-white transition-colors duration-200 hover:!bg-teal-hover [@media(hover:hover)_and_(pointer:fine)]:hidden"
        >
          <Download className="lc !h-[18px] !w-[18px]" /> ดาวน์โหลด
        </button>
        <div ref={stripRef} className="flex max-w-full gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none]">
          {photos.map((p, i) => <Thumb key={i} photo={p} active={i === index} onPick={() => onPick(i)} />)}
        </div>
      </div>
    </div>
  );
}
