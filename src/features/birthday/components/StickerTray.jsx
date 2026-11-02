import { MAX_STICKERS } from '../data';
import Accordion from './Accordion';
import AddButton from './AddButton';
import PhotoPicker from './PhotoPicker';
import StickerIcon from './StickerIcon';

/** "Decorate the card" section: stickers, Activity photos and Canva-style text, all placed on the inside paper. */
export default function StickerTray({ stickers, count, onAdd, onAddPhoto, onAddText, onClear }) {
  const full = count >= MAX_STICKERS;
  return (
    <Accordion
      title="ตกแต่งการ์ด"
      hint="ไม่บังคับ"
      extra={(
        <>
          {count > 0 && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onClear(); }}
              className="cursor-pointer rounded-ctl border-0 bg-transparent px-2 py-[3px] text-[12.5px] font-semibold text-[#12986F] hover:bg-teal-veil"
            >
              ลบทั้งหมด
            </button>
          )}
          <span className={`text-[12px] font-semibold ${full ? 'text-[#C2456B]' : 'opacity-60'}`}>{count}/{MAX_STICKERS}</span>
        </>
      )}
    >
      <div className="mb-2 grid grid-cols-[repeat(auto-fill,minmax(44px,1fr))] gap-[6px] p-[2px]">
        {stickers.map((e) => (
          <button
            key={e}
            type="button"
            disabled={full}
            onClick={() => onAdd(e)}
            aria-label="เพิ่มสติกเกอร์"
            className="aspect-square cursor-pointer rounded-ctl border-[1.5px] border-line bg-white p-0 text-[22px] transition-[transform,background] duration-200 enabled:hover:-translate-y-0.5 enabled:hover:-rotate-6 enabled:hover:bg-mint disabled:cursor-not-allowed disabled:opacity-[.35]"
          >
            <StickerIcon k={e} variant="plain" />
          </button>
        ))}
      </div>
      <PhotoPicker onAdd={onAddPhoto} />
      <AddButton
        icon="Aa"
        title="เพิ่มข้อความ"
        hint="แตะสองครั้งที่ข้อความเพื่อพิมพ์แก้ไข · ลากเพื่อย้าย · มุมขวาล่างเพื่อย่อ/ขยาย/หมุน"
        onClick={onAddText}
      />
    </Accordion>
  );
}
