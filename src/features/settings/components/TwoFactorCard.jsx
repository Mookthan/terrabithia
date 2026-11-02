import { useState } from 'react';
import { ME, ADMIN_ROLES } from '@/data/me';
import { useUI } from '@/context/UIContext';
import Switch from '@/components/ui/Switch';
import SettingsCard from './SettingsCard';

/** 2FA: required (always on) for admin roles per the backend design, optional for everyone else. */
export default function TwoFactorCard() {
  const { toast } = useUI();
  const required = ADMIN_ROLES.includes(ME.role);
  const [on, setOn] = useState(required);
  const change = (next) => { setOn(next); toast(next ? 'เปิดการยืนยันสองขั้นตอนแล้ว' : 'ปิดการยืนยันสองขั้นตอนแล้ว'); };

  return (
    <SettingsCard
      title="การยืนยันตัวตนสองขั้นตอน"
      desc="ใส่รหัส 6 หลักจากแอป Authenticator ทุกครั้งที่เข้าสู่ระบบจากอุปกรณ์ใหม่"
      aside={<Switch on={on} onChange={change} disabled={required} label="การยืนยันตัวตนสองขั้นตอน" />}
    >
      <p className="m-0 text-[12.5px] text-muted">
        {required ? `บังคับเปิดสำหรับบทบาท ${ME.role}` : on ? 'เปิดอยู่' : 'ปิดอยู่'}
      </p>
    </SettingsCard>
  );
}
