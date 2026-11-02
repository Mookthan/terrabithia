import TypePill from './TypePill';
import { ICON_BTN } from '@/components/ui/iconButton';
import LikeHeart from '@/components/ui/LikeHeart';
import { courseLength } from '../format';
import HoverVeil from '@/components/ui/HoverVeil';

/** Course tile in the catalogue grid. */
export default function CourseCard({ course, fav, onToggleFav, onOpen }) {
  return (
    <div
      data-reveal
      tabIndex={0}
      role="button"
      data-cursor="ดูคอร์ส"
      data-cursor-icon="course"
      onClick={onOpen}
      onKeyDown={(e) => e.key === 'Enter' && onOpen()}
      className="crs-card group flex cursor-pointer flex-col rounded-box bg-white px-3 pb-3.5 pt-3 shadow-card outline-none transition-[transform,box-shadow] duration-[.25s] ease-[ease] hover:-translate-y-1 hover:shadow-pop focus-visible:-translate-y-1 focus-visible:shadow-pop motion-reduce:transition-none"
    >
      <div className="relative aspect-video overflow-hidden rounded-ctl bg-[#eee]">
        <img src={course.img} alt="" className="block h-full w-full object-cover transition-transform duration-500 ease-[ease] group-hover:scale-105 motion-reduce:transition-none" />
        <HoverVeil />
      </div>
      <div className="mb-2 mt-2.5 flex items-center justify-between">
        <span>
          <TypePill type={course.t} small />
          <TypePill type="dept" label={course.tag} small />
        </span>
        <button
          type="button"
          aria-label="ถูกใจ"
          aria-pressed={fav}
          onClick={(e) => { e.stopPropagation(); onToggleFav(); }}
          className={`${ICON_BTN} h-9 w-9 text-[22px] leading-none text-teal-bright`}
        >
          <LikeHeart on={fav} />
        </button>
      </div>
      {/* Like the news cards: title and description fixed at 2 lines each so every card lines up; the date sits at the bottom. */}
      <h3 className="line-clamp-2 min-h-[3em] text-[14.5px] font-bold leading-[1.5] text-ink transition-colors duration-200 group-hover:text-teal-hover group-focus-visible:text-teal-hover">{course.ti}</h3>
      <p className="mb-3.5 mt-2 line-clamp-2 min-h-[3.4em] text-[11.5px] leading-[1.7] text-muted">{course.d}</p>
      <div className="mt-auto text-[11px] text-ink">{`วันที่อัปเดต: ${course.upd}`}</div>
      {/* Revealed on hover, like the news cards' reading time. */}
      <div className="crs-meta">
        <div className="flex items-center gap-[7px] text-[12.5px] text-ink">
          <i className="h-[9px] w-[9px] flex-none rounded-full bg-[linear-gradient(135deg,#27AE97,#7AAEFC)]" />
          <span>{`เรียนประมาณ ${courseLength(course.mins)}`}</span>
        </div>
      </div>
    </div>
  );
}
