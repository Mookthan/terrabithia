import { Play } from 'lucide-react';
import '../../about.css';
import HoverVeil from '@/components/ui/HoverVeil';

/** 16:9 cover with a hover play button and the video's name. */
export default function VideoTile({ title, cover, onPlay }) {
  return (
    <div
      className="prod-rvtile group cursor-pointer outline-none"
      tabIndex={0}
      data-cursor="เล่นวิดีโอ"
      data-cursor-icon="play"
      onClick={onPlay}
      onKeyDown={(e) => { if (e.key === 'Enter') onPlay(); }}
    >
      <div className="prod-rvthumb relative aspect-video overflow-hidden rounded-ctl bg-[#101c2e] shadow-card">
        <img src={cover} alt="" className="block h-full w-full object-cover transition-transform duration-[400ms] ease-in-out" />
        <HoverVeil />
        <span className="prod-rvplay cursor-twin"><Play className="lc" /></span>
      </div>
      <div className="mt-2.5 text-[15px] font-semibold text-teal-bright">{title}</div>
    </div>
  );
}
