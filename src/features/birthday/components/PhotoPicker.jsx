import { useState } from 'react';
import { ImageIcon } from 'lucide-react';
import { ACTIVITIES, PHOTO_VARIANTS } from '@/features/culture/data';
import AddButton from './AddButton';

/** "Photo from the Activity page": pick an album, then tap a photo to paste it on the card. */
export default function PhotoPicker({ onAdd }) {
  const [open, setOpen] = useState(false);
  const [album, setAlbum] = useState(0);
  return (
    <>
      <AddButton
        className="mb-2"
        icon={<ImageIcon className="h-5 w-5" aria-hidden="true" />}
        title="รูปจากหน้า Activity"
        hint="เลือกรูปจากอัลบั้มกิจกรรมของบริษัทมาแปะบนการ์ด"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      />
      <div className={`bd-acc-body ${open ? 'open mb-2' : ''}`}>
        <div className="min-h-0 overflow-hidden">
          <div className="pb-1 pt-[2px]">
            <select
              value={album}
              onChange={(e) => setAlbum(+e.target.value)}
              aria-label="เลือกอัลบั้ม"
              className="mb-2 h-9 w-full rounded-ctl border border-[#DCE6E3] bg-white px-2 text-[13.5px] text-ink"
            >
              {ACTIVITIES.map((a, i) => <option key={a.t} value={i}>{a.t}</option>)}
            </select>
            <div className="grid grid-cols-3 gap-2">
              {PHOTO_VARIANTS.map(({ g, Icon }, i) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => onAdd(album, i)}
                  aria-label={`รูปที่ ${i + 1}`}
                  className="aspect-[4/3] cursor-pointer overflow-hidden rounded-ctl border-0 bg-white p-0 shadow-[0_0_0_1.5px_#DCE6E3] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_0_2px_#BEE8DD]"
                >
                  <span className="grid h-full w-full place-items-center text-white" style={{ backgroundImage: `linear-gradient(135deg,${g})` }}>
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
