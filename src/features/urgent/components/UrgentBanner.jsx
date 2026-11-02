import { useEffect, useRef, useState } from 'react';
import { CircleCheck, Clock, MapPin, Siren } from 'lucide-react';
import { ack, ackKey, activeNotices, hhmm } from '../data';

/** What the strip shows: the latest update if the admin sent one, otherwise the first message. */
const view = (n) => (n.update
  ? { up: n.update, title: n.update.title, detail: n.update.detail, chip: `อัปเดต · ${n.update.label}` }
  : { up: null, title: n.title, detail: n.detail, chip: 'ประกาศด่วน' });

const tone = (up) => (up ? 'border-teal-soft bg-[#EEF8F4]' : 'border-[#F6C4C7] bg-[#FFF1F1]');

function NoticeIcon({ up, small }) {
  const size = small ? 'h-8 w-8' : 'h-10 w-10';
  return up ? (
    <span className={`grid ${size} shrink-0 place-items-center rounded-full bg-teal-bright text-white`}>
      <CircleCheck size={small ? 17 : 20} strokeWidth={2.2} />
    </span>
  ) : (
    <span className={`relative grid ${size} shrink-0 place-items-center rounded-full bg-[#F0515B] text-white`}>
      <span className="absolute inset-0 animate-ping rounded-full bg-[#F0515B] opacity-30" />
      <Siren size={small ? 17 : 20} strokeWidth={2.2} className="relative" />
    </span>
  );
}

function Chip({ up, children }) {
  return (
    <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11.5px] font-bold text-white ${up ? 'bg-teal-hover' : 'bg-[#F0515B]'}`}>
      {children}
    </span>
  );
}

function AckButton({ onClick, small }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-ctl bg-teal-bright font-semibold text-white transition-colors hover:bg-teal-hover ${small ? 'px-4 py-2 text-[13px]' : 'px-4 py-2 text-[13.5px] max-[640px]:w-full'}`}
    >
      รับทราบ
    </button>
  );
}

/** One urgent notice in full. "รับทราบ" folds it away smoothly and remembers the acknowledgement. */
function UrgentItem({ notice, closing, onAck, onDone }) {
  const { up, title, detail, chip } = view(notice);
  return (
    <div
      className={`grid transition-[grid-template-rows,opacity] duration-[420ms] ease-out ${closing ? 'grid-rows-[0fr] opacity-0' : 'grid-rows-[1fr] opacity-100'}`}
      onTransitionEnd={(e) => { if (closing && e.propertyName === 'grid-template-rows') onDone(notice.id); }}
    >
      <div className="min-h-0 overflow-hidden">
        <section role="alert" className={`border-b ${tone(up)}`}>
          <div className="mx-auto flex max-w-[1000px] items-center gap-3.5 px-5 py-4 max-[640px]:flex-wrap max-[640px]:pt-[18px] max-[640px]:items-start max-[640px]:px-4">
            <NoticeIcon up={up} />
            <div className="min-w-0 flex-1">
              <div className="mb-0.5 flex flex-wrap items-center gap-x-2 gap-y-1">
                <Chip up={up}>{chip}</Chip>
                <h2 className="m-0 text-[15.5px] font-bold text-ink">{title}</h2>
              </div>
              <p className="m-0 text-[13.5px] text-ink/80">{detail}</p>
              {up && <p className="m-0 mt-0.5 text-[12.5px] text-muted">ก่อนหน้านี้: {notice.title}</p>}
              <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-[12.5px] text-muted">
                <span className="inline-flex items-center gap-1"><MapPin size={14} />{notice.area}</span>
                <span className="inline-flex items-center gap-1"><Clock size={14} />{up ? `อัปเดต ${hhmm(up.at)} น.` : `ถึง ${hhmm(notice.end)} น.`}</span>
                <span>จาก {notice.from}</span>
              </div>
            </div>
            <AckButton onClick={onAck} />
          </div>
        </section>
      </div>
    </div>
  );
}

/** One-line copy pinned under the header once the full strip has scrolled out of view. Tap the text to scroll back up. */
function CompactBar({ notice, show, onAck }) {
  const { up, title, chip } = view(notice);
  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 top-[calc(var(--hh)-8px)] z-[55] border-b shadow-[0_6px_14px_-10px_rgba(23,63,82,.35)] transition-[transform,opacity] duration-300 ease-out ${tone(up)} ${show ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'}`}
    >
      <div className="mx-auto flex max-w-[1000px] items-center gap-3 px-5 py-3 max-[640px]:gap-2.5 max-[640px]:px-4 max-[640px]:py-2.5">
        <NoticeIcon up={up} small />
        <button
          type="button"
          tabIndex={show ? 0 : -1}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex min-w-0 flex-1 items-center gap-2.5 border-0 bg-transparent p-0 text-left"
        >
          <Chip up={up}>
            <span className="max-[640px]:hidden">{chip}</span>
            <span className="min-[641px]:hidden">{up ? 'อัปเดต' : 'ด่วน'}</span>
          </Chip>
          <span className="truncate text-[14px] font-bold text-ink">{title}</span>
        </button>
        <AckButton onClick={onAck} small />
      </div>
    </div>
  );
}

/**
 * Full-width urgent strip under the header on every page, until acknowledged or the notice ends.
 * When it scrolls out of view a one-line copy stays pinned under the header (mook 2026-10-29).
 */
export default function UrgentBanner() {
  const [list, setList] = useState(() => activeNotices());
  const [closing, setClosing] = useState([]);
  const [pinned, setPinned] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    const t = setInterval(() => setList((l) => l.filter((n) => n.end > new Date())), 60000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return undefined;
    const f = () => {
      const root = getComputedStyle(document.documentElement);
      const headerBottom = ((parseFloat(root.getPropertyValue('--hh')) || 78) - 8) * (parseFloat(root.zoom) || 1);
      setPinned(el.getBoundingClientRect().bottom < headerBottom);
    };
    f();
    window.addEventListener('scroll', f, { passive: true });
    window.addEventListener('resize', f);
    return () => { window.removeEventListener('scroll', f); window.removeEventListener('resize', f); };
  }, [list.length]);

  const ackOne = (n) => { ack(ackKey(n)); setClosing((c) => [...c, n.id]); };
  const done = (id) => { setList((l) => l.filter((x) => x.id !== id)); setClosing((c) => c.filter((x) => x !== id)); };
  const open = list.filter((n) => !closing.includes(n.id));

  if (!list.length) return null;
  return (
    <>
      <div ref={boxRef}>
        {list.map((n) => (
          <UrgentItem key={n.id} notice={n} closing={closing.includes(n.id)} onAck={() => ackOne(n)} onDone={done} />
        ))}
      </div>
      {open[0] && <CompactBar notice={open[0]} show={pinned} onAck={() => ackOne(open[0])} />}
    </>
  );
}
