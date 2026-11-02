import { Check } from 'lucide-react';
import { ME } from '@/data/me';
import { sortedSkills, toggleEndorse } from '../skills';

const CHIP = 'inline-flex items-center gap-1.5 rounded-ctl border px-2.5 py-1 text-[12.5px] font-semibold';

/**
 * A person's skills, most endorsed first, each with its endorsement count.
 * On someone else's card (`endorsable`) a chip is a green button: tap to endorse, tap again to take it back.
 */
export default function SkillChips({ id, list, endorsable = false }) {
  return (
    <ul className="m-0 flex min-w-0 flex-1 list-none flex-wrap gap-1.5 p-0">
      {sortedSkills(list).map(([s, by]) => {
        const mine = by.includes(ME.id);
        const count = by.length > 0 && <span className={`rounded-full px-1.5 text-[11px] leading-[18px] ${mine ? 'bg-teal-bright text-white' : 'bg-cream text-muted'}`}>{by.length}</span>;
        return (
          <li key={s}>
            {endorsable ? (
              <button
                type="button"
                aria-pressed={mine}
                title={mine ? 'รับรองแล้ว กดอีกครั้งเพื่อยกเลิก' : 'กดเพื่อรับรองความถนัดนี้'}
                onClick={() => toggleEndorse(id, s)}
                className={`${CHIP} cursor-pointer transition-colors duration-200 ${mine ? 'border-teal-bright bg-teal-soft text-teal-hover' : 'border-line bg-white text-teal-bright hover:bg-teal-veil hover:text-teal-hover'}`}
              >
                {mine && <Check className="lc !h-3.5 !w-3.5" aria-hidden="true" />}
                {s}
                {count}
              </button>
            ) : (
              <span className={`${CHIP} border-line bg-white text-ink`}>{s}{count}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
