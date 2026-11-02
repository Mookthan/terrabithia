import { OCC_COVERS } from '../occasions';
import { bdNick } from '../data';
import ThemeIcon from './ThemeIcon';

/**
 * A festival cover drawn with CSS: soft background, a large faint icon,
 * the greeting and "ถึง <nickname>". Like CardCover it needs a `container-type: inline-size` parent.
 * Only Latin subtitles get letter-spacing (spaced-out Thai pulls its vowel marks apart).
 */
export default function OccasionCover({ cover, owner }) {
  const c = OCC_COVERS[cover];
  return (
    <div data-nt className="relative flex aspect-[760/1011] w-full flex-none flex-col items-center justify-center overflow-hidden px-[8cqw] text-center" style={{ background: c.bg, color: c.fg }}>
      <span className="pointer-events-none absolute -right-[10cqw] -top-[8cqw] rotate-12 opacity-[.14]">
        <ThemeIcon k={c.ic} strokeWidth={1.4} className="!h-[62cqw] !w-[62cqw]" />
      </span>
      <ThemeIcon k={c.ic} strokeWidth={1.6} className="relative mb-[5cqw] !h-[16cqw] !w-[16cqw]" />
      <b className="relative block text-[11cqw] font-normal leading-[1.15] [word-break:break-word]" style={{ fontFamily: `'${c.ff}', Sarabun, sans-serif` }}>{c.title}</b>
      <span className={`relative mt-[3.5cqw] block text-[3.8cqw] font-semibold opacity-90 ${/^[ -~]+$/.test(c.sub) ? 'tracking-[.12em]' : ''}`}>{c.sub}</span>
      <span className="relative mt-[9cqw] block border-t border-current px-[4cqw] pt-[3cqw] text-[4.6cqw] opacity-85">ถึง {bdNick(owner)}</span>
    </div>
  );
}
