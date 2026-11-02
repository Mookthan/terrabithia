import { Star } from 'lucide-react';

/** Clickable 1–5 star rating. */
export default function RateInput({ value, onChange }) {
  return (
    <div className="mt-1.5 flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          aria-label={`${i} ดาว`}
          onClick={() => onChange(i)}
          className="cursor-pointer border-none bg-transparent p-0 text-[18px] leading-none text-[#C4C4C4]"
        >
          <Star className={`lc ${i <= value ? 'fill-[#F5C518] stroke-[#F5C518]' : 'fill-[#C4C4C4] stroke-[#C4C4C4]'}`} />
        </button>
      ))}
      <small className="ml-1.5 text-[smaller]">{value.toFixed(1)}</small>
    </div>
  );
}
