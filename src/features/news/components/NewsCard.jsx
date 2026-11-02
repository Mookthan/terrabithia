import { useRef } from 'react';
import { Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/routes/paths';
import { newsBg } from '../data';
import { useNewsState, viewCount } from '../newsStore';
import HeartButton from './HeartButton';
import PinButton from './PinButton';
import '../news.css';
import HoverVeil from '@/components/ui/HoverVeil';

const canTilt = () => window.matchMedia('(hover:hover) and (pointer:fine)').matches
  && !window.matchMedia('(prefers-reduced-motion:reduce)').matches;

/** News teaser card: image, team tag + (pin) + like, title, 3-line excerpt, date and views (the team shows only in the tag). `pin` shows the pin control (News page only). */
export default function NewsCard({ news: n, index, reveal = true, pin = false, className = '' }) {
  const navigate = useNavigate();
  const { views } = useNewsState();
  const tilt = useRef(null);
  const Icon = n.e;

  const onPointerMove = (e) => {
    const t = tilt.current;
    if (!t || e.pointerType === 'touch' || !canTilt()) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    t.classList.add('tilting');
    t.style.setProperty('--ry', `${(x * 9).toFixed(2)}deg`);
    t.style.setProperty('--rx', `${(-y * 9).toFixed(2)}deg`);
  };
  const onPointerLeave = () => {
    const t = tilt.current;
    if (!t) return;
    t.classList.remove('tilting');
    t.style.setProperty('--rx', '0deg');
    t.style.setProperty('--ry', '0deg');
  };

  return (
    <div
      data-reveal={reveal ? '' : undefined}
      className={`news-card group cursor-pointer rounded-box [perspective:1300px] ${className}`}
      data-cursor="อ่านข่าว"
      onClick={() => navigate(PATHS.newsDetail(index))}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div
        ref={tilt}
        className="news-tilt flex h-full flex-col overflow-hidden rounded-box bg-white shadow-card group-hover:shadow-pop"
      >
        <div
          className="news-img relative flex h-[170px] items-center justify-center overflow-hidden bg-cover bg-[center_30%] bg-no-repeat text-[36px] text-white transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.06]"
          style={newsBg(n)}
        >
          {!n.img && <Icon className="lc news-noimg-ic" />}
          <HoverVeil />
        </div>
        <div className="flex flex-1 flex-col px-[18px] py-4">
          <div className="mb-[10px] flex items-center justify-between">
            <span className="rounded-full bg-mint px-[11px] py-1 text-[11px] font-semibold text-[#0F6B53]">{n.tag}</span>
            <span className="flex items-center">
              {pin && <PinButton index={index} />}
              <HeartButton index={index} />
            </span>
          </div>
          {/* Title fixed at 2 lines and excerpt at 3 so every card lines up; the date sits at the bottom. */}
          <div className="mb-[10px] mt-1 line-clamp-2 min-h-[2.9em] text-[14.5px] font-semibold leading-[1.45] text-ink transition-colors duration-200 group-hover:text-teal-hover">{n.t}</div>
          <div className="mb-[10px] line-clamp-3 min-h-[5.1em] text-[12.5px] leading-[1.7] text-muted">{n.d}</div>
          <div className="mt-auto flex items-center justify-between gap-2 text-[11.5px] text-muted">
            <span>{`วันที่เผยแพร่: ${n.date}`}</span>
            <span className="inline-flex items-center gap-1" title="ยอดดู">
              <Eye className="h-3.5 w-3.5" aria-hidden="true" />{viewCount(views, index).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
