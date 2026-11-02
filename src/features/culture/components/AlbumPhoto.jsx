import HoverVeil from '@/components/ui/HoverVeil';

/**
 * One photo tile: a real photo (`src`) or a placeholder gradient.
 * Fills its box; album rows size the box to the photo's own shape.
 */
export default function AlbumPhoto({ photo, onOpen, className = '' }) {
  const { g, Icon, src } = photo;
  return (
    <button
      data-reveal
      type="button"
      onClick={onOpen}
      data-cursor="ดูรูป"
      data-cursor-icon="eye"
      className={`group relative block h-full w-full cursor-pointer overflow-hidden rounded-box border-0 bg-line p-0 shadow-card ${className}`}
    >
      {src ? (
        <img
          src={src}
          alt=""
          loading="lazy"
          draggable={false}
          className={`block h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]`}
        />
      ) : (
        <span
          className={`flex h-full w-full items-center justify-center text-[40px]`}
          style={{ backgroundImage: `linear-gradient(135deg,${g})` }}
        >
          <Icon className="lc text-white opacity-[.92] transition-transform duration-700 group-hover:scale-110" strokeWidth={1.4} />
        </span>
      )}
      <HoverVeil />
    </button>
  );
}
