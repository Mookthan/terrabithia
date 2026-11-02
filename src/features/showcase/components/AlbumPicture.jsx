/** One album picture: an uploaded photo (`src`) or a mock interest tile (gradient `g` + `Icon`). */
export default function AlbumPicture({ photo: p, className = '', iconClassName = '!h-1/3 !w-1/3' }) {
  if (p.src) return <img src={p.src} alt={p.cap || ''} loading="lazy" className={className} />;
  const { Icon } = p;
  return (
    <div role="img" aria-label={p.cap || ''} className={`grid place-items-center text-white ${className}`} style={{ background: `linear-gradient(135deg, ${p.g[0]}, ${p.g[1]})` }}>
      <Icon className={`lc opacity-95 ${iconClassName}`} strokeWidth={1.4} aria-hidden="true" />
    </div>
  );
}
