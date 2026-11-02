import { useState } from 'react';
import FileDetail from '@/features/download/components/FileDetail';
import RichText from './RichText';
import HdCard from './HdCard';
import HdTable from './HdTable';
import HoverVeil from '@/components/ui/HoverVeil';

/** Renders an HR document: heading, note, key line, table, cards and footnote; with `img` a poster sits beside the intro, table and footnote. */
export default function HrDoc({ doc, first = true }) {
  const [viewing, setViewing] = useState(false);
  if (doc.parts) {
    return doc.parts.map((p, i) => <HrDoc key={i} doc={p} first={i === 0} />);
  }
  const cards = doc.cards || [];
  return (
    <div className={`hr-doc max-w-[1040px] ${first ? '' : 'mt-[30px]'}`}>
      {doc.title && <h3 className="hr-sec mb-3 text-[20px] font-bold text-ink">{doc.title}</h3>}
      {doc.note && (
        <div className="-mt-1 mb-3.5 text-[15px] font-semibold leading-[1.7] text-ink"><RichText html={doc.note} /></div>
      )}
      {doc.key && (
        <div className="mb-3.5 rounded-ctl bg-[#AACFF5] px-[22px] py-4 text-center text-[19px] font-bold leading-[1.6] text-ink max-[700px]:text-[16px]">
          {doc.key}
        </div>
      )}
      {doc.img ? (
        <div className="hr-poster">
          <button type="button" onClick={() => setViewing(true)} className="group relative block w-full cursor-pointer overflow-hidden rounded-box border-0 bg-transparent p-0 shadow-card transition-shadow duration-200 hover:shadow-pop" data-cursor="ดูรายละเอียด" data-cursor-icon="eye">
            <img src={doc.img.src} alt={doc.img.alt} className="block w-full" />
            <HoverVeil />
          </button>
          {viewing && <FileDetail file={doc.img.file} onClose={() => setViewing(false)} />}
          <div className="min-w-0">
            {doc.intro && <p className="mb-4 mt-0 text-[15px] leading-[1.8] text-ink">{doc.intro}</p>}
            {doc.how && (
              <div className="mb-4 rounded-box bg-teal-soft px-4 py-3 text-[14.5px] leading-[1.75] text-ink">
                <b className="text-teal-hover">วิธีแนะนำเพื่อน</b>
                <div className="mt-0.5"><RichText html={doc.how} /></div>
              </div>
            )}
            {doc.table && <HdTable table={doc.table} />}
            {doc.foot && <p className="mt-3 text-[14px] leading-[1.7] text-[#C2453F]"><RichText html={doc.foot} /></p>}
          </div>
        </div>
      ) : doc.table && <HdTable table={doc.table} />}
      {cards.length > 0 && (
        <div
          className={`hr-grid grid items-stretch gap-3.5 ${
            doc.layout === 'l2'
              ? 'hr-l2 grid-cols-[1fr_1.7fr] max-[700px]:grid-cols-1'
              : 'grid-cols-[repeat(auto-fit,minmax(260px,1fr))]'
          }`}
        >
          {cards.map((c, i) => <HdCard key={i} c={c} />)}
        </div>
      )}
      {doc.foot && !doc.img && <p className="mt-5 text-[15px] leading-[1.7] text-ink"><RichText html={doc.foot} /></p>}
    </div>
  );
}
