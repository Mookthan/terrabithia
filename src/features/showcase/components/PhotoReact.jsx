import ReactionBar from '@/components/ui/ReactionBar';
import useReactionPicker from '@/components/ui/useReactionPicker';
import { REACTIONS, reactionOf } from '@/data/reactions';
import { ME } from '@/data/me';
import { reactPhoto, usePhotoReactions } from '../photoReactions';

/**
 * Reactions under a photo in the big viewer (dark backdrop): the top emoji + total, and for other people's photos
 * a Facebook-style button (tap = 👍, hover / long-press = pick). Owners only see the summary.
 */
export default function PhotoReact({ owner, photoId }) {
  const { mine, top, total } = usePhotoReactions(owner, photoId);
  const { ref, open, close, wrapProps, pressProps, tap } = useReactionPicker();
  const r = mine && reactionOf(mine);
  const own = owner === ME.id;
  return (
    <div className="flex items-center gap-3 text-[13px] text-white">
      {total > 0 && (
        <span className="inline-flex items-center gap-1.5" aria-label={`${total} รีแอค`}>
          <span className="flex -space-x-1 text-[16px] leading-none">{top.slice(0, 3).map(([e]) => <span key={e}>{e}</span>)}</span>
          <b className="font-semibold">{total}</b>
        </span>
      )}
      {!own && (
        <span ref={ref} className="relative inline-flex" {...wrapProps}>
          {open && <ReactionBar mine={mine} onPick={(e) => { reactPhoto(owner, photoId, e); close(); }} className="rx-pop absolute bottom-[calc(100%+6px)] left-1/2 z-[5] -translate-x-1/2" />}
          <button
            type="button"
            {...pressProps}
            onClick={tap(() => reactPhoto(owner, photoId, REACTIONS[0].e))}
            aria-pressed={!!mine}
            aria-haspopup="true"
            className={`inline-flex cursor-pointer touch-manipulation select-none items-center gap-1.5 rounded-full border-[1.5px] px-3.5 py-1.5 text-[13px] font-semibold transition-colors ${mine ? 'border-white bg-white text-ink hover:bg-white/90' : 'border-white/50 bg-white/15 text-white hover:bg-white/30'}`}
          >
            <span className="text-[16px] leading-none" aria-hidden="true">{mine || REACTIONS[0].e}</span>
            {r ? r.l : REACTIONS[0].l}
          </button>
        </span>
      )}
    </div>
  );
}
