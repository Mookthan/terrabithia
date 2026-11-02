// Signed-in home dashboard data: calendar events, announcements and the CAC org-chart slice.
import { ORGDATA } from '@/data/org';
import { media } from '@/lib/media';
import { PATHS } from '@/routes/paths';
import { BD_OPTOUT, BD_TEAM, BDIR, bdNick } from '@/features/birthday/data';
import { isMockHoliday, mockMonth } from './calendarMock';
import { ACT_IN, ACT_OUT, recurringMonth } from './calendarRecurring';
import { WORK } from './calendarRoles';
import { HR_NEWS } from '@/features/hr/data';
import { NEWS } from '@/features/news/data';

export const MONTHNAMES=['January','February','March','April','May','June','July','August','September','October','November','December'];
/** Events per day of October 2026 (hand-written; other months come from calendarMock). c = legend colour, album = culture album index (company activities). */
export const CAL_EVENTS={1:[{c:'#F5B2B2',t:'ประชุม STD MX Review: SA Design - ACL',time:'14:00 - 16:00'}],7:[{c:'#F5B2B2',t:'ประชุมทีมกราฟิก',time:'10:00 - 11:00'},{c:'#27AE97',t:'อบรม Figma Advanced',time:'13:00 - 16:00'}],8:[{c:'#F5B2B2',t:'ประชุมประจำสัปดาห์',time:'09:30 - 10:30'}],9:[{c:'#F5B2B2',t:'ประชุมกับลูกค้า',time:'15:00 - 16:00'},{c:'#7AAEFC',t:'ทำบุญบริษัทประจำปี',time:'08:00 - 10:00',album:4}],12:[{c:'#F5B2B2',t:'ประชุม Design Review',time:'11:00 - 12:00'},{c:'#27AE97',t:'อบรม Cyber Security Awareness',time:'14:00 - 16:00'}],13:[{c:'#FF565C',t:'วันนวมินทรมหาราช (วันหยุดราชการ)'}],14:[{c:'#FF565C',t:'ลาพักร้อน'}],16:[{c:'#27AE97',t:'อบรม UX Writing',time:'09:00 - 12:00'},{c:'#F5B2B2',t:'ประชุมโปรเจกต์ Terrabithia',time:'13:30 - 14:30'},{c:'#F5B2B2',t:'ประชุม Sprint Planning',time:'15:00 - 16:00'}],23:[{c:'#FF565C',t:'วันปิยมหาราช (วันหยุดราชการ)'}],26:[{c:'#FF565C',t:'ลาพักร้อน'}],27:[{c:'#FF565C',t:'ลาพักร้อน'}],29:[{c:'#F5B2B2',t:'ประชุม Townhall',time:'10:00 - 11:00'},{c:'#7AAEFC',t:'กิจกรรม Terrabit Family Day',time:'16:00 - 18:00'}]};
export const CAL_EVENT_MONTH = { m: 9, y: 2026 };
export const CAL_HOLIDAYS = [13, 23];
export const CAL_DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
/** [colour, label, group?]; rows sharing a group sit under one heading in the filter. */
export const CAL_LEGEND = [['#27AE97', 'อบรม'], ['#F5B2B2', 'ประชุม'], ['#FF565C', 'ลา / วันหยุดราชการ'], [ACT_IN, 'Internal (ในบริษัท)', 'act'], [ACT_OUT, 'External (นอกสถานที่)', 'act'], [WORK, 'งานของฉัน']];
export const CAL_GROUPS = { act: 'กิจกรรมบริษัท' };
/** Events on a day of a month (0-based month). */
const isEventMonth = (m, y) => m === CAL_EVENT_MONTH.m && y === CAL_EVENT_MONTH.y;
/** Birthdays of my team only (same list as the birthday box's "ทีมของฉัน"), on their real day every year. */
const teamBirthdays = (d, m) => BDIR
  .filter((e) => BD_TEAM.includes(e.id) && !BD_OPTOUT[e.id] && e.m - 1 === m && e.d === d)
  .map((e) => ({ c: '#7AAEFC', t: `วันเกิด${bdNick(e.id)}` }));
