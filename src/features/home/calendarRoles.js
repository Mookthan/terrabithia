// "งานของฉัน" calendar layer: work dates that depend on the person's job (mook 2026-10-30).
// Sales see contract / kick-off / go-live dates, housekeepers their building rota, shift teams
// their shift. Mock data; the real layer comes from CRM / HR rota / the shift table.
export const WORK = '#1C3A5C';

/** Job views a person can have; office staff have no extra layer. */
export const ROLE_VIEWS = [
  { k: 'office', t: 'พนักงานออฟฟิศ (ของฉัน)' },
  { k: 'sale', t: 'Sale' },
  { k: 'maid', t: 'แม่บ้าน' },
  { k: 'shift', t: 'Call center / IT (กะ)' },
];

const SALE_DEALS = [
  ['เซ็นสัญญา', 'บริษัท ประกันภัย ABC', '10:00 - 11:30'],
  ['Kick-off', 'ธนาคาร XYZ · โครงการ Maxar Ruamitr', '13:30 - 15:00'],
  ['ลูกค้า Go-live', 'บริษัท ลีสซิ่ง DEF · Maxar JongQ', '09:00 - 18:00'],
  ['เซ็นสัญญา', 'บริษัท ประกันชีวิต GHI', '14:00 - 15:00'],
  ['Kick-off', 'บริษัท ประกันภัย ABC · Contact Center', '10:00 - 12:00'],
];
const BUILDINGS = ['อาคารอรกานต์', 'ตึกเสริมมิตร อโศก'];
/** Shift rota repeating every 7 days. */
const SHIFTS = [
  ['กะเช้า', '07:00 - 16:00'], ['กะเช้า', '07:00 - 16:00'], ['กะบ่าย', '12:00 - 21:00'],
  ['กะบ่าย', '12:00 - 21:00'], ['กะดึก', '21:00 - 07:00'], ['หยุดตามกะ', ''], ['หยุดตามกะ', ''],
];
const DAY = 864e5;
const ANCHOR = Date.UTC(2026, 0, 5); // a Monday

const cache = {};

/** { day: [event] } of the work layer for one job view and month. */
export function roleMonth(role, y, m, isHoliday) {
  const key = `${role}-${y}-${m}`;
  if (cache[key]) return cache[key];
  const ev = {};
  const add = (d, e) => { (ev[d] ||= []).push({ c: WORK, ...e }); };
  const days = new Date(y, m + 1, 0).getDate();
  const workday = (d) => { const w = new Date(y, m, d).getDay(); return w > 0 && w < 6 && !isHoliday(d, m, y); };
  const dayNo = (d) => Math.round((Date.UTC(y, m, d) - ANCHOR) / DAY);

  if (role === 'sale') {
    const picks = [6, 13, 20, 27].map((d) => { let x = d; while (x <= days && !workday(x)) x++; return x; }).filter((x) => x <= days);
    picks.slice(0, 3).forEach((d, i) => {
      const [tag, who, time] = SALE_DEALS[(y * 12 + m + i) % SALE_DEALS.length];
      add(d, { t: who, tag, time });
    });
  } else if (role === 'maid') {
    for (let d = 1; d <= days; d++) {
      if (!workday(d)) continue;
      const week = Math.floor(dayNo(d) / 7);
      add(d, { t: 'ทำความสะอาดประจำอาคาร', time: '08:00 - 17:00', place: BUILDINGS[((week % 2) + 2) % 2], tag: 'สลับอาคารรายสัปดาห์' });
    }
  } else if (role === 'shift') {
    for (let d = 1; d <= days; d++) {
      const [t, time] = SHIFTS[((dayNo(d) % 7) + 7) % 7];
      add(d, { t, time, tag: 'กะของฉัน', off: !time });
    }
  }
  cache[key] = ev;
  return ev;
}
