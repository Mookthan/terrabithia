import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { SKILL_LIMIT, SKILL_MAX, SKILL_SUGGESTIONS } from '../skills';
import OrgToggle from './OrgToggle';

const INPUT = 'min-w-0 flex-1 rounded-ctl border border-[#d8d8d0] bg-white px-2.5 py-[6px] text-[12.5px] text-ink outline-none focus:border-teal-bright focus:shadow-[0_0_0_3px_rgba(39,174,151,.15)]';
const ADD_CHIP = 'inline-flex cursor-pointer items-center gap-1 rounded-ctl border border-line bg-white px-2.5 py-1 text-[12px] font-semibold text-ink transition-colors duration-200 hover:bg-teal-soft';

/** Edit my skills in the personal box: type one and press Enter (or เพิ่ม), or tap a suggestion; up to SKILL_LIMIT. `shown`/`onShow` = the Org Chart switch. */
export default function SkillsEditor({ list, onChange, shown = true, onShow }) {
  const [text, setText] = useState('');
  const full = list.length >= SKILL_LIMIT;
  const has = (s) => list.some((x) => x.toLowerCase() === s.toLowerCase());
  const add = (s) => {
    const v = s.trim();
    if (!v || full || has(v)) return;
    onChange([...list, v]);
    setText('');
  };
  const ideas = full ? [] : SKILL_SUGGESTIONS.filter((s) => !has(s));

  return (
    <div className="mt-4 border-t border-line pt-4">
      <div className="mb-1 flex items-center justify-between gap-2 text-[14px] font-bold text-ink">ความถนัด{onShow && <OrgToggle on={shown} onChange={onShow} />}</div>
      <p className="m-0 mb-2.5 text-[11.5px] text-muted">{shown ? `ใส่ได้สูงสุด ${SKILL_LIMIT} อย่าง เพื่อนกดรับรองให้ได้ และใช้ค้นหาคนช่วยงานในผังองค์กร` : 'ซ่อนอยู่: เพื่อนจะไม่เห็นความถนัดของคุณ และการค้นหาคนช่วยงานจะดูจาก JD ของคุณแทน'}</p>
      {list.length > 0 && (
        <ul className="m-0 mb-2.5 flex list-none flex-wrap gap-1.5 p-0">
          {list.map((s) => (
            <li key={s} className="inline-flex items-center gap-1 rounded-ctl border border-teal-bright bg-teal-soft py-1 pl-2.5 pr-1 text-[12.5px] font-semibold text-teal-hover">
              {s}
              <button type="button" aria-label={`ลบ ${s}`} onClick={() => onChange(list.filter((x) => x !== s))} className="inline-grid h-5 w-5 cursor-pointer place-items-center rounded-full border-0 bg-transparent p-0 text-teal-hover transition-colors hover:bg-teal-veil">
                <X className="lc !h-3.5 !w-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
      {!full && (
        <div className="mb-2.5 flex items-center gap-2">
          <input
            value={text}
            maxLength={SKILL_MAX}
            placeholder="เช่น Excel, ตัดต่อวิดีโอ, ภาษาญี่ปุ่น"
            aria-label="เพิ่มความถนัด"
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); add(text); } }}
            className={INPUT}
          />
          <button type="button" disabled={!text.trim()} onClick={() => add(text)} className="cursor-pointer rounded-ctl border-0 bg-teal-bright px-3.5 py-[7px] text-[12.5px] font-semibold text-white transition-colors duration-200 hover:!bg-teal-hover disabled:cursor-default disabled:opacity-50 disabled:hover:!bg-teal-bright">เพิ่ม</button>
        </div>
      )}
      {ideas.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {ideas.map((s) => (
            <button key={s} type="button" className={ADD_CHIP} onClick={() => add(s)}>
              {s}
              <Plus className="lc !h-3.5 !w-3.5 text-teal-bright" aria-hidden="true" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
