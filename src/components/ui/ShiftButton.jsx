import { FileText } from 'lucide-react';
import { ME } from '@/data/me';

/**
 * "กะทำงานของฉัน": downloads the signed-in user's shift table (Excel).
 * Renders nothing for staff without shifts (only shift teams such as IT and call centre get one).
 */
export default function ShiftButton({ className = '' }) {
  if (!ME.shift) return null;
  return (
    <a
      href={ME.shift.file}
      download={ME.shift.name}
      onClick={(e) => e.stopPropagation()}
      className={`flex cursor-pointer items-center gap-[6px] rounded-ctl bg-teal-bright px-[14px] py-[9px] text-[12.5px] font-semibold text-white no-underline transition-colors duration-200 hover:!bg-teal-hover ${className}`}
    >
      <FileText className="lc" /> กะทำงานของฉัน
    </a>
  );
}
