import { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { CAL_DOW, MEMORIES, calEvents } from '../data';
import useNow from '../hooks/useNow';
import DashCard from './DashCard';
import MemoriesModal from './memories/MemoriesModal';
import MemoryStack from './memories/MemoryStack';

const MON = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

/** Today's weekday, live clock (sun/moon), date, today's calendar events and, when there are any, "on this day" memories. */
export default function TodayCard() {
  const now = useNow();
  const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  const day = now.getHours() >= 6 && now.getHours() < 18;
  const evs = calEvents(now.getDate(), now.getMonth(), now.getFullYear()).filter((e) => e.t);
  const [memOpen, setMemOpen] = useState(false);
  return (
    <DashCard
      i={2} dx="80px" dy="-30px" rot="5deg"
      className="flex min-h-[266px] flex-col justify-between bg-cream px-5 pb-[18px] pt-4 text-ink max-[640px]:order-3"
    >
      <div className="flex items-center justify-between text-[40px] font-medium leading-[1.1] max-[640px]:text-[32px]">
        <span>{CAL_DOW[now.getDay()]}</span>
        <span className="inline-flex items-center gap-2" data-nt>
          {day
            ? <Sun className="lc !h-[.8em] !w-[.8em] text-[#E8A317]" />
            : <Moon className="lc !h-[.8em] !w-[.8em] text-[#4C6FA8]" />}
          <span>{time}</span>
        </span>
      </div>
      <div className="-mt-[6px] flex items-baseline gap-2">
        <b className="text-[76px] font-semibold leading-none max-[640px]:text-[60px]">{now.getDate()}</b>
        <span className="text-[21px]">{MON[now.getMonth()]}</span>
      </div>
      <div className="flex items-end justify-between gap-3">
        <div className="flex flex-wrap gap-x-[18px] gap-y-[6px] text-xs">
          {evs.map((e, k) => (
            <span key={k} className="flex items-center gap-[6px]">
              <i className="inline-block h-[14px] w-[14px] rounded-full" style={{ background: e.c }} />{e.t}
            </span>
          ))}
        </div>
        {MEMORIES.length > 0 && <MemoryStack items={MEMORIES} onOpen={() => setMemOpen(true)} />}
      </div>
      {memOpen && <MemoriesModal items={MEMORIES} date={now} onClose={() => setMemOpen(false)} />}
    </DashCard>
  );
}
