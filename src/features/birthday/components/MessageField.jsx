import { ShieldCheck } from 'lucide-react';
import { MSG_MAX } from '../data';
import SectionLabel from './SectionLabel';

const short = (q) => (q.length > 22 ? `${q.slice(0, 22)}…` : q);

/** Quick-message chips, the message textarea with counter, and the safety note. */
export default function MessageField({ value, onChange, toNick, quick, reveal }) {
  return (
    <>
      <SectionLabel>ข้อความ</SectionLabel>
      <div className="mb-2 flex flex-wrap gap-[6px]">
        {quick.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => onChange(q)}
            className="cursor-pointer rounded-ctl border border-line bg-white px-3 py-[6px] text-[12.5px] text-ink transition-[background,border-color] duration-200 hover:bg-mint"
          >
            {short(q)}
          </button>
        ))}
      </div>
      <textarea
        maxLength={MSG_MAX}
        placeholder={`เขียนข้อความถึง${toNick}...`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block min-h-[78px] w-full resize-none rounded-ctl border border-line bg-white px-3 py-[10px] text-[14px] text-ink outline-none placeholder:text-faint focus:border-teal-bright focus:shadow-[0_0_0_3px_rgba(39,174,151,.15)]"
      />
      <div className="mt-[2px] text-right text-[11.5px] text-ink opacity-50">{value.length}/{MSG_MAX}</div>
      <div className="mt-2 flex items-start gap-2 text-[12px] leading-[1.5] text-ink opacity-70">
        <ShieldCheck className="lc mt-[2px] !h-[15px] !w-[15px] flex-none text-teal-bright" aria-hidden="true" />
        <span>{`ส่งแบบส่วนตัว: เห็นเฉพาะ${toNick} ${reveal} เพื่อนคนอื่นมองไม่เห็นการ์ดของคุณ · แสดงชื่อและแผนกของคุณเสมอ · ไม่แนบรูปหรือลิงก์`}</span>
      </div>
    </>
  );
}