/** HR posts with event days (health check, photo shoot): company activity in the calendar, linking back to the post. */
const hrEvents = (d, m, y) => HR_NEWS
  .filter((n) => n.ev && n.ev.y === y && n.ev.m === m && n.ev.days.includes(d))
  .map((n) => ({ c: ACT_IN, t: n.t, time: n.ev.time, place: n.ev.place, hrPost: n.id }));
export const calEvents = (d, m, y) => [
  ...((isEventMonth(m, y) ? CAL_EVENTS[d] : mockMonth(y, m)[d]) || []),
  ...(recurringMonth(y, m, isCalHoliday)[d] || []),
  ...hrEvents(d, m, y),
  ...teamBirthdays(d, m),
];
/** Public holiday (shown in red like weekends). */
export const isCalHoliday = (d, m, y) => (isEventMonth(m, y) ? CAL_HOLIDAYS.includes(d) : isMockHoliday(d, m));

/**
 * Announcements card. `d` is the posting team (HR / Admin / PFM), `t` the posting time as written in Thai.
 * Optional `at` attachments: link, file, video or img (photo set); `jump` links to the page with the details.
 * One may be pinned to the top. `urgent` = sent as an urgent notice: while it runs (`liveUntil`) it shows only
 * as the red strip, the bell and LINE; afterwards it lands here with a ด่วน label (mook 2026-10-29).
 */
