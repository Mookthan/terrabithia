import { GROUP_STYLE } from './annModel';

/** Coloured pill naming the team that posted. */
export default function GroupBadge({ g }) {
  return (
    <i className={`rounded-full px-[9px] py-[2px] text-[11px] font-bold not-italic leading-[1.5] tracking-[.02em] ${GROUP_STYLE[g]?.badge || 'bg-white text-ink'}`}>
      {g}
    </i>
  );
}
