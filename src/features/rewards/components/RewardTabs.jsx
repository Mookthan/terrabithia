import Tabs from '@/components/ui/Tabs';

const TABS = [{ k: 'rewards', label: 'ของรางวัล' }, { k: 'history', label: 'ประวัติเหรียญ' }];

/** Tabs under the balance (shared site tab style). */
export default function RewardTabs({ tab, onChange }) {
  return (
    <div className="mb-5 max-[640px]:[&>div]:flex max-[640px]:[&>div]:w-full max-[640px]:[&_button]:flex-1">
      <Tabs onCream items={TABS} value={tab} onChange={onChange} />
    </div>
  );
}
