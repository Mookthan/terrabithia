import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HR_NEWS } from '../data';
import MegaphoneIcon from './MegaphoneIcon';
import HrNewsCard from './HrNewsCard';

/** HR home: latest announcements, each linking into an HR item. `?post=<id>` scrolls to one post and highlights it. */
export default function HrNews({ onOpen }) {
  const [params] = useSearchParams();
  const post = params.get('post');
  const [flash, setFlash] = useState(post);
  useEffect(() => {
    setFlash(post);
    if (!post) return undefined;
    const t = setTimeout(() => setFlash(null), 3400);
    return () => clearTimeout(t);
  }, [post]);

  return (
    <div className="max-w-[860px]">
      <div className="flex items-center gap-2.5 text-ink">
        <MegaphoneIcon className="lc !h-[26px] !w-[26px] text-[#2F6FBF]" />
        <h2 className="m-0 text-[26px] font-semibold">ประกาศจาก HR</h2>
      </div>
      <p className="mb-[22px] mt-1.5 text-[14px] text-ink opacity-70">ข่าวสาร การอัปเดตสวัสดิการ และเรื่องที่เกี่ยวกับ HR ล่าสุด</p>
      <div className="hr-nlist grid gap-3.5">
        {HR_NEWS.map((n, k) => <HrNewsCard key={n.t} item={n} index={k} onOpen={onOpen} flash={!!n.id && n.id === flash} />)}
      </div>
    </div>
  );
}
