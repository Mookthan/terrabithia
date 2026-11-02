import SectionBar from '@/components/ui/SectionBar';
import { useUI } from '@/context/UIContext';
import { RULE_VIDEO_SRC, RULE_VIDEOS } from './data';
import RuleVideoCard from './components/RuleVideoCard';

export default function RulesPage() {
  const { openVideo } = useUI();
  return (
    <>
      <SectionBar title="Rules" />
      {/* Same content width and side padding as the other pages (the layout's <main>). */}
      <div className="flex items-start gap-8 pb-10 max-[860px]:flex-col max-[860px]:gap-[30px]">
        {RULE_VIDEOS.map((v) => (
          <RuleVideoCard key={v.t} video={v} onPlay={(x) => openVideo(x.t, RULE_VIDEO_SRC)} />
        ))}
      </div>
    </>
  );
}
