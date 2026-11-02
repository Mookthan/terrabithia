import { FileText } from 'lucide-react';
import { fileSize } from '../attachments';

/** Files attached to a post: image thumbnails in a row, other files as download rows. */
export default function PostFiles({ files }) {
  if (!files?.length) return null;
  const images = files.filter((f) => f.image);
  const docs = files.filter((f) => !f.image);
  return (
    <div className="flex flex-col gap-2 px-[18px] pb-1 pt-2">
      {images.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {images.map((f) => (
            <a key={f.id} href={f.url} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-ctl">
              <img src={f.url} alt={f.name} className="h-[110px] w-[110px] object-cover" />
            </a>
          ))}
        </div>
      )}
      {docs.map((f) => (
        <a key={f.id} href={f.url} download={f.name} className="flex max-w-[360px] items-center gap-2.5 rounded-ctl bg-white px-3 py-2 text-[12.5px] text-ink transition-colors hover:bg-teal-veil">
          <FileText className="lc !h-5 !w-5 flex-none text-teal-bright" />
          <span className="min-w-0 flex-1 truncate">{f.name}</span>
          <small className="flex-none text-[11px] text-muted">{fileSize(f.size)}</small>
        </a>
      ))}
    </div>
  );
}
