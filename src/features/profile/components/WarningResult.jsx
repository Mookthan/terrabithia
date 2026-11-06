import { useState } from 'react';
import { ChevronDown, CircleCheck, Lock } from 'lucide-react';
import Fold from '@/components/ui/Fold';
import { evalLock, useEvalLock } from '../evalLock';
import { WARNINGS, WARNING_LEVEL, certDate } from '../certStore';
import { LINK_BTN } from './EvalResult';

/**
 * "ใบเตือน:" in the work card. Locked with the evaluation (one password, hides itself after 2 minutes);
 * seen only by the owner and HR, never on the Org Chart (mook 2026-11-05). None shows a calm 'ไม่มีใบเตือน'.
 */
export default function WarningResult() {
  const { open } = useEvalLock();
  const [list, setList] = useState(false);
  if (!open) {
    return (
      <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
        <span className="inline-flex items-center gap-1.5 text-muted" aria-label="ซ่อนอยู่">
          <span className="tracking-[.15em]" aria-hidden="true">●●●</span>
          <Lock className="lc !h-[13px] !w-[13px]" aria-hidden="true" />
        </span>
        <button type="button" className={LINK_BTN} onClick={evalLock.ask}>ดู</button>
      </span>
    );
  }
  if (!WARNINGS.length) {
    return (
      <span className="inline-flex items-center gap-1.5 text-ink">
        <CircleCheck className="lc !h-[15px] !w-[15px] text-teal-bright" aria-hidden="true" /> ไม่มีใบเตือน
      </span>
    );
  }
  const active = WARNINGS.filter((w) => w.active).length;
  return (
    <div className="min-w-0 flex-1">
      <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
        <span>{active ? `${WARNINGS.length} ฉบับ (มีผลอยู่ ${active})` : `${WARNINGS.length} ฉบับ (พ้นกำหนดแล้วทั้งหมด)`}</span>
        <button type="button" aria-expanded={list} className={`${LINK_BTN} gap-1`} onClick={() => setList((v) => !v)}>
          {list ? 'ซ่อนรายละเอียด' : 'ดูรายละเอียด'}
          <ChevronDown className={`lc !h-3.5 !w-3.5 transition-transform duration-300 ${list ? 'rotate-180' : ''}`} aria-hidden="true" />
        </button>
      </span>
      <Fold open={list}>
        <ul className="mt-2 flex flex-col gap-2">
          {WARNINGS.map((w) => (
            <li key={w.id} className="rounded-ctl bg-cream px-3 py-2.5 leading-[1.6]">
              <div className="flex flex-wrap items-center gap-2">
                <b className="text-ink">{WARNING_LEVEL[w.level]}</b>
                <span className={`rounded-full px-2 py-px text-[11px] font-semibold ${w.active ? 'bg-[#FDE8E9] text-[#C2333D]' : 'bg-white text-muted'}`}>
                  {w.active ? 'มีผลอยู่' : 'พ้นกำหนดแล้ว'}
                </span>
              </div>
              <div className="text-ink">{w.reason}</div>
              <div className="text-[11.5px] text-muted">{`ออกเมื่อ ${certDate(w)} · มีผลถึง ${w.until}`}</div>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-[11.5px] text-muted">มีข้อสงสัยเรื่องใบเตือน ติดต่อ HR</p>
      </Fold>
    </div>
  );
}
