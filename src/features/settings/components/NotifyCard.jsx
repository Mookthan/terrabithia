import { useState } from 'react';
import Switch from '@/components/ui/Switch';
import { NOTIFY } from '../data';
import SettingsCard from './SettingsCard';

const CHANNELS = [['web', 'ในเว็บ'], ['mail', 'อีเมล']];

/** One row per notification type, a switch per channel. Changes save at once. */
export default function NotifyCard() {
  const [prefs, setPrefs] = useState(() => Object.fromEntries(NOTIFY.map((n) => [n.k, { web: n.web, mail: n.mail }])));
  const set = (k, ch, on) => setPrefs((p) => ({ ...p, [k]: { ...p[k], [ch]: on } }));

  return (
    <SettingsCard title="การแจ้งเตือน" desc="เลือกเรื่องที่อยากให้แจ้งที่กระดิ่งในเว็บ และทางอีเมล บันทึกให้อัตโนมัติ">
      <div className="flex items-center justify-end gap-4 border-b border-line pb-2 text-[12px] font-semibold text-muted">
        {CHANNELS.map(([ch, l]) => <span key={ch} className="w-[38px] text-center">{l}</span>)}
      </div>
      <ul className="m-0 list-none p-0">
        {NOTIFY.map((n) => (
          <li key={n.k} className="flex items-center gap-4 border-b border-line py-3 last:border-b-0">
            <div className="min-w-0 flex-1">
              <div className="text-[13.5px] font-semibold text-ink">{n.l}</div>
              <div className="text-[12px] text-muted">{n.lock ? `${n.d} (แจ้งในเว็บเสมอ)` : n.d}</div>
            </div>
            {CHANNELS.map(([ch, l]) => (
              <Switch
                key={ch}
                on={prefs[n.k][ch]}
                onChange={(on) => set(n.k, ch, on)}
                disabled={n.lock && ch === 'web'}
                label={`${n.l} ${l}`}
              />
            ))}
          </li>
        ))}
      </ul>
    </SettingsCard>
  );
}
