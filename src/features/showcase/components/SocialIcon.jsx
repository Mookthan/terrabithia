import { platformOf } from '../social';

const COLORS = { facebook: '#1877F2', instagram: 'linear-gradient(45deg,#F9A13A,#E1306C 55%,#8A3AB9)', tiktok: '#111', x: '#111', linkedin: '#0A66C2', youtube: '#FF0000', line: '#06C755', web: '#12986F' };

/** White glyph drawn on a 24 box. */
const GLYPHS = {
  facebook: <path d="M13.3 20v-7h2.4l.4-2.8h-2.8V8.5c0-.8.3-1.4 1.4-1.4H16V4.6a20 20 0 0 0-2.2-.1c-2.2 0-3.6 1.3-3.6 3.7v2H7.8V13h2.4v7z" fill="#fff" />,
  instagram: (
    <g fill="none" stroke="#fff" strokeWidth="1.8">
      <rect x="5" y="5" width="14" height="14" rx="4" />
      <circle cx="12" cy="12" r="3.2" />
      <circle cx="16.3" cy="7.7" r=".6" fill="#fff" stroke="none" />
    </g>
  ),
  tiktok: <path d="M15.6 4h-2.7v10.6a2.3 2.3 0 1 1-2.3-2.3c.2 0 .5 0 .7.1V9.6l-.7-.1a5 5 0 1 0 5 5V9.3c1 .7 2.2 1.1 3.4 1.1V7.7c-1.9 0-3.4-1.6-3.4-3.7z" fill="#fff" />,
  x: <path d="M6 5h3.6l3.2 4.4L16.6 5h2l-4.9 5.7L19.2 19h-3.6l-3.5-4.8L7.9 19h-2l5.3-6.1z" fill="#fff" />,
  linkedin: <path d="M6.5 9.5h2.6V18H6.5zm1.3-4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm3 4h2.5v1.2c.4-.7 1.3-1.4 2.6-1.4 2.7 0 3.2 1.8 3.2 4V18h-2.6v-4.1c0-1 0-2.3-1.4-2.3s-1.7 1.1-1.7 2.2V18h-2.6z" fill="#fff" />,
  youtube: (
    <g>
      <rect x="4" y="6.5" width="16" height="11" rx="3.2" fill="#fff" />
      <path d="M10.5 9.6v4.8l4.2-2.4z" fill="#FF0000" />
    </g>
  ),
  web: (
    <g fill="none" stroke="#fff" strokeWidth="1.7">
      <circle cx="12" cy="12" r="7" />
      <path d="M5 12h14M12 5c2 2 2.8 4.4 2.8 7S14 17 12 19c-2-2-2.8-4.4-2.8-7S10 7 12 5z" />
    </g>
  ),
  line: (
    <g>
      <path d="M12 5c-4.4 0-8 2.8-8 6.3 0 3.1 2.9 5.7 6.7 6.2.3.1.6.2.7.5v1.4c0 .4.3.6.7.4 1-.6 5.4-3.3 7-5.6.6-.9.9-1.9.9-2.9C20 7.8 16.4 5 12 5z" fill="#fff" />
      <text x="12" y="13" textAnchor="middle" fontSize="4.2" fontWeight="800" fill="#06C755" fontFamily="Arial,sans-serif">LINE</text>
    </g>
  ),
};

/** Round brand badge for a social platform. */
export default function SocialIcon({ k, size = 22 }) {
  return (
    <span
      className="inline-flex flex-none items-center justify-center rounded-full"
      style={{ width: size, height: size, background: COLORS[k] }}
      role="img"
      aria-label={platformOf(k)?.l}
    >
      <svg viewBox="0 0 24 24" width={size * 0.82} height={size * 0.82} aria-hidden="true">{GLYPHS[k]}</svg>
    </span>
  );
}
