import { Cake, Lock } from 'lucide-react';

/** A birthday book (past year or this year's sealed one). */
export default function BookButton({ locked = false, year, title, sub, go, onClick }) {
  const Icon = locked ? Lock : Cake;
  return (
    <button
      data-reveal
      type="button"
      onClick={onClick}
      className={`flex cursor-pointer items-center gap-[14px] rounded-box border-0 p-[14px] text-left text-ink shadow-card transition-transform duration-[250ms] hover:-translate-y-1 hover:-rotate-[.6deg] ${locked ? 'bg-[#F7F4EC]' : 'bg-white'}`}
    >
      <span
        className={`relative grid h-[86px] w-[70px] flex-none place-items-center rounded-[10px_14px_14px_10px] text-[30px] shadow-[inset_6px_0_0_rgba(0,0,0,.08)] ${
          locked ? 'bg-[linear-gradient(145deg,#E9D9B8,#D8C393)] text-[#8a6a2e]' : 'bg-[linear-gradient(145deg,#FFE3EA,#FFC2D1)] text-[#C2456B]'
        }`}
      >
        <Icon className="lc !h-[30px] !w-[30px]" aria-hidden="true" />
        <b className="absolute bottom-[6px] text-[12px]">{year}</b>
      </span>
      <span className="min-w-0 flex-1">
        <b className="block text-[16px]">{title}</b>
        <small className="text-[12.5px] opacity-65">{sub}</small>
      </span>
      <span className="flex-none text-[13px] font-semibold text-teal-bright">{go}</span>
    </button>
  );
}
