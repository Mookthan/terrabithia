import { Star } from 'lucide-react';

/** Five read-only stars, `n` of them filled. */
export default function Stars({ n, big = false }) {
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => {
        const on = i <= Math.round(n);
        return (
          <span key={i} className={`${big ? 'text-[22px]' : 'text-[17px]'} ${on ? 'text-[#F5C518]' : 'text-[#C4C4C4]'}`}>
            <Star className={`lc ${on ? 'fill-[#F5C518] stroke-[#F5C518]' : 'fill-[#C4C4C4] stroke-[#C4C4C4]'}`} />
          </span>
        );
      })}
    </span>
  );
}
