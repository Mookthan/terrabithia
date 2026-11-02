import { ChevronDown } from 'lucide-react';

/** Green text button with a teal-veil hover (#12986F at 12%, works on any background) (filter toggles, "ดูตัวอย่าง"): #27AE97, hover #12986F. */
export const TEXT_BTN = 'inline-flex cursor-pointer items-center gap-1 whitespace-nowrap rounded-ctl border-0 bg-transparent px-2.5 py-2 text-[14px] font-semibold leading-[1.2] text-teal-bright transition-[background-color,color] duration-200 hover:bg-teal-veil hover:!text-teal-hover';

/** Hover for white grey-outlined buttons (ย้อนกลับ, ยกเลิก, บันทึกแบบร่าง): solid teal-soft fill (#D7E6DD), green text, border hidden. */
export const OUTLINE_HOVER = 'transition-[background-color,border-color,color] duration-200 hover:!border-transparent hover:!bg-teal-soft hover:!text-teal-hover';

/** Green text link ("ดูรายละเอียด…", "เช็กอินรับเหรียญ ›"): hover shows a teal-veil pill; negative margin keeps the text aligned (mook 2026-10-29). */
export const TEXT_LINK = 'inline-flex cursor-pointer items-center gap-0.5 rounded-ctl border-0 bg-transparent -ml-1.5 -mr-2.5 -my-1 pl-1.5 pr-2.5 py-1 text-teal-bright transition-[background-color,color] duration-200 hover:bg-teal-veil hover:!text-teal-hover';

export default function TextButton({ className = '', children, ...props }) {
  return <button type="button" className={`${TEXT_BTN} ${className}`} {...props}>{children}</button>;
}

/** "ตัวกรอง ⌄" toggle used above every list; shows how many filters are on. */
export function FilterButton({ open, count = 0, label = 'ตัวกรอง', className = '', ...props }) {
  return (
    <TextButton aria-expanded={open} className={className} {...props}>
      {label}
      {count > 0 && (
        <b className="inline-grid h-[18px] min-w-[18px] place-items-center rounded-full bg-teal-bright px-[5px] text-[11.5px] font-bold leading-none text-white">{count}</b>
      )}
      <ChevronDown className={`h-4 w-4 text-teal-bright transition-transform duration-300 ${open ? 'rotate-180' : ''}`} strokeWidth={2.2} aria-hidden="true" />
    </TextButton>
  );
}
