import { useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { OUTLINE_HOVER } from '@/components/ui/TextButton';
import BackButton from '@/components/ui/BackButton';
import { PATHS } from '@/routes/paths';
import { ARTICLE_OUTRO, NEWS, fullTitle, publisher, wrapIndex } from './data';
import ArticleImage from './components/ArticleImage';
import NewsActions from './components/NewsActions';
import OtherNews from './components/OtherNews';
import { addView, useNewsState, viewCount } from './newsStore';

const chev = 'lc !h-[1.05em] !w-[1.05em] !align-[-.2em]';
const navBtn = 'cursor-pointer rounded-ctl px-[18px] py-[9px] text-[13px]';

/** One news article: photos, body, likes/comments, prev/next and other news. */
export default function NewsDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const idx = Number.parseInt(id, 10);
  const n = NEWS[idx];
  const { views } = useNewsState();
  useEffect(() => { if (NEWS[idx]) addView(idx); }, [idx]);
  if (!n) return <Navigate to={PATHS.news} replace />;
  const prev = wrapIndex(idx - 1);
  const next = wrapIndex(idx + 1);

  return (
    <>
      <div className="relative flex">
        <div className="relative z-[1] flex-1">
          <BackButton className="mb-[18px]" onClick={() => navigate(PATHS.news)} />
          <div className="mb-2 text-[23px] font-bold leading-[1.4] text-ink">{fullTitle(n)}</div>
          <div className="mb-5 text-[12.5px] text-muted">{`เผยแพร่โดย ${publisher(n)} เมื่อ ${n.date} · ดู ${viewCount(views, idx).toLocaleString()} ครั้ง`}</div>
          <ArticleImage news={n} likeIndex={n.condolence ? undefined : idx} className={n.poster ? 'mb-[22px] aspect-video' : 'mb-[22px] h-[300px] max-[620px]:h-[220px]'} />
          <div className="[&_p]:mb-4 [&_p]:text-[13.5px] [&_p]:leading-[1.9] [&_p]:text-ink">
            {n.body ? n.body.map((t) => <p key={t}>{t}</p>) : <><p>{n.d}</p><p>{ARTICLE_OUTRO}</p></>}
          </div>
          {!n.body && (
            <div className="my-5 grid grid-cols-2 gap-4 max-[620px]:grid-cols-1">
              <ArticleImage news={n} className="h-[200px]" />
              <ArticleImage news={n} className="h-[200px]" />
            </div>
          )}
          <NewsActions key={idx} index={idx} />
          <div className="mb-[10px] mt-6 flex justify-center gap-3">
            <button className={`${navBtn} border border-line bg-white text-ink ${OUTLINE_HOVER}`} onClick={() => navigate(PATHS.newsDetail(prev))}>
              <ChevronLeft className={chev} /> ย้อนกลับ
            </button>
            <button className={`${navBtn} border-none bg-teal-bright hover:!bg-teal-hover transition-colors duration-200 text-white`} onClick={() => navigate(PATHS.newsDetail(next))}>
              ถัดไป <ChevronRight className={chev} />
            </button>
          </div>
        </div>
      </div>
      <OtherNews current={idx} />
    </>
  );
}
