import { useState } from 'react';
import { ChevronDown, ChevronRight, Clock, Trophy, Vote } from 'lucide-react';
import Fold from '@/components/ui/Fold';
import usePhone from '@/hooks/usePhone';
import PollModal, { PollChoices } from './PollModal';
import usePoll from './usePoll';

/**
 * Poll announcement: cover photos, question, time left and "โหวตเลย". On the home card it opens the vote popup;
 * `inline` (inside "ประกาศทั้งหมด") folds the choices open under the card instead of a popup on a popup.
 */
export default function PollCard({ poll, inline = false }) {
  const [open, setOpen] = useState(false);
  const state = usePoll(poll);
  const phone = usePhone();
  const fold = inline && !phone; // phones still open the vote popup (a full-width sheet)
  const { mine, total, left, closed, winners } = state;
  const pics = poll.opts.filter((o) => o.img).slice(0, 2);
  const winner = poll.opts.find((o) => o.id === winners[0]);
  const cta = closed ? 'ดูผลโหวต' : mine ? 'ดู / เปลี่ยนโหวต' : 'โหวตเลย';

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => (fold ? !v : true))}
        aria-expanded={fold ? open : undefined}
        className="group mt-[10px] flex w-full max-w-[460px] cursor-pointer overflow-hidden rounded-box border-0 bg-white p-0 text-left shadow-card transition-shadow duration-200 hover:shadow-pop max-[640px]:max-w-none max-[640px]:flex-col"
      >
        <span className="flex w-[150px] flex-none max-[640px]:h-[110px] max-[640px]:w-full">
          {pics.length ? pics.map((o) => (
            <img key={o.id} src={o.img} alt="" className="h-full min-h-[104px] min-w-0 flex-1 object-cover" />
          )) : (
            <span className="grid flex-1 place-items-center bg-gradient-to-br from-teal-bright to-[#8DC63F] text-white">
              <Vote className="h-9 w-9" strokeWidth={1.8} aria-hidden="true" />
            </span>
          )}
        </span>
        <span className="flex min-w-0 flex-1 flex-col gap-1 px-3.5 pb-3 pt-3">
          <span className="flex items-center gap-1.5 text-[11.5px] font-semibold">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#E3F4EF] px-2 py-[1px] text-teal-hover"><Vote size={12} strokeWidth={2.4} aria-hidden="true" />โหวต</span>
            {closed
              ? <span className="text-muted">ปิดโหวตแล้ว</span>
              : <span className="inline-flex items-center gap-1 text-[#D9480F]"><Clock size={12} strokeWidth={2.4} aria-hidden="true" />เหลือเวลา {left}</span>}
          </span>
          <b className="line-clamp-2 text-[13.5px] leading-[1.45] text-ink">{poll.q}</b>
          <span className="text-[11.5px] text-muted">
            {closed && winner
              ? <span className="inline-flex items-center gap-1 font-semibold text-ink"><Trophy size={12} className="text-[#E0A800]" aria-hidden="true" />{winner.l}</span>
              : `โหวตแล้ว ${total} คน${mine ? ' · คุณโหวตแล้ว' : ''}`}
          </span>
          <span className="mt-auto inline-flex w-max items-center self-end gap-0.5 rounded-ctl bg-teal-bright px-3 py-1.5 text-[12.5px] font-semibold text-white transition-colors duration-200 group-hover:bg-teal-hover">
            {fold && open ? 'ซ่อน' : cta}
            {fold
              ? <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
              : <ChevronRight className="h-4 w-4" aria-hidden="true" />}
          </span>
        </span>
      </button>
      {fold ? (
        <Fold open={open}>
          <div className="mt-2 max-w-[460px] rounded-box bg-white shadow-card max-[640px]:max-w-none"><PollChoices poll={poll} state={state} inline /></div>
        </Fold>
      ) : open && <PollModal poll={poll} state={state} onClose={() => setOpen(false)} />}
    </>
  );
}
