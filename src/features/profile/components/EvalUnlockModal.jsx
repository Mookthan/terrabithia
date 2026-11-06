import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Eye, EyeOff, LockKeyhole } from 'lucide-react';
import { OUTLINE_HOVER } from '@/components/ui/TextButton';
import { FieldHint } from '@/features/knowledge/fieldError';
import useBodyLock from '@/hooks/useBodyLock';
import useEscape from '@/hooks/useEscape';
import CloseButton from '@/components/ui/CloseButton';

/**
 * Asks for the account password again before showing evaluation results.
 * Prototype: any non-empty password unlocks; the real site checks it on the server.
 */
export default function EvalUnlockModal({ onUnlock, onClose }) {
  const [pw, setPw] = useState('');
  const [show, setShow] = useState(false);
  const [tried, setTried] = useState(false);
  useEscape(onClose, true);
  useBodyLock(true);

  const submit = (e) => {
    e.preventDefault();
    setTried(true);
    if (pw) onUnlock();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[2100] flex items-center justify-center bg-[rgba(10,20,18,.45)] p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <form onSubmit={submit} noValidate role="dialog" aria-label="ยืนยันตัวตน" className="relative w-[400px] max-w-full rounded-box bg-white px-6 py-6 shadow-pop">
        <CloseButton onClick={onClose} className="absolute right-3 top-3" />
        <span className="mb-3 grid h-11 w-11 place-items-center rounded-full bg-teal-soft text-teal-hover">
          <LockKeyhole className="lc !h-[22px] !w-[22px]" aria-hidden="true" />
        </span>
        <h2 className="text-[19px] font-bold text-ink">ยืนยันตัวตน</h2>
        <p className="mb-4 mt-1 text-[13px] leading-[1.7] text-muted">ผลการประเมินและใบเตือนเป็นข้อมูลส่วนตัว กรุณาใส่รหัสผ่านที่ใช้เข้าเว็บไซต์อีกครั้ง</p>
        <label htmlFor="eval-pw" className="mb-1.5 block text-[12.5px] font-semibold text-ink">
          <span className="text-[#D93A44]" aria-hidden="true">*</span> รหัสผ่าน
        </label>
        <div className="flex items-center rounded-ctl border border-line bg-white pr-1 focus-within:border-teal-bright">
          <input
            id="eval-pw"
            type={show ? 'text' : 'password'}
            autoComplete="current-password"
            autoFocus
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            className="min-w-0 flex-1 border-0 bg-transparent px-3 py-[9px] text-[13.5px] text-ink outline-none"
          />
          <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน'} className="grid h-8 w-8 cursor-pointer place-items-center rounded-full border-0 bg-transparent text-teal-bright transition-colors hover:bg-teal-veil">
            {show ? <EyeOff className="lc !h-4 !w-4" /> : <Eye className="lc !h-4 !w-4" />}
          </button>
        </div>
        <FieldHint text={tried && !pw ? 'กรุณาใส่รหัสผ่าน' : ''} />
        <div className="mt-5 flex justify-end gap-2">
          <button type="button" onClick={onClose} className={`cursor-pointer rounded-ctl border border-line bg-white px-4 py-2 text-[13px] font-semibold text-ink ${OUTLINE_HOVER}`}>ยกเลิก</button>
          <button type="submit" className="cursor-pointer rounded-ctl border-0 bg-teal-bright px-4 py-2 text-[13px] font-semibold text-white transition-colors duration-200 hover:!bg-teal-hover">ปลดล็อก</button>
        </div>
      </form>
    </div>,
    document.body,
  );
}
