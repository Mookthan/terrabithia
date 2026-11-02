import { HR_GROUPS } from '@/data/hrGroups';
import { HR_DOCS, HR_FIELDS } from '../data';
import HrNews from './HrNews';
import HrDoc from './HrDoc';
import HolidayImage from './HolidayImage';

function body(sel) {
  const doc = HR_DOCS[`${sel.g}:${sel.i}`];
  if (doc) return <HrDoc doc={doc} />;
  if (sel.g === 'leave' && sel.i === 0) return <HolidayImage />;
  return <HrDoc doc={{ cards: HR_FIELDS[sel.g].map((f) => ({ h: f, empty: true })) }} />;
}

/** Right-hand pane: announcements (no selection) or the selected HR item. */
export default function HrContent({ sel, onOpenItem }) {
  if (!sel) return <HrNews onOpen={onOpenItem} />;
  const title = HR_GROUPS.find((g) => g.k === sel.g).items[sel.i];
  return (
    <>
      <h2 className="mb-[30px] text-[26px] font-semibold text-ink">{title}</h2>
      {body(sel)}
    </>
  );
}
