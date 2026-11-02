const CTL = 'min-w-10 cursor-pointer rounded-ctl border border-line bg-white px-3 py-[6px] text-[13px] font-semibold text-ink transition-[background] duration-200 hover:bg-mint';

/** Size / rotate buttons for the selected sticker (dragging the corner handle does the same). */
export default function StickerOps({ onOp }) {
  return (
    <div className="bd-fade mt-[6px] flex flex-wrap gap-[6px]">
      <button type="button" className={CTL} onClick={() => onOp('-')} aria-label="ย่อ">−</button>
      <button type="button" className={CTL} onClick={() => onOp('+')} aria-label="ขยาย">+</button>
      <button type="button" className={CTL} onClick={() => onOp('l')} aria-label="หมุนซ้าย">↺</button>
      <button type="button" className={CTL} onClick={() => onOp('r')} aria-label="หมุนขวา">↻</button>
    </div>
  );
}
