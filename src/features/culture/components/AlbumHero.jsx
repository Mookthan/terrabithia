import { ChevronLeft } from 'lucide-react';

/** Album header: a dark full-bleed photo band with the back button, title, description, date and photo count. */
export default function AlbumHero({ album, backdrop, onBack }) {
  return (
    <div className="relative mb-6 pb-8 pt-8 text-white">
      <div className="absolute inset-y-0 left-1/2 -ml-[50vw] w-screen overflow-hidden bg-[#0b1420]">
        <img src={backdrop} alt="" className="h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1420]/85 via-[#0b1420]/40 to-transparent" />
      </div>
      <div className="relative">
        <button
          type="button"
          onClick={onBack}
          className="mb-7 cursor-pointer rounded-ctl border border-white/40 bg-white/10 px-4 py-2 text-[13px] text-white backdrop-blur-sm transition-colors hover:bg-white/25"
        >
          <ChevronLeft className="lc !h-[1.05em] !w-[1.05em] !align-[-.2em]" /> กลับไปอัลบั้ม
        </button>
        <h1 className="m-0 mb-3 max-w-[640px] text-[26px] font-bold leading-snug max-[860px]:text-[21px]">{album.t}</h1>
        {album.desc && <p className="m-0 mb-2 max-w-[560px] text-[13.5px] leading-relaxed text-white/85">{album.desc}</p>}
        <p className="m-0 text-[12.5px] text-white/70">{`${album.tag} · ${album.d} · ${album.count} รูป`}</p>
      </div>
    </div>
  );
}
