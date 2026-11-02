/**
 * Urgent notices (mook 2026-10-29). Admins tick "ประกาศด่วน" on an announcement; the backend pushes it
 * through the company LINE Official Account and the site shows it as a banner until each person
 * acknowledges it or it ends. Mock data: times are built around today so the demo always shows one.
 */
const today = new Date();
const at = (h, m = 0) => { const d = new Date(today); d.setHours(h, m, 0, 0); return d; };
const dayKey = today.toISOString().slice(0, 10);

export const URGENT_NOTICES = [
  {
    id: `wc-g-${dayKey}`,
    title: 'แจ้งงดใช้ห้องน้ำชายชั้น G ชั่วคราว',
    detail: 'ขอความร่วมมืองดใช้ห้องน้ำชายชั้น G วันนี้ เวลา 12.30–13.30 น. เนื่องจากช่างดำเนินการซ่อมชักโครกค่ะ ขออภัยในความไม่สะดวก',
    area: 'ห้องน้ำชาย ชั้น G',
    from: 'Admin',
    start: at(0),
    end: at(23, 59),
    /** Follow-up from the admin ("แจ้งอัปเดต"): pushed to LINE again and shown in place of the first message. */
    update: {
      at: at(13, 35),
      label: 'ใช้งานได้แล้ว',
      title: 'ห้องน้ำชายชั้น G กลับมาใช้งานได้แล้ว',
      detail: 'ยกเว้นห้องแรก ยังงดใช้ชั่วคราว ช่างใช้ซิลิโคนยึดสุขภัณฑ์ใหม่ ต้องรอให้แห้งประมาณ 6 ชั่วโมงก่อนเปิดใช้งาน ขอบคุณสำหรับความร่วมมือค่ะ',
    },
  },
];

const KEY = 'tbUrgentAck';
const read = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } };

/** An update counts as a new message: acknowledging the first one doesn't hide the update. */
export const ackKey = (n) => (n.update ? `${n.id}:u` : n.id);
export const isAcked = (key) => read().includes(key);
export function ack(id) {
  try { localStorage.setItem(KEY, JSON.stringify([...read().filter((x) => x !== id), id].slice(-30))); } catch { /* storage blocked */ }
}

/** Notices that are live now and not yet acknowledged, newest first, at most two. */
export const activeNotices = (now = new Date()) =>
  URGENT_NOTICES.filter((n) => n.start <= now && now < n.end && !isAcked(ackKey(n))).slice(0, 2);

export const hhmm = (d) => `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
