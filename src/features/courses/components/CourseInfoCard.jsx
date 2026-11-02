import { useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { useUI } from '@/context/UIContext';
import { COURSE_FACTS, CRS_TYPES } from '../data';
import { courseLength } from '../format';
import { audienceLabel } from '../access';
import useFixedCard from '../hooks/useFixedCard';
import Stars from './Stars';
import '../courses.css';

/** Frosted summary card on the right of a course page (fixed while scrolling on desktop). */
export default function CourseInfoCard({ course }) {
  const { toast } = useUI();
  const phRef = useRef(null);
  const cardRef = useRef(null);
  useFixedCard(phRef, cardRef);

  const facts = [['ประเภท:', CRS_TYPES[course.t].d], ['ระยะเวลาเรียน:', courseLength(course.mins)], ['เปิดให้:', audienceLabel(course)], ...COURSE_FACTS];
  return (
    <div ref={phRef} className="min-h-[360px] max-[900px]:-order-1 max-[900px]:mb-[22px] max-[900px]:min-h-0">
      <aside
        ref={cardRef}
        className="crs-glass z-[5] overflow-auto rounded-box border border-white/70 px-[22px] pb-[22px] pt-6 shadow-card"
      >
        <h2 className="text-[21px] font-semibold leading-[1.35] text-ink">{course.ti}</h2>
        <div className="mb-2.5 mt-2 flex items-center gap-2">
          <Stars n={4} />
          <b className="text-[12px]">4.0 (50 รีวิว)</b>
        </div>
        <p className="text-[12px] leading-[1.7] text-ink">{course.d}</p>
        <h3 className="mb-2 mt-3.5 text-[17px] font-semibold text-ink">รายละเอียด</h3>
        <dl className="grid grid-cols-[120px_1fr] gap-x-2.5 gap-y-1.5 text-[12.5px] text-ink max-[640px]:grid-cols-1">
          {facts.map(([dt, dd]) => (
            <div key={dt} className="contents">
              <dt>{dt}</dt>
              <dd>{dd}</dd>
            </div>
          ))}
        </dl>
        <button
          type="button"
          onClick={() => toast('เริ่มเรียน (ต้นแบบ — ยังไม่เชื่อมระบบเรียนจริง)')}
          className="mt-4 w-full rounded-ctl bg-teal-bright hover:!bg-teal-hover p-[13px] text-[16px] font-semibold text-white transition-colors duration-200"
        >
          เริ่มเรียน <ChevronRight className="lc" />
        </button>
      </aside>
    </div>
  );
}
