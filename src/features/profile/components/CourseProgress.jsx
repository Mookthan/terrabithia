import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import GaugeRow from '@/features/courses/components/GaugeRow';
import { PATHS } from '@/routes/paths';

/** Same course gauges as the Courses page, on the cream page background (white track, cream centre), above leave entitlements. */
export default function CourseProgress() {
  return (
    <section className="mb-[38px] text-[14px]">
      <div className="mb-5 flex items-center justify-between gap-3 max-[640px]:px-1">
        <h2 className="m-0 text-[19px] font-bold text-ink max-[640px]:text-[17px]">ความคืบหน้าคอร์สเรียน</h2>
        <Link to={PATHS.courses} className="inline-flex shrink-0 items-center gap-1 rounded-ctl bg-teal-bright px-4 py-2 text-[13.5px] font-semibold text-white no-underline transition-colors hover:bg-teal-hover">
          ดูคอร์สเรียน<ChevronRight className="lc !h-4 !w-4" aria-hidden="true" />
        </Link>
      </div>
      <GaugeRow className="mb-0" />
    </section>
  );
}
