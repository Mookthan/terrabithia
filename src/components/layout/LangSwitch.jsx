import { useLang } from '@/context/LangContext';

/** Segmented Thai / English toggle with a sliding thumb. Never translated itself. */
export default function LangSwitch({ dark = false, mini = false }) {
  const { lang, setLang } = useLang();
  const btn = mini ? 'px-3 py-1 text-xs' : 'px-4 py-1.5 text-[13px]';
  const idle = dark ? 'text-[#d9e7e2]' : 'text-ink';

  return (
    <div
      data-nt
      role="group"
      aria-label="Language"
      className={`relative inline-grid grid-cols-2 rounded-full p-[3px] ${dark ? 'w-full bg-white/10' : 'bg-[#EAF3F1]'} ${mini ? 'text-xs' : 'text-[13px]'}`}
    >
      <span
        className={`absolute bottom-[3px] left-[3px] top-[3px] w-[calc(50%-3px)] rounded-full bg-teal-bright shadow-card transition-transform duration-300 ease-[cubic-bezier(.4,0,.2,1)] motion-reduce:transition-none ${
          lang === 'en' ? 'translate-x-full' : ''
        }`}
      />
      {[['th', 'ไทย'], ['en', 'English']].map(([code, label]) => (
        <button
          key={code}
          type="button"
          aria-pressed={lang === code}
          onClick={(e) => { e.stopPropagation(); setLang(code); }}
          className={`relative z-[1] rounded-full transition-colors duration-[250ms] ${btn} ${lang === code ? 'font-semibold text-white' : idle}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
