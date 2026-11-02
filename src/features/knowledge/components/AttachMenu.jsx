import { useCallback, useRef, useState } from 'react';
import { Link2, Paperclip, Upload } from 'lucide-react';
import DropPanel from '@/components/ui/DropPanel';
import { ICON_BTN } from '@/components/ui/iconButton';
import useClickOutside from '@/hooks/useClickOutside';
import { cleanUrl, FILE_ACCEPT, MAX_FILE_MB } from '../attachments';

const ROW = 'flex w-full cursor-pointer items-center gap-2.5 rounded-ctl border-0 bg-transparent px-2.5 py-2 text-left text-[13px] text-ink transition-colors hover:bg-teal-veil';

/** Paperclip button: upload files from the computer, or paste one link. */
export default function AttachMenu({ hasLink, onFiles, onLink }) {
  const [open, setOpen] = useState(false);
  const [linkOpen, setLinkOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [err, setErr] = useState('');
  const wrap = useRef(null);
  const fileInput = useRef(null);
  const close = useCallback(() => setOpen(false), []);
  useClickOutside(wrap, close, open);

  const addLink = () => {
    const ok = cleanUrl(url);
    if (!ok) { setErr('ลิงก์ต้องขึ้นต้นด้วย https://'); return; }
    onLink(ok);
    setUrl(''); setErr(''); setLinkOpen(false);
  };

  return (
    <div className="border-t border-[#eee] px-2 py-1.5">
      <div ref={wrap} className="relative inline-block">
        <button
          type="button"
          title="แนบไฟล์หรือลิงก์"
          aria-label="แนบไฟล์หรือลิงก์"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className={`${ICON_BTN} h-8 w-8 text-teal-bright hover:text-teal-hover ${open ? '!bg-teal-veil' : ''}`}
        >
          <Paperclip className="lc !h-[18px] !w-[18px]" />
        </button>
        <DropPanel open={open} className="absolute bottom-[calc(100%+6px)] left-0 z-30 w-max min-w-[220px]" innerClassName="p-1.5">
          <button type="button" className={ROW} onClick={() => { setOpen(false); fileInput.current?.click(); }}>
            <Upload className="lc !h-4 !w-4 text-teal-bright" />
            <span>
              อัปโหลดจากเครื่อง
              <small className="block text-[11px] text-muted">{`PDF, Word, Excel, PowerPoint, รูปภาพ · ไม่เกิน ${MAX_FILE_MB} MB`}</small>
            </span>
          </button>
          <button type="button" disabled={hasLink} className={`${ROW} disabled:cursor-default disabled:opacity-50 disabled:hover:bg-transparent`} onClick={() => { setOpen(false); setLinkOpen(true); }}>
            <Link2 className="lc !h-4 !w-4 text-teal-bright" />
            <span>
              แนบลิงก์
              <small className="block text-[11px] text-muted">{hasLink ? 'แนบได้ 1 ลิงก์ต่อโพสต์' : 'เว็บไซต์ หรือ YouTube'}</small>
            </span>
          </button>
        </DropPanel>
      </div>
      <input
        ref={fileInput}
        type="file"
        multiple
        accept={FILE_ACCEPT}
        className="hidden"
        onChange={(e) => { onFiles([...e.target.files]); e.target.value = ''; }}
      />
      {linkOpen && (
        <div className="mt-1.5">
          <div className="flex gap-1.5">
            <input
              autoFocus
              value={url}
              onChange={(e) => { setUrl(e.target.value); setErr(''); }}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addLink(); } if (e.key === 'Escape') setLinkOpen(false); }}
              placeholder="https://"
              className="min-w-0 flex-1 rounded-ctl border border-[#ddd] px-2.5 py-1.5 text-[13px] text-ink placeholder:text-faint"
            />
            <button type="button" onClick={addLink} className="rounded-ctl bg-teal-bright px-3 text-[12.5px] font-semibold text-white transition-colors hover:!bg-teal-hover">เพิ่ม</button>
          </div>
          {err && <div className="mt-1 text-[11.5px] text-[#C0392B]">{err}</div>}
        </div>
      )}
    </div>
  );
}
