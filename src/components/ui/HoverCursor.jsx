import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, CalendarDays, Download, Eye, GraduationCap, Images, Play, UserRound } from 'lucide-react';
import { useLang } from '@/context/LangContext';
import { translate } from '@/lib/i18n/engine';

/** Icons a host can ask for with data-cursor-icon (mook 2026-10-29: icon plus words). */
const ICONS = { eye: Eye, play: Play, go: ArrowUpRight, download: Download, course: GraduationCap, album: Images, profile: UserRound, leave: CalendarDays };

/**
 * Round label that trails the mouse over any `[data-cursor="label"]` element inside the page
 * (monopo-style hover, mook 2026-10-29). Mouse/trackpad only; touch screens keep plain taps.
 */
export default function HoverCursor() {
  const { lang } = useLang();
  const dot = useRef(null);
  const [hint, setHint] = useState(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pos = { x: -200, y: -200 }, cur = { x: -200, y: -200 };
    let raf = 0, last = performance.now();
    const tick = (now = performance.now()) => {
      const k = reduced ? 1 : 1 - Math.pow(0.78, (now - last) / 16.7);
      last = now;
      cur.x += (pos.x - cur.x) * k;
      cur.y += (pos.y - cur.y) * k;
      if (dot.current) dot.current.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    const onMove = (e) => {
      // Desktop draws the page at html zoom .85, so mouse pixels are scaled back into page pixels.
      const z = parseFloat(getComputedStyle(document.documentElement).zoom) || 1;
      pos.x = e.clientX / z; pos.y = e.clientY / z;
      const host = e.target.closest?.('[data-cursor]');
      const inner = host && e.target.closest('button, a, [role="button"]');
      if (inner && inner !== host && host.contains(inner)) { setHint(null); return; }
      setHint(host ? { label: host.dataset.cursor, icon: host.dataset.cursorIcon || 'go' } : null);
    };
    const onLeave = () => setHint(null);
    // A click usually opens a popup or a new page over the card, so drop the ball until the mouse moves again.
    const onClick = () => setHint(null);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('click', onClick, true);
    document.addEventListener('pointerleave', onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('click', onClick, true);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div ref={dot} className="hover-cursor" aria-hidden="true" data-nt>
      <span className={`hover-cursor-ball ${hint ? 'is-on' : ''}`}>
        {hint && <CursorBody hint={hint} lang={lang} />}
      </span>
    </div>
  );
}

function CursorBody({ hint, lang }) {
  const Icon = ICONS[hint.icon] || ArrowUpRight;
  return (
    <>
      <Icon size={22} strokeWidth={2.2} className={hint.icon === 'play' ? 'fill-white' : ''} />
      <span>{translate(hint.label, lang)}</span>
    </>
  );
}
