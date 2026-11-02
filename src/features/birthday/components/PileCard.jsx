import { EyeOff, Flag } from 'lucide-react';
import { bdDept, bdNick } from '../data';
import BirthdayCard from './BirthdayCard';

const ACT = 'inline-flex cursor-pointer items-center gap-[5px] rounded-ctl border-0 bg-white px-3 py-[5px] text-[12px] font-semibold text-ink shadow-card transition-[background] duration-200 hover:bg-mint';

/** Placeholder the owner sees for a card they hid. */
function HiddenCard({ card, onShow }) {
  return (
    <div className="flex min-h-[170px] flex-col items-center justify-center gap-1 rounded-box border-2 border-dashed border-[rgba(120,90,40,.4)] bg-[#FFFDF7]/70 p-5 text-center text-ink">
      <EyeOff className="lc mb-1 !h-5 !w-5 opacity-70" aria-hidden="true" />
      <b>ซ่อนการ์ดใบนี้ไว้แล้ว</b>
      <small className="text-[12px] opacity-70">{card.reported ? 'ส่งให้ HR ตรวจสอบแล้ว · ' : ''}คนเขียนจะไม่รู้ว่าถูกซ่อน</small>
      {!card.reported && <button type="button" onClick={onShow} className={`${ACT} mt-2 text-teal-bright`}>แสดงอีกครั้ง</button>}
    </div>
  );
}

/**
 * One card lying on the pile in the owner's book: slightly tilted and overlapping its neighbours.
 * A red dot marks a card not read yet; tapping a card opens it in the reader. The owner can hide or report it.
 */
export default function PileCard({ card, index, owner, archive, clamp, onOpen, onHide, onReport }) {
  const tilt = (((index * 47) % 9) - 4) * 1.1;
  const dept = bdDept(card.by);
  const line = `จาก ${bdNick(card.by)}${dept ? ` · ${dept}` : ''}${card.date ? ` · ${card.date}` : ''}`;

  return (
    <div
      onClick={card.hidden ? undefined : onOpen}
      className="bd-pile group relative"
      style={{ '--i': index, '--rt': `${tilt}deg`, '--z': index + 1 }}
    >
      {!archive && !card.hidden && !card.read && (
        <i className="absolute -top-[6px] right-2 z-[8] h-4 w-4 rounded-full border-[2.5px] border-solid border-white bg-[#F0515B] shadow-card" aria-label="ยังไม่ได้อ่าน" />
      )}
      {card.hidden ? <HiddenCard card={card} onShow={onHide} /> : <BirthdayCard card={card} owner={owner} line={line} clamp={clamp} />}
      {!archive && !card.hidden && (
        <div className="absolute -bottom-3 right-3 z-[7] flex gap-[6px] opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100 [@media(hover:none)]:opacity-100">
          <button type="button" onClick={(e) => { e.stopPropagation(); onHide(); }} className={ACT}><EyeOff className="lc !h-[13px] !w-[13px]" aria-hidden="true" /> ซ่อน</button>
          <button type="button" onClick={(e) => { e.stopPropagation(); onReport(); }} className={ACT}><Flag className="lc !h-[13px] !w-[13px]" aria-hidden="true" /> รายงาน HR</button>
        </div>
      )}
    </div>
  );
}
