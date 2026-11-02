import { useLayoutEffect, useRef } from 'react';
import { BD_COVERS, coverDate, coverImg, shortDate } from '../covers';
import { bdDue, bdNick } from '../data';
import { OCC_COVERS } from '../occasions';
import OccasionCover from './OccasionCover';

/** One text slot on a cover. Text wider than its slot (`mw` % of the cover) is shrunk to fit once fonts are ready. */
function CoverText({ slot, text }) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const fit = () => {
      const W = el.parentElement?.clientWidth;
      if (!W) return;
      el.style.fontSize = '';
      const lim = W * slot.mw / 100;
      if (el.scrollWidth > lim) el.style.fontSize = `${parseFloat(getComputedStyle(el).fontSize) * lim / el.scrollWidth}px`;
    };
    fit();
    let alive = true;
    document.fonts?.ready.then(() => { if (alive) fit(); });
    return () => { alive = false; };
  }, [slot.mw, text]);

  return (
    <span
      ref={ref}
      className="pointer-events-none absolute whitespace-nowrap text-center leading-none [transform:translate(-50%,-50%)_rotate(var(--rot,0deg))]"
      style={{
        left: `${slot.x}%`, top: `${slot.y}%`, '--rot': `${slot.rot}deg`, fontSize: `${slot.fs}cqw`, color: slot.c,
        fontFamily: `'${slot.ff}', Sarabun, sans-serif`, fontWeight: slot.fw, letterSpacing: `${slot.ls}em`,
      }}
    >
      {text}
    </span>
  );
}

/**
 * A designed cover with the recipient's nickname and birthday written on it.
 * Must sit in an element with `container-type: inline-size` (font sizes are in cqw).
 */
export default function CardCover({ cover, owner }) {
  if (OCC_COVERS[cover]) return <OccasionCover cover={cover} owner={owner} />;
  const cfg = BD_COVERS.find((c) => c.k === cover) || BD_COVERS[0];
  const nick = bdNick(owner);
  const due = bdDue(owner);

  let slots;
  if (cfg.leg) {
    const name = `${nick}${/^[A-Za-z]/.test(nick) ? '’s' : ''}`;
    slots = (
      <>
        <div className="absolute right-[8.6%] top-[5.6%] whitespace-nowrap text-right text-[3.1cqw] font-extrabold leading-[1.75] tracking-[.01em] text-[#5B6F2A]">
          <div>MAY <span className="px-[.08em] align-[-.12em] font-['Allura','Mali',cursive] text-[2.3em] font-normal leading-[0] text-[#8E6BBF]">{name}</span> SPECIAL DAY</div>
          <div>BE FULL OF HAPPINESS, FUN, AND CHEER!</div>
        </div>
        <div className="absolute right-[8%] top-[24.1%] text-[2.9cqw] font-extrabold tracking-[.01em] text-[#8E6BBF]">{shortDate(due)}</div>
      </>
    );
  } else {
    slots = cfg.it.map((slot, i) => {
      let text = slot.r === 'date' ? coverDate(slot.f, due) : (slot.t ? slot.t.replace('{n}', nick) : nick);
      if (slot.up) text = text.toUpperCase();
      return <CoverText key={i} slot={slot} text={text} />;
    });
  }

  return (
    <div data-nt className="relative aspect-[760/1011] w-full flex-none">
      <img src={coverImg(cfg.k)} alt="" draggable="false" className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover" />
      {slots}
    </div>
  );
}
