// Login page texts and rules, ported from the prototype.
export const ERR = {
  empty: 'ยังไม่ได้กรอกข้อมูล',
  domain: 'ใช้ได้เฉพาะอีเมลบริษัท @terrabit.co.th เท่านั้น',
  invalid: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง',
  disabled: 'บัญชีนี้ยังไม่สามารถใช้งานได้ กรุณาติดต่อผู้ดูแลระบบ',
  network: 'ไม่สามารถเชื่อมต่อระบบได้ในขณะนี้ กรุณาลองอีกครั้ง',
  maintenance: 'ระบบอยู่ระหว่างปรับปรุง กรุณาลองใหม่อีกครั้งภายหลัง',
};

/** Demo switches that make the next sign-in fail in a given way. */
export const DEMO_ERRORS = [
  ['none', 'ปกติ'],
  ['invalid', 'รหัสผิด'],
  ['disabled', 'บัญชีถูกระงับ'],
  ['network', 'เชื่อมต่อไม่ได้'],
  ['maintenance', 'ปรับปรุงระบบ'],
];

export const COMPANY_MAIL = /^[^\s@]+@terrabit\.co\.th$/i;
export const MIN_PASSWORD = 8;

export const RESET_ERR = {
  empty: 'กรุณากรอกอีเมลบริษัท',
  short: 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร',
  mismatch: 'รหัสผ่านทั้งสองช่องไม่ตรงกัน',
};
export const RESET_NOTICE = 'ตั้งรหัสผ่านใหม่เรียบร้อยแล้ว กรุณากรอกรหัสผ่านใหม่เพื่อเข้าสู่ระบบ';
