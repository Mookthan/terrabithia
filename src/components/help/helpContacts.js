import { ClipboardCheck, FileText, KeyRound, UserRound } from 'lucide-react';

/**
 * Who to contact for each kind of problem (roles from the backend design).
 * Mock emails and extensions: mook has no real contacts yet (2026-10-19); replace when HR/IT confirm.
 */
export const HELP_TOPICS = [
  { k: 'it', icon: KeyRound, title: 'เข้าระบบไม่ได้ ลืมรหัสผ่าน หรือเว็บใช้งานไม่ได้', team: 'ทีม IT', mail: 'it-support@terrabit.co.th', tel: '1100' },
  { k: 'hr', icon: UserRound, title: 'ข้อมูลส่วนตัวหรือวันลาไม่ถูกต้อง', team: 'ฝ่ายบุคคล (HR) · ข้อมูลมาจาก EzyHR', mail: 'hr@terrabit.co.th', tel: '1200' },
  { k: 'content', icon: FileText, title: 'ข่าว ประกาศ ไฟล์ หรือคอร์สไม่ถูกต้อง', team: 'ทีมดูแลเนื้อหา', mail: 'content@terrabit.co.th', tel: '1300' },
  { k: 'approve', icon: ClipboardCheck, title: 'โพสต์ความรู้ยังไม่ได้รับการอนุมัติ', team: 'หัวหน้าแผนกของคุณ', mail: 'head.cac-graphic@terrabit.co.th' },
];
