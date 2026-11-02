import { useState } from 'react';
import FileDetail from '@/features/download/components/FileDetail';
import { HOLIDAY_IMG } from '../data';
import HoverVeil from '@/components/ui/HoverVeil';

const FILE = { n: 'วันหยุดประจำปี-2569.jpg', src: HOLIDAY_IMG, sec: 'HR · วันหยุดและวันลา', u: '15 ธ.ค. 68' };

/** Annual holiday calendar image; opens the same file popup as the Download page. */
export default function HolidayImage() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        data-cursor="ดูรายละเอียด"
        data-cursor-icon="eye"
        className="group relative mx-auto block w-full max-w-[520px] cursor-pointer overflow-hidden rounded-ctl border-0 bg-transparent p-0 shadow-card transition-shadow duration-200 hover:shadow-pop"
      >
        <img src={FILE.src} alt="วันหยุดประจำปี 2569" className="block w-full" />
        <HoverVeil />
      </button>
      {open && <FileDetail file={FILE} onClose={() => setOpen(false)} />}
    </>
  );
}
