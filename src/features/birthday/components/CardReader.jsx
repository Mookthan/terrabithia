import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { bdDept, bdNick } from '../data';
import CardFlip from './CardFlip';
import CloseButton from '@/components/ui/CloseButton';

const NAV = 'grid h-[46px] w-[46px] cursor-pointer place-items-center rounded-full border-0 bg-white/[.92] text-ink transition-opacity duration-200 disabled:cursor-default disabled:opacity-35';

/**
 * Spotlight over the book: one card at a time, large, turned like a page; its cover then swings open by itself.
 * Arrow keys, swipes and the ‹ › buttons move between `cards`; Escape or a tap outside closes it.
 */
export default function CardReader({ cards, startId, owner, onRead, onClose }) {
  const [{ ix, anim }, setPos] = useState(() => ({ ix: Math.max(0, cards.findIndex((c) => c.id === startId)), anim: 'bd-page-open' }));
  const card = cards[ix];
  const x0 = useRef(null);

  const go = (d) => setPos((p) => {
    const k = p.ix + d;
    return k < 0 || k >= cards.length ? p : { ix: k, anim: d > 0 ? 'bd-page-next' : 'bd-page-prev' };
  });

  useEffect(() => { if (card && !card.read) onRead(card.id); }, [card, onRead]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
      else return;
      e.stopPropagation();
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  });

  if (!card) return null;
  const dept = bdDept(card.by);
  const line = `จาก ${bdNick(card.by)}${dept ? ` · ${dept}` : ''}${card.date ? ` · ${card.date}` : ''}`;

  return (
    <div
      className="bd-fade absolute inset-0 z-20 flex flex-col items-center justify-center gap-[14px] bg-[rgba(23,40,50,.72)] px-3 pb-4 pt-14 backdrop-blur-[3px]"
      onClick={(e) => { if (e.target === e.currentTarget || e.target.dataset.backdrop) onClose(); }}
      onPointerDown={(e) => { x0.current = e.clientX; }}
      onPointerUp={(e) => {
        if (x0.current !== null && Math.abs(e.clientX - x0.current) > 60) go(e.clientX < x0.current ? 1 : -1);
        x0.current = null;
      }}
    >
      <CloseButton tone="float" onClick={onClose} className="absolute right-[14px] top-[14px]" />
      <div data-backdrop="1" className="flex w-full justify-center [perspective:1600px]">
        <div key={`${ix}-${anim}`} className={`${anim} w-[min(400px,92vw,calc((100vh-190px)*.6))] [filter:drop-shadow(0_24px_30px_rgba(0,0,0,.4))]`}>
          <CardFlip card={card} owner={owner} line={line} autoOpen={anim === 'bd-page-open' ? 650 : 420} />
        </div>
      </div>
      <div className="flex flex-none items-center gap-[18px] text-[14px] font-semibold text-white">
        <button type="button" onClick={() => go(-1)} disabled={ix === 0} aria-label="ใบก่อนหน้า" className={NAV}><ChevronLeft className="h-6 w-6" aria-hidden="true" /></button>
        <span>{ix + 1} / {cards.length}</span>
        <button type="button" onClick={() => go(1)} disabled={ix === cards.length - 1} aria-label="ใบถัดไป" className={NAV}><ChevronRight className="h-6 w-6" aria-hidden="true" /></button>
      </div>
    </div>
  );
}
