// Company activities that repeat on a fixed rule (mook 2026-10-30). Internal = in the office,
// External = off-site. Real schedules will come from the backend.
import { NEWS, lunchPostIndex } from '@/features/news/data';

export const ACT_IN = '#7AAEFC';
export const ACT_OUT = '#B48CEB';

/** Lunch menus, rotated one per lunch. */
const LUNCH_MENUS = [
  'ข้าวมันไก่ · ซุปฟัก · ผลไม้รวม',
  'ข้าวกะเพราหมูกรอบ ไข่ดาว · ต้มจืดเต้าหู้ · บัวลอย',
  'ก๋วยเตี๋ยวเรือ · หมูสะเต๊ะ · ชาเย็น',
  'ข้าวหมกไก่ · สลัดแขก · ทับทิมกรอบ',
  'ส้มตำ · ไก่ย่าง · ข้าวเหนียว · ลาบหมู',
  'สุกี้น้ำ · ขนมจีบ · ไอศกรีมกะทิ',
];
/** Company lunch is every other Monday counted from this Monday (in step with the real 2 Nov 2026 lunch). */
const LUNCH_ANCHOR = Date.UTC(2026, 0, 12);
const WEEK = 7 * 864e5;

/** Off-site company outings: [year, month (0-based), day, title, time, place]. */
const OUTINGS = [
  [2026, 11, 18, 'เลี้ยงบุฟเฟต์ Copper Beyond Buffet', '18:00 - 21:00', 'Copper Beyond Buffet สาขาชิดลม'],
];

const utc = (y, m, d) => Date.UTC(y, m, d);
const dow = (y, m, d) => new Date(y, m, d).getDay();

/** Day of the month the lunch lands on for the week starting Monday `d`: Tuesday when Monday is a holiday. */
function lunchDays(y, m, isHoliday) {
  const out = [];
  const days = new Date(y, m + 1, 0).getDate();
  for (let d = 1; d <= days; d++) {
    if (dow(y, m, d) !== 1) continue;
    const weeks = Math.round((utc(y, m, d) - LUNCH_ANCHOR) / WEEK);
    if (weeks % 2 !== 0) continue;
    const moved = isHoliday(d, m, y);
    out.push({ d: moved ? d + 1 : d, moved, n: Math.abs(weeks / 2) });
  }
  return out.filter((x) => x.d <= days);
}

/** Last Friday of the month that isn't a holiday. */
function gameDay(y, m, isHoliday) {
  let d = new Date(y, m + 1, 0).getDate();
  while (dow(y, m, d) !== 5 || isHoliday(d, m, y)) d--;
  return d;
}

const cache = {};

/** { day: [event] } of repeating company activities for one month. */
export function recurringMonth(y, m, isHoliday) {
  const key = `${y}-${m}`;
  if (cache[key]) return cache[key];
  const ev = {};
  const add = (d, e) => { (ev[d] ||= []).push(e); };
  lunchDays(y, m, isHoliday).forEach(({ d, moved, n }) => {
    // A posted menu (News) wins over the mock rotation and links to the post.
    const post = lunchPostIndex(y, m, d);
    add(d, {
      c: ACT_IN,
      t: 'เลี้ยงข้าวกลางวันบริษัท',
      time: '12:00 - 13:00',
      menu: post >= 0 ? NEWS[post].lunch.menu : LUNCH_MENUS[n % LUNCH_MENUS.length],
      note: moved ? 'เลื่อนจากวันจันทร์ที่เป็นวันหยุด' : '',
      news: post >= 0 ? post : undefined,
    });
  });
  add(gameDay(y, m, isHoliday), { c: ACT_IN, t: 'กิจกรรมเล่นเกมประจำเดือน', time: '17:30 - 18:00' });
  OUTINGS.filter(([oy, om]) => oy === y && om === m)
    .forEach(([, , d, t, time, place]) => add(d, { c: ACT_OUT, t, time, place }));
  cache[key] = ev;
  return ev;
}
