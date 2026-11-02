import { useState } from 'react';
import { Lock } from 'lucide-react';
import { TEXT_LINK } from '@/components/ui/TextButton';
import { EVALUATIONS } from '../data';
import { evalLock, useEvalLock } from '../evalLock';
import EvalHistoryModal, { GRADE_TONE } from './EvalHistoryModal';

export const LINK_BTN = `${TEXT_LINK} text-[12.5px] font-semibold`;

/**
 * "ผลการประเมิน:" value in the work card. Hidden (●●● + lock) until the user re-enters their password,
 * like the password-protected email HR sends today; then shows the latest announced result and
 * "ดูย้อนหลัง" for every year. Shares its lock with the KPI scores (see evalLock).
 */
export default function EvalResult() {
  const { open } = useEvalLock();
  const [history, setHistory] = useState(false);
  const latest = EVALUATIONS.find((e) => !e.pending);

  return (
    <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
      {open ? (
        <>
          <span className="inline-flex items-center gap-1.5">
            <span className={`grid h-[22px] min-w-[22px] place-items-center rounded-full px-1 text-[11px] font-bold ${GRADE_TONE[latest.grade] || 'bg-cream text-ink'}`}>{latest.grade}</span>
            {`${latest.score.toFixed(1)} / 5 · ${latest.label} (${latest.y})`}
          </span>
          <button type="button" className={LINK_BTN} onClick={() => setHistory(true)}>ดูย้อนหลัง</button>
          <button type="button" className={LINK_BTN} onClick={evalLock.lock}>ซ่อน</button>
        </>
      ) : (
        <>
          <span className="inline-flex items-center gap-1.5 text-muted" aria-label="ซ่อนอยู่">
            <span className="tracking-[.15em]" aria-hidden="true">●●●</span>
            <Lock className="lc !h-[13px] !w-[13px]" aria-hidden="true" />
          </span>
          <button type="button" className={LINK_BTN} onClick={evalLock.ask}>ดูผล</button>
        </>
      )}
      {history && open && <EvalHistoryModal onClose={() => setHistory(false)} />}
    </span>
  );
}
