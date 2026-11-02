import { useState } from 'react';
import SectionBar from '@/components/ui/SectionBar';
import { useAuth } from '@/context/AuthContext';
import HeroSlider from './components/HeroSlider';
import NewsEmpty from './components/NewsEmpty';
import NewsGrid from './components/NewsGrid';
import NewsSearchRow from './components/NewsSearchRow';
import { matchNews, NEWS, newsTime } from './data';
import { engageCount, useNewsState, viewCount } from './newsStore';

const rank = (pinned, i) => { const p = pinned.indexOf(i); return p < 0 ? pinned.length : p; };
/** Higher first; ties keep the newer story first. */
const SCORE = {
  new: (s, n) => newsTime(n),
  views: (s, n, i) => viewCount(s.views, i),
  engage: (s, n, i) => engageCount(s, i),
};

/** News list: section bar, hero (signed in only), keyword search + filter and the card grid. */
export default function NewsPage() {
  const { loggedIn } = useAuth();
  const s = useNewsState();
  const { filter, faved, likedOnly, pinned, sort } = s;
  const score = ({ n, i }) => SCORE[sort](s, n, i);
  const [q, setQ] = useState('');
  const visible = NEWS.map((n, i) => ({ n, i }))
    .filter(({ n, i }) => (n.dept === null || filter[n.dept]) && (!likedOnly || faved[i]) && matchNews(n, q))
    // Pinned stories first, in pin order; the rest by the chosen sort.
    .sort((a, b) => rank(pinned, a.i) - rank(pinned, b.i) || score(b) - score(a) || newsTime(b.n) - newsTime(a.n));
  return (
    <>
      <SectionBar section="News" title="News" flush={loggedIn} />
      {loggedIn && <HeroSlider />}
      <NewsSearchRow q={q} onQ={setQ} />
      {visible.length ? <NewsGrid items={visible} cols={4} pin /> : <NewsEmpty q={q} />}
    </>
  );
}
