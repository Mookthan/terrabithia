/** One activity on the Our Activity grid: its cover photo, with text sliding in on hover. */
export default function ActivityTile({ activity, onOpen, className = '', style }) {
  const { img, g, Icon, tag, t, d } = activity;
  const ease = 'ease-[cubic-bezier(.25,.46,.45,.94)]';
  const txt = 'translate-y-[var(--ty)] opacity-0 transition-[opacity,transform] duration-[400ms] ease-[ease] group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:!transform-none motion-reduce:!opacity-100';
  return (
    <div
      data-reveal
      data-cursor="ดูอัลบั้ม"
      data-cursor-icon="album"
      onClick={onOpen}
      className={`group relative cursor-pointer overflow-hidden rounded-box ${className}`}
      style={style}
    >
      <div
        className={`absolute inset-0 bg-cover bg-center transition-transform duration-[450ms] ${ease} group-hover:scale-[1.06]`}
        style={{ backgroundImage: img ? `url(${img}), linear-gradient(135deg,${g})` : `linear-gradient(135deg,${g})` }}
      />
      <div
        className={`absolute inset-0 flex flex-col justify-end bg-black/0 p-4 backdrop-blur-0 backdrop-brightness-100 transition-[background,backdrop-filter] duration-[400ms] ${ease} group-hover:bg-black/15 group-hover:backdrop-blur-[10px] group-hover:backdrop-brightness-[.6] motion-reduce:!bg-black/15 motion-reduce:!backdrop-blur-[10px] motion-reduce:!backdrop-brightness-[.6]`}
      >
        <div className={`mb-1 text-[10px] font-bold uppercase tracking-[.1em] text-[#8EE0CE] ${txt}`} style={{ '--ty': '10px' }}>
          {tag}
        </div>
        <div className={`text-[13.5px] font-bold leading-[1.4] text-white delay-[50ms] ${txt}`} style={{ '--ty': '12px' }}>
          <Icon className="lc" /> {t}
        </div>
        <div className={`mt-[3px] text-[11px] text-[#dfe8e4] delay-100 ${txt}`} style={{ '--ty': '14px' }}>
          {d}
        </div>
      </div>
    </div>
  );
}
