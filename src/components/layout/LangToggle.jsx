import { Globe } from 'lucide-react';
import { useLang } from '@/context/LangContext';

/** Compact Thai / English toggle (header and login page). Signed in on phones, the switch lives in the profile menu instead. */
export default function LangToggle({ boxed = false, className = '' }) {
  const { lang, setLang } = useLang();
  const next = lang === 'en' ? 'th' : 'en';
  return (
    <button
      data-nt
      type="button"
      onClick={() => setLang(next)}
      aria-label={lang === 'en' ? 'เปลี่ยนเป็นภาษาไทย' : 'Switch to English'}
      title={lang === 'en' ? 'ภาษาไทย' : 'English'}
      className={`inline-flex h-9 flex-none items-center gap-1.5 rounded-ctl px-2 text-[12.5px] font-semibold text-ink transition-colors duration-200 ${boxed ? 'bg-white px-3 shadow-card hover:bg-teal-soft' : 'hover:bg-teal-veil'} hover:text-teal-hover min-[861px]:px-2.5 min-[861px]:text-[13px] ${className}`}
    >
      <Globe className="lc !h-[18px] !w-[18px]" aria-hidden="true" />
      <span>{lang === 'en' ? 'EN' : 'ไทย'}</span>
    </button>
  );
}
