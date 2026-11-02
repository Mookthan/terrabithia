import { Check } from 'lucide-react';

/** Drawn checkbox for custom rows (role="checkbox"); matches the native ticks in index.css. state: true | 'part' | false. */
export default function CheckMark({ state }) {
  return (
    <span
      aria-hidden="true"
      className={`grid h-4 w-4 flex-none place-items-center rounded-[4px] border-[1.5px] text-white transition-colors duration-150 ${
        state ? 'border-teal-bright bg-teal-bright' : 'border-[#b9c2bc] bg-white'
      }`}
    >
      {state === 'part' ? <i className="h-0.5 w-2 rounded-[1px] bg-white" /> : state && <Check className="!h-3 !w-3" strokeWidth={3.2} />}
    </span>
  );
}
