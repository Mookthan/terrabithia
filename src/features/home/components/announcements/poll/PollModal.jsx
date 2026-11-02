import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Check, Clock, Trophy } from 'lucide-react';
import useBodyLock from '@/hooks/useBodyLock';
import useTopEscape from '@/hooks/useTopEscape';
import useSingleOverlay from '@/hooks/useSingleOverlay';
import CloseButton from '@/components/ui/CloseButton';

/** Radio dot that turns into a green check when picked. */
function Dot({ on }) {
  return (
    <span className={`grid h-5 w-5 flex-none place-items-center rounded-full border-2 transition-colors duration-200 ${on ? 'border-teal-bright bg-teal-bright text-white' : 'border-line bg-white'}`}>
      {on && <Check size={12} strokeWidth={3.2} aria-hidden="true" />}
    </span>
  );
}

/** Share bar + count under each choice. */
function Bar({ n, total, win }) {
  const pct = total ? Math.round((n / total) * 100) : 0;
  return (
    <span className="mt-1.5 flex items-center gap-2 text-[11.5px] text-muted">
      <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-cream">
        <span className={`block h-full rounded-full transition-[width] duration-500 ${win ? 'bg-[#E0A800]' : 'bg-teal-bright'}`} style={{ width: `${pct}%` }} />
      </span>
      <span className="w-[74px] flex-none text-right">{n} คน · {pct}%</span>
    </span>
  );
}

/**
 * Choices + send bar of a poll: photo grid (2 columns) or list, share bars, "ส่งโหวต / เปลี่ยนโหวต".
 * Used by the home-card popup and folded open in place inside "ประกาศทั้งหมด" (no popup on a popup).
 */
export function PollChoices({ poll, state, inline = false }) {
  const { mine, vote, counts, total, closed, winners } = state;
  const [pick, setPick] = useState(mine);
  const [saved, setSaved] = useState(false);
  const withPics = poll.opts.every((o) => o.img);
  const send = () => { vote(pick); setSaved(true); };
  const choose = (id) => { if (!closed) { setPick(id); setSaved(false); } };
  const pad = inline ? 'px-3' : 'px-6 max-[640px]:px-4';

  return (
    <>
      <div className={`${inline ? 'pt-3' : 'min-h-0 flex-1 overflow-y-auto overscroll-contain'} ${pad} pb-4 ${withPics ? 'grid grid-cols-2 gap-3 max-[420px]:gap-2' : 'flex flex-col gap-2'}`}>
        {poll.opts.map((o, i) => {
          const on = pick === o.id;
          const win = winners.includes(o.id);
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => choose(o.id)}
              disabled={closed}
              aria-pressed={on}
              className={`relative overflow-hidden rounded-box border-2 bg-white p-0 text-left transition-[border-color,box-shadow] duration-200 ${closed ? 'cursor-default' : 'cursor-pointer hover:shadow-card'} ${on ? 'border-teal-bright' : win ? 'border-[#E0A800]' : 'border-line'}`}
            >
              {o.img && <img src={o.img} alt="" className="aspect-[4/3] w-full object-cover" />}
              {win && o.img && (
                <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-[#E0A800] px-2 py-[2px] text-[11px] font-bold text-white">
                  <Trophy size={11} strokeWidth={2.6} aria-hidden="true" />ชนะ
                </span>
              )}
              <span className="block px-3 py-2.5">
                <span className="flex items-start gap-2 text-[13.5px] font-semibold leading-[1.4] text-ink">
                  {!closed && <Dot on={on} />}
                  <span className="min-w-0 flex-1">{win && !o.img && <Trophy size={14} strokeWidth={2.4} className="mr-1 inline align-[-2px] text-[#E0A800]" aria-label="ชนะ" />}{o.l}{mine === o.id && <span className="ml-1 text-[11.5px] font-semibold text-teal-hover">(คุณ)</span>}</span>
                </span>
                <Bar n={counts[i]} total={total} win={win} />
              </span>
            </button>
          );
        })}
      </div>
      {!closed && (
        <div className={`flex items-center justify-between gap-3 border-t border-line ${pad} py-3.5 ${inline ? '' : 'max-[640px]:pb-[max(14px,env(safe-area-inset-bottom))]'}`}>
          <span className="text-[12px] text-muted">
            {saved ? <span className="font-semibold text-teal-hover">บันทึกโหวตแล้ว</span> : mine ? 'เปลี่ยนโหวตได้จนกว่าจะปิดโหวต' : 'เลือกได้ 1 ข้อ'}
          </span>
          <button
            type="button"
            onClick={send}
            disabled={!pick || pick === mine}
            className="cursor-pointer rounded-ctl border-0 bg-teal-bright px-5 py-2.5 text-[14px] font-semibold text-white transition-colors duration-200 hover:bg-teal-hover disabled:cursor-default disabled:opacity-40 disabled:hover:bg-teal-bright"
          >
            {mine ? 'เปลี่ยนโหวต' : 'ส่งโหวต'}
          </button>
        </div>
      )}
    </>
  );
}

/** Vote popup from the home card: question, time left and the choices; closed polls show the winner. */
export default function PollModal({ poll, state, onClose }) {
  const { total, left, closed } = state;
  useBodyLock(true);
  useSingleOverlay('poll', true, onClose);
  useTopEscape(onClose); // inside "ประกาศทั้งหมด" on phones, only the poll closes

  return createPortal(
    <div
      className="ann-fade fixed inset-0 z-[2700] flex items-center justify-center bg-[rgba(14,40,36,.5)] p-5 backdrop-blur-[3px] max-[640px]:items-end max-[640px]:p-0"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div role="dialog" aria-modal="true" aria-label="โหวต" className="ann-up relative flex max-h-[min(88dvh,780px)] w-[min(560px,100%)] flex-col rounded-box bg-white shadow-pop max-[640px]:max-h-[92dvh] max-[640px]:rounded-b-none">
        <CloseButton onClick={onClose} className="absolute right-3 top-3" />
        <div className="px-6 pb-3 pt-6 text-center max-[640px]:px-4">
          {closed
            ? <p className="mb-1.5 text-[12.5px] font-semibold text-muted">ปิดโหวตแล้ว</p>
            : <p className="mb-1.5 inline-flex items-center gap-1 text-[12.5px] font-semibold text-[#D9480F]"><Clock size={13} strokeWidth={2.4} aria-hidden="true" />เหลือเวลา {left}</p>}
          <h3 className="mx-auto max-w-[440px] text-[19px] font-bold leading-[1.4] text-ink max-[640px]:text-[17px]">{poll.q}</h3>
          <p className="mt-1.5 text-[12px] text-muted">สร้างโดย {poll.by} · โหวตแล้ว {total} คน</p>
        </div>
        <PollChoices poll={poll} state={state} />
      </div>
    </div>,
    document.body,
  );
}
