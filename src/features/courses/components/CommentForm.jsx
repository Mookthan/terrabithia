import { useState } from 'react';
import { ME } from '@/data/me';
import { useUI } from '@/context/UIContext';
import { LIKE_CHIPS } from '../data';
import Avatar from './Avatar';
import RateInput from './RateInput';

const MY_ROLE = 'CAC: Creative Designer';

/** "ความคิดเห็น" form: star rating, text, liked-aspect chips. */
export default function CommentForm({ onSubmit }) {
  const { toast } = useUI();
  const [rate, setRate] = useState(0);
  const [text, setText] = useState('');
  const [chips, setChips] = useState([]);
  const [err, setErr] = useState('');

  const toggleChip = (t) => setChips((cs) => (cs.includes(t) ? cs.filter((x) => x !== t) : [...cs, t]));

  const submit = () => {
    if (!rate) { setErr('โปรดให้คะแนนดาว'); return; }
    if (!chips.length) { setErr('โปรดเลือกอย่างน้อย 1 ข้อ'); return; }
    setErr('');
    onSubmit({
      n: ME.fullName, r: MY_ROLE, d: '09 Oct 2026', s: rate,
      h: LIKE_CHIPS.filter((c) => chips.includes(c)).join(','), x: text.trim() || '(ไม่มีข้อความ)', c: '#E9F3F1', a: ME.photo,
    });
    setText(''); setChips([]); setRate(0);
    toast('ส่งความคิดเห็นแล้ว ขอบคุณค่ะ');
  };

  return (
    <div className="rounded-b-box bg-[#F8F7F2] px-[22px] pb-[22px] pt-[18px] shadow-card">
      <div className="mb-2.5 flex items-start gap-4">
        <Avatar src={ME.photo} name={ME.fullName} bg="#E9F3F1" big />
        <div>
          <b className="block text-[13px] text-ink">{ME.fullName}</b>
          <small className="text-[11.5px] text-ink">{MY_ROLE}</small>
          <RateInput value={rate} onChange={setRate} />
        </div>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="โปรดแสดงความคิดเห็นของคุณ..."
        className="mb-3 mt-1.5 min-h-[90px] w-full resize-y border border-[#cfcfcf] bg-white p-2.5 text-[13px] text-ink placeholder:text-faint"
      />
      <div className="mb-2 text-[12px] font-semibold text-ink">ชอบอะไรในบทเรียนนี้ (โปรดเลือกอย่างน้อย 1 ข้อ)</div>
      <div className="flex flex-wrap gap-2.5">
        {LIKE_CHIPS.map((t) => {
          const on = chips.includes(t);
          return (
            <button
              key={t}
              type="button"
              aria-pressed={on}
              onClick={() => toggleChip(t)}
              className={`rounded-ctl border px-3.5 py-[7px] text-[12.5px] font-medium transition-colors duration-200 hover:!text-teal-hover ${
                on ? 'border-[#B9D643] bg-[#B9D643] text-ink' : 'border-teal-bright bg-white text-teal-bright'
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>
      <div className="mt-2 min-h-4 text-[12px] text-[#C0392B]">{err}</div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={submit}
          className="rounded-ctl bg-teal-bright px-5 py-2.5 text-[13px] font-semibold text-white transition-colors duration-200 hover:!bg-teal-hover"
        >
          ส่งความคิดเห็น
        </button>
      </div>
    </div>
  );
}
