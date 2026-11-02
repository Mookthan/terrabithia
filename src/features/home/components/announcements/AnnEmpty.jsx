import EmptyState from '@/components/ui/EmptyState';

/** Shown when no announcement matches the search / filters. */
export default function AnnEmpty({ q }) {
  return <EmptyState className="px-3 py-10 text-[14px]">{q.trim() ? `ไม่พบประกาศที่ตรงกับ “${q}”` : 'ไม่พบประกาศที่ตรงกับตัวกรอง'}</EmptyState>;
}
