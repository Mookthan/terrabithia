import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { observeTranslations, translate } from '@/lib/i18n/engine';

const LangContext = createContext(null);
const KEY = 'tbLang';

const readLang = () => {
  try { const l = localStorage.getItem(KEY); return l === 'en' || l === 'th' ? l : 'th'; } catch { return 'th'; }
};

/**
 * Thai is authored in the components; English is produced by the DOM translation
 * engine, which watches document.body (so portals and modals are covered too).
 */
export function LangProvider({ children }) {
  const [lang, setLangState] = useState(readLang);
  const langRef = useRef(lang);
  const observer = useRef(null);

  useEffect(() => {
    observer.current = observeTranslations(document.body, () => langRef.current);
    observer.current.applyAll(langRef.current);
    return () => observer.current.disconnect();
  }, []);

  const apply = useCallback((l) => {
    langRef.current = l;
    try { localStorage.setItem(KEY, l); } catch { /* storage unavailable */ }
    document.documentElement.lang = l;
    document.title = l === 'en' ? 'Terrabithia — Intranet' : 'Terrabithia — อินทราเน็ต';
    observer.current?.applyAll(l);
    setLangState(l);
  }, []);

  const setLang = useCallback((l) => {
    if (l === langRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { apply(l); return; }
    document.body.classList.add('lang-out');
    setTimeout(() => {
      apply(l);
      requestAnimationFrame(() => document.body.classList.remove('lang-out'));
    }, 170);
  }, [apply]);

  const t = useCallback((s) => translate(s, langRef.current), []);
  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
