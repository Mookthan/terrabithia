import { Heart } from 'lucide-react';
import { albumOf, canSee, useAlbums } from '../albumStore';
import PhotoGrid from './PhotoGrid';

/**
 * "อัลบั้มความสนใจ" block of an org-chart person card: their album pictures, only when they have some
 * and the viewer is allowed to see them (otherwise nothing hints an album exists).
 */
export default function PersonAlbum({ id }) {
  const album = albumOf(useAlbums(), id);
  const shown = canSee(id, album.vis) ? album.photos : [];
  if (!shown.length) return null;
  return (
    <div className="pt-4">
      <div className="mb-1.5 flex items-center gap-1.5 text-[14.5px] font-semibold text-ink">
        <Heart className="lc !h-4 !w-4 text-teal-bright" aria-hidden="true" />อัลบั้มความสนใจ
      </div>
      <PhotoGrid photos={shown} owner={id} className="mt-2 grid-cols-4 max-[480px]:grid-cols-3" />
    </div>
  );
}
