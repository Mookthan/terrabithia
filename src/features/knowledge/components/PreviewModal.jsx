import { Inbox } from 'lucide-react';
import useEscape from '@/hooks/useEscape';
import PostBody from './PostBody';
import EmptyState from '@/components/ui/EmptyState';
import CloseButton from '@/components/ui/CloseButton';

/** Preview of the post being composed, drawn exactly like its card in the feed. `data` = { share, post } or null. */
export default function PreviewModal({ data, onClose }) {
  useEscape(onClose, Boolean(data));
  if (!data) return null;
  const empty = !data.post.subject && !data.post.html.replace(/<[^>]*>|&nbsp;/g, '').trim();
  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-[rgba(10,20,18,.45)] p-4 text-[14px]"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div role="dialog" aria-modal="true" aria-label="ตัวอย่างโพสต์" className="relative max-h-[90vh] w-[560px] max-w-full overflow-y-auto rounded-box bg-white px-5 pb-5 pt-4 shadow-pop">
        <CloseButton onClick={onClose} className="absolute right-3 top-3" />
        <div className="text-[15px] font-bold text-ink">ตัวอย่างโพสต์</div>
        <div className="mb-3 mt-0.5 text-[12.5px] text-muted">{`แชร์ไปยัง: ${data.share || 'ยังไม่ได้เลือก'}`}</div>
        {empty
          ? <EmptyState icon={Inbox} className="rounded-ctl bg-[#EFEFEF] py-8 text-[13px]">ยังไม่มีหัวข้อและข้อความ</EmptyState>
          : <div className="overflow-hidden rounded-ctl bg-[#EFEFEF] pb-3 shadow-card"><PostBody post={data.post} /></div>}
      </div>
    </div>
  );
}
