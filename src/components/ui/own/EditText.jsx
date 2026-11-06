import { useEffect, useRef, useState } from 'react';
import { TEXT_BTN } from '../TextButton';

/** Edit my own text in place: Enter or บันทึก saves, Esc or ยกเลิก puts it back. Empty text can't be saved. */
export default function EditText({ value, onSave, onCancel, rows = 2 }) {
  const [text, setText] = useState(value);
  const ref = useRef(null);
  useEffect(() => { const el = ref.current; el?.focus(); el?.setSelectionRange(el.value.length, el.value.length); }, []);
  const save = () => { const t = text.trim(); if (t) onSave(t); };
  return (
    <div className="mt-1" onClick={(e) => e.stopPropagation()}>
      <textarea
        ref={ref}
        value={text}
        rows={rows}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); save(); }
          if (e.key === 'Escape') { e.stopPropagation(); onCancel(); }
        }}
        className="block w-full resize-none rounded-ctl border border-teal-bright bg-white px-3 py-2 text-[13.5px] leading-[1.55] text-ink outline-none"
      />
      <div className="mt-1.5 flex justify-end gap-1.5">
        <button type="button" onClick={onCancel} className={`${TEXT_BTN} !px-3 !py-1.5 !text-[12.5px]`}>ยกเลิก</button>
        <button type="button" onClick={save} disabled={!text.trim()} className="cursor-pointer rounded-ctl border-0 bg-teal-bright px-3.5 py-1.5 text-[12.5px] font-semibold text-white transition-colors hover:bg-teal-hover disabled:cursor-default disabled:opacity-50">บันทึก</button>
      </div>
    </div>
  );
}
