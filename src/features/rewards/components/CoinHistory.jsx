import { Inbox } from 'lucide-react';
import EmptyState from '@/components/ui/EmptyState';
import { REWARDS, fmtCoins, ruleOf } from '../data';
import { useCoins } from '../coinStore';

const labelOf = (h) => {
  if (h.redeem) return REWARDS.find((r) => r.id === h.redeem).l;
  const l = ruleOf(h.k).l;
  return h.undo ? `หักคืน: ${l}` : l;
};

/** Every earn, refund and redemption, newest first. */
export default function CoinHistory() {
  const { history } = useCoins();
  if (!history.length) return <EmptyState icon={Inbox}>ยังไม่มีประวัติเหรียญ</EmptyState>;
  return (
    <div data-reveal className="rounded-box bg-white px-6 py-[22px] shadow-card max-[640px]:px-4">
      <ul className="m-0 list-none p-0">
        {history.map((h) => (
          <li key={h.id} className="flex items-center gap-3 border-b border-line py-3 first:pt-0 last:border-b-0 last:pb-0">
            <div className="min-w-0 flex-1">
              <div className="text-[13.5px] font-semibold text-ink">{h.redeem && <span className="text-muted">แลก · </span>}{labelOf(h)}</div>
              <div className="flex flex-wrap items-center gap-2 text-[12px] text-muted">
                {h.date}
                {h.status && (
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${h.status === 'รอรับของ' ? 'bg-[#FFF3D6] text-[#9A6B00]' : 'bg-teal-soft text-teal-hover'}`}>{h.status}</span>
                )}
              </div>
            </div>
            <b className={`flex-none text-[15px] ${h.pts > 0 ? 'text-teal-hover' : 'text-ink'}`}>{`${h.pts > 0 ? '+' : '−'}${fmtCoins(Math.abs(h.pts))}`}</b>
          </li>
        ))}
      </ul>
    </div>
  );
}
