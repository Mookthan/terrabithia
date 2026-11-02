import { Play } from 'lucide-react';
import HoverVeil from '@/components/ui/HoverVeil';

/** Title + poster with a play button; opens the shared video modal. */
export default function RuleVideoCard({ video, onPlay }) {
  const play = () => onPlay(video);
  return (
    <div data-reveal className="min-w-0 max-[860px]:!flex-none max-[860px]:w-full" style={{ flex: `${video.w} 1 0` }}>
      <h2 className="mb-3.5 text-xl font-bold text-ink">{video.t}</h2>
      <div
        tabIndex={0}
        role="button"
        aria-label={`เล่นวิดีโอ ${video.t}`}
        data-cursor="เล่นวิดีโอ"
        data-cursor-icon="play"
        onClick={play}
        onKeyDown={(e) => { if (e.key === 'Enter') play(); }}
        className="group relative cursor-pointer overflow-hidden rounded-box bg-[#111] shadow-card outline-none transition-[transform,box-shadow] duration-300 ease-in-out hover:-translate-y-[3px] hover:shadow-pop focus-visible:-translate-y-[3px] focus-visible:shadow-pop motion-reduce:transition-none max-[860px]:!aspect-video"
        style={{ aspectRatio: `${video.w}/421` }}
      >
        <img src={video.poster} alt="" className="block h-full w-full object-cover" />
        <HoverVeil />
        <span className="cursor-twin absolute left-1/2 top-1/2 -ml-[37px] -mt-[37px] flex h-[74px] w-[74px] items-center justify-center rounded-full bg-[rgba(39,174,151,.92)] text-white shadow-card transition-transform duration-[250ms] ease-in-out group-hover:scale-110 motion-reduce:transition-none">
          <Play className="lc ml-1 !h-[30px] !w-[30px] fill-current" />
        </span>
      </div>
    </div>
  );
}
