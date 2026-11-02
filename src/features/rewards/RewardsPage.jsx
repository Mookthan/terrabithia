import { useSearchParams } from 'react-router-dom';
import SectionBar from '@/components/ui/SectionBar';
import CoinBalance from './components/CoinBalance';
import RewardTabs from './components/RewardTabs';
import RewardsGrid from './components/RewardsGrid';
import CoinHistory from './components/CoinHistory';

const TAB_KEYS = ['rewards', 'history'];

/** Coins page: balance, then rewards / history (?tab=). */
export default function RewardsPage() {
  const [params, setParams] = useSearchParams();
  const tab = TAB_KEYS.includes(params.get('tab')) ? params.get('tab') : 'rewards';
  return (
    <>
      <SectionBar section="Rewards" title="แลกของรางวัล" />
      <div className="text-[14px]">
        <CoinBalance />
        <RewardTabs tab={tab} onChange={(k) => setParams({ tab: k }, { replace: true })} />
        {tab === 'rewards' && <RewardsGrid />}
        {tab === 'history' && <CoinHistory />}
      </div>
    </>
  );
}
