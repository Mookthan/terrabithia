import { useEffect, useRef, useState } from 'react';
import { Heart } from 'lucide-react';
import './likeHeart.css';

const DOTS = [0, 45, 90, 135, 180, 225, 270, 315];

/**
 * The like heart: the same lucide Heart icon, red when liked, with a
 * Twitter-style burst (ring + dots + pop) each time it turns on.
 */
export default function LikeHeart({ on, iconClassName = '' }) {
  const [burst, setBurst] = useState(0);
  const wasOn = useRef(on);
  useEffect(() => {
    if (on && !wasOn.current) setBurst((b) => b + 1);
    wasOn.current = on;
  }, [on]);
  const playing = on && burst > 0;

  return (
    <span className={`like-heart ${on ? 'on' : ''}`}>
      {playing && (
        <span key={`b${burst}`} className="lh-burst" aria-hidden="true">
          <span className="lh-ring" />
          {DOTS.map((a, i) => <span key={a} className="lh-dot" style={{ '--a': `${a}deg`, '--i': i }} />)}
        </span>
      )}
      <Heart key={`h${burst}`} className={`lc ${iconClassName} ${playing ? 'lh-pop' : ''}`} aria-hidden="true" />
    </span>
  );
}