const endOfToday = new Date().setHours(23, 59, 0, 0);
/** Polls close 3 days from today at 18:00, so the mock stays open whenever the preview is opened. */
const pollEnd = new Date(new Date().setHours(18, 0, 0, 0) + 3 * 86400000).getTime();
export const HOME_ANN = [
  // HR posts that also go to this card; each links to the HR post and to its day in the calendar.
  ...HR_NEWS.filter((n) => n.ann).map((n) => ({
    id: n.id, d: 'HR', t: n.ann.t, x: n.ann.x, jump: { to: PATHS.hrPost(n.id), l: 'HR' },
    cal: n.ev && { y: n.ev.y, m: n.ev.m, d: n.ev.days[0] },
  })),
  // Lunch menu posts go to News (to look back on past menus) and here, with the calendar day (mook 2026-10-31).
  ...NEWS.map((n, i) => [n, i]).filter(([n]) => n.lunch).map(([n, i]) => ({
    id: `lunch-${i}`, d: 'Admin', t: n.annT, x: n.d, jump: { to: PATHS.newsDetail(i), l: 'ข่าวสาร' }, cal: { y: n.lunch.y, m: n.lunch.m, d: n.lunch.d },
  })),
  // Welcome posts for new staff and interns: green card only, not News; greet here (mook 2026-10-31; LINE button removed 2026-11-01).
  { id: 'welcome-tonnam', d: 'HR', t: '31 ต.ค 69, 11:09 น.', x: 'ฝ่าย HR ขอแนะนำนักศึกษาฝึกงานคนใหม่ ขอต้อนรับน้องต้นน้ำเข้าสู่ทีม และฝากทุกคนช่วยแนะนำ ให้คำปรึกษา และดูแลน้องในช่วงฝึกงานด้วยนะคะ 😊',
    welcome: { intern: true, nick: 'ต้นน้ำ', name: 'ณิชา ธารใส', pos: 'PFM Intern', dept: 'Performance Mgmt. Dept.', start: '31 ต.ค 69', photo: null } },
  { id: 'welcome-boss', d: 'HR', t: '27 ต.ค 69, 09:30 น.', x: 'ฝ่าย HR ขอแนะนำพนักงานใหม่ ยินดีต้อนรับพี่โบ๊ทเข้าสู่ครอบครัวเทอราบิท ฝากทุกคนช่วยต้อนรับด้วยนะคะ 🎉',
    welcome: { nick: 'โบ๊ท', name: 'ภาคิน ศรีสุข', pos: 'System Engineer', dept: 'System Engineer Dept.', start: '27 ต.ค 69', photo: media('d333026643.jpg') } },
  // Condolence notice: the full post (reactions and comments) lives in News (mook 2026-10-30).
  { d: 'HR', t: '29 ต.ค 69, 16:00 น.', x: 'ขอแสดงความเสียใจกับพี่อ้อม ศิริพร วงศ์ใหญ่ Chief, PMD และครอบครัว ในการสูญเสียคุณพ่อ ร่วมแสดงความไว้อาลัยได้ที่ประกาศในหน้าข่าวสาร', jump: { to: PATHS.newsDetail(20), l: 'ข่าวสาร' } },
  { d: 'Admin', t: '29 ต.ค 69, 13:35 น.', urgent: true, liveUntil: endOfToday, x: 'อัปเดต: ขณะนี้ห้องน้ำชายชั้น G สามารถกลับมาใช้งานได้แล้วค่ะ ยกเว้นห้องแรก ยังงดใช้ชั่วคราว เนื่องจากช่างใช้ซิลิโคนยึดสุขภัณฑ์และทำการยาแนวใหม่ จึงต้องรอให้วัสดุแห้งประมาณ 6 ชั่วโมงหลังซ่อมเสร็จ ขออภัยในความไม่สะดวกและขอบคุณสำหรับความร่วมมือค่ะ' },
  { d: 'Admin', t: '29 ต.ค 69, 11:50 น.', urgent: true, liveUntil: endOfToday, x: 'แจ้งงดใช้ห้องน้ำชายชั้น G ชั่วคราว ขอความร่วมมืองดใช้ห้องน้ำชายชั้น G วันนี้ เวลา 12.30–13.30 น. เนื่องจากช่างดำเนินการซ่อมชักโครกค่ะ ขออภัยในความไม่สะดวกค่ะ' },
  { d: 'Admin', t: '29 ต.ค 69, 08:45 น.', x: 'ชวนโหวตเมนู A la carte สำหรับงานเลี้ยงบุฟเฟต์ที่ Copper Beyond Buffet เลือกได้คนละ 1 เมนูค่ะ', poll: {
    id: 'copper-2569', by: 'Admin', end: pollEnd,
    q: 'เลือก 1 เมนู A la carte สำหรับทานร่วมกับบุฟเฟต์ที่ Copper Beyond Buffet',
    opts: [
      { id: 'lamb', l: 'ซี่โครงแกะนิวซีแลนด์ลูมิน่า', img: media('poll-lamb.jpg'), n: 28 },
      { id: 'fish', l: 'ปลาหิมะย่างซอสยูซุทรัฟเฟิล', img: media('poll-fish.jpg'), n: 19 },
    ],
  } },
  { d: 'PFM', t: '13 ต.ค 69, 10:30 น.', x: 'เปิดแบบประเมินผลงานรอบกลางปี 2569 แล้ว ขอให้พนักงานทุกท่านกรอกแบบประเมินตนเองภายในวันที่ 24 ตุลาคม 2569 ดูรายละเอียดและคู่มือได้ที่ลิงก์ด้านล่าง', at: [{ k: 'link', t: 'แบบประเมินผลงานรอบกลางปี 2569', u: 'https://example.com/pfm/mid-year-2569', h: 'example.com', dsc: 'กรอกแบบประเมินตนเอง พร้อมคู่มือการให้คะแนน' }], jump: { to: PATHS.rules, l: 'กฎระเบียบ' } },
  { d: 'HR', t: '10 ต.ค 69, 14:00 น.', x: 'สรุปสิทธิประโยชน์ประกันสุขภาพกลุ่มประจำปี 2570 แนบไฟล์ให้ดาวน์โหลดด้านล่างค่ะ', at: [{ k: 'file', n: 'สิทธิประโยชน์ประกันสุขภาพ_2570.pdf', s: '1.2 MB', x: 'PDF' }], jump: { to: PATHS.hr, l: 'HR' } },
  { d: 'Admin', t: '3 ต.ค 69, 10:00 น.', x: 'ผลโหวตชื่อทีมสีงาน Terrabit Sports Day ออกแล้ว ขอบคุณทุกคนที่ร่วมโหวตนะคะ', poll: {
    id: 'sports-team-2569', by: 'Admin', end: new Date(2026, 9, 6, 18).getTime(),
    q: 'ตั้งชื่อทีมสีเขียวงาน Sports Day ปีนี้ว่าอะไรดี',
    opts: [
      { id: 'terra', l: 'Terra Rangers', n: 64 },
      { id: 'leaf', l: 'Green Leaf', n: 41 },
      { id: 'mint', l: 'Minty Fresh', n: 23 },
    ],
  } },
  { d: 'Admin', t: '8 ต.ค 69, 11:20 น.', x: 'ภาพบรรยากาศงาน Terrabit Sports Day ที่ผ่านมา ขอบคุณทุกท่านที่ร่วมสนุกกันนะคะ', at: [{ k: 'img', n: [media('10d9158d2b.jpg'), media('0bceae6c21.jpg'), media('77f086f50c.jpg'), media('4f252e55a5.jpg'), media('10d9158d2b.jpg')] }], jump: { to: PATHS.cultureActivity, l: 'Our Activity' } },
  { d: 'HR', t: '2 ต.ค 69, 16:40 น.', x: 'วิดีโอแนะนำการใช้งานแอป EzyHR ลงเวลาและยื่นใบลาผ่านมือถือ ดูตามขั้นตอนได้เลยค่ะ', at: [{ k: 'video', t: 'วิธีใช้ EzyHR ลงเวลา & ขอลา', len: '2:45' }], jump: { to: PATHS.knowledge, l: 'คลังความรู้' } },
  { d: 'HR', t: '1 ต.ค 69, 09:10 น.', x: 'ขณะนี้แอปพลิเคชัน EzyHR สำหรับระบบ Android ยังพบปัญหาแอปพลิเคชันปิดตัวเอง (App Crash) ส่งผลให้ผู้ใช้งานบางรายไม่สามารถเข้าใช้งานแอปพลิเคชันได้ หากมีความคืบหน้าหรือสามารถกลับมาใช้งานได้ตามปกติ ฝ่ายทรัพยากรบุคคลจะแจ้งให้ทราบอีกครั้ง', pin: true, jump: { to: PATHS.download, l: 'ดาวน์โหลด' } },
  { d: 'Admin', t: '1 ต.ค 69, 12:00 น.', urgent: true, x: 'ปั้งป๊อง ขณะนี้อาหารกลางวันพร้อมเสิร์ฟความอร่อยแล้วค่ะ เชิญพี่ๆเพื่อนๆ ชาวเทอราเบี้ยน ทุกท่านที่ห้อง terrabistro ได้เลยค่ะ' },
  { d: 'Admin', t: '25 ก.ย 69, 15:51 น.', x: 'แจ้งประชาสัมพันธ์ แม่บ้านจะดำเนินการทำความสะอาดตู้เย็น ในวันเสาร์ที่ 26 กันยายน 2569 ขอความร่วมมือพนักงานทุกท่าน ติดชื่อบนอาหารที่ต้องการเก็บไว้' },
];

