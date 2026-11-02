import LikeHeart from '@/components/ui/LikeHeart';
import ReactionBar from '@/components/ui/ReactionBar';
import useReactionPicker from '@/components/ui/useReactionPicker';
import { reactionOf, reactionsFor } from '@/data/reactions';
import { NEWS } from '../data';
import { react, toggleLike, useNewsState } from '../newsStore';

/**
 * Facebook-style like under an article: click = 👍 (or remove mine), hover / long-press opens the emoji bar.
 * Shows my reaction's name and the total.
 */
export default function ReactButton({ index, total, className = '' }) {
  const { liked } = useNewsState();
  const mine = liked[index];
  const list = reactionsFor(NEWS[index]);
  const r = mine && reactionOf(mine, list);
  const { ref, open, close, wrapProps, pressProps, tap } = useReactionPicker();
  const pick = (e) => { react(index, e); close(); };

  return (
    <span ref={ref} className="relative inline-flex" {...wrapProps}>
      {open && (
        <ReactionBar
          mine={mine}
          list={list}
          onPick={pick}
          className="rx-pop absolute bottom-[calc(100%+4px)] left-0 z-[20]"
        />
      )}
      <button
        type="button"
        {...pressProps}
        onClick={tap(() => toggleLike(index, list[0].e))}
        aria-pressed={!!mine}
        aria-haspopup="true"
        className={`news-heart touch-manipulation select-none ${r ? 'on' : ''} ${className}`}
        style={r ? { color: r.c } : undefined}
      >
        {(mine && mine !== '❤️') || (!mine && list[0].e !== '👍')
          ? <span className="rx-pick text-[20px] leading-none" aria-hidden="true">{mine || list[0].e}</span>
          : <LikeHeart on={!!mine} iconClassName="!h-[21px] !w-[21px]" />}
        <span className={r ? 'font-semibold' : ''}>{r ? r.l : list[0].l}</span>
        {total != null && <b className="text-[13px] font-semibold text-ink">{total}</b>}
      </button>
    </span>
  );
}
