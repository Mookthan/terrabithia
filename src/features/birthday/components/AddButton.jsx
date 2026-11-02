import { ChevronDown } from 'lucide-react';

/**
 * Wide dashed "add …" button in the decorate section: an icon tile, a title and a hint line.
 * When it opens a section (`aria-expanded` given) a ⌄ on the right turns while open.
 */
export default function AddButton({ icon, title, hint, className = '', ...rest }) {
  const expandable = rest['aria-expanded'] !== undefined;
  return (
    <button
      type="button"
      className={`flex w-full cursor-pointer items-center gap-3 rounded-box border-[1.5px] border-dashed border-[#9FDCCD] bg-[#F2FBF8] px-[14px] py-[10px] text-left text-ink transition-[background,border-color] duration-200 hover:border-mint hover:bg-[#E3F6F1] ${className}`}
      {...rest}
    >
      <b className="grid h-10 w-10 flex-none place-items-center rounded-ctl bg-teal-bright font-serif text-[17px] font-bold text-white">{icon}</b>
      <span className="flex flex-col gap-[2px] text-[14px] font-bold">
        {title}
        <small className="text-[12px] font-normal leading-[1.35] opacity-65">{hint}</small>
      </span>
      {expandable && (
        <ChevronDown className={`lc ml-auto !h-5 !w-5 flex-none text-teal-bright transition-transform duration-300 ${rest['aria-expanded'] ? 'rotate-180' : ''}`} aria-hidden="true" />
      )}
    </button>
  );
}
