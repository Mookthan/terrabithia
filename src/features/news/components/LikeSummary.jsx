import { likersOf, reactionTotals, useNewsState } from '../newsStore';

/** Facebook-style summary: the 3 most used emoji, then "X and N others"; opens the reactions list. */
export default function LikeSummary({ index, onOpen }) {
  const { liked } = useNewsState();
  const people = likersOf(liked, index);
  if (!people.length) return <span className="text-[13px] text-[#7a8785]">เป็นคนแรกที่กดรีแอค</span>;
  const rest = people.length - 1;
  return (
    <button
      onClick={onOpen}
      className="group inline-flex cursor-pointer items-center gap-[9px] border-0 bg-none py-1 text-left text-sm text-ink transition-colors duration-200 hover:!text-teal-hover"
    >
      <span className="inline-flex">
        {reactionTotals(people).slice(0, 3).map(([e], k) => (
          <i
            key={e}
            className={`flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 border-white bg-white text-[14px] not-italic leading-none ${k ? '-ml-1.5' : ''}`}
            style={{ zIndex: 3 - k }}
          >
            {e}
          </i>
        ))}
      </span>
      <span className="group-hover:underline">
        <b>{people[0][0]}</b>{rest > 0 && <> และคนอื่นๆ อีก <b>{rest}</b> คน</>}
      </span>
    </button>
  );
}
