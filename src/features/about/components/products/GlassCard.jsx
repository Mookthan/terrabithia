import { useEffect, useRef } from 'react';
import { media } from '@/lib/media';
import { PROD_ASSETS } from '../../data';
import '../../about.css';

/** Product logos (brand artwork in public/media); h = drawn height, sized so the three read evenly. */
const LOGOS = {
  pokpa: { src: media('logo-pokpa.webp'), alt: 'Maxar Pokpa', h: 'h-[104px]' },
  jongq: { src: media('logo-jongq.webp'), alt: 'Maxar JongQ', h: 'h-[72px]' },
  doodads: { src: media('logo-doodads.webp'), alt: 'doodads', h: 'h-[38px]' },
};

function Logo({ kind }) {
  const l = LOGOS[kind];
  // Fixed-height slot so every card's description starts on the same line (mook 2026-10-29).
  return (
    <div className="flex h-[104px] w-full shrink-0 items-center justify-center">
      <img src={l.src} alt={l.alt} className={`${l.h} w-auto max-w-full object-contain`} draggable="false" />
    </div>
  );
}

/** Looping, hue-shifted sample video behind a frosted description panel. */
export default function GlassCard({ product }) {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) v.play().catch(() => {});
  }, []);
  return (
    <div data-reveal className="prod-gcard relative h-[460px] overflow-hidden rounded-box bg-[#0e1a2b] shadow-card">
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        src={PROD_ASSETS.video}
        muted
        loop
        playsInline
        preload="auto"
        poster={PROD_ASSETS.posters[product.poster]}
        style={{ filter: `hue-rotate(${product.hue}deg)` }}
      />
      <div className="prod-glass absolute inset-x-[8%] inset-y-[7%] isolate flex flex-col items-center justify-start gap-[18px] rounded-box border border-white/70 p-[22px] text-center text-ink shadow-[inset_0_1px_0_rgba(255,255,255,.8),0_18px_44px_-22px_rgba(0,0,0,.6)] transition-[transform,background] duration-300 ease-in-out">
        <Logo kind={product.wm} />
        <p className="text-[13.5px] font-semibold leading-[1.75]">{product.desc}</p>
      </div>
    </div>
  );
}
