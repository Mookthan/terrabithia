import { REACTIONS } from '@/data/reactions';

/** Floating row of emoji reactions; hovering one shows its name, the one I picked is highlighted. */
export default function ReactionBar({ mine, onPick, list = REACTIONS, className = '' }) {
  return (
    <div role="toolbar" aria-label="รีแอค" className={`flex items-center gap-0.5 rounded-full border border-[#e3e3e3] bg-white p-1 shadow-pop ${className}`}>
      {list.map((r) => (
        <button
          key={r.e}
          type="button"
          onClick={(ev) => { ev.stopPropagation(); onPick(r.e); }}
          aria-label={r.l}
          aria-pressed={mine === r.e}
          className={`group/rx relative grid h-9 w-9 cursor-pointer place-items-center rounded-full text-[21px] leading-none transition-transform duration-150 hover:-translate-y-0.5 hover:scale-125 ${mine === r.e ? 'bg-teal-soft' : ''}`}
        >
          {r.e}
          <span className="pointer-events-none absolute bottom-[calc(100%+6px)] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-2 py-0.5 text-[11px] font-semibold text-white opacity-0 transition-opacity duration-150 group-hover/rx:opacity-100">
            {r.l}
          </span>
        </button>
      ))}
    </div>
  );
}
