import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Mail, MessageCircle, Phone } from 'lucide-react';
import { TERBY_SRC } from '@/data/me';
import useEscape from '@/hooks/useEscape';
import useBodyLock from '@/hooks/useBodyLock';
import { OUTLINE_HOVER } from '@/components/ui/TextButton';
import { openTerby } from '@/components/chat/terby';
import { HELP_TOPICS } from './helpContacts';
import CloseButton from '@/components/ui/CloseButton';

const CHIP = `inline-flex items-center gap-1.5 rounded-ctl border border-line bg-white px-2.5 py-[5px] text-[12px] font-semibold text-ink no-underline ${OUTLINE_HOVER}`;

/** "ช่วยเหลือ" from the profile menu: ask Terby, or who to contact for each kind of problem. */
export default function HelpModal({ onClose }) {
  const [shown, setShown] = useState(false);
  useEscape(onClose);
  useBodyLock(true);
  useEffect(() => { const r = requestAnimationFrame(() => setShown(true)); return () => cancelAnimationFrame(r); }, []);
  const askTerby = () => { onClose(); openTerby(); };

  return createPortal(
    <div
      className={`fixed inset-0 z-[300] flex items-center justify-center bg-[rgba(20,30,28,.45)] p-4 backdrop-blur-[4px] transition-opacity duration-[250ms] ${shown ? 'opacity-100' : 'opacity-0'}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div role="dialog" aria-modal="true" aria-label="ช่วยเหลือ" className="flex max-h-[86vh] w-[min(460px,100%)] flex-col overflow-hidden rounded-box bg-white text-[14px] shadow-pop">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="m-0 text-[17px] font-bold text-ink">ช่วยเหลือ</h2>
          <CloseButton onClick={onClose} />
        </div>
        <div className="overflow-y-auto px-5 pb-5 pt-4">
          <button type="button" onClick={askTerby} className="flex w-full cursor-pointer items-center gap-3 rounded-box border-0 bg-teal-soft px-4 py-3 text-left transition-shadow duration-200 hover:shadow-pop">
            <img src={TERBY_SRC} alt="" className="h-11 w-11 flex-none rounded-full bg-white object-cover" />
            <span className="min-w-0 flex-1">
              <b className="block text-[14px] text-ink">ถาม Terby</b>
              <span className="text-[12px] text-muted">คำถามทั่วไป เช่น วันลา วันหยุด สวัสดิการ</span>
            </span>
            <MessageCircle className="lc !h-5 !w-5 flex-none text-teal-hover" aria-hidden="true" />
          </button>

          <h3 className="mb-1 mt-5 text-[13px] font-bold text-ink">ติดต่อตามเรื่อง</h3>
          <ul className="m-0 list-none p-0">
            {HELP_TOPICS.map(({ k, icon: Icon, title, team, mail, tel }) => (
              <li key={k} className="flex gap-3 border-b border-line py-3 last:border-b-0">
                <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-teal-soft text-teal-hover"><Icon className="lc !h-[18px] !w-[18px]" aria-hidden="true" /></span>
                <div className="min-w-0 flex-1">
                  <div className="text-[13.5px] font-semibold leading-snug text-ink">{title}</div>
                  <div className="mb-2 mt-0.5 text-[12px] text-muted">{team}</div>
                  <div className="flex flex-wrap gap-2">
                    <a href={`mailto:${mail}`} className={CHIP}><Mail className="lc !h-3.5 !w-3.5" aria-hidden="true" />{mail}</a>
                    {tel && <a href={`tel:${tel}`} className={CHIP}><Phone className="lc !h-3.5 !w-3.5" aria-hidden="true" />{`โทร ${tel}`}</a>}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>,
    document.body,
  );
}
