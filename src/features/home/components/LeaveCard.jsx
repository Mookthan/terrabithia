import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HOME_LEAVE, LEAVE_TONES, fmtDays } from '@/data/leave';
import { PATHS } from '@/routes/paths';
import LeaveBar from '@/components/leave/LeaveBar';
import useRotate from '../hooks/useRotate';
import DashCard from './DashCard';
import CountUp from '@/components/ui/CountUp';

/** Seconds each leave type stays on the card. */
const STEP_MS = 4000;

/**
 * Leave balances as the profile's bar cards, cycling through the HOME_LEAVE types.
 * Hover or focus pauses it; the dots jump to a type. The card links to the leave section of the profile.
 */
export default function LeaveCard() {
  const navigate = useNavigate();
  const [hold, setHold] = useState(false);
  const [idx, setIdx] = useRotate(HOME_LEAVE.length, STEP_MS, hold);
  const leave = HOME_LEAVE[idx];
  const go = () => navigate(PATHS.profileLeave);

  return (
    <DashCard
      i={1} dx="0px" dy="-80px" rot="4deg"
      role="link" tabIndex={0} aria-label="ดูสิทธิ์วันลาทั้งหมด"
      data-cursor="ดูวันลา"
      data-cursor-icon="leave"
      onClick={go}
      onKeyDown={(e) => e.key === 'Enter' && go()}
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={() => setHold(false)}
      style={{ backgroundColor: LEAVE_TONES[idx % LEAVE_TONES.length] }}
      className="flex min-h-[266px] cursor-pointer flex-col justify-between gap-5 px-[22px] pb-5 pt-[26px] text-ink outline-none transition-[translate,box-shadow,background-color] duration-[250ms] hover:[translate:0_-4px] hover:!shadow-pop focus-visible:[translate:0_-4px] max-[640px]:order-2 motion-reduce:transition-none"
    >
      <div key={leave.l} className="home-lv-in flex flex-1 flex-col justify-between gap-5" aria-live="polite">
        <div className="flex items-start justify-between gap-3">
          <div className="text-[26px] font-medium leading-[1.3] max-[640px]:text-[22px]">{leave.l}</div>
          <div className="shrink-0 text-right">
            <small className="block text-[14px] leading-[1.1]">เหลือ</small>
            <b className="block whitespace-nowrap text-[60px] font-semibold leading-none max-[640px]:text-[48px]"><CountUp value={leave.r} format={fmtDays} duration={700} /></b>
            <small className="block text-[14px] leading-[1.1]">{leave.u}</small>
          </div>
        </div>
        <LeaveBar leave={leave} />
      </div>
      <div className="flex justify-center gap-1.5">
        {HOME_LEAVE.map((l, i) => (
          <button
            key={l.l}
            type="button"
            aria-label={l.l}
            aria-current={i === idx || undefined}
            onClick={(e) => { e.stopPropagation(); setIdx(i); }}
            className={`h-2 cursor-pointer rounded-full border-0 p-0 transition-[width,background-color] duration-300 ${i === idx ? 'w-5 bg-teal-hover' : 'w-2 bg-white/80 hover:bg-white'}`}
          />
        ))}
      </div>
    </DashCard>
  );
}
