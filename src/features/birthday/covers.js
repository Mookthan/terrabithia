// Designed card covers. Each cover is an image plus text slots that are filled per recipient
// (their nickname and birthday), so the same cover reads "MOOK · 20 NOV" for one person and "GONG · 10 OCT" for another.
import { media } from '@/lib/media';

/**
 * `it` = text slots: r 'name' | 'date', x/y = centre in % of the cover, fs = font size in cqw,
 * c = colour, ff = font family (loaded in index.html), fw = weight, ls = letter-spacing (em), rot = degrees,
 * mw = max width in % (longer text shrinks to fit), up = uppercase, f = date format, t = template ('{n}' = nickname).
 * `leg` marks the original floral cover, which has its own fixed layout.
 */
export const BD_COVERS = [
  { k: 'floral', n: 'ดอกไม้ม่วง', leg: 1 },
  { k: 'cup', n: 'คัพเค้กพาสเทล', it: [{ r: 'name', x: 52.3, y: 67.59, fs: 8.3, c: '#D64B4B', ff: 'Josefin Sans', fw: 400, ls: 0.14, rot: 0, mw: 34, up: 1 }, { r: 'date', x: 84.8, y: 30.08, fs: 5.2, c: '#D64B4B', ff: 'Josefin Sans', fw: 600, ls: 0.1, rot: 25, mw: 17, up: 1, f: 'D MON' }] },
  { k: 'water', n: 'ฟ้าวอเตอร์คัลเลอร์', it: [{ r: 'name', x: 51.0, y: 53.53, fs: 18, c: '#2F7DF0', ff: 'Allura', fw: 400, ls: 0, rot: -4, mw: 30 }, { r: 'date', x: 50.8, y: 77.14, fs: 3.6, c: '#2F7DF0', ff: 'Montserrat', fw: 500, ls: 0.18, rot: 0, mw: 22, up: 1, f: 'D MONTH' }] },
  { k: 'sun', n: 'ทานตะวัน', it: [{ r: 'name', x: 53.3, y: 71.2, fs: 20, c: '#2F4A2B', ff: 'DM Serif Display', fw: 400, ls: 0, rot: 0, mw: 50, up: 1 }, { r: 'date', x: 54.0, y: 18.8, fs: 3.6, c: '#2F4A2B', ff: 'Montserrat', fw: 500, ls: 0.06, rot: 0, mw: 22, up: 1, f: 'DD | MON' }] },
  { k: 'daisy', n: 'เดซี่เขียว', it: [{ r: 'name', x: 75.5, y: 59.4, fs: 19, c: '#2F4A2B', ff: 'DM Serif Display', fw: 400, ls: 0, rot: 10, mw: 30, up: 1 }, { r: 'date', x: 29.5, y: 19.7, fs: 4.2, c: '#2F4A2B', ff: 'Montserrat', fw: 800, ls: 0.04, rot: -17, mw: 20, up: 1, f: 'DD | MON' }] },
  { k: 'garden', n: 'สวนลูกโป่ง', it: [{ r: 'date', x: 50.8, y: 26.69, fs: 11, c: '#5B8F3E', ff: 'Gaegu', fw: 700, ls: 0, rot: 0, mw: 26, f: 'DD/MM' }, { r: 'name', x: 50.5, y: 45.64, fs: 13.5, c: '#6A87D6', ff: 'Gaegu', fw: 700, ls: 0, rot: 0, mw: 38, up: 1 }] },
  { k: 'arch', n: 'คัพเค้กส้มอุ่น', it: [{ r: 'name', x: 51.2, y: 75.94, fs: 6.4, c: '#C94B4B', ff: 'Josefin Sans', fw: 400, ls: 0.16, rot: 0, mw: 40, up: 1 }, { r: 'date', x: 51.2, y: 85.71, fs: 6.2, c: '#C94B4B', ff: 'Josefin Sans', fw: 400, ls: 0.14, rot: 0, mw: 32, up: 1, f: 'D MONTH' }] },
  { k: 'geo', n: 'เรขาคณิตฟ้า', it: [{ r: 'date', x: 18.5, y: 91.5, fs: 24, c: '#6495D6', ff: 'Montserrat', fw: 800, ls: 0, rot: 0, mw: 24, f: 'D' }, { r: 'date', x: 45.0, y: 87.44, fs: 9.5, c: '#6495D6', ff: 'Montserrat', fw: 800, ls: 0, rot: 0, mw: 14, up: 1, f: 'MON' }, { r: 'name', x: 47.0, y: 64.66, fs: 11, c: '#E0693A', ff: 'Montserrat', fw: 800, ls: 0.02, rot: 0, mw: 62, up: 1 }] },
  { k: 'hbd', n: 'แดงสดใส', it: [{ r: 'date', x: 33.5, y: 11.88, fs: 4.8, c: '#FDF3E0', ff: 'Poppins', fw: 500, ls: 0.12, rot: -20, mw: 17, up: 1, f: 'D MON' }, { r: 'name', x: 69.8, y: 40.98, fs: 4.4, c: '#FDF3E0', ff: 'Poppins', fw: 500, ls: 0.12, rot: 25, mw: 26, up: 1, t: '{n}\'S DAY' }] },
];

export const coverImg = (k) => media(`birthday/cover-${k}.webp`);

const EN_MON3 = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const EN_MONTH = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

/** Format a [y, m0, d] birthday with tokens MONTH, MON, DD, MM, D. */
export function coverDate(f, due) {
  const p = (n) => String(n).padStart(2, '0');
  return f.replace(/MONTH|MON|DD|MM|D/g, (t) => ({ MONTH: EN_MONTH[due[1]], MON: EN_MON3[due[1]], DD: p(due[2]), MM: p(due[1] + 1), D: due[2] })[t]);
}
export const shortDate = (due) => `${due[2]} ${EN_MON3[due[1]]}`;
