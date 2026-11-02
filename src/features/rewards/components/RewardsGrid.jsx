import { useState } from 'react';
import { useUI } from '@/context/UIContext';
import { REWARDS } from '../data';
import { redeem, useCoins } from '../coinStore';
import RewardCard from './RewardCard';
import RedeemModal from './RedeemModal';

/** Rewards catalogue, cheapest first; redeem goes through a confirm dialog. */
export default function RewardsGrid() {
  const { toast } = useUI();
  const { balance, stock } = useCoins();
  const [picked, setPicked] = useState(null);
  const confirm = () => {
    if (redeem(picked)) toast('แลกของรางวัลแล้ว · HR จะติดต่อนัดรับ');
    setPicked(null);
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-5 max-[1100px]:grid-cols-3 max-[820px]:grid-cols-2 max-[480px]:gap-3">
        {REWARDS.map((r) => <RewardCard key={r.id} reward={r} stock={stock[r.id]} balance={balance} onRedeem={setPicked} />)}
      </div>
      {picked && <RedeemModal reward={picked} balance={balance} onConfirm={confirm} onClose={() => setPicked(null)} />}
    </>
  );
}
