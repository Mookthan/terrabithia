import FolderTabs from '@/components/ui/FolderTabs';
import { TABS } from '../data';

/** Folder tabs on top of the settings page; the chosen tab's sections sit in its white box. */
export default function SettingsNav({ tab, onChange, children }) {
  return (
    <FolderTabs
      label="ตั้งค่า"
      items={TABS.map(({ k, l, short, icon }) => ({ k, label: l, short: short !== l ? short : undefined, icon }))}
      value={tab}
      onChange={onChange}
    >
      {children}
    </FolderTabs>
  );
}
