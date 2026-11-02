import { X } from 'lucide-react';

const BASE = 'grid flex-none cursor-pointer place-items-center rounded-full border-0 p-0 text-ink transition-[background,transform] duration-200 hover:rotate-90';
const TONES = {
  // Popups and panels on white or coloured surfaces.
  plain: `${BASE} h-9 w-9 bg-transparent hover:bg-teal-veil`,
  // Floating over photos, video or a dark / full-screen backdrop.
  float: `${BASE} h-11 w-11 bg-white/[.92] shadow-pop hover:bg-white`,
};

/**
 * The one close (X) button used everywhere (mook 2026-10-30): same cross, weight, hover tint and quarter turn.
 * `tone` plain for popups, float over photos and dark backdrops; place it with `className` (absolute right-3 top-3 …).
 */
export default function CloseButton({ onClick, tone = 'plain', label = 'ปิด', className = '' }) {
  return (
    <button type="button" onClick={onClick} aria-label={label} className={`${TONES[tone]} ${className}`}>
      <X className={tone === 'float' ? 'h-5 w-5' : 'h-[18px] w-[18px]'} strokeWidth={2.4} aria-hidden="true" />
    </button>
  );
}
