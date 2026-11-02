import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PATHS } from '@/routes/paths';
import { FEATURED_COUNT, NEWS, fullTitle } from '../data';
import { getHeroIdx, setHeroIdxStored } from '../newsStore';
import '../news.css';

const reduced = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
const pad = (i) => String(i).padStart(2, '0');
/** The hero cycles through the featured (newest) stories only. */
const wrapIndex = (i) => ((i % FEATURED_COUNT) + FEATURED_COUNT) % FEATURED_COUNT;

function HeroSlide({ index, offset }) {
  const navigate = useNavigate();
  const i = wrapIndex(index);
  const n = NEWS[i];
  const Icon = n.e;
  const shade = 'linear-gradient(100deg, rgba(8,16,20,.92) 8%, rgba(8,16,20,.4) 50%, rgba(8,16,20,.8) 100%)';
  const bg = n.img ? `url(${n.img}) center/cover` : `linear-gradient(120deg,#1C3A5C,${n.g[1]} 70%)`;
  return (
    <div className="absolute inset-0" style={{ transform: `translateX(${offset * 100}%)` }}>
      <div className="absolute inset-0 z-0" style={{ background: `${shade},${bg}` }} />
      <div className="pointer-events-none relative z-[1] mx-auto max-w-[1000px] px-6 pb-[86px] pt-[170px] max-[700px]:px-[18px] max-[700px]:pb-[68px] max-[700px]:pt-[116px]">
        <div className="mb-3 flex max-w-[600px] items-start gap-[10px] text-[21px] font-bold tracking-[-.01em] max-[700px]:text-[17px]">
          <span><Icon className="lc" /></span>
          <span className="line-clamp-2 min-w-0">{fullTitle(n)}</span>
        </div>
        <p className="mb-[18px] line-clamp-3 max-w-[560px] text-[13.5px] leading-[1.8] opacity-85">{n.d}</p>
        <button
          className="pointer-events-auto mb-[14px] rounded-ctl border-none bg-teal-bright hover:!bg-teal-hover transition-colors duration-200 px-[22px] py-[10px] text-[13px] font-semibold text-white"
          onClick={() => navigate(PATHS.newsDetail(i))}
        >
          อ่านต่อ <ChevronRight className="lc !h-[1.05em] !w-[1.05em] !align-[-.2em]" />
        </button>
        <div className="text-[11.5px] opacity-70">{`วันที่เผยแพร่: ${n.date}`}</div>
      </div>
    </div>
  );
}

/**
 * Full-width news hero: auto-advancing slides with arrows, dots and drag/swipe.
 * Dots match the home leave card (long #12986F pill for the current one); arrows match the calendar.
 * The current slide is remembered between the home and News pages.
 */
