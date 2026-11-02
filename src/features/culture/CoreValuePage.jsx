import SectionBar from '@/components/ui/SectionBar';
import { CORE_VALUES, CV_FLOAT } from './data';
import CoreValueCard from './components/CoreValueCard';

export default function CoreValuePage() {
  return (
    <>
      <SectionBar section="Culture" title="Core Value" />
      <div className="relative flex">
        <div className="relative left-1/2 z-[1] m-0 grid w-[min(1560px,96vw)] -translate-x-1/2 grid-cols-5 items-start gap-[22px] pb-10 pt-[30px] max-[1100px]:w-[min(640px,92vw)] max-[1100px]:grid-cols-2 max-[620px]:w-[min(230px,70vw)] max-[620px]:grid-cols-1 max-[620px]:gap-14 max-[620px]:pb-[60px] max-[620px]:pt-4">
          {CORE_VALUES.map((v, i) => (
            <CoreValueCard key={v.en} value={v} index={i} floatSec={CV_FLOAT[i]} />
          ))}
        </div>
      </div>
    </>
  );
}
