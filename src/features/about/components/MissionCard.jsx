import { ClipboardList, Handshake, Target } from 'lucide-react';

const ICONS = { ClipboardList, Handshake, Target };

/**
 * One mission step as a house-shaped card: an SVG roof with rounded peak and shoulders
 * sits on the body, and a ringed icon badge sits half over the bottom edge.
 */
export default function MissionCard({ m, c, icon, i }) {
  const Icon = ICONS[icon];
  return (
    <li className="mis-in group relative flex list-none pb-[min(34%,70px)] text-ink" style={{ '--i': i, '--c': c }}>
      <div className="relative flex w-full flex-col transition-transform duration-300 group-hover:-translate-y-1.5">
        <svg viewBox="0 0 100 40" aria-hidden="true" className="absolute inset-x-0 top-0 block w-full fill-[var(--c)]">
          <path d="M0 40V37Q0 33.5 3 31.3L46 1.6Q50 -1 54 1.6L97 31.3Q100 33.5 100 37V40Z" />
        </svg>
        <div className="relative mt-[38%] flex flex-1 flex-col items-center rounded-b-box bg-[var(--c)] px-[9%] pb-[min(42%,96px)] text-center">
          <div className="-mt-[14%] text-[30px] font-bold leading-none">{m.n.replace('.', '')}</div>
          <h3 className="mb-3 mt-2 text-[16px] font-bold leading-snug">{m.t}</h3>
          <ul className="m-0 list-none space-y-2 p-0 text-[12.5px] leading-[1.5]">
            {m.i.map((x) => (
              <li key={x.t}>
                {x.t.replace(/^\d\.\d\s*/, '')}
              </li>
            ))}
          </ul>
        </div>
        <div className="absolute bottom-0 left-1/2 grid aspect-square w-[60%] max-w-[140px] -translate-x-1/2 translate-y-1/2 place-items-center rounded-full bg-white p-[5%]">
          <div className="grid h-full w-full place-items-center rounded-full border-[7px] border-[var(--c)] bg-white text-accent">
            <Icon className="h-[38%] w-[38%]" strokeWidth={1.8} aria-hidden="true" />
          </div>
        </div>
      </div>
    </li>
  );
}
