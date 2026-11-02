import { FileText, Link2, X } from 'lucide-react';
import { fileSize } from '../attachments';

const CHIP = 'flex min-w-0 items-center gap-2 rounded-ctl bg-[#F4F4F0] py-1.5 pl-2 pr-1 text-[12.5px] text-ink';

function Remove({ label, onClick }) {
  return (
    <button type="button" aria-label={`ลบ ${label}`} onClick={onClick} className="grid h-6 w-6 flex-none place-items-center rounded-full text-muted transition-colors hover:bg-teal-veil hover:text-ink">
      <X className="lc !h-3.5 !w-3.5" />
    </button>
  );
}

/** What is attached to the post being written, each with a remove button. */
export default function AttachList({ files, link, onRemoveFile, onRemoveLink }) {
  if (!files.length && !link) return null;
  return (
    <div className="flex flex-col gap-1.5 border-t border-[#eee] px-2.5 py-2">
      {link && (
        <div className={CHIP}>
          <Link2 className="lc !h-4 !w-4 flex-none text-teal-bright" />
          <span className="min-w-0 flex-1 truncate">{link}</span>
          <Remove label={link} onClick={onRemoveLink} />
        </div>
      )}
      {files.map((f) => (
        <div key={f.id} className={CHIP}>
          {f.image
            ? <img src={f.url} alt="" className="h-7 w-7 flex-none rounded-[4px] object-cover" />
            : <FileText className="lc !h-4 !w-4 flex-none text-teal-bright" />}
          <span className="min-w-0 flex-1 truncate">{f.name}</span>
          <small className="flex-none text-[11px] text-muted">{fileSize(f.size)}</small>
          <Remove label={f.name} onClick={() => onRemoveFile(f.id)} />
        </div>
      ))}
    </div>
  );
}
