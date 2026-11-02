import { Play } from 'lucide-react';

/** Static YouTube link-preview card under a post. */
export default function VideoPreview({ preview }) {
  return (
    <div className="mx-[18px] mb-1 mt-1.5 w-[300px] max-w-[calc(100%-36px)] rounded-ctl bg-[#fafafa] p-2">
      <div className="mb-1.5 text-[10px] text-ink"><Play className="lc" /> YouTube</div>
      <div className="flex h-[150px] items-center justify-center" style={{ background: preview.g }}>
        <span className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-white text-[16px] shadow-card">
          <Play className="lc fill-current" />
        </span>
      </div>
      <div className="flex flex-col gap-0.5 pt-2">
        <b className="text-[12px]">{preview.title}</b>
        <small className="text-[10px] text-[#777]">{preview.by}</small>
        <small className="text-[10px] text-[#777]">{preview.meta}</small>
        <span className="mt-1 self-start rounded-ctl border border-[#ccc] bg-white px-2.5 py-0.5 text-[10px]">Open</span>
      </div>
    </div>
  );
}
