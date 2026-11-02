/** Reaction counts under a post; my own reaction is outlined in mint. Click to toggle. */
export default function ReactionPills({ reactions, me, onToggle }) {
  const list = Object.entries(reactions);
  if (!list.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {list.map(([e, names]) => {
        const mine = names.includes(me);
        return (
          <button
            key={e}
            type="button"
            onClick={() => onToggle(e)}
            title={names.join(', ')}
            aria-pressed={mine}
            className={`inline-flex cursor-pointer items-center gap-1 rounded-ctl border px-2 py-[3px] text-[12px] leading-none transition-colors duration-200 ${
              mine ? 'border-teal-bright bg-mint/50 font-semibold text-teal-bright' : 'border-[#d6d6d6] bg-white text-ink hover:border-teal-bright'
            }`}
          >
            <span className="text-[14px]">{e}</span>
            <span data-nt>{names.length}</span>
          </button>
        );
      })}
    </div>
  );
}
