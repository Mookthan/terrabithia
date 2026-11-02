import { ACTIVITIES, PHOTO_VARIANTS } from '@/features/culture/data';

/** A photo from an Activity album, pasted on the card as a taped polaroid. `ph` is [album, photo]. */
export default function PhotoSticker({ ph }) {
  const album = ACTIVITIES[ph[0]];
  const v = PHOTO_VARIANTS[ph[1]] || PHOTO_VARIANTS[0];
  const Icon = v.Icon;
  return (
    <span
      className="relative block w-[3.4em] rounded-[.1em] bg-white p-[.14em] before:absolute before:left-1/2 before:top-[-.2em] before:h-[.36em] before:w-[1.1em] before:-translate-x-1/2 before:-rotate-3 before:bg-[rgba(246,213,140,.8)] before:shadow-[0_.01em_.03em_rgba(0,0,0,.18)] before:content-['']"
      title={album?.t}
    >
      <span className="grid h-[2.5em] place-items-center rounded-[.05em] text-white" style={{ backgroundImage: `linear-gradient(135deg,${v.g})` }}>
        <Icon className="h-[1em] w-[1em]" aria-hidden="true" />
      </span>
    </span>
  );
}
