import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { PATHS } from '@/routes/paths';
import HeroSlider from '@/features/news/components/HeroSlider';
import NewsGrid from '@/features/news/components/NewsGrid';
import { HOME_NEWS_COUNT, NEWS } from '@/features/news/data';

/** Signed-out home: news hero slider and the latest news cards. */
export default function HomePublic() {
  const navigate = useNavigate();
  return (
    <>
      <HeroSlider className="-mt-7" />
      <div className="mb-[18px] flex flex-wrap items-center justify-between gap-[10px]">
        <h2 className="text-[19px] font-bold text-ink">ข่าวสารบริษัทและกิจกรรมล่าสุด</h2>
        <button
          className="cursor-pointer rounded-ctl border-none bg-teal-bright hover:!bg-teal-hover transition-colors duration-200 px-4 py-[9px] text-[12.5px] font-semibold text-white"
          onClick={() => navigate(PATHS.news)}
        >
          ดูเพิ่มเติม <ChevronRight className="lc !h-[1.05em] !w-[1.05em] !align-[-.2em]" />
        </button>
      </div>
      <NewsGrid items={NEWS.slice(0, HOME_NEWS_COUNT).map((n, i) => ({ n, i }))} cols={4} />
    </>
  );
}
