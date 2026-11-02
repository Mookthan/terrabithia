import { Fragment, useEffect, useRef, useState } from 'react';
import { useLang } from '@/context/LangContext';
import { translate } from '@/lib/i18n/engine';

/**
 * Heading text that slides up word by word from a mask when it scrolls into view
 * (monopo-style, mook 2026-10-29). Translated here and marked data-nt, because the
 * DOM translator can't match a sentence that has been split into spans.
 */
export default function RevealText({ as: Tag = 'span', text, className = '' }) {
  const { lang } = useLang();
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      setShown(true);
      return undefined;
    }
    const io = new IntersectionObserver(([en]) => {
      if (en.isIntersecting) { setShown(true); io.disconnect(); }
    }, { threshold: 0.4, rootMargin: '0px 0px -8% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const words = translate(text, lang).split(' ');
  return (
    <Tag ref={ref} data-nt className={`rt ${shown ? 'is-in' : ''} ${className}`} aria-label={translate(text, lang)}>
      {words.map((w, i) => (
        <Fragment key={`${i}${w}`}>
          <span className="rt-w" aria-hidden="true"><span className="rt-i" style={{ '--i': i }}>{w}</span></span>
          {i < words.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </Tag>
  );
}
