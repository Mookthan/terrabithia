import { useState } from 'react';
import { ChevronDown, ShieldCheck } from 'lucide-react';
import { TEXT_LINK } from '@/components/ui/TextButton';
import Fold from '@/components/ui/Fold';

/** What the site keeps about its users (PDPA notice, mook 2026-11-03). Draft wording until HR / legal review it. */
const ITEMS = [
  'ข้อมูลพนักงานจาก EzyHR เช่น ชื่อ ตำแหน่ง แผนก และวันลาคงเหลือ',
  'บันทึกการใช้งาน เช่น หน้าที่เปิด เวลาที่ใช้ การดาวน์โหลดไฟล์ และการเปิดดูผลประเมิน เก็บไว้ 365 วัน',
  'สิ่งที่คุณเพิ่มเอง เช่น รูป ความคิดเห็น รีแอค การ์ดวันเกิด และเหรียญ',
];

/** One line under the sign-in button; the summary folds open in place (no popup). */
export default function PrivacyNote() {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-[10px] border-t border-line pt-2.5 text-[11.5px] leading-[1.6] text-muted">
      <div className="flex flex-wrap items-center justify-center gap-x-1">
        <ShieldCheck className="lc !h-3.5 !w-3.5 flex-none text-teal-bright" aria-hidden="true" />
        <span>การเข้าใช้งานถือว่ารับทราบ</span>
        <button type="button" aria-expanded={open} onClick={() => setOpen((v) => !v)} className={`${TEXT_LINK} gap-0.5 font-semibold`}>
          นโยบายความเป็นส่วนตัว
          <ChevronDown className={`lc !h-3.5 !w-3.5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
        </button>
      </div>
      <Fold open={open}>
        <div className="mt-2 rounded-ctl bg-cream px-3 py-2.5 text-left">
          <p className="mb-1 font-semibold text-ink">เว็บนี้เก็บข้อมูลอะไรบ้าง</p>
          <ul className="list-disc space-y-0.5 pl-4">
            {ITEMS.map((t) => <li key={t}>{t}</li>)}
          </ul>
          <p className="mt-1.5">ใช้เพื่อดูแลระบบและความปลอดภัยของข้อมูลบริษัทเท่านั้น บันทึกรายบุคคลมีแค่ Super Admin ที่เปิดดูได้ หากต้องการขอดู แก้ไข หรือสอบถามเรื่องข้อมูลของคุณ ติดต่อ HR</p>
        </div>
      </Fold>
    </div>
  );
}
