import { STICKER_IMG, STKCOL, stickerKey } from '../data';
import ThemeIcon from './ThemeIcon';

const VARIANTS = {
  /** White rounded chip with a soft outline (stickers on a card). */
  chip: 'bg-white p-[.16em] shadow-[0_0_0_.05em_#fff,0_.06em_.14em_rgba(0,0,0,.28)]',
  /** Same chip, slightly tighter (the card's corner sticker). */
  corner: 'bg-white p-[.15em] shadow-[0_0_0_.05em_#fff,0_.06em_.14em_rgba(0,0,0,.28)]',
  /** Bare coloured icon (pickers). */
  plain: 'p-0 text-[24px]',
};

/** A sticker: a coloured Lucide icon, or a picture sticker (Terby). Size follows the parent font-size. */
export default function StickerIcon({ k, variant = 'chip' }) {
  const img = STICKER_IMG[k];
  if (img) {
    return (
      <span className="inline-grid place-items-center leading-[0]">
        <img src={img} alt="Terby" draggable="false" className={`pointer-events-none block w-auto max-w-[2.4em] object-contain ${variant === 'plain' ? 'h-7' : 'h-[1.5em]'}`} />
      </span>
    );
  }
  const key = stickerKey(k);
  return (
    <span className={`inline-grid place-items-center rounded-[32%] leading-[0] ${VARIANTS[variant]}`} style={{ color: STKCOL[key] || '#27AE97' }}>
      <ThemeIcon k={key} strokeWidth={2.1} className="!h-[.82em] !w-[.82em]" />
    </span>
  );
}
