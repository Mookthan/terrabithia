import SectionBar from '@/components/ui/SectionBar';
import MissionCard from './components/MissionCard';
import { MISSION, MISSION_LEAD, MISSION_STYLE } from './data';
import './about.css';

export default function MissionPage() {
  return (
    <>
      <SectionBar section="About us" title="Mission" />
      <div className="pb-16 pt-6">
        <h2 className="mis-in mb-5 text-center whitespace-nowrap text-[clamp(18px,4.6vw,44px)] font-bold leading-[1.25] text-accent" style={{ '--i': 0 }}>
          “<span>ส่งมอบบริการที่เหนือความคาดหมาย</span>”
        </h2>
        <p className="mis-in mx-auto mb-14 max-w-[760px] text-center text-[16px] leading-[1.75] text-ink max-[560px]:mb-10 max-[560px]:text-[14px]" style={{ '--i': 0 }}>
          <b>{MISSION_LEAD.b}</b>{MISSION_LEAD.t}
        </p>
        <ol className="mx-auto grid max-w-[1000px] grid-cols-3 gap-x-7 gap-y-4 p-0 max-[760px]:max-w-[320px] max-[760px]:grid-cols-1">
          {MISSION.map((m, i) => <MissionCard key={m.n} m={m} i={i + 1} {...MISSION_STYLE[i]} />)}
        </ol>
      </div>
    </>
  );
}
