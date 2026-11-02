import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useUI } from '@/context/UIContext';
import { OUTLINE_HOVER } from '@/components/ui/TextButton';
import { FieldHint } from '@/features/knowledge/fieldError';
import { PW_MIN, pwOk } from '../data';
import SettingsCard from './SettingsCard';

const EMPTY = { cur: '', next: '', confirm: '' };
const FIELDS = [
  { k: 'cur', l: 'รหัสผ่านปัจจุบัน', auto: 'current-password' },
  { k: 'next', l: 'รหัสผ่านใหม่', auto: 'new-password' },
  { k: 'confirm', l: 'ยืนยันรหัสผ่านใหม่', auto: 'new-password' },
];

function check(v) {
  const e = {};
  if (!v.cur) e.cur = 'กรุณาใส่รหัสผ่านปัจจุบัน';
  if (!pwOk(v.next)) e.next = `อย่างน้อย ${PW_MIN} ตัวอักษร มีทั้งตัวอักษรและตัวเลข`;
  else if (v.next === v.cur) e.next = 'รหัสผ่านใหม่ต้องไม่ซ้ำกับรหัสผ่านเดิม';
  if (v.confirm !== v.next || !v.confirm) e.confirm = 'รหัสผ่านไม่ตรงกัน';
  return e;
}

/** Change password: three fields, red hints only after the first save attempt. */
export default function PasswordCard() {
  const { toast } = useUI();
  const [v, setV] = useState(EMPTY);
  const [tried, setTried] = useState(false);
  const [show, setShow] = useState(false);
  const errors = tried ? check(v) : {};

  const submit = (e) => {
    e.preventDefault();
    setTried(true);
    if (Object.keys(check(v)).length) return;
    setV(EMPTY); setTried(false);
    toast('เปลี่ยนรหัสผ่านแล้ว');
  };

  return (
    <SettingsCard title="เปลี่ยนรหัสผ่าน" desc={`รหัสผ่านใหม่อย่างน้อย ${PW_MIN} ตัวอักษร มีทั้งตัวอักษรและตัวเลข`}>
      <form onSubmit={submit} noValidate className="max-w-[420px]">
        {FIELDS.map((f) => (
          <div key={f.k} className="mb-3.5">
            <label htmlFor={`pw-${f.k}`} className="mb-1.5 block text-[12.5px] font-semibold text-ink">
              <span className="text-[#D93A44]" aria-hidden="true">*</span> {f.l}
            </label>
            <div className="flex items-center rounded-ctl border border-line bg-white pr-1 focus-within:border-teal-bright">
              <input
                id={`pw-${f.k}`}
                type={show ? 'text' : 'password'}
                autoComplete={f.auto}
                value={v[f.k]}
                onChange={(e) => setV((o) => ({ ...o, [f.k]: e.target.value }))}
                className="min-w-0 flex-1 border-0 bg-transparent px-3 py-[9px] text-[13.5px] text-ink outline-none"
              />
              {f.k === 'cur' && (
                <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน'} className="grid h-8 w-8 cursor-pointer place-items-center rounded-full border-0 bg-transparent text-teal-bright transition-colors hover:bg-teal-veil">
                  {show ? <EyeOff className="lc !h-4 !w-4" /> : <Eye className="lc !h-4 !w-4" />}
                </button>
              )}
            </div>
            <FieldHint text={errors[f.k]} />
          </div>
        ))}
        <div className="mt-1 flex gap-2">
          <button type="submit" className="cursor-pointer rounded-ctl border-0 bg-teal-bright px-4 py-2 text-[13px] font-semibold text-white transition-colors duration-200 hover:!bg-teal-hover">บันทึกรหัสผ่าน</button>
          <button type="button" onClick={() => { setV(EMPTY); setTried(false); }} className={`cursor-pointer rounded-ctl border border-line bg-white px-4 py-2 text-[13px] font-semibold text-ink ${OUTLINE_HOVER}`}>ล้าง</button>
        </div>
      </form>
    </SettingsCard>
  );
}
