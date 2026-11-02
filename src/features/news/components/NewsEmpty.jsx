import EmptyState from '@/components/ui/EmptyState';

/** Shown when no news matches the keyword / department filter. */
export default function NewsEmpty({ q }) {
  return (
    <EmptyState className="rounded-box bg-white px-4 py-12 text-[14px]">
      {q.trim() ? `ไม่พบข่าวที่ตรงกับ “${q.trim()}”` : 'ไม่พบข่าวที่ตรงกับตัวกรอง'}
    </EmptyState>
  );
}
