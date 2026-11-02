import { useCallback, useRef, useState } from 'react';
import { Smile } from 'lucide-react';
import useClickOutside from '@/hooks/useClickOutside';
import { MY_NAME } from '../data';
import usePostSocial from '../hooks/usePostSocial';
import PostBody from './PostBody';
import ReactionBar from '@/components/ui/ReactionBar';
import ReactionPills from './ReactionPills';
import ThreadReplies from './ThreadReplies';
import { ICON_BTN } from '@/components/ui/iconButton';

export default function PostCard({ post: p }) {
  const { reactions, replies, react, reply } = usePostSocial(p.id);
  const [picker, setPicker] = useState(false);
  const pickRef = useRef(null);
  const closePicker = useCallback(() => setPicker(false), []);
  useClickOutside(pickRef, closePicker, picker);
  const mine = Object.keys(reactions).find((e) => reactions[e].includes(MY_NAME));
  const pick = (e) => { react(e); setPicker(false); };

  return (
    <div data-reveal className="group relative overflow-hidden rounded-ctl bg-[#EFEFEF] shadow-card">
      {/* Hover bar, like Teams: react without opening anything. */}
      <ReactionBar
        mine={mine}
        onPick={pick}
        className="absolute right-3 top-2.5 z-[2] opacity-0 transition-opacity duration-200 group-hover:opacity-100 max-[760px]:hidden [@media(hover:none)]:hidden"
      />
      <PostBody post={p} />
      <div className="flex flex-wrap items-center gap-2 px-[18px] pb-3 pt-2">
        <div ref={pickRef} className="relative">
          <button
            type="button"
            onClick={() => setPicker((v) => !v)}
            aria-label="เพิ่มรีแอค"
            aria-expanded={picker}
            className={`${ICON_BTN} h-8 w-8 text-teal-bright hover:text-teal-hover ${picker ? '!bg-teal-veil' : ''}`}
          >
            <Smile className="lc !h-5 !w-5" />
          </button>
          {picker && <ReactionBar mine={mine} onPick={pick} className="absolute bottom-[calc(100%+6px)] left-0 z-[3]" />}
        </div>
        <ReactionPills reactions={reactions} me={MY_NAME} onToggle={react} />
      </div>
      <ThreadReplies replies={replies} onReply={reply} />
    </div>
  );
}
