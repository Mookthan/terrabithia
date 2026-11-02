import { sanitizeHTML } from '@/lib/html';
import Avatar from './Avatar';
import VideoPreview from './VideoPreview';
import PostFiles from './PostFiles';

/** Author line, subject, text and attachments of a post. Shared by the feed card and the composer preview. */
export default function PostBody({ post: p }) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-2.5 px-[18px] pb-1.5 pt-3.5">
        <Avatar id={p.by} name={p.author} />
        <b className="text-[13px] text-ink">{p.author}</b>
        <span className="text-[11px] text-[#777]">{p.time}</span>
        {p.status === 'pending' && (
          <span className="rounded-full bg-[#FBEACB] px-2.5 py-[3px] text-[11px] font-bold text-[#8A5A11]">รออนุมัติ</span>
        )}
      </div>
      {p.subject && <div className="mt-1 px-[18px] text-[14px] font-bold text-ink">{p.subject}</div>}
      {/* User-authored rich text: sanitised before it reaches the DOM. */}
      <div className="px-[18px] pb-1 pt-2 text-[13px] leading-[1.7] text-ink" dangerouslySetInnerHTML={{ __html: sanitizeHTML(p.html) }} />
      {p.link && (
        <a className="block break-all px-[18px] py-2 text-[13px] underline text-teal-bright transition-colors duration-200 hover:!text-teal-hover" href={p.link} target="_blank" rel="noopener noreferrer">{p.link}</a>
      )}
      {p.preview && <VideoPreview preview={p.preview} />}
      <PostFiles files={p.files} />
    </>
  );
}
