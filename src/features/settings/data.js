import { Bell, ShieldCheck } from 'lucide-react';

export const TABS = [
  { k: 'security', l: 'บัญชีและความปลอดภัย', short: 'ความปลอดภัย', icon: ShieldCheck },
  { k: 'notify', l: 'การแจ้งเตือน', short: 'การแจ้งเตือน', icon: Bell },
];

/** Password rule from the backend design: at least 8 characters with letters and numbers. */
export const PW_MIN = 8;
export const pwOk = (pw) => pw.length >= PW_MIN && /[A-Za-z]/.test(pw) && /\d/.test(pw);

/** Mock signed-in devices (the real list comes from the auth API). */
export const SESSIONS = [
  { id: 1, kind: 'desktop', device: 'Chrome · macOS', place: 'กรุงเทพฯ', when: 'ใช้งานอยู่ตอนนี้', current: true },
  { id: 2, kind: 'phone', device: 'Safari · iPhone', place: 'กรุงเทพฯ', when: '2 ชั่วโมงที่แล้ว' },
  { id: 3, kind: 'desktop', device: 'Edge · Windows', place: 'นนทบุรี', when: '3 วันที่แล้ว' },
];

/** Notification types × channels. `lock` = always on in the site (company announcements). */
export const NOTIFY = [
  { k: 'urgent', l: 'ประกาศด่วน', d: 'เรื่องเร่งด่วน เช่น ปิดซ่อม ไฟดับ ขึ้นแถบบนทุกหน้า และส่งเข้า LINE ถ้าเชื่อมไว้', web: true, mail: true, lock: true },
  { k: 'ann', l: 'ประกาศ', d: 'ประกาศจากบริษัทและทีมของคุณ', web: true, mail: true, lock: true },
  { k: 'news', l: 'ข่าวสาร', d: 'ข่าวและกิจกรรมใหม่', web: true, mail: false },
  { k: 'bday', l: 'วันเกิดเพื่อนร่วมงาน', d: 'เตือนก่อนวันเกิดเพื่อนในแผนก', web: true, mail: false },
  { k: 'card', l: 'การ์ดวันเกิด', d: 'เมื่อมีคนส่งการ์ดวันเกิดถึงคุณ', web: true, mail: true },
  { k: 'know', l: 'คลังความรู้', d: 'ความคิดเห็นและการถูกใจโพสต์ของคุณ และผลการอนุมัติโพสต์', web: true, mail: false },
  { k: 'course', l: 'คอร์สเรียน', d: 'คอร์สใหม่ที่เปิดให้แผนกของคุณ', web: true, mail: false },
];
