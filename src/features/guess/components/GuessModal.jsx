import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronRight, Lightbulb, X } from 'lucide-react';
import useEscape from '@/hooks/useEscape';
import useBodyLock from '@/hooks/useBodyLock';
import CloseButton from '@/components/ui/CloseButton';
import { TEXT_LINK } from '@/components/ui/TextButton';
import { ORG_PEOPLE, avatarOf } from '@/data/org';
import { TERBY_SRC } from '@/data/me';
import { PATHS } from '@/routes/paths';
import { puzzleFor } from '../guessData';
import { answer, showMoreClue, useGuess } from '../guessStore';

/** One choice: nickname + full name; after answering it turns green (the answer) or red (a wrong pick). */
function Choice({ id, state, disabled, onPick }) {
  const p = ORG_PEOPLE[id];
  const tone = {
    right: 'border-teal-bright bg-teal-soft text-teal-hover',
    wrong: 'border-[#D93A44] bg-[#FCEBEC] text-[#B42833]',
    idle: 'border-line bg-white text-ink hover:border-teal-bright hover:bg-teal-veil',
    dim: 'border-line bg-white text-muted opacity-60',
  }[state];
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onPick(id)}
      className={`flex min-h-[56px] items-center gap-2 rounded-ctl border px-3 py-2 text-left transition-colors duration-200 ${tone} ${disabled ? 'cursor-default' : 'cursor-pointer'}`}
    >
      <span className="min-w-0 flex-1">
        <b className="block text-[14px] leading-tight">{p.nick}</b>
        <span className="block truncate text-[12px] opacity-80">{p.name}</span>
      </span>
      {state === 'right' && <Check className="lc !h-5 !w-5 flex-none" aria-hidden="true" />}
      {state === 'wrong' && <X className="lc !h-5 !w-5 flex-none" aria-hidden="true" />}
    </button>
  );
}

/** Daily guess-the-colleague popup: clues one by one, 4 names, then who it was and a link to their Org Chart card. */
export default function GuessModal({ onClose }) {
  const navigate = useNavigate();
  const puzzle = useMemo(() => puzzleFor(), []);
  const g = useGuess();
  const [shown, setShown] = useState(false);
  useEscape(onClose);
  useBodyLock(true);
  useEffect(() => { const r = requestAnimationFrame(() => setShown(true)); return () => cancelAnimationFrame(r); }, []);

  const done = !!g.pick;
  const visible = done ? puzzle.clues.length : Math.min(g.clues, puzzle.clues.length);
  const who = ORG_PEOPLE[puzzle.answer];
  const stateOf = (id) => {
    if (!done) return 'idle';
    if (id === puzzle.answer) return 'right';
    return id === g.pick ? 'wrong' : 'dim';
  };
  const openCard = () => { onClose(); navigate(`${PATHS.aboutProfile}?person=${puzzle.answer}`); };

  return createPortal(
    <div
      className={`fixed inset-0 z-[300] flex items-center justify-center bg-[rgba(20,30,28,.45)] p-4 backdrop-blur-[4px] transition-opacity duration-[250ms] ${shown ? 'opacity-100' : 'opacity-0'}`}
      // Stop clicks and keys bubbling through the portal to the profile card that opened it.
      onClick={(e) => { e.stopPropagation(); if (e.target === e.currentTarget) onClose(); }}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <div role="dialog" aria-modal="true" aria-label="ทายใครเอ่ย" className="relative max-h-[90vh] w-[min(440px,100%)] overflow-y-auto rounded-box bg-white px-6 pb-6 pt-5 text-ink shadow-pop">
        <CloseButton onClick={onClose} className="absolute right-3 top-3" />
        <div className="flex items-center gap-3 pr-8">
          <img src={TERBY_SRC} alt="" aria-hidden="true" className="h-12 w-12 flex-none object-contain" />
          <div>
            <h2 className="m-0 text-[19px] font-bold leading-tight">ทายใครเอ่ย</h2>
            <p className="m-0 mt-0.5 text-[13px] text-muted">คนในบริษัทคนนี้คือใคร วันละ 1 ข้อ</p>
          </div>
        </div>

        <ul className="mb-0 mt-4 flex list-none flex-col gap-2 p-0">
          {puzzle.clues.slice(0, visible).map((c, i) => (
            <li key={c.k} className="flex items-start gap-2 rounded-ctl bg-cream px-3 py-2.5 text-[14px] leading-[1.5]">
              <span className="mt-[1px] inline-grid h-5 w-5 flex-none place-items-center rounded-full bg-teal-bright text-[11.5px] font-bold text-white" data-nt>{i + 1}</span>
              <span><b>{c.label}:</b> <span data-nt>{c.text}</span></span>
            </li>
          ))}
        </ul>
        {!done && visible < puzzle.clues.length && (
          <button type="button" onClick={() => showMoreClue()} className={`${TEXT_LINK} ml-0 mt-2 text-[13px] font-semibold`}>
            <Lightbulb className="lc !h-4 !w-4" aria-hidden="true" />ขอคำใบ้เพิ่ม
          </button>
        )}

        <div className="mt-4 grid grid-cols-2 gap-2 max-[380px]:grid-cols-1" data-nt>
          {puzzle.choices.map((id) => (
            <Choice key={id} id={id} state={stateOf(id)} disabled={done} onPick={(pick) => answer(puzzle, pick)} />
          ))}
        </div>

        {done && (
          <div className="mt-4 flex items-center gap-3 rounded-box border border-line p-3">
            <img src={avatarOf(puzzle.answer)} alt="" className="h-14 w-14 flex-none rounded-full object-cover" />
            <div className="min-w-0 flex-1">
              <b className="block text-[14px]">{g.correct ? 'ถูกต้อง! ได้เหรียญแล้ว' : 'ยังไม่ถูก ไว้ทายใหม่พรุ่งนี้นะ'}</b>
              <span className="block text-[13px] text-muted"><span data-nt>{who.name} ({who.nick})</span> · <span data-nt>{who.pos}</span></span>
              <button type="button" onClick={openCard} className={`${TEXT_LINK} ml-0 mt-1 text-[13px] font-semibold`}>
                ดูการ์ดของเพื่อน<ChevronRight className="lc !h-4 !w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
