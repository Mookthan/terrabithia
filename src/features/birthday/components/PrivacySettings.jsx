import { ShieldCheck } from 'lucide-react';
import Switch from './Switch';

const ITEMS = [
  ['open', 'ให้เพื่อนส่งการ์ดวันเกิดถึงฉัน', 'ปิดได้ทุกเมื่อ เพื่อนจะไม่เห็นปุ่มเขียนการ์ดให้คุณ'],
  ['listed', 'แสดงวันเกิดของฉันในรายชื่อทั้งบริษัท', 'แสดงเฉพาะวันและเดือน ไม่แสดงปีเกิด'],
];

/** Birthday-book privacy toggles. */
export default function PrivacySettings({ settings, onToggle }) {
  return (
    <div className="mb-[22px] rounded-box bg-white px-[18px] py-4 shadow-pop">
      <div className="mb-[6px] flex items-center gap-2 text-[15px] text-ink">
        <ShieldCheck className="lc !h-[18px] !w-[18px] text-teal-bright" aria-hidden="true" />
        <b>ความเป็นส่วนตัวของสมุดวันเกิด</b>
      </div>
      {ITEMS.map(([k, title, desc], i) => (
        <button
          key={k}
          type="button"
          onClick={() => onToggle(k)}
          aria-pressed={settings[k]}
          className={`flex w-full cursor-pointer items-center gap-[14px] border-0 bg-transparent py-3 text-left text-ink ${i ? 'border-t border-solid border-line' : ''}`}
        >
          <span className="min-w-0 flex-1">
            <b className="block text-[14.5px] font-semibold">{title}</b>
            <small className="text-[12px] opacity-65">{desc}</small>
          </span>
          <Switch on={settings[k]} />
        </button>
      ))}
    </div>
  );
}
