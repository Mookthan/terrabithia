import { SearchX } from 'lucide-react';

/**
 * "ไม่พบ…" / "ยังไม่มี…" line with an icon in front (SearchX by default, Inbox for lists that are simply empty).
 * `className` sets the padding and text size for the spot it sits in.
 */
export default function EmptyState({ icon: Icon = SearchX, className = 'py-[30px] text-[13px]', children }) {
  return (
    <div className={`flex items-center justify-center gap-2 text-center text-muted ${className}`}>
      <Icon className="lc !h-[18px] !w-[18px] flex-none" aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}
