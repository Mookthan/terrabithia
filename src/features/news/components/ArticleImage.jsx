import { useRef, useState } from 'react';
import { Heart } from 'lucide-react';
import { likeOnce } from '../newsStore';
import { newsBg } from '../data';
import '../news.css';

/**
 * Article photo (or gradient + icon) with the "terrabit" watermark; a `poster` (16:9 artwork) shows whole, unmarked.
 * With `likeIndex`, double-click / double-tap likes the article and bursts a heart.
 */
export default function ArticleImage({ news: n, likeIndex, className = '' }) {
  const [hearts, setHearts] = useState([]);
  const lastTap = useRef(0);
  const Icon = n.e;
  const likeable = likeIndex != null;

  const burst = (e) => {
    likeOnce(likeIndex);
    const r = e.currentTarget.getBoundingClientRect();
    const h = { id: Date.now() + Math.random(), x: e.clientX ? e.clientX - r.left : null, y: e.clientY ? e.clientY - r.top : null };
    setHearts((list) => [...list, h]);
    setTimeout(() => setHearts((list) => list.filter((x) => x !== h)), 900);
  };
  const onPointerUp = (e) => {
    if (e.pointerType !== 'touch') return;
    const t = Date.now();
    if (t - lastTap.current < 320) { lastTap.current = 0; burst(e); } else lastTap.current = t;
  };

  return (
    <div
      className={`relative flex w-full items-center justify-center rounded-box bg-cover bg-[center_30%] bg-no-repeat text-[56px] text-white ${likeable ? 'cursor-pointer touch-manipulation select-none' : ''} ${className}`}
      style={newsBg(n)}
      onDoubleClick={likeable ? burst : undefined}
      onPointerUp={likeable ? onPointerUp : undefined}
    >
      {!n.img && <Icon className="lc news-noimg-ic" />}
      {!n.poster && <span className="absolute bottom-3 right-4 text-xs font-bold text-white opacity-85">terrabit</span>}
      {hearts.map((h) => (
        <span key={h.id} className="news-bigheart" style={h.x != null ? { left: h.x, top: h.y } : undefined}>
          <Heart />
        </span>
      ))}
    </div>
  );
}
