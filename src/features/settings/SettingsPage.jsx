import { useSearchParams } from 'react-router-dom';
import SectionBar from '@/components/ui/SectionBar';
import SettingsNav from './components/SettingsNav';
import PasswordCard from './components/PasswordCard';
import TwoFactorCard from './components/TwoFactorCard';
import SessionsCard from './components/SessionsCard';
import NotifyCard from './components/NotifyCard';
import LineCard from './components/LineCard';

/** Account settings from the profile menu: ?tab=security (default) or ?tab=notify. */
export default function SettingsPage() {
  const [params, setParams] = useSearchParams();
  const tab = params.get('tab') === 'notify' ? 'notify' : 'security';

  return (
    <>
      <SectionBar section="Settings" title="ตั้งค่าบัญชี" />
      <div className="text-[14px]">
        <SettingsNav tab={tab} onChange={(k) => setParams({ tab: k }, { replace: true })}>
          {tab === 'notify' ? <><LineCard /><NotifyCard /></> : (
            <>
              <PasswordCard />
              <TwoFactorCard />
              <SessionsCard />
            </>
          )}
        </SettingsNav>
      </div>
    </>
  );
}
