import { ChevronRight } from 'lucide-react';

/** One collapsible group in the HR rail with its item links. */
export default function HrRailGroup({ group, open, activeIndex, onToggle, onSelect }) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className={`flex w-full items-center gap-2 px-[18px] py-2 text-left text-[14px] font-bold hover:bg-white/50 ${open ? 'text-teal-bright' : 'text-ink'}`}
      >
        <span
          className={`inline-block text-[9px] transition-transform duration-[.38s] ease-[cubic-bezier(.4,0,.2,1)] motion-reduce:transition-none ${open ? 'rotate-90' : ''}`}
        >
          <ChevronRight className="lc !h-3 !w-3" strokeWidth={2.6} />
        </span>
        {group.l}
      </button>
      <div
        className={`grid bg-[#BAEBDD] transition-[grid-template-rows] duration-[var(--acc-dur)] ease-[var(--acc-ease)] motion-reduce:transition-none ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div
          className={`min-h-0 overflow-hidden motion-reduce:transition-none ${
            open ? 'visible [transition:visibility_0s]' : 'invisible [transition:visibility_0s_linear_.38s]'
          }`}
        >
          {group.items.map((it, i) => (
            <button
              key={it}
              type="button"
              onClick={() => onSelect(i)}
              className={`block w-full py-1.5 pl-[29px] pr-[18px] text-left text-[13px] transition-[background,color,box-shadow] duration-[.25s] ${
                activeIndex === i ? 'bg-teal-bright font-semibold text-white hover:!bg-teal-hover' : 'text-ink hover:bg-white/45'
              }`}
            >
              {`- ${it}`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