export default function HeroSlider({ className = '' }) {
  const [idx, setIdxState] = useState(getHeroIdx);
  const [shift, setShift] = useState(0); // px offset of the track
  const [dragging, setDragging] = useState(false);
  const barRef = useRef(null);
  const busy = useRef(false);
  const timer = useRef(0);
  const drag = useRef({ on: false, startX: 0, dx: 0 });
  const total = FEATURED_COUNT;

  const setIdx = useCallback((i) => { const t = wrapIndex(i); setHeroIdxStored(t); setIdxState(t); setShift(0); }, []);

  const stopAuto = useCallback(() => { clearInterval(timer.current); timer.current = 0; }, []);
  const slideRef = useRef(null);
  const startAuto = useCallback(() => {
    stopAuto();
    if (reduced()) return;
    timer.current = setInterval(() => slideRef.current?.(1), 5000);
  }, [stopAuto]);

  /** Animate one slide in direction dir (1 = next, -1 = previous). */
  const slide = useCallback((dir, delay = 360) => {
    const bar = barRef.current;
    if (!bar || busy.current) return;
    if (reduced()) { setIdx(getHeroIdx() + dir); return; }
    busy.current = true;
    stopAuto();
    setShift(-dir * bar.offsetWidth);
    setTimeout(() => {
      busy.current = false;
      if (!barRef.current) return;
      setIdx(getHeroIdx() + dir);
      startAuto();
    }, delay);
  }, [setIdx, startAuto, stopAuto]);
  slideRef.current = slide;

  const goTo = (i) => {
    const t = wrapIndex(i);
    if (t === idx) return;
    const fwd = (t - idx + total) % total;
    if (fwd === 1) { slide(1); return; }
    if (fwd === total - 1) { slide(-1); return; }
    setIdx(t);
    startAuto();
  };

  useEffect(() => { startAuto(); return stopAuto; }, [startAuto, stopAuto]);

  // --- drag / swipe ---
  const onPointerDown = (e) => {
    if (busy.current) return;
    drag.current = { on: true, startX: e.clientX, dx: 0 };
    setDragging(true);
    stopAuto();
  };
  const onPointerMove = (e) => {
    if (!drag.current.on) return;
    drag.current.dx = e.clientX - drag.current.startX;
    setShift(drag.current.dx);
  };
  const release = () => {
    if (!drag.current.on) return;
    drag.current.on = false;
    setDragging(false);
    const { dx } = drag.current;
    if (Math.abs(dx) > 60) {
      slide(dx < 0 ? 1 : -1, 340);
    } else {
      setShift(0);
      startAuto();
    }
  };

  return (
    <div
      ref={barRef}
      className={`relative left-1/2 -ml-[50vw] mb-[34px] h-[630px] min-h-[630px] w-screen touch-pan-y select-none overflow-hidden text-white ${dragging ? 'cursor-grabbing' : 'cursor-grab'} ${className}`}
      onMouseEnter={stopAuto}
      onMouseLeave={startAuto}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={release}
      onPointerCancel={release}
      onPointerLeave={() => drag.current.on && release()}
    >
      <div
        key={idx}
        className={`news-herotrack absolute inset-0 z-0 ${dragging ? 'dragging' : ''}`}
        style={{ transform: `translateX(${shift}px)` }}
      >
        <HeroSlide index={idx - 1} offset={-1} />
        <HeroSlide index={idx} offset={0} />
        <HeroSlide index={idx + 1} offset={1} />
      </div>
      <div className="pointer-events-none absolute left-1/2 top-0 z-[2] w-full max-w-[1000px] -translate-x-1/2 px-6 pt-[60px] max-[700px]:px-[18px] max-[700px]:pt-8">
        <div className="text-xs font-bold tracking-[.22em] opacity-80">WELCOME TO</div>
        <div className="mb-[30px] mt-[2px] text-[46px] font-extrabold uppercase leading-[1.02] tracking-[-.01em] text-[#BCD85F] max-[700px]:text-[27px]">TERRABITHIA</div>
      </div>
      <div className="absolute right-[26px] top-[26px] z-[3] text-[13px] font-bold tracking-[.04em] max-[700px]:right-[18px] max-[700px]:top-[18px]">
        {pad(idx + 1)}<span className="font-medium opacity-55"> / {pad(total)}</span>
      </div>
      <div className="absolute bottom-[22px] right-6 z-[3] flex items-center gap-[14px] max-[700px]:bottom-[14px] max-[700px]:left-0 max-[700px]:right-0 max-[700px]:justify-center">
        <ArrowButton onClick={() => goTo(idx - 1)} label="ก่อนหน้า"><ChevronLeft className="lc !h-[60%] !w-[60%]" /></ArrowButton>
        <div className="flex gap-[6px]">
          {NEWS.slice(0, FEATURED_COUNT).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`ข่าวที่ ${i + 1}`}
              aria-current={i === idx}
              onClick={() => goTo(i)}
              className={`h-2 cursor-pointer rounded-full border-0 p-0 transition-[width,background-color] duration-300 ${i === idx ? 'w-5 bg-teal-hover' : 'w-2 bg-white/80 hover:bg-white'}`}
            />
          ))}
        </div>
        <ArrowButton onClick={() => goTo(idx + 1)} label="ถัดไป"><ChevronRight className="lc !h-[60%] !w-[60%]" /></ArrowButton>
      </div>
    </div>
  );
}

/** Same as the home calendar's month arrows: green outline circle, solid #12986F with a white arrow on hover. */
function ArrowButton({ onClick, label, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border-2 border-teal-bright bg-transparent text-teal-bright transition-colors duration-200 hover:border-teal-hover hover:bg-teal-hover hover:!text-white max-[700px]:h-9 max-[700px]:w-9"
    >
      {children}
    </button>
  );
}
