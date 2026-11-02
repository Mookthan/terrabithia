import { createPortal } from 'react-dom';
import useBodyLock from '@/hooks/useBodyLock';
import useEscape from '@/hooks/useEscape';
import AnnEmpty from './AnnEmpty';
import AnnHeader from './AnnHeader';
import AnnRow from './AnnRow';
import { annOrder } from './annModel';
import CloseButton from '@/components/ui/CloseButton';

/** "ประกาศทั้งหมด" popup: same search / filter as the home card, full text, its own scrolling list. */
export default function AllAnnouncementsModal({ list, filter, pinned, flash = -1, onOpenImage, onClose }) {
  useBodyLock(true);
  useEscape(onClose);
  const rows = annOrder(list, filter.f, pinned);

  return createPortal(
    <div
      className="ann-fade fixed inset-0 z-[2600] flex items-center justify-center bg-[rgba(14,40,36,.5)] p-5 backdrop-blur-[3px] max-[640px]:items-end max-[640px]:p-0"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="ประกาศทั้งหมด"
        className="ann-up relative flex h-[min(86dvh,820px)] w-[min(720px,100%)] flex-col rounded-box bg-[#D6E5A3] px-[26px] pb-2 pt-[22px] shadow-pop max-[640px]:h-[92dvh] max-[640px]:w-full max-[640px]:rounded-b-none max-[640px]:px-4 max-[640px]:pb-[6px] max-[640px]:pt-[18px]"
      >
        <AnnHeader
          title="ประกาศทั้งหมด"
          list={list}
          filter={filter}
          end={(
            <CloseButton onClick={onClose} />
          )}
        />
        <div className="mx-[2px] mb-1 mt-[10px] text-[12px] text-ink opacity-65">{rows.length} / {list.length} ประกาศ</div>
        <div className="ann-scroll -mx-[10px] min-h-0 flex-1 overflow-y-auto overscroll-contain px-[10px] pb-[14px]">
          {rows.length
            ? rows.map((i) => <AnnRow key={i} a={list[i]} pinned={i === pinned} flash={i === flash} onOpenImage={onOpenImage} onJump={onClose} inlinePoll />)
            : <AnnEmpty q={filter.f.q} />}
        </div>
      </div>
    </div>,
    document.body,
  );
}
