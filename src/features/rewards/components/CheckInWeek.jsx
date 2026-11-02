import { Check, Coins } from 'lucide-react';
import { earn, useCoins } from '../coinStore';
import { ruleOf } from '../data';

const DAYS = ['จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.', 'อา.'];

/**
 * Shopee-style daily check-in strip for this week (Mon–Sun). Days before today show as collected
 * (mock until the back office keeps the real log). This is the only place to check in: the button or
 * today's box collects it, so staff come to the rewards page each day. Later days are dimmed.
 */
export default function CheckInWeek() {
  const { today } = useCoins();
  const pts = ruleOf('checkin').pts;
  const todayIdx = (new Date().getDay() + 6) % 7; // Monday = 0
  const doneToday = (today.checkin || 0) > 0;

  return (
    <div className="flex min-w-0 flex-1 flex-col justify-center rounded-box bg-white px-5 py-4 shadow-card max-[480px]:px-3">
      <div className="mb-3 flex items-center justify-between gap-2">
        <b className="text-[14.5px] text-ink">เช็กอินรายวัน</b>
        {!doneToday && (
          <button type="button" onClick={() => earn('checkin')} className="cursor-pointer rounded-ctl border-0 bg-teal-bright px-3.5 py-1.5 text-[12.5px] font-semibold text-white transition-colors duration-200 hover:!bg-teal-hover">
            {`รับ +${pts} เหรียญ`}
          </button>
        )}
      </div>
      <ol className="m-0 grid list-none grid-cols-7 gap-1.5 p-0 max-[480px]:gap-1">
        {DAYS.map((d, i) => {
          const isToday = i === todayIdx;
          const got = i < todayIdx || (isToday && doneToday);
          return (
            <li key={d} className="flex flex-col items-center gap-1">
              <button
                type="button"
                disabled={!isToday || doneToday}
                onClick={() => earn('checkin')}
                aria-label={isToday && !doneToday ? `เช็กอินวันนี้ รับ ${pts} เหรียญ` : undefined}
                className={`flex w-full flex-col items-center rounded-ctl border-0 py-1.5 text-[11.5px] font-bold transition-colors disabled:cursor-default ${
                  isToday && !doneToday ? 'cursor-pointer hover:bg-[#FFE9B0] ' : ''
                }${
                  got ? 'bg-teal-soft text-teal-hover' : isToday ? 'bg-[#FFF3D6] text-[#9A6B00] ring-2 ring-inset ring-[#F2C14E]' : 'bg-cream text-muted'
                }`}
              >
                <span className={`grid h-7 w-7 place-items-center rounded-full ${got ? 'bg-teal-bright text-white' : 'bg-white'}`}>
                  {got ? <Check className="lc !h-4 !w-4" strokeWidth={3} aria-hidden="true" /> : <Coins className={`lc !h-4 !w-4 ${isToday ? 'text-[#E0A800]' : 'text-faint'}`} aria-hidden="true" />}
                </span>
                {`+${pts}`}
              </button>
              <span className={`text-[11px] ${isToday ? 'font-bold text-ink' : 'text-muted'}`}>{isToday ? 'วันนี้' : d}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
