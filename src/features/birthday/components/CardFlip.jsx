import { useEffect, useState } from 'react';
import BirthdayCard from './BirthdayCard';

/**
 * A card you open like a real one: the cover swings aside to show the paper inside (tap / Enter / Space toggles).
 * `autoOpen` (ms) opens it by itself after that delay. Cards without a cover are shown as they are.
 */
export default function CardFlip({ card, owner, line, autoOpen, className = '' }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (autoOpen == null) return undefined;
    const t = setTimeout(() => setOpen(true), autoOpen);
    return () => clearTimeout(t);
  }, [autoOpen]);

  if (!card.cover) return <BirthdayCard card={card} owner={owner} line={line} className={className} />;
  const toggle = () => setOpen((o) => !o);
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={open ? 'ปิดการ์ด' : 'เปิดการ์ด'}
      aria-pressed={open}
      onClick={toggle}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } }}
      className={`bd-flip ${open ? 'open' : ''} ${className}`}
    >
      <div className="bd-flip-in"><BirthdayCard card={card} owner={owner} line={line} face="in" className="!shadow-none" /></div>
      <div className="bd-flip-cover"><BirthdayCard card={card} owner={owner} line={line} /></div>
      <span className="bd-flip-hint pointer-events-none absolute bottom-[10px] left-1/2 -translate-x-1/2 z-[3] rounded-full bg-white/[.92] px-3 py-[5px] text-[12.5px] font-semibold text-ink shadow-card">
        แตะเพื่อเปิดการ์ด
      </span>
    </div>
  );
}
