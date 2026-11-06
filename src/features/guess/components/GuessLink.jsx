import { useState } from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { TEXT_LINK } from '@/components/ui/TextButton';
import { useGuess } from '../guessStore';
import GuessModal from './GuessModal';

/** "ทายใครเอ่ยวันนี้ ›" (big Org Chart heading) link that opens the daily game; once played today it becomes a quiet "เล่นแล้ว ✓". */
export default function GuessLink({ className = '' }) {
  const played = !!useGuess().pick;
  const [open, setOpen] = useState(false);
  return (
    <>
      {played ? (
        <span className={`inline-flex items-center gap-1 whitespace-nowrap text-[13px] font-medium text-muted ${className}`}>
          ทายใครเอ่ย: เล่นแล้ววันนี้<Check className="lc !h-4 !w-4 text-teal-bright" aria-hidden="true" />
        </span>
      ) : (
        <button
          type="button"
          className={`${TEXT_LINK} whitespace-nowrap text-[13px] font-semibold ${className}`}
          onClick={(e) => { e.stopPropagation(); setOpen(true); }}
        >
          ทายใครเอ่ยวันนี้<ChevronRight className="lc !h-4 !w-4" aria-hidden="true" />
        </button>
      )}
      {open && <GuessModal onClose={() => setOpen(false)} />}
    </>
  );
}
