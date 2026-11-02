import LikeHeart from '@/components/ui/LikeHeart';
import { toggleFav, useNewsState } from '../newsStore';

/** Card heart: keeps the story for the "hearted only" filter (separate from the article's emoji reactions). */
export default function HeartButton({ index }) {
  const { faved } = useNewsState();
  const on = !!faved[index];
  return (
    <button
      className={`news-heart inline-flex items-center gap-[6px] rounded-full border-0 bg-transparent p-1.5 text-teal-bright transition-colors duration-200 hover:bg-teal-veil ${on ? 'on' : ''}`}
      onClick={(e) => { e.stopPropagation(); toggleFav(index); }}
      aria-label="เก็บข่าวนี้ไว้"
      aria-pressed={on}
    >
      <LikeHeart on={on} iconClassName="!h-5 !w-5" />
    </button>
  );
}
