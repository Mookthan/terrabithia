import { useNavigate } from 'react-router-dom';
import { ChevronRight, Coins } from 'lucide-react';
import { fmtCoins } from '@/features/rewards/data';
import { useCoins } from '@/features/rewards/coinStore';
import { ME } from '@/data/me';
import { PATHS } from '@/routes/paths';
import ShiftButton from '@/components/ui/ShiftButton';
import { TEXT_LINK } from '@/components/ui/TextButton';
import DashCard from './DashCard';
import CountUp from '@/components/ui/CountUp';

/**
 * Signed-in user's photo, name, department, tenure and coin balance; links to the profile.
 * Until today's check-in is collected (on the rewards page only), a link next to the balance leads there.
 */
export default function ProfileCard() {
  const navigate = useNavigate();
  const { balance, today } = useCoins();
  const checkedIn = (today.checkin || 0) > 0;
  const go = () => navigate(PATHS.profile);
  return (
    <DashCard
      i={0} dx="-80px" dy="-30px" rot="-5deg"
      role="link" tabIndex={0}
      data-cursor="ดูโปรไฟล์"
      data-cursor-icon="profile"
      onClick={go}
      onKeyDown={(e) => e.key === 'Enter' && go()}
      className="relative flex min-h-[514px] cursor-pointer flex-col bg-white !shadow-pop outline-none transition-[translate,box-shadow] duration-[250ms] hover:[translate:0_-4px] hover:!shadow-pop focus-visible:[translate:0_-4px] max-[640px]:order-6 motion-reduce:transition-none"
    >
      <img className="block h-[205px] w-full bg-[#e8e8e8] object-cover object-[50%_12%]" src={ME.banner} alt="ธัญชนก" />
      <div className="px-4 pb-[70px] pt-[22px] text-ink [&_p]:text-sm [&_p]:leading-[1.8]">
        <h2 className="mb-[14px] text-[25px] font-semibold">ธัญชนก (มุก)</h2>
        <p>CAC: Graphic Design Dept.</p>
        <p>Creative Designer</p>
        <h3 className="mt-3 text-[22px] font-semibold">อายุงาน</h3>
        <p><CountUp value={4} format={(n) => `${n} ปี`} /> <CountUp value={5} format={(n) => `${n} เดือน`} /></p>
        <h3 className="mt-3 text-[22px] font-semibold">เหรียญสะสม</h3>
        <p className="flex items-center gap-1.5">
          <Coins className="lc !h-[18px] !w-[18px] flex-none text-[#E0A800]" aria-hidden="true" />
          <CountUp value={balance} format={(n) => `${fmtCoins(n)} เหรียญ`} />
          {!checkedIn && (
            <button
              type="button"
              className={`${TEXT_LINK} ml-2 text-[13px] font-semibold`}
              onClick={(e) => { e.stopPropagation(); navigate(PATHS.rewards); }}
            >
              เช็กอินรับเหรียญ<ChevronRight className="lc !h-4 !w-4" aria-hidden="true" />
            </button>
          )}
        </p>
      </div>
      <ShiftButton className="absolute bottom-3 right-3" />
    </DashCard>
  );
}
