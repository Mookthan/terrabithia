import { PATHS } from '@/routes/paths';

// `action` is either { to: path } or { card: personId } (opens the birthday card composer for that person).
export const INITIAL_NOTIFICATIONS = [
  { id: 10, icon: 'heart', title: 'เอมี่ รีแอค ❤️ รูป "งานคอนเสิร์ตที่ชอบ" ของคุณ', detail: 'ในอัลบั้มความสนใจ', time: 'วันนี้ 09:20', action: { to: PATHS.profile }, unread: true },
  { id: 8, icon: 'circle-check', urgent: true, resolved: true, title: 'อัปเดต: ห้องน้ำชายชั้น G ใช้งานได้แล้ว', detail: 'ยกเว้นห้องแรก รอซิลิโคนแห้งประมาณ 6 ชั่วโมง', time: 'วันนี้ 13:35', action: { to: PATHS.home }, unread: true },
  { id: 7, icon: 'siren', urgent: true, title: 'ประกาศด่วน: งดใช้ห้องน้ำชายชั้น G ชั่วคราว', detail: 'วันนี้ 12.30–13.30 น. ช่างซ่อมชักโครก', time: 'วันนี้ 11:50', action: { to: PATHS.home } },
  { id: 9, icon: 'vote', title: 'โหวตใหม่: เลือกเมนู A la carte บุฟเฟต์ Copper', detail: 'เลือกได้ 1 เมนู ปิดโหวตใน 3 วัน', time: 'วันนี้ 08:45', action: { to: PATHS.home }, unread: true },
  { id: 1, icon: 'calendar-check', title: 'ใบลาพักร้อนถูกส่งให้หัวหน้าแล้ว', detail: 'วันที่ 14, 26, 27 ต.ค. รออนุมัติ', time: '10 นาทีที่แล้ว', action: { to: PATHS.profile }, unread: true },
  { id: 2, icon: 'megaphone', title: 'HR: แอป EzyHR บน Android ยังพบปัญหา', detail: 'ฝ่ายทรัพยากรบุคคลจะแจ้งอีกครั้งเมื่อกลับมาใช้งานได้', time: '1 ชั่วโมงที่แล้ว', action: { to: PATHS.home }, unread: true },
  { id: 3, icon: 'cake', title: 'วันนี้วันเกิดก้อง CAC', detail: 'ส่งคำอวยพรให้เพื่อนร่วมทีมกราฟิก', time: 'วันนี้ 09:00', action: { card: 'gong' }, unread: true },
  { id: 6, icon: 'cake', title: 'สัปดาห์หน้า: วันเกิดเอ๋ (VDO Editor)', detail: 'เขียนการ์ดอวยพรส่งให้ล่วงหน้ากันเถอะ', time: 'เมื่อวาน', action: { card: 'aut' }, unread: true },
  { id: 4, icon: 'graduation-cap', title: 'คอร์สบังคับ: Color Theory ใกล้ครบกำหนด', detail: 'เรียนให้จบภายในสิ้นเดือนนี้', time: 'เมื่อวาน', action: { to: PATHS.courses }, unread: false },
  { id: 5, icon: 'newspaper', title: 'ข่าวใหม่: ยกระดับ Customer Experience', detail: 'ทีม PMD เผยแพร่ข่าวใหม่', time: '2 วันที่แล้ว', action: { to: PATHS.newsDetail(0) }, unread: false },
];
