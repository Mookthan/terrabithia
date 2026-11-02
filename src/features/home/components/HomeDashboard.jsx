import { useRef } from 'react';
import BirthdayWidget from '@/features/birthday/BirthdayWidget';
import useMobileReveal from '../hooks/useMobileReveal';
import Announcements from './Announcements';
import CacTeamCard from './CacTeamCard';
import Calendar from './Calendar';
import LeaveCard from './LeaveCard';
import ProfileCard from './ProfileCard';
import TodayCard from './TodayCard';

/**
 * Signed-in home "bento": profile + leave/date stack, calendar and birthdays on the left,
 * announcements and the CAC team chart on the right. On phones the columns dissolve
 * (display: contents) and the cards are re-ordered by their own `order-*` classes.
 */
export default function HomeDashboard() {
  const rootRef = useRef(null);
  const mrev = useMobileReveal(rootRef);
  const col = 'flex min-w-0 flex-col gap-5 max-[640px]:contents';
  return (
    <div
      ref={rootRef}
      data-pt="none"
      className={`relative left-1/2 ml-[calc(min(1490px,100vw-40px)/-2)] grid w-[min(1490px,calc(100vw-40px))] grid-cols-[729fr_734fr] items-start gap-[23px] pt-2 max-[1000px]:grid-cols-1 max-[640px]:flex max-[640px]:flex-col max-[640px]:items-stretch max-[640px]:gap-5 ${mrev ? 'home-mrev' : ''}`}
    >
      <div className={col}>
        <div className="grid grid-cols-[343fr_361fr] gap-[25px] max-[640px]:contents">
          <ProfileCard />
          <div className="grid min-w-0 auto-rows-[1fr] grid-cols-[minmax(0,1fr)] gap-[21px] max-[640px]:contents">
            <LeaveCard />
            <TodayCard />
          </div>
        </div>
        <Calendar />
        <BirthdayWidget />
      </div>
      <div className={col}>
        <Announcements />
        <CacTeamCard />
      </div>
    </div>
  );
}
