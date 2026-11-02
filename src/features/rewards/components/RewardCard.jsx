import { Coins } from 'lucide-react';
import { fmtCoins } from '../data';
import '../rewards.css';

/**
 * One reward as a gift card: a coloured card face (icon, cost, stock) torn off from the details
 * by a dashed line with punched notches (.reward-ticket), then name, description and the redeem button.
 */
export default function RewardCard({ reward: r, stock, balance, onRedeem }) {
  const Icon = r.icon;
  const short = r.cost - balance;
  const out = stock < 1;
  return (
    <div data-reveal className="drop-shadow-[0_4px_14px_rgba(20,40,36,.10)] transition-transform duration-300 hover:-translate-y-1 motion-reduce:transition-none">
      <div className="reward-ticket flex h-full flex-col overflow-hidden rounded-box bg-white">
        <div className="relative h-[136px] overflow-hidden px-4 pb-3.5 pt-3 text-white max-[480px]:h-[112px] max-[480px]:px-3" style={{ background: `linear-gradient(135deg, ${r.g[0]}, ${r.g[1]})` }}>
          {/* decoration: soft rings and the reward icon, large and faded */}
          <span className="absolute -right-10 -top-12 h-40 w-40 rounded-full border-[18px] border-white/10" aria-hidden="true" />
          <span className="absolute -bottom-16 -left-8 h-32 w-32 rounded-full bg-white/10" aria-hidden="true" />
          <Icon className="lc absolute bottom-3 right-3 !h-[64px] !w-[64px] opacity-90 max-[480px]:!h-11 max-[480px]:!w-11" strokeWidth={1.3} aria-hidden="true" />
          <div className="relative flex justify-end">
            <span className="flex-none whitespace-nowrap rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-semibold backdrop-blur-sm">{out ? 'หมดแล้ว' : `เหลือ ${stock} ชิ้น`}</span>
          </div>
          <span className="absolute bottom-3.5 left-4 flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[14px] font-bold text-ink shadow-card max-[480px]:left-3 max-[480px]:text-[13px]">
            <Coins className="lc !h-4 !w-4 text-[#E0A800]" aria-hidden="true" />{fmtCoins(r.cost)}
          </span>
        </div>
        <div className="mx-3 border-t-2 border-dashed border-line" aria-hidden="true" />
        <div className="flex flex-1 flex-col px-4 pb-4 pt-3 max-[480px]:px-3 max-[480px]:pb-3">
          <div className="text-[14.5px] font-semibold leading-snug text-ink">{r.l}</div>
          <div className="mb-3 mt-1 line-clamp-2 min-h-[3.2em] text-[12px] leading-[1.6] text-muted">{r.d}</div>
          <button
            type="button"
            disabled={out || short > 0}
            onClick={() => onRedeem(r)}
            className="mt-auto cursor-pointer rounded-ctl border-0 bg-teal-bright px-4 py-2 text-[13px] font-semibold text-white transition-colors duration-200 hover:!bg-teal-hover disabled:cursor-not-allowed disabled:bg-line disabled:!text-muted disabled:hover:!bg-line max-[480px]:px-2 max-[480px]:text-[12px]"
          >
            {out ? 'หมดแล้ว' : short > 0 ? `ขาดอีก ${fmtCoins(short)} เหรียญ` : 'แลกเลย'}
          </button>
        </div>
      </div>
    </div>
  );
}
