import { Check, Lock } from 'lucide-react';
import { bdDept, bdNick, daysUntil, ME_ID } from '../data';
import { occOf } from '../occasions';
import Avatar from './Avatar';

/**
 * One person in the home card box: write a card to a friend (birthday or festival),
 * or peek at my own sealed book.
 */
export default function BirthdayRow({ id, book, cardsOpen, onOpen }) {
  const o = occOf(book.occ);
  const birthday = o.k === 'birthday';
  const d = book.due ? daysUntil(book) : 0;
  const me = book.owner === ME_ID;
  const n = book.cards.length;
  const sent = !me && book.cards.some((c) => c.by === ME_ID);
  const when = d === 0 ? 'วันนี้' : `อีก ${d} วัน`;
  const dept = bdDept(book.owner);
  const sentTxt = sent ? 'คุณส่งการ์ดแล้ว' : `เพื่อนส่งแล้ว ${n} ใบ`;

  let sub;
  if (birthday) {
    sub = me
      ? (cardsOpen ? `เปิดได้เช้าวันเกิด ${book.dateTxt} · การ์ดรอ ${n} ใบ` : 'ตอนนี้ปิดรับการ์ดจากเพื่อน')
      : `${dept} · ${book.dateTxt} · ${sentTxt}`;
  } else if (me) {
    sub = `เปิดได้วันที่ ${book.dateTxt} · การ์ดรอ ${n} ใบ`;
  } else {
    sub = `${dept}${book.note ? ` · ${book.note}` : ''} · ${sentTxt}`;
  }

  let badge = birthday ? when : 'ส่งการ์ด';
  if (me) badge = <><Lock className="lc !h-[13px] !w-[13px] ![vertical-align:-2px]" aria-hidden="true" /> {when}</>;
  else if (sent) badge = <><Check className="lc !h-[13px] !w-[13px] ![vertical-align:-2px]" aria-hidden="true" /> ส่งแล้ว</>;
  else if (birthday && d === 0) badge = 'ส่งการ์ด';
  const hot = !me && !sent && birthday && d === 0;

  return (
    <button
      type="button"
      onClick={() => onOpen(id)}
      className={`flex w-full cursor-pointer items-center gap-3 rounded-box border border-[rgba(23,63,82,.08)] px-3 py-[10px] text-left text-ink transition-[transform,box-shadow,background] duration-200 hover:-translate-y-0.5 hover:bg-[#fffdf8] hover:shadow-pop ${
        me ? 'border-dashed bg-[#F7F4EC]' : 'bg-white'
      }`}
    >
      <Avatar id={book.owner} className="h-11 w-11" />
      <span className="flex min-w-0 flex-1 flex-col">
        <b className="text-[15px]">{me ? (birthday ? 'สมุดวันเกิดของคุณ' : `สมุดการ์ด${o.tab}ของคุณ`) : bdNick(book.owner)}</b>
        <small className="overflow-hidden text-ellipsis whitespace-nowrap text-[12px] opacity-65 max-[640px]:whitespace-normal">{sub}</small>
      </span>
      <span className={`flex-none rounded-full px-3 py-[6px] text-[12.5px] font-semibold ${sent ? 'bg-mint text-teal-bright' : hot ? 'bg-teal-bright text-white' : 'bg-[#EDEBE3] text-ink'}`}>
        {badge}
      </span>
    </button>
  );
}
