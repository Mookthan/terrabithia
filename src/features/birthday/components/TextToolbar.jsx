import { Pencil } from 'lucide-react';
import { BD_FONTS, BD_TXTCOL } from '../data';

const BTN = 'h-9 min-w-9 cursor-pointer rounded-ctl border border-[#DCE6E3] bg-white px-2 text-[15px] font-semibold text-ink hover:bg-mint';
const ON = '!border-teal-bright !bg-[#CFEFE7] !text-[#0E5E52]';

/** Canva-style toolbar for the selected text: font, bold, italic, size, edit, colour. */
export default function TextToolbar({ s, onStyle, onOp, onEdit }) {
  return (
    <div className="bd-fade mt-[10px] flex flex-col gap-2 rounded-box border border-[#DCE6E3] bg-white p-2 shadow-pop">
      <div className="flex flex-wrap items-center gap-[6px]">
        <select
          value={s.ff || ''}
          onChange={(e) => onStyle('ff', e.target.value)}
          aria-label="ฟอนต์"
          className="h-9 min-w-0 flex-[1_1_130px] rounded-ctl border border-[#DCE6E3] bg-white px-2 text-[13.5px] text-ink"
        >
          {BD_FONTS.map(([v, label]) => <option key={label} value={v}>{label}</option>)}
        </select>
        <button type="button" onClick={() => onStyle('b')} aria-label="ตัวหนา" aria-pressed={s.b !== 0} className={`${BTN} ${s.b !== 0 ? ON : ''}`}><b>B</b></button>
        <button type="button" onClick={() => onStyle('i')} aria-label="ตัวเอียง" aria-pressed={!!s.i} className={`${BTN} ${s.i ? ON : ''}`}><i>I</i></button>
        <span className="inline-flex items-center gap-[2px]">
          <button type="button" onClick={() => onOp('-')} aria-label="ย่อ" className={BTN}>−</button>
          <em className="min-w-[42px] text-center text-[12.5px] not-italic text-ink">{Math.round(s.s * 100)}%</em>
          <button type="button" onClick={() => onOp('+')} aria-label="ขยาย" className={BTN}>+</button>
        </span>
        <button type="button" onClick={onEdit} aria-label="แก้ข้อความ" className={`${BTN} grid place-items-center`}><Pencil className="h-4 w-4" aria-hidden="true" /></button>
      </div>
      <div className="flex flex-wrap items-center gap-[7px]">
        {BD_TXTCOL.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => onStyle('c', c)}
            aria-label={`สีข้อความ ${c}`}
            aria-pressed={s.c === c}
            className={`h-[26px] w-[26px] cursor-pointer rounded-full border-2 border-white p-0 ${s.c === c ? 'shadow-[0_0_0_2.5px_#BEE8DD]' : 'shadow-[0_0_0_1px_#C9D4D1]'}`}
            style={{ background: c }}
          />
        ))}
      </div>
    </div>
  );
}
