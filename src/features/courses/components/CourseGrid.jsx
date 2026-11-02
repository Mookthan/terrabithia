import { COURSES } from '../data';
import { canSee } from '../access';
import CourseCard from './CourseCard';
import EmptyState from '@/components/ui/EmptyState';

/** Courses this employee may see, filtered by text, type, skill categories and favourites. */
export default function CourseGrid({ query, filter, favs, onToggleFav, onOpen }) {
  const q = query.toLowerCase();
  const list = COURSES.filter((c) => canSee(c)
    && (filter.type === 'all' || c.t === filter.type)
    && (!filter.cats.length || filter.cats.includes(c.cat))
    && (!filter.fav || favs.includes(c.i))
    && `${c.ti} ${c.tag} ${c.d}`.toLowerCase().includes(q));
  return (
    <div className="mt-1.5 grid grid-cols-3 gap-6 max-[1000px]:grid-cols-2 max-[640px]:grid-cols-1">
      {list.length ? list.map((c) => (
        <CourseCard
          key={c.i}
          course={c}
          fav={favs.includes(c.i)}
          onToggleFav={() => onToggleFav(c.i)}
          onOpen={() => onOpen(c.i)}
        />
      )) : <EmptyState className="col-span-full py-[30px] text-[13px]">ไม่พบคอร์ส</EmptyState>}
    </div>
  );
}
