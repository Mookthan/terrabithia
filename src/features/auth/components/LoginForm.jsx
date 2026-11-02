import { useState } from 'react';
import { Eye, Lock, TriangleAlert, User } from 'lucide-react';
import { ERR } from '../data';
import { TEXT_LINK } from '@/components/ui/TextButton';
import DemoErrorRow from './DemoErrorRow';
import Field from './Field';
import Notice from './Notice';
import SubmitButton from './SubmitButton';

/** E-mail / password sign-in with remember-me, forgot-password link and demo error switches. */
export default function LoginForm({ form, setForm, error, notice, demoErr, onDemoErr, onSubmit, onForgot, pwRef }) {
  const [showPw, setShowPw] = useState(false);
  return (
    <>
      {error && <Notice><TriangleAlert className="lc" aria-hidden="true" /> {ERR[error]}</Notice>}
      {notice && <Notice kind="ok">{notice}</Notice>}
      <Field
        label="Email"
        icon={User}
        placeholder="Email"
        autoComplete="username"
        value={form.e}
        onChange={(ev) => setForm({ ...form, e: ev.target.value })}
        onEnter={onSubmit}
      />
      <Field
        ref={pwRef}
        label="Password"
        icon={Lock}
        type={showPw ? 'text' : 'password'}
        placeholder="Password"
        autoComplete="current-password"
        value={form.p}
        onChange={(ev) => setForm({ ...form, p: ev.target.value })}
        onEnter={onSubmit}
        trailing={(
          <span className="cursor-pointer text-[14px] text-teal-bright" onClick={() => setShowPw((v) => !v)}>
            <Eye className="lc !h-4 !w-4 ![vertical-align:middle]" aria-hidden="true" />
          </span>
        )}
      />
      <div className="mb-[18px] flex items-center justify-between text-[12px]">
        <label className="flex cursor-pointer items-center gap-[6px]">
          <input type="checkbox" checked={form.on} onChange={(ev) => setForm({ ...form, on: ev.target.checked })} /> จดจำฉัน
        </label>
        <a onClick={onForgot} className={`${TEXT_LINK} font-semibold`}>ลืมรหัสผ่าน ?</a>
      </div>
      <SubmitButton onClick={onSubmit}>เข้าสู่ระบบ</SubmitButton>
      <div className="mb-[6px] text-[11.5px] leading-[1.6] text-muted">ใช้ Email ของบริษัทเท่านั้น หากยังไม่มี Account<br />กรุณาติดต่อ HR หรือ Admin</div>
      <DemoErrorRow value={demoErr} onChange={onDemoErr} />
    </>
  );
}
