import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CalendarDays, ChevronDown, Clock, MapPin, Megaphone } from 'lucide-react';
import Fold from '@/components/ui/Fold';
import { TEXT_LINK } from '@/components/ui/TextButton';
import { PATHS } from '@/routes/paths';
import { HR_DOCS } from '../data';
import HrDoc from './HrDoc';

const TH_MON = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
const LINK = `${TEXT_LINK} w-max gap-1.5 text-[13px] font-semibold`;

/** "17-18 พ.ย. 69" from an event's days. */
const evDate = ({ y, m, days }) => `${days.length > 1 ? `${days[0]}-${days[days.length - 1]}` : days[0]} ${TH_MON[m]} ${String(y + 543).slice(-2)}`;

/**
 * One HR announcement. An event post (`ev`) shows its date, time and place and links to that day in the home
 * calendar; a post also sent to the green announcements card (`ann`) links there. A post with its own document (`doc`)
 * folds it open in place. `flash` = opened by a deep link (also unfolds the document).
 */
export default function HrNewsCard({ item, index, onOpen, flash }) {
  const navigate = useNavigate();
  const ref = useRef(null);
  const [open, setOpen] = useState(!!flash);
  useEffect(() => {
    if (!flash) return undefined;
    setOpen(true);
    const t = setTimeout(() => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
    return () => clearTimeout(t);
  }, [flash]);
  const go = (to) => { navigate(to); window.scrollTo({ top: 0 }); };

  return (
    <article
      data-reveal
      ref={ref}
      className={`hr-ncard rounded-box border-l-[5px] px-[22px] pb-4 pt-[18px] shadow-card transition-[translate,box-shadow] duration-[.25s] hover:[translate:0_-3px] hover:shadow-pop ${
        item.pin ? 'border-[#2F6FBF] bg-[#EEF5FE]' : 'border-[#CFE3FC] bg-white'
      } ${flash ? 'hr-flash' : ''}`}
      style={{ '--i': index }}
    >
      <div className="mb-2 flex items-center gap-2 text-[12px] text-ink">
        <span className="rounded-full bg-[#CFE3FC] px-2.5 py-0.5 font-semibold text-[#1F4E8C]">{item.tag}</span>
        {item.pin && <span className="rounded-full bg-[#FF565C] px-[9px] py-0.5 text-[11px] font-semibold text-white">ใหม่</span>}
        <time className="ml-auto opacity-65">{item.d}</time>
      </div>
      <h3 className="mb-1.5 text-[17px] font-semibold leading-[1.5] text-ink">{item.t}</h3>
      <p className="mb-2.5 text-[14px] leading-[1.75] text-ink opacity-90">{item.x}</p>
      {item.ev && (
        <ul className="mb-3 grid list-none gap-1 rounded-ctl bg-white/70 px-3.5 py-2.5 text-[13px] text-ink">
          <li className="flex items-center gap-2"><CalendarDays className="lc !h-4 !w-4 flex-none text-[#2F6FBF]" aria-hidden="true" />{evDate(item.ev)}</li>
          <li className="flex items-center gap-2"><Clock className="lc !h-4 !w-4 flex-none text-[#2F6FBF]" aria-hidden="true" />{`${item.ev.time} น.`}</li>
          <li className="flex items-center gap-2"><MapPin className="lc !h-4 !w-4 flex-none text-[#2F6FBF]" aria-hidden="true" />{item.ev.place}</li>
        </ul>
      )}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
        {item.g && (
          <button type="button" onClick={() => onOpen(item.g, item.i)} className={`${LINK} group`}>
            {item.l}
            <ArrowRight className="h-[15px] w-[15px]" strokeWidth={2.4} aria-hidden="true" />
          </button>
        )}
        {item.doc && (
          <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className={LINK}>
            {open ? 'ซ่อนรายละเอียด' : 'ดูรายละเอียด'}
            <ChevronDown className={`h-[15px] w-[15px] transition-transform duration-300 ${open ? 'rotate-180' : ''}`} strokeWidth={2.4} aria-hidden="true" />
          </button>
        )}
        {item.ev && (
          <button type="button" onClick={() => go(PATHS.homeCal(item.ev.y, item.ev.m, item.ev.days[0]))} className={LINK}>
            <CalendarDays className="h-[15px] w-[15px]" strokeWidth={2.2} aria-hidden="true" />ดูในปฏิทิน
          </button>
        )}
        {item.ann && (
          <button type="button" onClick={() => go(PATHS.homeAnn(item.id))} className={LINK}>
            <Megaphone className="h-[15px] w-[15px]" strokeWidth={2.2} aria-hidden="true" />ดูในประกาศหน้าแรก
          </button>
        )}
      </div>
      {item.doc && (
        <Fold open={open}>
          <div className="mt-4 border-t border-[#CFE3FC] pt-4">
            <HrDoc doc={HR_DOCS[item.doc]} />
          </div>
        </Fold>
      )}
    </article>
  );
}
