import Tabs from '@/components/ui/Tabs';

const FACES = [{ k: 'cover', label: 'ปก' }, { k: 'in', label: 'ข้างใน' }];

/** Switch the live preview between the card's cover and its inside. */
export default function FaceTabs({ value, onChange }) {
  return <Tabs className="mb-[10px]" items={FACES} value={value} onChange={onChange} />;
}
