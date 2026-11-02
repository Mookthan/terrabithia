import { forwardRef, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CalendarDays, Film, FileText, Images, Link2, Pin, Siren } from 'lucide-react';
import AnnAttachment from './AnnAttachment';
import GroupBadge from './GroupBadge';
import PollCard from './poll/PollCard';
import WelcomeCard from './welcome/WelcomeCard';
import { GROUP_STYLE } from './annModel';
import { TEXT_LINK } from '@/components/ui/TextButton';
import { PATHS } from '@/routes/paths';

/**
 * One announcement: team badge + time, text, attachments and "ดูรายละเอียดที่หน้า …".
 * On the home card (`clamp`) the text is cut to two lines; with `onPin` it shows the pin button.
 * `summary`: the big attachment cards become one row of small labels (full cards in "ดูประกาศทั้งหมด");
 * `cal` adds "ดูวันในปฏิทิน" (opens the home calendar on that day); `flash` scrolls the row into view and highlights it (deep link from an HR post).
 * `inlinePoll` folds a poll open in place (inside "ประกาศทั้งหมด"); `hidden` drops the row from the home card beyond its first few. Polls show a PollCard.
 */
const ATT_LABEL = { link: [Link2, 'ลิงก์'], file: [FileText, 'ไฟล์'], video: [Film, 'วิดีโอ'], img: [Images, 'อัลบั้มรูป'] };
const AnnRow = forwardRef(function AnnRow({ a, pinned, onPin, clamp, onOpenImage, onJump, summary, hidden, inlinePoll, flash, onGreet }, ref) {
  const navigate = useNavigate();
  const self = useRef(null);
  const setRef = (el) => {
    self.current = el;
    if (typeof ref === 'function') ref(el); else if (ref) ref.current = el;
  };
  useEffect(() => {
    if (!flash || !self.current) return undefined;
    const t = setTimeout(() => self.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 350);
    return () => clearTimeout(t);
  }, [flash]);
  const st = GROUP_STYLE[a.d] || GROUP_STYLE.HR;
  return (
    <div
      ref={setRef}
      className={`relative pb-[14px] ${flash ? 'ann-flash' : ''} pl-3 pt-4 ${onPin ? 'pr-[46px]' : 'pr-3'} ${hidden ? 'hidden' : ''} ${pinned ? 'mb-[14px] rounded-ctl bg-[#F6EED1]' : 'border-b-2 border-[rgba(35,48,48,.28)]'}`}
      style={{ '--g1': st.g1, '--g2': st.g2 }}
    >
      {onPin && (
        <button
          type="button"
          onClick={onPin}
          aria-label={pinned ? 'เลิกปักหมุด' : 'ปักหมุด'}
          aria-pressed={pinned}
          className={`absolute right-3 top-[10px] grid h-[30px] w-[30px] cursor-pointer place-items-center rounded-full border-0 text-base transition-[background,color,transform] duration-200 hover:scale-[1.08] ${pinned ? 'bg-[#F8D5DC] text-[#D4457F] hover:bg-[#F5C3CF]' : 'bg-transparent text-teal-bright opacity-75 hover:bg-[rgba(212,69,127,.12)]'}`}
        >
          <Pin className="lc" />
        </button>
      )}
      <small className="mb-[6px] flex items-center gap-2 text-[11.5px] text-ink"><GroupBadge g={a.d} />
        {a.urgent && (
          <i className="inline-flex items-center gap-1 rounded-full bg-[#F0515B] px-[9px] py-[2px] text-[11px] font-bold not-italic leading-[1.5] text-white">
            <Siren size={12} strokeWidth={2.4} aria-hidden="true" />ด่วน
          </i>
        )}
        {a.t}</small>
      <p className={`mb-0 text-[13px] leading-[1.7] text-ink ${clamp ? 'line-clamp-2' : ''}`}>{a.x}</p>
      {a.poll && <PollCard poll={a.poll} inline={inlinePoll} />}
      {a.welcome && <WelcomeCard id={a.id} w={a.welcome} onMore={onGreet} startOpen={!!flash} />}
      {!summary && (a.at || []).map((t, j) => <AnnAttachment key={j} t={t} onOpenImage={onOpenImage} />)}
      {summary && a.at?.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {a.at.map((t, j) => {
            const [Icon, label] = ATT_LABEL[t.k] || ATT_LABEL.file;
            return (
              <span key={j} className="inline-flex max-w-full items-center gap-1 rounded-full bg-white/70 px-2.5 py-[3px] text-[11.5px] text-ink">
                <Icon className="h-3.5 w-3.5 flex-none" aria-hidden="true" />
                <span className="truncate">{label} · {t.t || t.n}</span>
              </span>
            );
          })}
        </div>
      )}
      {(a.jump || a.cal) && (
      <div className="flex flex-wrap items-center gap-x-5">
      {a.jump && (
        <button
          type="button"
          onClick={() => { onJump?.(); navigate(a.jump.to); window.scrollTo({ top: 0 }); }}
          className={`${TEXT_LINK} group mb-0 mt-[9px] w-max gap-[6px] text-[13px] font-semibold max-[640px]:mt-[7px] max-[640px]:text-[12.5px]`}
        >
          ดูรายละเอียดที่หน้า {a.jump.l}
          <ArrowRight className="h-[15px] w-[15px]" strokeWidth={2.4} aria-hidden="true" />
        </button>
      )}
      {a.cal && (
        <button
          type="button"
          onClick={() => { onJump?.(); navigate(PATHS.homeCal(a.cal.y, a.cal.m, a.cal.d)); }}
          className={`${TEXT_LINK} mb-0 mt-[9px] w-max gap-[6px] text-[13px] font-semibold max-[640px]:mt-[7px] max-[640px]:text-[12.5px]`}
        >
          <CalendarDays className="h-[15px] w-[15px]" strokeWidth={2.2} aria-hidden="true" />
          ดูวันในปฏิทิน
        </button>
      )}
      </div>
      )}
    </div>
  );
});

export default AnnRow;
