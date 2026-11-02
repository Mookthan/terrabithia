/**
 * Folder tabs (mook 2026-11-01): page-level tabs joined to the white box under them. The chosen tab is
 * white and merges into the box; the others are solid teal. Use only when the whole tab content sits in
 * one white box (Knowledge, Clients); small switches inside cards or popups use <Tabs> instead.
 * items = [{ k, label, icon?, short? (phone label ≤420px), badge? }]; children = the box content; boxClassName/boxRef go to the box.
 */
export default function FolderTabs({ items, value, onChange, label, className = '', boxClassName = '', boxRef, children }) {
  return (
    <div className={`flex flex-col ${className}`}>
      <div role="tablist" aria-label={label} className="flex shrink-0">
        {items.map(({ k, label: l, icon: Icon, short, badge }) => {
          const on = value === k;
          return (
            <button
              key={k}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => onChange(k)}
              className={`flex items-center justify-center gap-1.5 whitespace-nowrap border-0 px-5 py-3 text-[13px] transition-colors duration-200 first:rounded-tl-box last:rounded-tr-box max-[640px]:flex-1 max-[640px]:px-2 max-[420px]:text-[12.5px] ${
                on ? 'cursor-default bg-white font-bold text-ink' : 'cursor-pointer bg-teal-bright font-medium text-white hover:!bg-teal-hover'
              }`}
            >
              {Icon && <Icon className={`h-4 w-4 flex-none ${on ? 'text-teal-bright' : ''}`} aria-hidden="true" />}
              {short ? <span><span className="max-[420px]:hidden">{l}</span><span className="hidden max-[420px]:inline">{short}</span></span> : l}
              {badge > 0 && (
                <span
                  className={`grid h-5 min-w-5 place-items-center rounded-full px-1.5 text-[11px] font-bold leading-none ${on ? 'bg-teal-bright text-white' : 'bg-white text-teal-hover'}`}
                  data-nt
                >
                  {badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div ref={boxRef} role="tabpanel" className={`rounded-b-box rounded-tr-box bg-white shadow-card max-[640px]:rounded-tr-none ${boxClassName}`}>
        {children}
      </div>
    </div>
  );
}
