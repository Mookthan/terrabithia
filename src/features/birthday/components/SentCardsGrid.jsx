import { bdNick } from '../data';
import { occOf } from '../occasions';
import CardFlip from './CardFlip';

/** Cards I sent to friends (only I and the recipient can see them); tap one to open it, or edit it. */
export default function SentCardsGrid({ items, onEdit }) {
  if (!items.length) {
    return (
      <div className="px-[10px] py-[50px] text-center text-ink opacity-60">
        ยังไม่ได้ส่งการ์ดให้ใคร<br />กดชื่อเพื่อนในกล่องส่งการ์ดถึงเพื่อนหน้าแรกเพื่อเริ่มได้เลย
      </div>
    );
  }
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-[18px] max-[640px]:grid-cols-1">
      {items.map(({ k, c, owner, occ }) => (
        <div key={k} data-reveal className="flex flex-col gap-2">
          <CardFlip card={c} owner={owner} line={`ถึง ${bdNick(owner)} · ${occOf(occ).tab} · ${c.date}`} className="transition-transform duration-[250ms] hover:-translate-y-1 hover:-rotate-[.6deg]" />
          <button
            type="button"
            onClick={() => onEdit(k)}
            className="cursor-pointer self-start rounded-ctl border border-teal-bright bg-white px-[14px] py-[6px] text-[12.5px] font-semibold text-teal-bright hover:bg-mint"
          >
            แก้ไขการ์ดที่ส่งให้{bdNick(owner)}
          </button>
        </div>
      ))}
    </div>
  );
}
