import { CheckCircle2 } from 'lucide-react';
import useEscape from '@/hooks/useEscape';
import { OUTLINE_HOVER } from '@/components/ui/TextButton';

/** Shown after "ส่งอนุมัติ": the post is waiting for an approver. */
export default function SubmittedModal({ open, onClose, onViewPending }) {
  useEscape(onClose, open);
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[90] flex animate-[ptFade_.2s_ease_both] items-center justify-center bg-[rgba(10,20,18,.45)] p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div role="dialog" aria-modal="true" aria-labelledby="kn-sent-title" className="w-[380px] max-w-full animate-[ptIn_.35s_cubic-bezier(.22,1,.36,1)_both] rounded-box bg-white px-6 pb-5 pt-7 text-center shadow-pop">
        <CheckCircle2 className="lc mx-auto mb-3 !h-14 !w-14 text-teal-bright" strokeWidth={1.6} aria-hidden="true" />
        <b id="kn-sent-title" className="block text-[17px] text-ink">ส่งอนุมัติแล้ว</b>
        <p className="mx-auto mt-1.5 max-w-[290px] text-[13px] leading-[1.6] text-muted">
          โพสต์ของคุณกำลังรอผู้อนุมัติตรวจสอบ เมื่ออนุมัติแล้วจะแสดงให้แผนกที่เลือกเห็น
        </p>
        <div className="mt-5 flex gap-2 max-[420px]:flex-col-reverse">
          <button type="button" onClick={onClose} className={`flex-1 rounded-ctl border border-[#cfcfc8] bg-white py-2.5 text-[13px] text-ink ${OUTLINE_HOVER}`}>
            ปิด
          </button>
          <button type="button" onClick={onViewPending} className="flex-1 rounded-ctl bg-teal-bright py-2.5 text-[13px] font-semibold text-white transition-colors duration-200 hover:!bg-teal-hover">
            ดูโพสต์ที่รออนุมัติ
          </button>
        </div>
      </div>
    </div>
  );
}
