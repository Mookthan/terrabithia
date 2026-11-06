import { useState } from 'react';
import OwnActions from '@/components/ui/own/OwnActions';
import EditText from '@/components/ui/own/EditText';
import Avatar from './Avatar';
import Stars from './Stars';

/** One review; on my own: ⋯ with แก้ไข (the text) and ลบ (mook 2026-11-06). */
export default function ReviewCard({ review: r, onEdit, onRemove }) {
  const [editing, setEditing] = useState(false);
  return (
    <div data-reveal className="mb-3.5 rounded-ctl bg-white px-[18px] py-4 shadow-card">
      <div className="flex items-center gap-3">
        <Avatar src={r.a} name={r.n} bg={r.c} />
        <div className="flex flex-1 flex-col text-[13px] text-ink">
          <b>{r.n}</b>
          <small className="text-[11.5px] text-ink">{r.r}</small>
        </div>
        <em className="self-start text-[11.5px] not-italic text-ink">{r.d}{r.edited && <span className="text-muted"> · แก้ไขแล้ว</span>}</em>
        {r.me && !editing && <OwnActions onEdit={() => setEditing(true)} onDelete={() => onRemove(r.id)} className="-my-1 self-start" />}
      </div>
      <div className="mb-1.5 mt-2.5 flex items-center gap-1.5">
        <Stars n={r.s} />
        <small className="text-[11px] text-ink">{r.s.toFixed(1)}</small>
      </div>
      <div className="mb-1.5 mt-2.5 text-[12.5px] font-bold text-ink">{r.h}</div>
      {editing
        ? <EditText value={r.x === '(ไม่มีข้อความ)' ? '' : r.x} rows={3} onSave={(x) => { onEdit(r.id, x); setEditing(false); }} onCancel={() => setEditing(false)} />
        : <p className="text-[12px] leading-[1.75] text-ink">{r.x}</p>}
    </div>
  );
}
