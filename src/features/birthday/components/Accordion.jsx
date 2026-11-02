import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * Composer section that folds open and shut (no sideways scrolling inside the form).
 * `title` and `hint` form the header row; `extra` sits at its right, before the chevron.
 */
export default function Accordion({ title, hint, extra, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  const toggle = () => setOpen((o) => !o);
  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        aria-expanded={open}
        onClick={toggle}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } }}
        className="mb-2 mt-4 flex cursor-pointer select-none items-center gap-[6px] text-[13px] font-bold text-ink [-webkit-tap-highlight-color:transparent]"
      >
        <span>{title}</span>
        {hint && <i className="min-w-0 flex-1 truncate font-normal not-italic opacity-[.55]">{hint}</i>}
        <span className="ml-auto flex flex-none items-center gap-1">
          {extra}
          <span className={`grid h-6 w-6 place-items-center rounded-full bg-[#E3F6F1] text-ink transition-transform duration-[350ms] ease-[cubic-bezier(.3,.8,.3,1)] ${open ? 'rotate-180' : ''}`} aria-hidden="true">
            <ChevronDown className="h-[15px] w-[15px] text-teal-bright" strokeWidth={2.4} />
          </span>
        </span>
      </div>
      <div className={`bd-acc-body ${open ? 'open' : ''}`}>
        <div className="min-h-0 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
