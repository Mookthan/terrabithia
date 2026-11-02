import { useEffect, useState } from 'react';
import useEscape from '@/hooks/useEscape';
import { likersOf, reactionTotals, useNewsState } from '../newsStore';
import { Inbox } from 'lucide-react';
import EmptyState from '@/components/ui/EmptyState';
import CloseButton from '@/components/ui/CloseButton';
import Tabs from '@/components/ui/Tabs';

/** Dialog listing everyone who reacted, with a tab per emoji (Facebook style). */
export default function LikersModal({ index, onClose }) {
  const { liked } = useNewsState();
  const [shown, setShown] = useState(false);
  const [tab, setTab] = useState('all');
  const all = likersOf(liked, index);
  const people = tab === 'all' ? all : all.filter((p) => p[2] === tab);
  const tabs = [['all', 'ทั้งหมด', all.length], ...reactionTotals(all).map(([e, n]) => [e, e, n])];
  useEscape(onClose);
  useEffect(() => { const r = requestAnimationFrame(() => setShown(true)); return () => cancelAnimationFrame(r); }, []);
  return (
    <div
      className={`fixed inset-0 z-[300] flex items-center justify-center bg-[rgba(20,30,28,.45)] p-5 backdrop-blur-[4px] transition-opacity duration-[250ms] ${shown ? 'opacity-100' : 'opacity-0'}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="flex max-h-[70vh] w-[min(400px,100%)] flex-col overflow-hidden rounded-box bg-white shadow-pop" role="dialog" aria-label="ผู้ที่รีแอค">
        <div className="flex items-center gap-2 border-b border-[#eee] px-[18px] py-4">
          <b className="flex-1 text-base">ผู้ที่รีแอค</b>
          <CloseButton onClick={onClose} />
        </div>
        {all.length > 0 && (
          <Tabs
            full
            className="mx-3 mt-3"
            label="กรองตามรีแอค"
            items={tabs.map(([k, label, n]) => ({
              k,
              label: <span className="inline-flex items-center gap-[3px]"><span className={k === 'all' ? '' : 'text-[16px] leading-none'}>{label}</span><span data-nt>{n}</span></span>,
            }))}
            value={tab}
            onChange={setTab}
          />
        )}
        <div className="overflow-auto px-[10px] pb-3 pt-2">
          {people.length ? people.map((p, k) => (
            <div key={k} className="flex items-center gap-3 p-2">
              <span className="relative">
                <CommentAvatar name={p[0]} />
                <i className="absolute -bottom-1 -right-1 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-white text-[12px] not-italic leading-none shadow-card">{p[2]}</i>
              </span>
              <div>
                <b className="block text-sm">{p[0]}</b>
                <span className="text-xs text-[#7a8785]">{p[1]}</span>
              </div>
            </div>
          )) : <EmptyState icon={Inbox} className="justify-start py-[6px] text-[13px]">ยังไม่มีคนกดรีแอค</EmptyState>}
        </div>
      </div>
    </div>
  );
}

/** Round initial used for commenters and likers. */
export function CommentAvatar({ name }) {
  return (
    <div className="flex h-[34px] w-[34px] flex-none items-center justify-center rounded-full bg-[#E6F4F1] font-bold text-[#1B7A6B]">
      {name.charAt(0)}
    </div>
  );
}
