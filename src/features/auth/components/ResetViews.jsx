import { useState } from 'react';
import { Lock, User } from 'lucide-react';
import BackToLogin from './BackToLogin';
import Field from './Field';
import Notice from './Notice';
import SubmitButton from './SubmitButton';

const Title = ({ children }) => <h3 className="mb-[6px] text-[18px] font-bold text-ink">{children}</h3>;
const Sub = ({ children }) => <p className="mb-4 text-[13px] leading-[1.6] text-ink">{children}</p>;

/** Ask for the company e-mail to send a reset link to. */
export function ForgotView({ email, error, onBack, onSend }) {
  const [v, setV] = useState(email);
  return (
    <>
      <BackToLogin onClick={onBack} />
      <Title>ลืมรหัสผ่าน</Title>
      <Sub>กรอกอีเมลบริษัท เราจะส่งลิงก์สำหรับตั้งรหัสผ่านใหม่ไปให้</Sub>
      {error && <Notice>{error}</Notice>}
      <Field label="Email" icon={User} placeholder="name@terrabit.co.th" autoComplete="username" value={v} onChange={(e) => setV(e.target.value)} onEnter={() => onSend(v)} />
      <SubmitButton onClick={() => onSend(v)}>ส่งลิงก์รีเซ็ตรหัสผ่าน</SubmitButton>
    </>
  );
}

/** Confirmation that the reset link was sent. */
export function ResetSentView({ email, onBack, onOpenLink, onResend }) {
  return (
    <>
      <BackToLogin onClick={onBack} />
      <Notice kind="ok">ส่งลิงก์รีเซ็ตรหัสผ่านไปที่ <b>{email}</b> แล้ว กรุณาตรวจสอบกล่องจดหมายของคุณ</Notice>
      <SubmitButton onClick={onOpenLink}>เปิดลิงก์ในอีเมล (จำลอง)</SubmitButton>
      <div className="mb-[6px] text-[11.5px] leading-[1.6] text-muted">
        ไม่ได้รับอีเมล? <a className="cursor-pointer underline text-teal-bright transition-colors duration-200 hover:!text-teal-hover" onClick={onResend}>ส่งอีกครั้ง</a>
      </div>
    </>
  );
}

/** Choose a new password (reached from the simulated e-mail link). */
export function NewPasswordView({ email, error, onBack, onSave }) {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const save = () => onSave(a, b);
  return (
    <>
      <BackToLogin onClick={onBack} />
      <Title>ตั้งรหัสผ่านใหม่</Title>
      <Sub>สำหรับบัญชี <b>{email}</b></Sub>
      {error && <Notice>{error}</Notice>}
      <Field label="รหัสผ่านใหม่" icon={Lock} type="password" placeholder="อย่างน้อย 8 ตัวอักษร" autoComplete="new-password" value={a} onChange={(e) => setA(e.target.value)} onEnter={save} />
      <Field label="ยืนยันรหัสผ่านใหม่" icon={Lock} type="password" placeholder="กรอกรหัสผ่านอีกครั้ง" autoComplete="new-password" value={b} onChange={(e) => setB(e.target.value)} onEnter={save} />
      <SubmitButton onClick={save}>บันทึกรหัสผ่านใหม่</SubmitButton>
    </>
  );
}
