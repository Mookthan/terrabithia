import { useRef, useState } from 'react';
import { ImagePlus } from 'lucide-react';
import { useUI } from '@/context/UIContext';
import { ME } from '@/data/me';
import { ACCEPT, MAX_BYTES, MAX_MB, fmtMB } from '../data';
import { addPhotos, albumOf, draftPhotos, removePhoto, setVisibility, useAlbums, usedBytes } from '../albumStore';
import VisibilityPicker from './VisibilityPicker';
import PhotoGrid from './PhotoGrid';

/**
 * Album part of the personal box's edit mode: who-can-see, uploads (button or drop), storage meter
 * and the photo grid. Changes go to the album store right away, separate from the form's บันทึก.
 */
export default function AlbumEditor() {
  const { toast } = useUI();
  const album = albumOf(useAlbums(), ME.id);
  const used = usedBytes(album);
  const inputRef = useRef(null);
  const [drag, setDrag] = useState(false);

  const upload = (list) => {
    const { drafts: photos, skipped } = draftPhotos([...list]);
    if (skipped.length) toast(`เพิ่มไม่ได้ ${skipped.length} รูป · รับเฉพาะไฟล์รูป รวมไม่เกิน ${MAX_MB} MB`);
    if (photos.length) { addPhotos(photos); toast(`เพิ่มรูปแล้ว ${photos.length} รูป · โชว์ใน Org Chart แล้ว`); }
  };
  const onDrop = (e) => { e.preventDefault(); setDrag(false); upload(e.dataTransfer.files); };

  return (
    <div
      className={`mt-4 border-t border-line pt-4 transition-shadow ${drag ? 'rounded-box ring-2 ring-teal-bright ring-offset-4' : ''}`}
      onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
      onDragLeave={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setDrag(false); }}
      onDrop={onDrop}
    >
      <div className="mb-1 text-[14px] font-bold text-ink">อัลบั้มความสนใจ</div>
      <p className="m-0 mb-3 text-[12px] text-muted">รูปจะแสดงในการ์ดของคุณที่ Org Chart ให้คนที่คุณเลือกเห็น</p>
      <div className="relative mb-3 flex flex-wrap items-center gap-2">
        <button type="button" onClick={() => inputRef.current?.click()} className="inline-flex cursor-pointer items-center gap-1.5 rounded-ctl border-0 bg-teal-bright px-3.5 py-2 text-[13px] font-semibold text-white transition-colors hover:!bg-teal-hover">
          <ImagePlus className="lc !h-4 !w-4" aria-hidden="true" />เพิ่มรูป
        </button>
        <VisibilityPicker vis={album.vis} onChange={setVisibility} />
        <input ref={inputRef} type="file" accept={ACCEPT} multiple hidden onChange={(e) => { upload(e.target.files); e.target.value = ''; }} />
      </div>

      <div className="mb-3">
        <div className="mb-1.5 flex justify-between text-[12px] text-muted">
          <span>{`ใช้ไป ${fmtMB(used)} จาก ${MAX_MB} MB`}</span>
          <span>{`${album.photos.length} รูป`}</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-line" role="progressbar" aria-valuenow={Math.round((used / MAX_BYTES) * 100)} aria-valuemin={0} aria-valuemax={100}>
          <div className={`h-full rounded-full transition-[width] duration-500 ${used / MAX_BYTES > 0.9 ? 'bg-[#D93A44]' : 'bg-teal-bright'}`} style={{ width: `${Math.min(100, (used / MAX_BYTES) * 100)}%` }} />
        </div>
      </div>

      {album.photos.length ? (
        <PhotoGrid photos={album.photos} onRemove={removePhoto} className="grid-cols-4 max-[400px]:grid-cols-3" />
      ) : (
        <button type="button" onClick={() => inputRef.current?.click()} className="flex w-full cursor-pointer flex-col items-center gap-1.5 rounded-box border-2 border-dashed border-line bg-transparent px-4 py-7 text-muted transition-colors hover:border-teal-bright hover:text-teal-hover">
          <ImagePlus className="lc !h-7 !w-7" aria-hidden="true" />
          <span className="text-[13.5px] font-semibold">ลากรูปมาวาง หรือกดเพื่อเลือกรูป</span>
          <span className="text-[12px]">{`JPG, PNG, WEBP, GIF รวมไม่เกิน ${MAX_MB} MB`}</span>
        </button>
      )}
    </div>
  );
}
