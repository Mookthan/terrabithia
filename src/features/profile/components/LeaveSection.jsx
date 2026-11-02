import { forwardRef } from 'react';
import { USER_LEAVE, LEAVE_TONES, leaveTone } from '@/data/leave';
import LeaveCard from './LeaveCard';

/** Full-bleed white band listing the user's leave entitlements. */
const LeaveSection = forwardRef(function LeaveSection(_, ref) {
  return (
    <div
      ref={ref}
      id="leaveSec"
      className="relative left-1/2 -mb-[68px] text-[14px] -ml-[50vw] w-screen scroll-mt-[84px] bg-white pb-[96px] pt-[30px]"
    >
      <div className="mx-auto max-w-[1000px] px-5 max-[860px]:px-4">
        <h2 className="mb-2 text-[19px] font-bold text-ink">สิทธิ์สำหรับวันลา</h2>
        <p className="mb-5 text-[12.5px] leading-[1.7] text-muted">
          วันลาพักร้อนคงเหลือจะถูกยกยอดไปยังปีถัดไป และสามารถใช้สิทธิ์ได้ถึงวันที่ 31 ธันวาคมของปีนั้น
          <br />
          โดยเมื่อรวมกับวันลาพักร้อนประจำปีแล้วจะมีจำนวนวันลาพักร้อนรวมสูงสุดไม่เกิน 18 วัน
        </p>
        <div className="relative z-[1] grid grid-cols-3 gap-5 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
          {USER_LEAVE.map((l, i) => (
            <LeaveCard key={l.l} leave={l} wide={LEAVE_TONES[leaveTone(i, 3)]} narrow={LEAVE_TONES[leaveTone(i, 1)]} />
          ))}
        </div>
      </div>
    </div>
  );
});

export default LeaveSection;
