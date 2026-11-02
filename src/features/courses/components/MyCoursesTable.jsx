import { CircleCheck, CircleX, Clock } from 'lucide-react';
import { CRS_STATUS, MY_COURSES } from '../data';
import TypePill from './TypePill';
import '../courses.css';
import EmptyState from '@/components/ui/EmptyState';

const STATUS_ICON = { 'circle-check': CircleCheck, clock: Clock, 'circle-x': CircleX };

/** The signed-in user's assigned courses, filtered by name and type. */
export default function MyCoursesTable({ query, filter }) {
  const q = query.toLowerCase();
  const rows = MY_COURSES
    .map((c, i) => ({ c, i }))
    .filter(({ c }) => (filter === 'all' || c.t === filter) && c.n.toLowerCase().includes(q));

  return (
    <div className="mx-auto max-w-[900px] overflow-x-auto rounded-box shadow-card max-[640px]:overflow-visible max-[640px]:rounded-none max-[640px]:shadow-none">
      <div className="min-w-[640px] overflow-hidden rounded-box bg-white max-[640px]:grid max-[640px]:min-w-0 max-[640px]:gap-2.5 max-[640px]:overflow-visible max-[640px]:bg-transparent">
        <div className="crs-mtr crs-mth">
          <span>ลำดับ</span><span>คอร์ส</span><span>ประเภท</span><span>ช่วงเวลา</span><span>สถานะ</span>
        </div>
        {rows.length ? rows.map(({ c, i }) => {
          const S = CRS_STATUS[c.s];
          const Icon = STATUS_ICON[S.i];
          return (
            <div key={c.n} className="crs-mtr">
              <span>{`${i + 1}.`}</span>
              <span>{c.n}</span>
              <span><TypePill type={c.t} /></span>
              <span>{c.p}</span>
              <span className="flex items-center gap-1.5 font-semibold" style={{ color: S.c }}>
                <Icon className="lc !h-4 !w-4" />{S.l}
              </span>
            </div>
          );
        }) : <EmptyState>ไม่พบคอร์ส</EmptyState>}
      </div>
    </div>
  );
}
