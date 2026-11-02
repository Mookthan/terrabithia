import { useState } from 'react';
import { X } from 'lucide-react';
import AlbumPicture from './AlbumPicture';
import PhotoViewer from './PhotoViewer';

/** Square thumbnails that open the viewer. Owner mode: `onRemove` adds a delete button; `owner` turns on reactions in the viewer. */
export default function PhotoGrid({ photos, onRemove, owner, className = 'grid-cols-5 max-[900px]:grid-cols-4 max-[560px]:grid-cols-3' }) {
  const [view, setView] = useState(null);
  return (
    <>
      <ul className={`m-0 grid list-none gap-2.5 p-0 ${className}`}>
        {photos.map((p, i) => (
          <li key={p.id} className="group relative aspect-square overflow-hidden rounded-ctl bg-line">
            <button type="button" onClick={() => setView(i)} aria-label={p.cap || `รูปที่ ${i + 1}`} className="block h-full w-full cursor-zoom-in border-0 p-0">
              <AlbumPicture photo={p} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
            </button>
            {onRemove && (
              <button
                type="button"
                aria-label="ลบรูป"
                title="ลบรูป"
                onClick={() => onRemove(p.id)}
                className="absolute right-1.5 top-1.5 grid h-7 w-7 cursor-pointer place-items-center rounded-full border-0 bg-[rgba(20,30,28,.6)] text-white opacity-0 transition-opacity hover:bg-[#D93A44] focus-visible:opacity-100 group-hover:opacity-100 [@media(hover:none)]:opacity-100"
              >
                <X className="lc !h-4 !w-4" />
              </button>
            )}
          </li>
        ))}
      </ul>
      {view !== null && <PhotoViewer photos={photos} index={view} onIndex={setView} onClose={() => setView(null)} owner={owner} />}
    </>
  );
}
