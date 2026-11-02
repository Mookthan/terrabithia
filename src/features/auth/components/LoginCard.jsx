import { LOGO_SRC } from '@/data/me';

/** White card with the logo on top and the version line at the bottom. */
export default function LoginCard({ children }) {
  return (
    <div className="relative w-[380px] max-w-full rounded-box bg-white px-12 pb-[30px] pt-11 text-center shadow-pop max-[620px]:px-[22px] max-[620px]:pb-[22px] max-[620px]:pt-[34px]">
      <div className="mb-[26px] flex items-center justify-center gap-2">
        <img className="block h-auto w-[230px]" src={LOGO_SRC} alt="terrabithia" />
      </div>
      {children}
      <div className="mt-[22px] text-center text-[11px] text-[#b5bdb2]">Terrabithia V.01</div>
    </div>
  );
}
