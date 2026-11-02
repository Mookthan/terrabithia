import SectionBar from '@/components/ui/SectionBar';
import { CC_DATA, CC_IMG } from './data';
import CompetencyCard from './components/CompetencyCard';

export default function CoreCompetencyPage() {
  return (
    <>
      <SectionBar section="Culture" title="Core Competency" />
      <div className="relative left-1/2 -ml-[50vw] -mt-[26px] flex w-screen justify-center bg-white px-5 pb-[30px] pt-[34px]">
        <img src={CC_IMG} alt="Core Competency: Passion, Effort, Dedication, Investigation, Team Spirit" className="block h-auto w-[min(720px,100%)]" />
      </div>
      <div className="mx-auto mb-[50px] mt-[26px] flex max-w-[1080px] flex-col gap-[22px]">
        {CC_DATA.map((d) => <CompetencyCard key={d.t} item={d} />)}
      </div>
    </>
  );
}
