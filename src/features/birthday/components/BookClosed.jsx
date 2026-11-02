import { useState } from 'react';
import { Lock } from 'lucide-react';
import { BOOK_COVER_IMG } from '../data';

/**
 * The closed birthday book. Sealed until the birthday morning (tapping it only shakes it);
 * after that, tapping the cover swings it open and calls `onOpen` once the animation ends.
 */
export default function BookClosed({ count, title, sub, locked, onOpen, onDemoUnlock, opening }) {
  const [nope, setNope] = useState(0);
  const tap = () => (locked ? setNope(Date.now()) : onOpen());

  return (
    <div className="m-auto flex flex-col items-center p-6 text-center">
      <button
        key={nope}
        type="button"
        onClick={tap}
        aria-label="สมุดวันเกิด"
        aria-disabled={locked}
        className={`relative block aspect-[5/7] w-[min(280px,66vw)] border-0 bg-transparent p-0 [filter:drop-shadow(0_26px_30px_rgba(70,45,20,.45))] [perspective:1400px] ${
          locked ? 'cursor-not-allowed' : 'cursor-pointer'
        } ${opening ? '' : nope ? 'bd-nope' : 'bd-wiggle'}`}
      >
        <span className="absolute inset-0 rounded-[4px_14px_14px_4px] bg-white shadow-[inset_0_0_0_1px_#E7DFD0]" />
        <span className={`bd-bookcover absolute inset-0 overflow-hidden rounded-[4px_14px_14px_4px] shadow-[inset_5px_0_8px_-4px_rgba(0,0,0,.28)] ${opening ? 'bd-bookcover-open' : ''}`}>
          <img src={BOOK_COVER_IMG} alt="" draggable="false" className={`pointer-events-none block h-full w-full object-cover ${locked ? 'saturate-[.65] brightness-[.93]' : ''}`} />
        </span>
        {locked && (
          <span className="absolute left-1/2 top-[9%] z-[2] grid h-[54px] w-[54px] -translate-x-1/2 place-items-center rounded-full bg-white/[.92] shadow-card">
            <Lock className="h-[26px] w-[26px] text-[#6B5A4E]" aria-hidden="true" />
          </span>
        )}
        <i className="absolute -right-[10px] -top-[10px] z-[2] grid h-9 min-w-9 place-items-center rounded-full bg-[#F0515B] px-[9px] text-[16px] font-bold not-italic text-white">{count}</i>
      </button>
      <h2 className="mt-[26px] text-[22px] font-bold text-ink">{title}</h2>
      <p className={`mt-[6px] text-[14px] text-ink opacity-70 ${locked ? 'max-w-[330px] leading-[1.7]' : ''}`}>{sub}</p>
      {locked && (
        <button
          type="button"
          onClick={onDemoUnlock}
          className="mt-5 cursor-pointer rounded-ctl border-[1.5px] border-dashed border-teal-bright bg-white/60 px-[18px] py-[10px] text-[13.5px] font-semibold text-teal-bright transition-[background] duration-200 hover:bg-white"
        >
          โหมดสาธิต: เปิดสมุดเลย
        </button>
      )}
    </div>
  );
}
