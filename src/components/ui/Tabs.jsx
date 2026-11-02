/**
 * The one tab style for the whole site (mook 2026-11-01): grey track, the chosen tab is a white
 * pill with a card shadow and ink text; green stays for buttons people press.
 * items = [{ k, label, icon?, short? (phone label ≤420px; with `full`, used whenever the row is under 360px, see .tabs-cq), badge? (number) }]
 * onCream = darker track for tabs sitting on the cream page background.
 * full  = tabs fill the row (each grows from its text width); otherwise the track hugs its tabs and scrolls sideways.
 */
export default function Tabs({ items, value, onChange, full = false, onCream = false, label, className = '' }) {
  // full: tabs fill the row, each grows from its own text width, icon above the label so they fit narrow popups.
  const track = full
    ? 'tabs-cq flex w-full gap-1 [&>button]:min-w-fit [&>button]:flex-auto [&>button]:flex-col [&>button]:gap-0.5 [&>button]:px-3'
    : 'inline-flex max-w-full gap-1 overflow-x-auto [scrollbar-width:none]';
  return (
    <div
      role="tablist"
      aria-label={label}
      className={`${track} rounded-ctl ${onCream ? 'bg-line' : 'bg-[#F1F3EE]'} p-1 ${className}`}
    >
      {items.map(({ k, label: l, icon: Icon, short, badge }) => {
        const on = value === k;
        return (
          <button
            key={k}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => onChange(k)}
            className={`flex min-w-0 flex-none cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-[8px] border-0 px-4 py-[7px] text-[13.5px] leading-tight transition-[background,color,box-shadow] duration-200 max-[420px]:px-2.5 max-[420px]:text-[12.5px] ${
              on ? 'bg-white font-semibold text-ink shadow-card' : 'bg-transparent text-muted hover:bg-teal-veil hover:text-ink'
            }`}
          >
            {Icon && <Icon className={`h-4 w-4 flex-none ${on ? 'text-teal-bright' : ''}`} aria-hidden="true" />}
            {short && full ? (
              <span><span className="tab-long">{l}</span><span className="tab-short">{short}</span></span>
            ) : short ? (
              <span><span className="max-[420px]:hidden">{l}</span><span className="hidden max-[420px]:inline">{short}</span></span>
            ) : (
              <span>{l}</span>
            )}
            {badge > 0 && (
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-teal-bright px-1.5 text-[11px] font-bold leading-none text-white" data-nt>
                {badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
