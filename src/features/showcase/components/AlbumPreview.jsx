import { useAlbums, albumOf } from '../albumStore';
import { ME } from '@/data/me';
import { visLabel } from '../data';
import { VIS_ICONS } from './VisibilityPicker';
import PhotoGrid from './PhotoGrid';

const MAX = 8;

/** Read-only album in the personal box: who can see it and up to 8 photos. Editing is behind the box's pencil. */
export default function AlbumPreview() {
  const album = albumOf(useAlbums(), ME.id);
  const Icon = VIS_ICONS[album.vis.k];
  const shown = album.photos;
  const n = shown.length;

  return (
    <div className="mt-4 border-t border-line pt-4">
      <div className="mb-2.5 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <span className="text-[14px] font-bold text-ink">อัลบั้มความสนใจ</span>
        <span className="inline-flex items-center gap-1.5 text-[12px] text-muted">
          <Icon className="lc !h-3.5 !w-3.5" aria-hidden="true" />
          {`${visLabel(album.vis)} · ${n} รูป`}
        </span>
      </div>
      {n ? (
        <PhotoGrid photos={shown.slice(0, MAX)} owner={ME.id} className="grid-cols-4" />
      ) : (
        <p className="m-0 text-[12.5px] text-muted">ยังไม่มีรูป กดรูปดินสอเพื่อเพิ่มรูปที่จะโชว์ใน Org Chart</p>
      )}
      {n > MAX && <p className="m-0 mt-2 text-[12px] text-muted">{`แสดง ${MAX} จาก ${n} รูป · ดูทั้งหมดได้ตอนแก้ไข`}</p>}
    </div>
  );
}
