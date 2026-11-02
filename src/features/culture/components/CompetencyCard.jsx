import { useState } from 'react';
import { ChevronUp } from 'lucide-react';

function Check() {
  return (
    <svg className="mt-0.5 h-[19px] w-[19px] flex-none" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#27AE97" />
      <path d="m8 12.5 3 3 5-6" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckList({ items }) {
  return (
    <ul className="m-0 flex list-none flex-col gap-[13px] p-0">
      {items.map((x) => (
        <li key={x} className="flex items-start gap-2.5 text-[14px] leading-[1.5] text-ink">
          <Check />
          <span>{x}</span>
        </li>
      ))}
    </ul>
  );
}

/** Accordion card listing the behaviours for one competency (open by default). */
export default function CompetencyCard({ item }) {
  const [open, setOpen] = useState(true);
  return (
    <div
      data-reveal
      className="overflow-hidden rounded-ctl bg-[linear-gradient(180deg,var(--c2),#fff)] shadow-card"
      style={{ '--c1': item.c1, '--c2': item.c2 }}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="relative flex w-full cursor-pointer items-center justify-center border-0 bg-[var(--c1)] px-[54px] py-[11px] text-[17px] text-ink max-[860px]:py-[11px] max-[860px]:pl-4 max-[860px]:pr-11 max-[860px]:text-[15px]"
      >
        <span>{item.t}</span>
        <ChevronUp
          className={`lc absolute right-5 top-1/2 -mt-[11px] !h-[22px] !w-[22px] transition-transform duration-[350ms] ease-in-out motion-reduce:transition-none ${open ? '' : 'rotate-180'}`}
        />
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-[var(--acc-dur)] ease-[var(--acc-ease)] motion-reduce:transition-none ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="grid grid-cols-2 gap-x-7 gap-y-1.5 pb-[26px] pl-[120px] pr-11 pt-[22px] max-[860px]:grid-cols-1 max-[860px]:px-5 max-[860px]:pb-[22px] max-[860px]:pt-[18px]">
            <CheckList items={item.l} />
            <CheckList items={item.r} />
          </div>
        </div>
      </div>
    </div>
  );
}
