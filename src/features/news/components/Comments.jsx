import { useEffect, useRef, useState } from 'react';
import { ME } from '@/data/me';
import { addComment, editComment, removeComment, useNewsState } from '../newsStore';
import { CommentAvatar } from './LikersModal';
import '../news.css';
import { Inbox } from 'lucide-react';
import EmptyState from '@/components/ui/EmptyState';
import OwnActions from '@/components/ui/own/OwnActions';
import EditText from '@/components/ui/own/EditText';

/** Foldable comment list + composer for one article. The list grows with the page, no inner scroll (mook 2026-11-06). */
export default function Comments({ index, open }) {
  const { comments } = useNewsState();
  const list = comments[index] || [];
  const [text, setText] = useState('');
  const [editing, setEditing] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const t = setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 300);
    return () => clearTimeout(t);
  }, [open]);

  const send = () => {
    const t = text.trim();
    if (!t) return;
    addComment(index, t);
    setText('');
  };

  return (
    <div className={`news-fold ${open ? 'open' : ''}`}>
      <div>
        <div className="mb-[10px] mt-[6px] rounded-box bg-white px-[18px] py-4 shadow-card">
          <div className="mb-[14px] flex flex-col gap-[14px]">
            {list.length ? list.map((c, k) => (
              <div key={c.id || k} className="flex gap-[10px]">
                <CommentAvatar name={c.n} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2">
                    <b className="text-[13.5px] text-ink">{c.n}</b>
                    <span className="text-[11.5px] text-muted">{c.d}</span>
                    {c.edited && <span className="text-[11.5px] text-muted">· แก้ไขแล้ว</span>}
                    {c.me && editing !== c.id && <OwnActions onEdit={() => setEditing(c.id)} onDelete={() => removeComment(index, c.id)} className="ml-auto" />}
                  </div>
                  {editing === c.id
                    ? <EditText value={c.t} onSave={(t) => { editComment(index, c.id, t); setEditing(null); }} onCancel={() => setEditing(null)} />
                    : <p className="mt-[2px] text-[13.5px] leading-[1.55] text-ink">{c.t}</p>}
                </div>
              </div>
            )) : <EmptyState icon={Inbox} className="justify-start py-[6px] text-[13px]">ยังไม่มีความคิดเห็น เป็นคนแรกที่แสดงความคิดเห็นได้เลย</EmptyState>}
          </div>
          <div className="flex items-center gap-[10px]">
            <div className="h-[34px] w-[34px] flex-none overflow-hidden rounded-full bg-olive">
              <img src={ME.photo} alt="" className="h-full w-full rounded-full object-cover" />
            </div>
            <input
              ref={inputRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="เขียนความคิดเห็น..."
              autoComplete="off"
              className="min-w-0 flex-1 rounded-ctl border border-line px-4 py-[9px] text-sm outline-none focus:border-teal-bright"
            />
            <button onClick={send} className="cursor-pointer rounded-ctl border-0 bg-teal-bright px-5 py-[9px] text-[13px] font-semibold text-white transition-colors duration-200 hover:!bg-teal-hover">ส่ง</button>
          </div>
        </div>
      </div>
    </div>
  );
}
