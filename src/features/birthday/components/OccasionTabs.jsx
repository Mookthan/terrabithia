import Tabs from '@/components/ui/Tabs';

/** Tabs along the top of the home card box, `tabs` = [{ k, tab }] (scrolls sideways on narrow phones). */
export default function OccasionTabs({ tabs, value, onChange }) {
  return <Tabs className="mt-3" items={tabs.map((o) => ({ k: o.k, label: o.tab }))} value={value} onChange={onChange} />;
}
