import { useState } from 'react';
import { Monitor, Smartphone } from 'lucide-react';
import { useUI } from '@/context/UIContext';
import { OUTLINE_HOVER, TEXT_BTN } from '@/components/ui/TextButton';
import { SESSIONS } from '../data';
import SettingsCard from './SettingsCard';

/** Devices signed in to this account; sign out one or all others. */
export default function SessionsCard() {
  const { toast } = useUI();
  const [list, setList] = useState(SESSIONS);
  const others = list.filter((s) => !s.current);
  const drop = (id) => { setList((l) => l.filter((s) => s.id !== id)); toast('ออกจากระบบอุปกรณ์นั้นแล้ว'); };
  const dropAll = () => { setList((l) => l.filter((s) => s.current)); toast('ออกจากระบบอุปกรณ์อื่นทั้งหมดแล้ว'); };

  return (
    <SettingsCard title="อุปกรณ์ที่เข้าสู่ระบบ" desc="หากเห็นอุปกรณ์ที่ไม่รู้จัก ให้ออกจากระบบและเปลี่ยนรหัสผ่านทันที">
      <ul className="m-0 list-none p-0">
        {list.map((s) => {
          const Icon = s.kind === 'phone' ? Smartphone : Monitor;
          return (
            <li key={s.id} className="flex items-center gap-3 border-b border-line py-3 first:pt-0 last:border-b-0">
              <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-teal-soft text-teal-hover"><Icon className="lc !h-[18px] !w-[18px]" aria-hidden="true" /></span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 text-[13.5px] font-semibold text-ink">
                  {s.device}
                  {s.current && <span className="rounded-full bg-teal-soft px-2 py-0.5 text-[11px] font-semibold text-teal-hover">อุปกรณ์นี้</span>}
                </div>
                <div className="text-[12px] text-muted">{`${s.place} · ${s.when}`}</div>
              </div>
              {!s.current && <button type="button" onClick={() => drop(s.id)} className={`${TEXT_BTN} !text-[13px]`}>ออกจากระบบ</button>}
            </li>
          );
        })}
      </ul>
      {others.length > 0 && (
        <button type="button" onClick={dropAll} className={`mt-3 cursor-pointer rounded-ctl border border-line bg-white px-4 py-2 text-[13px] font-semibold text-ink ${OUTLINE_HOVER}`}>
          ออกจากระบบอุปกรณ์อื่นทั้งหมด
        </button>
      )}
    </SettingsCard>
  );
}
