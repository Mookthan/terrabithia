import { Coins, TrendingUp } from 'lucide-react';
import { REWARDS, fmtCoins } from '../data';
import { useCoins } from '../coinStore';
import CheckInWeek from './CheckInWeek';
import CountUp from '@/components/ui/CountUp';

/**
 * Shopee-style header: the balance as a small member card (navy → green, soft rings) with progress to
 * the cheapest in-stock reward the user can't afford yet, next to this week's check-in strip.
 */
export default function CoinBalance() {
  const { balance, history, stock } = useCoins();
  const today = history.filter((h) => h.date === 'วันนี้' && !h.redeem).reduce((s, h) => s + h.pts, 0);
  const next = REWARDS.filter((r) => r.cost > balance && stock[r.id] > 0).sort((a, b) => a.cost - b.cost)[0];

  return (
    <div data-reveal className="mb-5 flex items-stretch gap-4 max-[640px]:flex-col max-[640px]:gap-3">
      <div className="relative w-[340px] flex-none overflow-hidden rounded-box bg-[linear-gradient(135deg,#1C3A5C,#12986F)] px-5 py-4 text-white shadow-card max-[640px]:w-full">
        <span className="absolute -right-12 -top-14 h-44 w-44 rounded-full border-[20px] border-white/10" aria-hidden="true" />
        <span className="absolute -bottom-14 right-16 h-28 w-28 rounded-full bg-white/[.07]" aria-hidden="true" />
        <div className="relative flex items-center justify-between">
          <span className="text-[12.5px] font-semibold opacity-85">เหรียญของฉัน</span>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15"><Coins className="lc !h-5 !w-5 text-[#FFD45C]" aria-hidden="true" /></span>
        </div>
        <div className="relative mt-1 text-[32px] font-bold leading-tight"><CountUp value={balance} format={fmtCoins} /><span className="ml-1.5 text-[15px] font-semibold opacity-85">เหรียญ</span></div>
        <span className="relative mt-2 inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-0.5 text-[12px] font-semibold">
          <TrendingUp className="lc !h-3.5 !w-3.5" aria-hidden="true" />{`วันนี้ +${fmtCoins(Math.max(0, today))}`}
        </span>
        {next && (
          <div className="relative mt-3">
            <div className="mb-1 truncate text-[12px] opacity-90">{`อีก ${fmtCoins(next.cost - balance)} เหรียญ แลก ${next.l}`}</div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/20">
              <div className="h-full rounded-full bg-[#FFD45C] transition-[width] duration-700" style={{ width: `${Math.round((balance / next.cost) * 100)}%` }} />
            </div>
          </div>
        )}
      </div>

      <CheckInWeek />
    </div>
  );
}
