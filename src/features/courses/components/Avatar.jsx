/** Round reviewer avatar: photo, or the name's first letter on a tint. */
export default function Avatar({ src, name, bg, big = false }) {
  return (
    <span
      className={`grid flex-none place-items-center overflow-hidden rounded-full font-bold text-ink ${big ? 'h-[54px] w-[54px] text-[20px]' : 'h-[42px] w-[42px]'}`}
      style={{ background: bg }}
    >
      {src ? <img src={src} alt="" className="block h-full w-full rounded-full object-cover" /> : name.charAt(0)}
    </span>
  );
}
