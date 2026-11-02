import { Check, Eye, Loader2, Save, Send } from 'lucide-react';
import { OUTLINE_HOVER, TEXT_BTN } from '@/components/ui/TextButton';

const MOBILE_BTN = 'max-[860px]:flex max-[860px]:w-full max-[860px]:items-center max-[860px]:justify-center max-[860px]:gap-1.5';

const DRAFT_FACE = {
  idle: [Save, 'บันทึกแบบร่าง'],
  saving: [Loader2, 'กำลังบันทึก…'],
  saved: [Check, 'บันทึกแล้ว'],
};

/** draftState: 'idle' | 'saving' | 'saved' (the button says what happened, then settles back). */
export default function ComposerActions({ onPreview, onDraft, onSubmit, sending, draftState = 'idle' }) {
  const [DraftIcon, draftLabel] = DRAFT_FACE[draftState];
  return (
    <div className="mt-2 flex flex-wrap items-center justify-end gap-2.5 max-[860px]:flex-col-reverse max-[860px]:items-stretch max-[860px]:gap-1.5">
      <button
        type="button"
        onClick={onPreview}
        className={`${TEXT_BTN} mr-auto gap-1.5 max-[860px]:m-0 max-[860px]:justify-center`}
      >
        <Eye className="h-4 w-4" aria-hidden="true" /> ดูตัวอย่าง
      </button>
      <button
        type="button"
        onClick={onDraft}
        disabled={draftState === 'saving'}
        aria-live="polite"
        className={`rounded-ctl border border-[#cfcfc8] bg-white px-3.5 py-[9px] text-[13px] text-ink ${OUTLINE_HOVER} disabled:cursor-wait max-[860px]:p-[11px] ${MOBILE_BTN} ${draftState === 'saved' ? '!text-teal-hover' : ''}`}
      >
        <DraftIcon className={`lc ${draftState === 'saving' ? 'animate-spin' : ''}`} /> {draftLabel}
      </button>
      <button
        type="button"
        onClick={onSubmit}
        disabled={sending}
        aria-busy={sending}
        className={`rounded-ctl bg-teal-bright px-4 py-[9px] text-[13px] font-semibold text-white transition-colors duration-200 hover:!bg-teal-hover disabled:cursor-wait disabled:!bg-teal-hover max-[860px]:p-3 max-[860px]:text-[14px] ${MOBILE_BTN}`}
      >
        {sending
          ? <><Loader2 className="lc animate-spin" /> กำลังส่ง…</>
          : <><Send className="lc" /> ส่งอนุมัติ</>}
      </button>
    </div>
  );
}
