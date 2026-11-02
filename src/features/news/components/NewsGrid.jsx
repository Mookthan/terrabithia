import NewsCard from './NewsCard';

const COLS = {
  3: 'grid grid-cols-3 gap-6 max-[1000px]:grid-cols-2 max-[620px]:grid-cols-1',
  4: 'grid grid-cols-4 gap-5 max-[1100px]:grid-cols-3 max-[820px]:grid-cols-2 max-[620px]:grid-cols-1',
};

/** Responsive grid of news cards. `items` is a list of { n, i } (news + its index); `cols` is 3 or 4 on wide screens; `pin` shows pin controls. */
export default function NewsGrid({ items, cols = 3, pin = false }) {
  return (
    <div className={COLS[cols]}>
      {items.map(({ n, i }) => <NewsCard key={i} news={n} index={i} pin={pin} />)}
    </div>
  );
}
