import { iconFor } from '../icons';

/** Plain line icon for a theme / sticker key. */
export default function ThemeIcon({ k, className = '', strokeWidth = 2 }) {
  const Icon = iconFor(k);
  return <Icon className={`lc ${className}`} strokeWidth={strokeWidth} aria-hidden="true" />;
}
