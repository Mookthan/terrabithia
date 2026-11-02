import { Handshake, Laptop } from 'lucide-react';
import '../about.css';

/** Older lucide "building-2" glyph used by the prototype (current lucide-react draws a different one). */
function BuildingIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" /><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
      <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" /><path d="M10 6h4" /><path d="M10 10h4" /><path d="M10 14h4" /><path d="M10 18h4" />
    </svg>
  );
}

const ICONS = { handshake: Handshake, building: BuildingIcon, laptop: Laptop };
const face = 'svc-face absolute inset-0 overflow-hidden rounded-box';

/** Flip card: hover (mouse) or tap (touch) turns it to show the service list. */
export default function ServiceCard({ svc, flipped, onFlip }) {
  const Icon = ICONS[svc.icon];
  return (
    <div
      className={`svc-scene h-[520px] cursor-pointer outline-offset-4 ${flipped ? 'flipped' : ''}`}
      tabIndex={0}
      role="button"
      onClick={onFlip}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onFlip(); } }}
    >
      <div className="svc-card relative h-full w-full">
        <div className={`${face} flex flex-col bg-white shadow-card`}>
          <div className="bg-mint px-3.5 py-[18px] text-center leading-[1.45] text-ink">
            <b className="block text-[17px]">{svc.en}</b>
            <span className="text-[14.5px] font-semibold">{svc.th}</span>
          </div>
          <div className="svc-img relative flex flex-1 items-center justify-center text-[84px]" style={{ background: `linear-gradient(135deg,${svc.g})` }}>
            <Icon className="lc" />
            <div className="svc-hint absolute bottom-3.5 left-0 right-0 text-center text-[11px] tracking-[.04em] text-white [text-shadow:0_1px_4px_rgba(0,0,0,.5)]" />
          </div>
        </div>
        <div className={`${face} svc-back overflow-y-auto bg-[#12201f] p-[22px] text-white`}>
          <h3 className="mb-3.5 text-base font-bold leading-normal underline">{svc.en}<br />{svc.th}</h3>
          {svc.items.map(([name, desc]) => (
            <div key={name} className="border-b border-white/40 py-2.5">
              <b className="mb-[3px] block text-[13.5px]">{name}</b>
              <p className="text-[11.5px] leading-[1.65] opacity-80">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
