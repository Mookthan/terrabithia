/**
 * Darkens and blurs a photo or video cover while its card is hovered, like the Our Activity album tiles
 * (mook 2026-10-30). Put it inside the media box (relative, overflow-hidden) of a `group` card,
 * after the image and before any badge or play button that should stay sharp.
 */
export default function HoverVeil({ className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 bg-black/0 backdrop-blur-0 backdrop-brightness-100 transition-[background-color,backdrop-filter] duration-[400ms] ease-[cubic-bezier(.25,.46,.45,.94)] group-hover:bg-black/15 group-hover:backdrop-blur-[10px] group-hover:backdrop-brightness-[.6] group-focus-visible:bg-black/15 group-focus-visible:backdrop-blur-[10px] group-focus-visible:backdrop-brightness-[.6] motion-reduce:transition-none ${className}`}
    />
  );
}
