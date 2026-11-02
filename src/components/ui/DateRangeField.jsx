import { useCallback, useRef, useState } from 'react';
import { CalendarDays, ChevronDown, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { TEXT_BTN } from '@/components/ui/TextButton';
import { useLang } from '@/context/LangContext';
import useClickOutside from '@/hooks/useClickOutside';
import useEscape from '@/hooks/useEscape';

const TH_MON = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
const TH_MONTH = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
const EN_MONTH = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const TH_DOW = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];
const EN_DOW = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const navBtn = 'grid h-8 w-8 place-items-center rounded-full text-ink transition-colors hover:bg-teal-soft hover:text-teal-hover';

const pad = (n) => String(n).padStart(2, '0');
const iso = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;
const parse = (s) => (s ? s.split('-').map(Number) : null); // [y, m(1-12), d]

/** Days of a month as a 7-column grid (null = blank before day 1). */
function monthCells(y, m) {
  const cells = Array(new Date(y, m, 1).getDay()).fill(null);
  const days = new Date(y, m + 1, 0).getDate();
  for (let d = 1; d <= days; d++) cells.push(d);
  return cells;
}

/**
 * Date range field in the design-system style: one bordered control showing "1 ต.ค. 2569 – 28 ต.ค. 2569"
 * that unfolds a month calendar under it (smooth height fold; the ⌄ turns while open). First tap picks the start, second the end (taps before the
 * start move the start); the days in between are tinted teal-soft. `from` / `to` are "yyyy-mm-dd" or ''.
 * Text is rendered per language (data-nt) because the translator can't map dates.
 */
export default function DateRangeField({ from, to, onChange, placeholder }) {
  const { lang } = useLang();
  const th = lang !== 'en';
  const [today] = useState(() => new Date());
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState('');
  const start = parse(from) || parse(to);
  const [ym, setYm] = useState(() => (start ? { y: start[0], m: start[1] - 1 } : { y: today.getFullYear(), m: today.getMonth() }));
  const ref = useRef(null);
  const close = useCallback(() => setOpen(false), []);
  useClickOutside(ref, close, open);
  useEscape(close, open);

  const fmt = (s) => {
    const [y, m, d] = parse(s);
    return th ? `${d} ${TH_MON[m - 1]} ${y + 543}` : `${d} ${EN_MONTH[m - 1].slice(0, 3)} ${y}`;
  };
  const label = from || to ? `${from ? fmt(from) : '…'} – ${to ? fmt(to) : '…'}` : '';
  const step = (d) => setYm(({ y, m }) => ({ y: y + Math.floor((m + d) / 12), m: (m + d + 12) % 12 }));

  const pick = (day) => {
    if (!from || to || day < from) { onChange(day, ''); return; }
    onChange(from, day);
    setOpen(false);
  };
  const end = to || (from && hover > from ? hover : ''); // preview the range while choosing the end
  const todayIso = iso(today.getFullYear(), today.getMonth(), today.getDate());

  return (
    <div ref={ref} data-nt>
      <div className={`flex h-[36px] items-center rounded-ctl border bg-white text-ink transition-colors duration-200 hover:border-teal-bright ${open ? 'border-teal-bright shadow-[0_0_0_3px_rgba(39,174,151,.15)]' : 'border-line'}`}>
        <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="flex h-full min-w-0 flex-1 items-center gap-2 pl-3 pr-2 text-left text-[13px]">
          <CalendarDays className="lc !h-4 !w-4 text-teal-bright" strokeWidth={1.8} aria-hidden="true" />
          <span className={`truncate ${label ? '' : 'text-muted'}`}>{label || placeholder || (th ? 'เลือกช่วงวันที่' : 'Pick a date range')}</span>
          <ChevronDown className={`lc ml-auto !h-4 !w-4 text-teal-bright transition-transform duration-300 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
        </button>
        {label && (
          <button type="button" onClick={() => onChange('', '')} aria-label={th ? 'ล้างวันที่' : 'Clear dates'} className="mr-1 grid h-7 w-7 flex-none place-items-center rounded-full text-muted transition-colors hover:bg-teal-soft hover:text-teal-hover">
            <X className="lc !h-3.5 !w-3.5" aria-hidden="true" />
          </button>
        )}
      </div>

      <div
        className={`grid transition-[grid-template-rows,opacity,visibility] duration-[.42s] ease-[cubic-bezier(.4,0,.2,1)] motion-reduce:transition-none ${open ? 'visible grid-rows-[1fr] opacity-100' : 'invisible grid-rows-[0fr] opacity-0'}`}
        inert={open ? undefined : ''}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="mx-[3px] mb-1 mt-2 rounded-box bg-white p-3 shadow-card">
            <div className="mb-1 flex items-center justify-between">
              <button type="button" className={navBtn} onClick={() => step(-1)} aria-label={th ? 'เดือนก่อนหน้า' : 'Previous month'}><ChevronLeft className="lc !h-4 !w-4" /></button>
              <b className="text-[14px] text-ink">{th ? `${TH_MONTH[ym.m]} ${ym.y + 543}` : `${EN_MONTH[ym.m]} ${ym.y}`}</b>
              <button type="button" className={navBtn} onClick={() => step(1)} aria-label={th ? 'เดือนถัดไป' : 'Next month'}><ChevronRight className="lc !h-4 !w-4" /></button>
            </div>
            <div className="grid grid-cols-7 text-center text-[11.5px] font-semibold text-muted">
              {(th ? TH_DOW : EN_DOW).map((d) => <span key={d} className="py-1">{d}</span>)}
            </div>
            <div className="grid grid-cols-7 gap-y-0.5 text-center text-[13px]" onMouseLeave={() => setHover('')}>
              {monthCells(ym.y, ym.m).map((d, i) => {
                if (!d) return <span key={`b${i}`} />;
                const day = iso(ym.y, ym.m, d);
                const isEnd = day === from || day === end;
                const inRange = from && end && day > from && day < end;
                return (
                  <span key={day} className={`py-px ${inRange ? 'bg-teal-soft' : ''} ${day === from && end ? 'rounded-l-full bg-teal-soft' : ''} ${day === end && from ? 'rounded-r-full bg-teal-soft' : ''}`}>
                    <button
                      type="button"
                      onClick={() => pick(day)}
                      onMouseEnter={() => setHover(day)}
                      className={`mx-auto grid h-8 w-8 place-items-center rounded-full transition-colors ${isEnd ? 'bg-teal-bright font-bold text-white' : `hover:bg-teal-veil hover:text-teal-hover ${day === todayIso ? 'font-bold text-teal-bright ring-1 ring-inset ring-teal-bright' : 'text-ink'}`}`}
                    >
                      {d}
                    </button>
                  </span>
                );
              })}
            </div>
            <div className="mt-2 flex items-center justify-between border-t border-line pt-2">
              <span className="text-[11.5px] text-muted">{from && !to ? (th ? 'เลือกวันสิ้นสุด' : 'Pick the end date') : (th ? 'เลือกวันเริ่มต้น' : 'Pick the start date')}</span>
              <button type="button" className={`${TEXT_BTN} !py-1.5 !text-[13px]`} onClick={() => setYm({ y: today.getFullYear(), m: today.getMonth() })}>{th ? 'วันนี้' : 'Today'}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