/* ===== CAC team org chart ===== */
/** People expanded by default ("my team"). */
export const MY_TEAM = ['mook', 'gong', 'aut'];
/** The department the signed-in user belongs to (badge in the filter). */
export const MY_DEPT = 'cac-4';
export const CAC_COLOR = '#27AE97';

/** The CAC branch of the company org chart under a "CAC" header node (fresh copy each call). */
export function buildCacOrgData() {
  const ids = new Set(['cac']);
  let changed = true;
  while (changed) {
    changed = false;
    ORGDATA.forEach((d) => { if (!ids.has(d.id) && ids.has(d.parentId)) { ids.add(d.id); changed = true; } });
  }
  const out = [{ id: 'cac-hdr', parentId: null, label: 'CAC', color: CAC_COLOR }];
  ORGDATA.forEach((d) => {
    if (!ids.has(d.id)) return;
    const o = { ...d, parentId: d.id === 'cac' ? 'cac-hdr' : d.parentId };
    if (MY_TEAM.includes(d.id)) o._expanded = true;
    out.push(o);
  });
  return out;
}

export const orgKids = (id) => ORGDATA.filter((d) => d.parentId === id);
export function orgDescIds(id) {
  const out = [id];
  orgKids(id).forEach((k) => out.push(...orgDescIds(k.id)));
  return out;
}
export const orgNode = (id) => ORGDATA.find((d) => d.id === id);

/**
 * "วันนี้ในอดีต" (on this day) memories for the Today card, like Instagram's: company activity albums
 * from this day and month in earlier years. `ago` = years back, `album` = index into culture ACTIVITIES.
 * Prototype: these are always dated today so the demo shows; the real system matches album dates by day and month,
 * and the card hides the memory when nothing matches.
 */
export const MEMORIES = [
  { ago: 1, album: 0 },
  { ago: 2, album: 5 },
  { ago: 3, album: 4 },
];
