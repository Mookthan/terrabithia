import { useState } from 'react';
import { ChevronDown, ChevronRight, MessageCircle, SendHorizontal } from 'lucide-react';
import Fold from '@/components/ui/Fold';
import OwnActions from '@/components/ui/own/OwnActions';
import EditText from '@/components/ui/own/EditText';
import { QUICK_GREETINGS, STICKERS, WELCOME_CHEERS, cheer, editGreet, greet, removeGreet, useWelcome } from './welcomeStore';

/** Round photo, or the first letter of the nickname on a brand gradient when there is no photo yet. */
function Face({ photo, nick, size }) {
  const box = { width: size, height: size };
  return photo
    ? <img src={photo} alt="" style={box} className="flex-none rounded-full object-cover" />
    : (
      <span style={{ ...box, fontSize: size * 0.42 }} className="grid flex-none place-items-center rounded-full bg-gradient-to-br from-[#27AE97] to-[#8DC63F] font-bold text-white" aria-hidden="true">
        {nick.slice(0, 1)}
      </span>
    );
}

/** One greeting: who wrote it and either the text or a sticker. */
/** One greeting; on my own: ⋯ with แก้ไข (text only) and ลบ (mook 2026-11-06). */
function Greeting({ g, postId }) {
  const [editing, setEditing] = useState(false);
  const sticker = g.sticker != null;
  return (
    <li className="flex items-start gap-2">
      <Face photo={g.photo} nick={g.nick} size={28} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-1.5">
          <b className="text-[12px] font-semibold text-ink">{g.nick}{g.owner && <span className="ml-1 rounded-full bg-teal-soft px-1.5 py-px text-[10.5px] font-semibold text-teal-hover">เจ้าของโพสต์</span>}</b>
          {g.edited && <span className="text-[11px] text-muted">· แก้ไขแล้ว</span>}
          {g.me && !editing && (
            <OwnActions label="คำทักทาย" onEdit={sticker ? undefined : () => setEditing(true)} onDelete={() => removeGreet(postId, g.id)} className="ml-auto" />
          )}
        </div>
        {sticker && <img src={STICKERS[g.sticker]} alt="สติกเกอร์" className="mt-0.5 h-16 w-16 object-contain" />}
        {!sticker && (editing
          ? <EditText value={g.text} rows={1} onSave={(t) => { editGreet(postId, g.id, t); setEditing(false); }} onCancel={() => setEditing(false)} />
          : <p className="m-0 w-fit rounded-box bg-white px-3 py-1.5 text-[12.5px] leading-[1.6] text-ink">{g.text}</p>)}
      </div>
    </li>
  );
}

/**
 * Welcome post for a new employee or intern (inside the green announcements card): photo, name, role,
 * one-tap cheers and greetings that fold open in place (no LINE button, mook 2026-11-01).
 * `onMore` (home card, fixed height): "ทักทาย" opens "ดูประกาศทั้งหมด" at this post with greetings open (`startOpen`) instead of folding here.
 */
export default function WelcomeCard({ id, w, onMore, startOpen = false }) {
  const { mine, counts, greets } = useWelcome(id);
  const [open, setOpen] = useState(startOpen);
  const [text, setText] = useState('');
  const send = (payload) => { greet(id, payload); setText(''); };

  return (
    <div className="mt-2.5 rounded-box bg-white/75 p-3">
      <div className="flex items-center gap-3">
        <Face photo={w.photo} nick={w.nick} size={56} />
        <div className="min-w-0">
          <p className="m-0 text-[15px] font-bold leading-snug text-ink">ยินดีต้อนรับ{w.intern ? 'น้อง' : ''}{w.nick} 🎉</p>
          <p className="m-0 text-[12px] leading-[1.6] text-[#5b6b6b]">{w.name} · {w.pos}</p>
          <p className="m-0 text-[12px] leading-[1.6] text-[#5b6b6b]">{w.dept} · เริ่มงาน {w.start}</p>
        </div>
      </div>

      <div className="mt-2.5 flex flex-wrap gap-1.5" role="group" aria-label="ส่งกำลังใจ">
        {WELCOME_CHEERS.map((c) => (
          <button
            key={c.e}
            type="button"
            onClick={() => cheer(id, c.e)}
            aria-pressed={mine === c.e}
            title={c.l}
            className={`inline-flex cursor-pointer items-center gap-1 rounded-full border px-2.5 py-[3px] text-[12.5px] transition-[background,transform] duration-150 hover:scale-105 ${mine === c.e ? 'border-teal-bright bg-teal-soft font-semibold text-teal-hover' : 'border-[#dfe7e3] bg-white text-ink hover:bg-teal-veil'}`}
          >
            <span className="text-[15px] leading-none">{c.e}</span>{counts[c.e]}
          </button>
        ))}
      </div>

      <div className="mt-2.5 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => (onMore ? onMore() : setOpen((o) => !o))}
          aria-expanded={onMore ? undefined : open}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-ctl bg-transparent px-2.5 py-1.5 text-[13px] font-semibold text-teal-hover transition-colors hover:bg-teal-veil"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />ทักทาย ({greets.length})
          {onMore ? <ChevronRight className="h-4 w-4" aria-hidden="true" /> : <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />}
        </button>
      </div>

      {!onMore && (
      <Fold open={open}>
        <div className="pt-2.5">
          {greets.length > 0 && <ul className="m-0 mb-3 flex list-none flex-col gap-2.5 p-0">{greets.map((g) => <Greeting key={g.id} g={g} postId={id} />)}</ul>}
          <div className="mb-2 flex flex-wrap gap-1.5">
            {QUICK_GREETINGS.map((q) => (
              <button key={q} type="button" onClick={() => send({ text: q })} className="cursor-pointer rounded-ctl border border-[#dfe7e3] bg-white px-2.5 py-1 text-[12px] text-ink transition-colors hover:bg-teal-soft">{q}</button>
            ))}
            {STICKERS.map((s, i) => (
              <button key={s} type="button" onClick={() => send({ sticker: i })} aria-label="ส่งสติกเกอร์ Terby" className="grid h-9 w-9 cursor-pointer place-items-center rounded-ctl border border-[#dfe7e3] bg-white transition-colors hover:bg-teal-soft">
                <img src={s} alt="" className="h-7 w-7 object-contain" />
              </button>
            ))}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); send({ text }); }} className="flex items-center gap-2">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={`พิมพ์ทักทาย${w.nick}…`}
              className="min-w-0 flex-1 rounded-ctl border border-[#dfe7e3] bg-white px-3 py-2 text-[13px] text-ink outline-none focus:border-teal-bright"
            />
            <button type="submit" disabled={!text.trim()} aria-label="ส่ง" className="grid h-9 w-9 flex-none cursor-pointer place-items-center rounded-full bg-teal-bright text-white transition-colors hover:bg-teal-hover disabled:cursor-default disabled:opacity-40">
              <SendHorizontal className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </div>
      </Fold>
      )}
    </div>
  );
}
