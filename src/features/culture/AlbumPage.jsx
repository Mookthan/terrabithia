import { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import SectionBar from '@/components/ui/SectionBar';
import { PATHS } from '@/routes/paths';
import { ACTIVITIES, PHOTO_VARIANTS } from './data';
import AlbumRows from './components/AlbumRows';
import AlbumHero from './components/AlbumHero';
import Lightbox from './components/Lightbox';

/**
 * One activity album (mook 2026-10-30): dark header band with the title, then every photo in Pinterest-style columns.
 * Real albums use photo 2 as the band; placeholder albums use the album cover.
 */
export default function AlbumPage() {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const [lbx, setLbx] = useState(null);
  const album = ACTIVITIES[Number(albumId)];
  if (!album) return <Navigate to={PATHS.cultureActivity} replace />;

  const real = !!album.photos;
  const photos = real ? album.photos : [{ src: album.img }, ...PHOTO_VARIANTS];
  const backdrop = real ? (photos[1] || photos[0]).src : album.img;
  const items = photos.map((p, i) => ({ p, i }));
  const n = photos.length;
  return (
    <>
      <SectionBar section="Culture" title="Our Activity" flush />
      <AlbumHero
        album={{ ...album, count: n }}
        backdrop={backdrop}
        onBack={() => navigate(PATHS.cultureActivity)}
      />
      <AlbumRows items={items} onOpen={setLbx} />
      <Lightbox
        photos={photos}
        name={`terrabithia-album-${Number(albumId) + 1}`}
        index={lbx}
        onClose={() => setLbx(null)}
        onNav={(d) => setLbx((i) => (i + d + n) % n)}
        onPick={setLbx}
      />
    </>
  );
}
