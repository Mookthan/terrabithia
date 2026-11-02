import { ChevronLeft } from 'lucide-react';
import { OUTLINE_HOVER } from '@/components/ui/TextButton';

/** "Back to sign in" button of the password-reset views. */
export default function BackToLogin({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`mb-4 cursor-pointer rounded-ctl border border-line bg-white px-4 py-2 text-[13px] text-ink ${OUTLINE_HOVER}`}
    >
      <ChevronLeft className="lc !h-[1.05em] !w-[1.05em] ![vertical-align:-.2em]" aria-hidden="true" /> กลับไปเข้าสู่ระบบ
    </button>
  );
}
