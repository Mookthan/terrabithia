import { useEffect, useRef, useState } from 'react';
import { MAXAR_POSTER, MAXAR_VIDEO, RUAMITR_T } from '../../data';
import '../../about.css';

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Full-bleed muted background video (always silent, no sound button or controls: mook 2026-10-29)
 * with the glass Maxar Ruamitr card. Reduced motion shows the paused poster.
 */
export default function ProductHero({ onOpenRuamitr }) {
  const vidRef = useRef(null);
  const [reduced] = useState(reducedMotion);

  useEffect(() => {
    const v = vidRef.current;
    if (!v) return;
    v.muted = true;
    if (!reduced) v.play().catch(() => {});
  }, [reduced]);

  return (
    <div className="relative left-1/2 -ml-[50vw] mb-10 flex w-screen flex-col items-center justify-center overflow-hidden bg-black px-4 py-[70px] max-[600px]:px-3 max-[600px]:py-10">
      <video
        ref={vidRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={MAXAR_VIDEO}
        muted
        loop
        playsInline
        preload="auto"
        poster={MAXAR_POSTER}
        aria-hidden="true"
      />
      <div
        data-reveal
        className="prod-rua relative z-[2] m-0 w-[min(864px,100%)] cursor-pointer rounded-box border border-white/40 px-10 pb-10 pt-[34px] text-center shadow-[inset_0_1px_0_rgba(255,255,255,.55),0_18px_44px_-22px_rgba(0,0,0,.55)] outline-none transition-[transform,border-color,box-shadow] duration-300 ease-in-out max-[600px]:px-[18px] max-[600px]:pb-[26px] max-[600px]:pt-[22px]"
        tabIndex={0}
        data-cursor="ดูรายละเอียด"
        data-cursor-icon="eye"
        onClick={onOpenRuamitr}
        onKeyDown={(e) => { if (e.key === 'Enter') onOpenRuamitr(); }}
      >
        <img src={RUAMITR_T} alt="Maxar Ruamitr" className="mx-auto mb-[18px] block h-auto w-[min(540px,92%)]" />
        <p className="mx-auto max-w-[720px] text-[14.5px] leading-[1.9] text-white [text-shadow:0_1px_8px_rgba(0,0,0,.6)] max-[600px]:text-[12.5px]">
          ระบบบริหารจัดการข้อมูลลูกค้า หรือ Customer Relationship Management System (CRM) ที่เทอราบิทออกแบบและพัฒนามาอย่างต่อเนื่องตั้งแต่ปี พ.ศ. 2550 จนถึงปัจจุบัน เป็นซอฟต์แวร์ที่ได้รับการยอมรับอย่างกว้างขวางในวงการคอนแท็กต์เซนเตอร์ของธุรกิจประกันภัยและการเงิน
        </p>
      </div>
    </div>
  );
}
