import { Download, FileSpreadsheet, FileText, Image, Presentation } from 'lucide-react';
import ModalShell from '@/features/profile/components/ModalShell';
import { DL_IMG } from '../data';
import { dlExt } from '../utils';

const EXT_ICON = { pptx: Presentation, xlsx: FileSpreadsheet, docx: FileText };
const EXT_NAME = { png: 'รูปภาพ PNG', jpg: 'รูปภาพ JPG', jpeg: 'รูปภาพ JPG', svg: 'ไฟล์ SVG', pdf: 'เอกสาร PDF', pptx: 'PowerPoint', xlsx: 'Excel', docx: 'Word' };

function Row({ label, children }) {
  return (
    <div className="flex gap-3 border-b border-line py-2 text-[13px] last:border-b-0">
      <span className="w-[86px] shrink-0 text-muted">{label}</span>
      <span className="min-w-0 flex-1 text-ink">{children}</span>
    </div>
  );
}

const GET_BTN = 'flex h-10 shrink-0 cursor-pointer items-center gap-2 rounded-ctl border-0 bg-teal-bright px-5 text-[14px] font-semibold text-white no-underline transition-colors duration-200 hover:!bg-teal-hover max-[480px]:w-full max-[480px]:justify-center';

/**
 * File details popup: preview, type, section and date, with the download button inside (mook 2026-10-30).
 * Download page files use `img` + `onGet`; files from other pages (HR) pass their own `src` and download straight from it.
 */
export default function FileDetail({ file, onGet, onClose }) {
  const ext = dlExt(file.n);
  const Icon = EXT_ICON[ext] || Image;
  const preview = file.src || (file.img && DL_IMG[file.img]);
  const get = () => { onGet(file.n); onClose(); };
  return (
    <ModalShell label={`รายละเอียด ${file.n}`} width="w-[760px]" onClose={onClose}>
      {/* Starts below the close button so the two never overlap (mook 2026-10-30). */}
      <div className="mb-4 mt-6 flex aspect-video items-center justify-center overflow-hidden rounded-ctl border border-line bg-cream">
        {preview ? (
          <img src={preview} alt={file.n} className="block h-full w-full object-contain" />
        ) : (
          <span className="flex flex-col items-center gap-2 px-6 text-center text-muted">
            <Icon className="lc !h-14 !w-14 text-[#c3cbc8]" strokeWidth={1.4} />
            <span className="text-[13px]">ไฟล์ประเภทนี้ดูตัวอย่างในเว็บไม่ได้ ดาวน์โหลดเพื่อเปิดดู</span>
          </span>
        )}
      </div>
      <div className="mb-1 break-all text-[17px] font-bold text-ink" data-nt>{file.n}</div>
      <div className="mb-4">
        <Row label="ประเภทไฟล์:">{EXT_NAME[ext] || `.${ext}`}</Row>
        {file.sec && <Row label="หมวด:">{file.sec}</Row>}
        <Row label="อัปเดตล่าสุด:">{file.u}</Row>
      </div>
      <div className="flex justify-end">
        {file.src ? (
          <a href={file.src} download={file.n} className={GET_BTN}>
            <Download className="lc !h-[18px] !w-[18px]" /> ดาวน์โหลด
          </a>
        ) : (
          <button type="button" onClick={get} className={GET_BTN}>
            <Download className="lc !h-[18px] !w-[18px]" /> ดาวน์โหลด
          </button>
        )}
      </div>
    </ModalShell>
  );
}
