import { Flag } from 'lucide-react';
import { bdNick, REPORT_REASONS } from '../data';
import Sheet from './Sheet';

/** Pick a reason to report a card in my book to HR (the card is hidden too). */
export default function ReportModal({ card, onClose, onSend }) {
  return (
    <Sheet onClose={onClose} z={3100} width="w-[min(400px,100%)]">
      <div className="mb-[14px] mr-10 flex items-center gap-3">
        <span className="grid h-10 w-10 flex-none place-items-center rounded-ctl bg-[#FFE3EA] text-[#C2456B]">
          <Flag className="lc !h-5 !w-5" aria-hidden="true" />
        </span>
        <div>
          <b className="block text-[17px] text-ink">รายงานการ์ดใบนี้</b>
          <small className="block text-[12px] leading-[1.4] text-ink opacity-65">จาก {bdNick(card.by)} · ส่งให้ HR และซ่อนการ์ดไว้ ผู้เขียนจะไม่รู้ว่าถูกรายงาน</small>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {REPORT_REASONS.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => onSend(card.id)}
            className="cursor-pointer rounded-ctl border border-line bg-white px-[14px] py-[13px] text-left text-[14.5px] text-ink transition-[background,border-color] duration-200 hover:border-teal-bright hover:bg-mint"
          >
            {r}
          </button>
        ))}
      </div>
    </Sheet>
  );
}
