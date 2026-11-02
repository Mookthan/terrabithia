import { useMemo } from 'react';
import { CONFETTI_COLORS } from '../data';

/** Burst of confetti pieces flying out from one point. Random layout is fixed per mount. */
export default function Confetti({ count = 44, radius = 140, spread = 220, lift = 60, delay = 0.25, spin = 720, className = 'absolute top-[60px]' }) {
  const pieces = useMemo(() => Array.from({ length: count }, (_, i) => {
    const a = (Math.PI * 2 * i) / count;
    const r = radius + Math.random() * spread;
    return {
      '--c': CONFETTI_COLORS[i % 6],
      '--d': `${(Math.random() * delay).toFixed(2)}s`,
      '--x': `${Math.round(Math.cos(a) * r)}px`,
      '--y': `${Math.round(Math.sin(a) * r - lift)}px`,
      '--r': `${Math.round(Math.random() * spin)}deg`,
    };
  }), [count, radius, spread, lift, delay, spin]);
  return (
    <div className={`bd-conf pointer-events-none left-1/2 h-0 w-0 ${className}`}>
      {pieces.map((style, i) => <i key={i} style={style} />)}
    </div>
  );
}
