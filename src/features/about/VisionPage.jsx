import SectionBar from '@/components/ui/SectionBar';
import VisionCarousel from './components/VisionCarousel';

const pCls = 'mb-[26px] max-w-[620px] text-[15px] leading-[2] text-ink';

export default function VisionPage() {
  return (
    <>
      <SectionBar section="About us" title="Vision" />
      <div className="relative left-1/2 -ml-[50vw] -mt-[26px] grid min-h-[max(640px,calc(100vh-180px))] w-screen grid-cols-2 max-[900px]:min-h-0 max-[900px]:grid-cols-1">
        <div className="relative flex items-center overflow-hidden py-[60px] pb-[120px] pl-[124px] pr-12 max-[900px]:px-[22px] max-[900px]:py-10">
          <div className="relative z-[1] max-w-[760px]">
            <div className="mb-[34px] text-[clamp(36px,5.2vw,76px)] font-bold leading-[1.15] tracking-[-1px] text-accent">
              Trusted Partner
            </div>
            <p className={pCls}>การทำธุรกิจให้เกิดความยั่งยืน เริ่มต้นจากการเป็น Trusted Partner หรือคู่ค้าพันธมิตรที่ไว้วางใจได้</p>
            <p className={pCls}>เมื่อลูกค้าเกิดความเชื่อมั่นและมองเห็นคุณค่าในสิ่งที่เทอราบิทได้ส่งมอบ ความไว้วางใจก็จะเกิดขึ้น และลูกค้าจะยังคงให้การสนับสนุนได้อย่างต่อเนื่อง อันนำมาซึ่งการเติบโตอย่างมั่นคงและยั่งยืน แม้รูปแบบธุรกิจในอนาคตจะแตกต่างไปจากเดิม หรือจะเกิดวิกฤตใดๆ ความไว้วางใจนี้จะเป็นรากฐานสำคัญที่ไม่เพียงทำให้ธุรกิจอยู่รอด แต่ยังสามารถต่อ⁠ยอดไปสู่ความสำเร็จระยะยาวได้</p>
          </div>
        </div>
        <VisionCarousel />
      </div>
    </>
  );
}
