import { FileSpreadsheet, FileText, Image, Presentation } from 'lucide-react';
import { DL_IMG } from '../data';
import { dlExt } from '../utils';
import FileName from './FileName';
import HoverVeil from '@/components/ui/HoverVeil';

const EXT_ICON = { pptx: Presentation, xlsx: FileSpreadsheet, docx: FileText };

/** One downloadable file: thumbnail (or type placeholder), name and update date; opens the details popup. */
export default function FileTile({ file, onOpen }) {
  const ext = dlExt(file.n);
  const Icon = EXT_ICON[ext] || Image;
  return (
    <div
      data-reveal
      tabIndex={0}
      data-cursor="ดูรายละเอียด"
      data-cursor-icon="eye"
      onClick={() => onOpen(file)}
      onKeyDown={(e) => { if (e.key === 'Enter') onOpen(file); }}
      className="group cursor-pointer outline-none"
    >
      <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-ctl border border-[#dcdcdc] bg-white transition-[box-shadow,transform] duration-[250ms] group-hover:-translate-y-[3px] group-hover:shadow-pop group-focus-visible:-translate-y-[3px] group-focus-visible:shadow-pop motion-reduce:transition-none">
        {file.img ? (
          <img src={DL_IMG[file.img]} alt="" className="block h-full w-full object-cover transition-transform duration-[400ms] ease-in-out group-hover:scale-[1.04] motion-reduce:transition-none" />
        ) : (
          <span className="flex flex-col items-center gap-1 text-[#c3cbc8]">
            <Icon className="lc !h-11 !w-11" strokeWidth={1.4} />
            <small className="text-[12px] tracking-[.04em]">.{ext}</small>
          </span>
        )}
        <HoverVeil />
        {file.nw && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-[#F0515B] px-[9px] py-0.5 text-[10.5px] font-bold text-white">NEW</span>
        )}
      </div>
      <FileName name={file.n} />
      <div className="mt-0.5 text-[12px] text-muted">{`อัปเดต ${file.u}`}</div>
    </div>
  );
}
