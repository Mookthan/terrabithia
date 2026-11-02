import { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { likeCount, useNewsState } from '../newsStore';
import Comments from './Comments';
import LikeSummary from './LikeSummary';
import LikersModal from './LikersModal';
import ReactButton from './ReactButton';
import '../news.css';

const btn = 'inline-flex cursor-pointer items-center gap-[7px] rounded-ctl border-0 bg-none px-[10px] py-[6px] text-sm transition-[background,color] duration-200 hover:bg-teal-veil hover:!text-teal-hover';

/** Reaction + comment bar under an article, the "liked by" line and the comment box. */
export default function NewsActions({ index }) {
  const { liked, comments } = useNewsState();
  const [cmOpen, setCmOpen] = useState(false);
  const [likersOpen, setLikersOpen] = useState(false);

  return (
    <>
      <div className="mb-[10px] mt-[22px] flex items-center gap-[22px]">
        <ReactButton index={index} total={likeCount(liked, index)} className={`${btn} text-teal-bright`} />
        <button
          className={`${btn} text-teal-bright ${cmOpen ? 'bg-teal-veil' : ''}`}
          onClick={() => setCmOpen((o) => !o)}
          aria-expanded={cmOpen}
        >
          <MessageCircle className="lc !h-[21px] !w-[21px]" /><span>แสดงความคิดเห็น</span>
          <b className="text-[13px] font-semibold text-ink">{(comments[index] || []).length}</b>
          <ChevronDown className={`lc !h-4 !w-4 text-teal-bright transition-transform duration-300 ${cmOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
        </button>
      </div>
      <div className="mx-[10px] mb-[6px] mt-[2px] min-h-[22px]">
        <LikeSummary index={index} onOpen={() => setLikersOpen(true)} />
      </div>
      <Comments index={index} open={cmOpen} />
      {likersOpen && <LikersModal index={index} onClose={() => setLikersOpen(false)} />}
    </>
  );
}
