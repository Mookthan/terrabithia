import { useState } from 'react';
import { SendHorizontal } from 'lucide-react';
import { MY_ID } from '../data';
import Avatar from './Avatar';
import { ICON_BTN } from '@/components/ui/iconButton';


/** Teams-style thread: collapsed reply count, the replies, and a reply box. */
export default function ThreadReplies({ replies, onReply }) {
  const [open, setOpen] = useState(false);
  const [writing, setWriting] = useState(false);
  const [text, setText] = useState('');

  const send = () => {
    const t = text.trim();
    if (!t) return;
    onReply(t);
    setText('');
    setOpen(true);
  };
  const names = [...new Set(replies.map((r) => r.author.split(' ')[0]))].join(', ');

  return (
    <div className="border-t border-[#ddd] bg-[#EBEBEB] text-[12.5px] text-ink">
      {replies.length > 0 && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex w-full cursor-pointer items-center gap-1 px-[18px] pt-2.5 text-left font-semibold text-teal-bright transition-colors duration-200 hover:text-teal-hover"
        >
          {open ? <span>ยุบการตอบกลับ</span> : (
            <><span data-nt>{replies.length}</span> <span>การตอบกลับจาก</span> <span data-nt>{names}</span></>
          )}
        </button>
      )}
      {open && (
        <ul className="m-0 list-none px-[18px] pt-2">
          {replies.map((r) => (
            <li key={r.id} className="flex gap-2.5 py-1.5">
              <Avatar id={r.by} name={r.author} small />
              <div className="min-w-0">
                <div><b>{r.author}</b> <span className="ml-1 text-[11px] text-[#777]">{r.time}</span></div>
                <div className="whitespace-pre-wrap break-words leading-[1.6]">{r.text}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="flex items-center gap-2.5 px-[18px] py-2.5">
        <Avatar id={MY_ID} small />
        {writing ? (
          <div className="flex min-w-0 flex-1 items-center gap-1 rounded-ctl border border-[#d6d6d6] bg-white pl-3 focus-within:border-teal-bright">
            <input
              autoFocus
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') send();
                if (e.key === 'Escape') { setWriting(false); setText(''); }
              }}
              placeholder="ตอบกลับ"
              className="min-w-0 flex-1 border-0 bg-transparent py-2 text-[12.5px] text-ink"
            />
            <button
              type="button"
              onClick={send}
              disabled={!text.trim()}
              aria-label="ส่ง"
              className={`${ICON_BTN} h-8 w-8 text-teal-bright hover:text-teal-hover disabled:cursor-default disabled:bg-transparent disabled:text-[#bbb]`}
            >
              <SendHorizontal className="lc" />
            </button>
          </div>
        ) : (
          <button type="button" onClick={() => setWriting(true)} className="flex-1 cursor-pointer text-left text-ink hover:text-teal-bright">
            ตอบกลับในเธรด
          </button>
        )}
      </div>
    </div>
  );
}
