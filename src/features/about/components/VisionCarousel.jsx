import { useCallback, useEffect, useState } from 'react';
import { VISION_IMGS } from '../data';
import '../about.css';

const INTERVAL = 4500;
const reducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/** Cross-fading image slides with dots; auto-advances unless reduced motion is requested. */
export default function VisionCarousel() {
  const n = VISION_IMGS.length;
  const [idx, setIdx] = useState(0);
  const [cycle, setCycle] = useState(0); // bump to restart the timer after a manual pick

  useEffect(() => {
    if (reducedMotion()) return undefined;
    const t = setInterval(() => setIdx((i) => (i + 1) % n), INTERVAL);
    return () => clearInterval(t);
  }, [n, cycle]);

  const go = useCallback((i) => { setIdx(((i % n) + n) % n); setCycle((c) => c + 1); }, [n]);

  return (
    <div className="relative overflow-hidden bg-[#1d3a3a] max-[900px]:h-[340px]">
      {VISION_IMGS.map((v, i) => (v.src ? (
        <div
          key={i}
          className={`vis-slide absolute inset-0 bg-cover bg-center ${i === idx ? 'on' : ''}`}
          style={{ backgroundImage: `url(${v.src})` }}
          role="img"
          aria-label={v.alt}
        />
      ) : (
        <div
          key={i}
          className={`vis-slide absolute inset-0 flex items-center justify-center bg-[linear-gradient(135deg,#27AE97,#1B4A5E)] text-[22px] text-white/75 ${i === idx ? 'on' : ''}`}
        >
          <span>{v.alt}</span>
        </div>
      )))}
      <div className="absolute bottom-[26px] left-0 right-0 z-[2] flex justify-center gap-2">
        {VISION_IMGS.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`h-[9px] cursor-pointer rounded-ctl border-0 p-0 transition-[width,background] duration-300 ${i === idx ? 'w-[26px] bg-white' : 'w-[9px] bg-white/50'}`}
            onClick={() => go(i)}
            aria-label={`รูปที่ ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
