import { ChevronLeft } from 'lucide-react';
import LangToggle from '@/components/layout/LangToggle';

/** Fixed bar above the login card: back button (optional) and the language switch. */
export default function LoginBar({ onBack }) {
  return (
    <div className="pointer-events-none fixed left-7 right-7 top-6 z-[5] flex items-center justify-between max-[640px]:left-4 max-[640px]:right-4 max-[640px]:top-[18px]">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          aria-label="ย้อนกลับ"
          className="pointer-events-auto inline-flex h-9 cursor-pointer items-center gap-1 rounded-ctl border-none bg-white pl-2 pr-3 text-[12.5px] font-semibold leading-none text-ink shadow-card transition-[background,color,transform] duration-200 hover:-translate-x-0.5 hover:bg-teal-soft hover:text-teal-hover"
        >
          <ChevronLeft className="lc !h-4 !w-4" aria-hidden="true" /> ย้อนกลับ
        </button>
      ) : <span />}
      <div className="pointer-events-auto"><LangToggle boxed /></div>
    </div>
  );
}
