import { useCallback, useRef, useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import DropPanel from '@/components/ui/DropPanel';
import { TEXT_BTN } from '@/components/ui/TextButton';
import { useLang } from '@/context/LangContext';
import useClickOutside from '@/hooks/useClickOutside';
import useEscape from '@/hooks/useEscape';
import { MONTHNAMES } from '../data';

const TH_MON = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
const yearBtn = 'grid h-8 w-8 place-items-center rounded-full text-ink transition-colors hover:bg-teal-veil hover:text-teal-hover';

/**
 * Calendar month title that opens a month / year picker, so any month can be reached
 * without stepping one at a time. `onPick(y, m)` jumps there; "วันนี้" goes back to today.
 * Text is rendered per language here (data-nt) because the translator can't map a bare year.
 */
export default function MonthPicker({ y, m, today, onPick }) {
  const { lang } = useLang();
  const th = lang !== 'en';
  const [open, setOpen] = useState(false);
  const [py, setPy] = useState(y); // year shown in the panel
  const ref = useRef(null);
  const close = useCallback(() => setOpen(false), []);
  useClickOutside(ref, close, open);
  useEscape(close, open);

  const yr = (v) => (th ? v + 543 : v);
  const monName = (i) => (th ? TH_MON[i] : MONTHNAMES[i].slice(0, 3));
  const toggle = () => { setPy(y); setOpen((o) => !o); };
  const choose = (ny, nm) => { onPick(ny, nm); setOpen(false); };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-label="เลือกเดือนและปี"
        className="flex items-center gap-1.5 rounded-ctl px-2.5 py-1 text-[clamp(20px,5vw,28px)] font-medium text-teal-bright transition-colors hover:bg-teal-veil hover:text-teal-hover"
      >
        <span key={`${y}-${m}`} className="animate-[calFade_.35s_ease]">{`${MONTHNAMES[m]} ${y}`}</span>
        <ChevronDown className={`lc !h-5 !w-5 text-teal-bright transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <DropPanel open={open} className="absolute left-1/2 top-[110%] z-30 w-[264px] -translate-x-1/2" innerClassName="p-3">
        <div data-nt>
          <div className="mb-2 flex items-center justify-between">
            <button type="button" className={yearBtn} onClick={() => setPy((v) => v - 1)} aria-label={th ? 'ปีก่อนหน้า' : 'Previous year'}><ChevronLeft className="lc !h-4 !w-4" /></button>
            <span className="text-[15px] font-bold text-ink">{yr(py)}</span>
            <button type="button" className={yearBtn} onClick={() => setPy((v) => v + 1)} aria-label={th ? 'ปีถัดไป' : 'Next year'}><ChevronRight className="lc !h-4 !w-4" /></button>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {MONTHNAMES.map((_, i) => {
              const cur = py === y && i === m;
              const isNow = py === today.getFullYear() && i === today.getMonth();
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => choose(py, i)}
                  className={`rounded-ctl py-2 text-[13.5px] font-semibold transition-colors ${cur ? 'bg-teal-bright text-white' : `hover:bg-teal-veil ${isNow ? 'text-teal-hover ring-1 ring-inset ring-teal-bright' : 'text-ink'}`}`}
                >
                  {monName(i)}
                </button>
              );
            })}
          </div>
          <div className="mt-2 flex justify-end border-t border-line pt-2">
            <button type="button" className={TEXT_BTN} onClick={() => choose(today.getFullYear(), today.getMonth())}>{th ? 'วันนี้' : 'Today'}</button>
          </div>
        </div>
      </DropPanel>
    </div>
  );
}
