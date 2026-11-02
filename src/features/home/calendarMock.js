// Mock events for months other than the hand-written October 2026, so every month of the
// prototype calendar has something to show. Real data will come from the backend.
import { ACTIVITIES as ALBUMS } from '@/features/culture/data';

const TRAIN = '#27AE97', MEET = '#F5B2B2', OFF = '#FF565C', FUN = '#7AAEFC';

/** Thai public holidays with a fixed date: [month (0-based), day, name]. */
const HOLIDAYS = [
  [0, 1, 'วันขึ้นปีใหม่'], [3, 6, 'วันจักรี'], [3, 13, 'วันสงกรานต์'], [3, 14, 'วันสงกรานต์'], [3, 15, 'วันสงกรานต์'],
  [4, 1, 'วันแรงงานแห่งชาติ'], [4, 4, 'วันฉัตรมงคล'], [5, 3, 'วันเฉลิมพระชนมพรรษาพระราชินี'],
  [6, 28, 'วันเฉลิมพระชนมพรรษา ร.10'], [7, 12, 'วันแม่แห่งชาติ'], [9, 13, 'วันนวมินทรมหาราช'], [9, 23, 'วันปิยมหาราช'],
  [11, 5, 'วันพ่อแห่งชาติ'], [11, 7, 'วันหยุดชดเชยวันพ่อแห่งชาติ'], [11, 10, 'วันรัฐธรรมนูญ'], [11, 31, 'วันสิ้นปี'],
];

const MEETINGS = ['ประชุม Design Review', 'ประชุมกับลูกค้า', 'ประชุม Sprint Planning', 'ประชุมทีมกราฟิก', 'ประชุมโปรเจกต์ Terrabithia', 'ประชุม Townhall', 'ประชุมสรุปผลงานประจำเดือน'];
const TRAININGS = ['อบรม Figma Advanced', 'อบรม Cyber Security Awareness', 'อบรม UX Writing', 'อบรม Excel for Work', 'อบรมการนำเสนองาน', 'อบรม Data Privacy (PDPA)'];
const TIMES = ['09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '13:30 - 14:30', '14:00 - 16:00', '15:00 - 16:00'];

/** Small deterministic random (same month = same events on every visit). */
function rng(seed) {
  let s = seed;
  return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
}

const holidayName = (d, m) => HOLIDAYS.find(([hm, hd]) => hm === m && hd === d)?.[2];
export const isMockHoliday = (d, m) => Boolean(holidayName(d, m));

const cache = {};

/** Events per day for one month: { day: [{ c, t, time? }] }. */
export function mockMonth(y, m) {
  const key = `${y}-${m}`;
  if (cache[key]) return cache[key];
  const r = rng(y * 12 + m + 7);
  const pick = (list) => list[Math.floor(r() * list.length)];
  const days = new Date(y, m + 1, 0).getDate();
  const work = [];
  const ev = {};
  const add = (d, e) => { (ev[d] ||= []).push(e); };

  for (let d = 1; d <= days; d++) {
    const name = holidayName(d, m);
    if (name) add(d, { c: OFF, t: `${name} (วันหยุดราชการ)` });
    const dow = new Date(y, m, d).getDay();
    if (dow === 0 || dow === 6 || name) continue;
    work.push(d);
    if (dow === 1) add(d, { c: MEET, t: 'ประชุมประจำสัปดาห์', time: '09:30 - 10:30' });
  }
  const someDay = () => work[Math.floor(r() * work.length)];
  for (let i = 0; i < 3; i++) add(someDay(), { c: MEET, t: pick(MEETINGS), time: pick(TIMES) });
  for (let i = 0; i < 2; i++) add(someDay(), { c: TRAIN, t: pick(TRAININGS), time: pick(TIMES) });
  // Company activity = one of the culture albums (album = its index), so past ones can link to the photos.
  const album = Math.floor(r() * ALBUMS.length);
  add(someDay(), { c: FUN, t: ALBUMS[album].t, time: '16:00 - 18:00', album });
  const leave = someDay();
  add(leave, { c: OFF, t: 'ลาพักร้อน' });
  if (r() > 0.5 && work.includes(leave + 1)) add(leave + 1, { c: OFF, t: 'ลาพักร้อน' });

  cache[key] = ev;
  return ev;
}
