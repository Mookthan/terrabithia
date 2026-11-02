import { Pencil } from 'lucide-react';
import { ICON_BTN } from '@/components/ui/iconButton';

export default function EditButton({ onClick, className = '' }) {
  return (
    <button type="button" onClick={onClick} aria-label="แก้ไข" className={`${ICON_BTN} h-8 w-8 text-[15px] text-teal-bright hover:!text-teal-hover ${className}`}>
      <Pencil className="lc" />
    </button>
  );
}
