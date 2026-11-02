import { CalendarClock } from 'lucide-react';
import { TEXT_BTN } from '@/components/ui/TextButton';

const TH_MON = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
const thDate = (d) => `${d.getDate()} ${TH_MON[d.getMonth()]} ${d.getFullYear() + 543}`;

/** Sub-tabs inside "เทศกาล": one chip per festival in season. */
export function FestivalChips({ list, value, onChange }) {
  return (
    <div className="mt-3 flex flex-wrap gap-1.5" role="tablist">
      {list.map((o) => (
        <button
          key={o.k}
          type="button"
          role="tab"
          aria-selected={value === o.k}
          onClick={() => onChange(o.k)}
          className={`cursor-pointer rounded-ctl border px-3 py-[5px] text-[13px] font-semibold transition-colors duration-200 ${
            value === o.k ? 'border-teal-bright bg-teal-bright text-white' : 'border-line bg-white text-ink hover:bg-teal-veil'
          }`}
        >
          {o.tab}
          <span className={`ml-1.5 text-[11.5px] font-medium ${value === o.k ? 'text-white/85' : 'text-muted'}`}>{o.dateTxt}</span>
        </button>
      ))}
    </div>
  );
}

/** Shown in "เทศกาล" when no festival is in season: which one opens next, plus a demo preview for the prototype. */
export function FestivalEmpty({ next, onDemo }) {
  return (
    <div className="flex flex-col items-center px-2 py-[18px] text-center text-[13px] text-muted">
      <CalendarClock className="lc mb-1.5 !h-[22px] !w-[22px]" aria-hidden="true" />
      <div className="font-semibold text-ink">ตอนนี้ยังไม่อยู่ในช่วงเทศกาล</div>
      {next && <div className="mt-0.5">{`${next.o.tab} เปิดส่งการ์ดวันที่ ${thDate(next.opens)}`}</div>}
      <button type="button" className={`${TEXT_BTN} mt-1`} onClick={onDemo}>ดูตัวอย่าง</button>
    </div>
  );
}
