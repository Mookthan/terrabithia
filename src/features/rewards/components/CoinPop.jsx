import { useEffect, useState } from 'react';
import { Coins } from 'lucide-react';
import { useCoins } from '../coinStore';
import '../rewards.css';

/** Small "+N เหรียญ" chip that floats up for a moment whenever coins are earned. */
export default function CoinPop() {
  const { pop } = useCoins();
  const [shown, setShown] = useState(null);
  useEffect(() => {
    if (!pop) return undefined;
    setShown(pop);
    const t = setTimeout(() => setShown(null), 1800);
    return () => clearTimeout(t);
  }, [pop]);
  if (!shown) return null;
  return (
    <div key={shown.id} role="status" className="coin-pop pointer-events-none fixed left-1/2 top-[86px] z-[3500] flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-[13px] font-bold text-ink shadow-pop">
      <Coins className="lc !h-4 !w-4 text-[#E0A800]" aria-hidden="true" />{`+${shown.pts} เหรียญ`}
    </div>
  );
}
