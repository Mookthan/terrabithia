import { forwardRef } from 'react';
import { NEWS } from '../data';
import NewsGrid from './NewsGrid';
import '../news.css';

/** How many other articles show under a story (mook, 2026-10-27: 3, static, no marquee). */
const OTHER_COUNT = 3;

/** Full-width white band with the first 3 other articles in News-page order (skipping the open one). */
const OtherNews = forwardRef(function OtherNews({ current }, ref) {
  const others = NEWS.map((n, i) => ({ n, i })).filter(({ i }) => i !== current).slice(0, OTHER_COUNT);
  return (
    <div ref={ref} className="relative left-1/2 -ml-[50vw] mt-9 w-screen bg-white pb-14 pt-[34px]">
      <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
        <div className="mb-[18px] text-[20px] font-bold text-ink">ข่าวอื่นๆ</div>
        <NewsGrid items={others} />
      </div>
    </div>
  );
});

export default OtherNews;
