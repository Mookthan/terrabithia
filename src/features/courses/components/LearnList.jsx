import { CircleCheck } from 'lucide-react';
import { CRS_LEARN } from '../data';

export default function LearnList() {
  return (
    <ul className="list-none rounded-b-box bg-[#F8F7F2] px-[22px] pb-[18px] pt-3.5 shadow-card">
      {CRS_LEARN.map((t) => (
        <li key={t} className="flex items-center gap-2.5 py-[7px] text-[12.5px] text-ink">
          <CircleCheck className="lc !h-[19px] !w-[19px] text-teal-bright" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}
