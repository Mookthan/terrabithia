// Occasions people can send a card for from the home "ส่งการ์ด" box. Birthday is the original feature;
// festivals work the same way (a private book per person, sealed until the day).
import { BD_COVERS } from './covers';
import { BD_QUICK, BD_STK, BDIR, ME_ID } from './data';

/**
 * k = id used in book ids (`${k}:${personId}`; birthday books keep the bare person id),
 * tab = tab label, label = what the day is called in sentences, due/dateTxt = the day (festivals only),
 * covers = cover keys for the picker, quick = quick messages, stickers = sticker keys,
 * reveal = when the recipient sees the card, party = confetti when the book opens.
 */
export const OCCASIONS = [
  {
    k: 'birthday', tab: 'วันเกิด', label: 'วันเกิด', covers: BD_COVERS.map((c) => c.k), quick: BD_QUICK, stickers: BD_STK,
    reveal: 'เมื่อถึงเช้าวันเกิด', party: true,
  },
  {
    k: 'newyear', tab: 'ปีใหม่', label: 'ปีใหม่', due: [2027, 0, 1], dateTxt: '1 ม.ค. 2570', covers: ['ny-night', 'ny-cream', 'ny-mint'],
    quick: ['สวัสดีปีใหม่ ขอให้ปีนี้มีแต่เรื่องดีๆ', 'ขอให้สุขภาพแข็งแรง งานราบรื่นตลอดปี', 'ขอบคุณสำหรับปีที่ผ่านมา ปีหน้าลุยกันต่อนะ'],
    stickers: ['party-popper', 'sparkles', 'star', 'gift', 'balloon', 'clover', 'heart', 'terby'],
    reveal: 'เมื่อถึงวันที่ 1 ม.ค. 2570', party: true,
  },
  {
    k: 'cny', tab: 'ตรุษจีน', label: 'ตรุษจีน', due: [2027, 1, 6], dateTxt: '6 ก.พ. 2570', covers: ['cny-red', 'cny-gold', 'cny-peach'],
    quick: ['ซินเจียยู่อี่ ซินนี้ฮวดไช้', 'ขอให้ร่ำรวย เฮงๆ ปังๆ ตลอดปี', 'ขอให้สุขภาพแข็งแรง ค้าขายร่ำรวย'],
    stickers: ['sparkles', 'star', 'flower-2', 'clover', 'gift', 'heart', 'terby'],
    reveal: 'เมื่อถึงวันที่ 6 ก.พ. 2570', party: true,
  },
  {
    k: 'valentine', tab: 'วาเลนไทน์', label: 'วาเลนไทน์', due: [2027, 1, 14], dateTxt: '14 ก.พ. 2570', covers: ['vd-pink', 'vd-red', 'vd-cream'],
    quick: ['ขอบคุณที่เป็นเพื่อนร่วมงานที่น่ารักเสมอ', 'Happy Valentine\'s Day! ขอให้มีความสุขมากๆ', 'ขอบคุณที่คอยช่วยเหลือกันตลอดนะ'],
    stickers: ['heart', 'flower-2', 'ribbon', 'sparkles', 'gift', 'star', 'terby'],
    reveal: 'เมื่อถึงวันที่ 14 ก.พ. 2570', party: true,
  },
];

export const occOf = (k) => OCCASIONS.find((o) => o.k === (k || 'birthday')) || OCCASIONS[0];
/** Festivals open for cards from one month before the day until the day itself. */
export const FESTIVALS = OCCASIONS.filter((o) => o.due);
const opensOn = (o) => new Date(o.due[0], o.due[1] - 1, o.due[2]);
const dayOf = (o) => new Date(o.due[0], o.due[1], o.due[2]);
export const festivalOpen = (o, now = new Date()) => {
  const t = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return t >= opensOn(o) && t <= dayOf(o);
};
/** The next festival that is not open yet, with the day sending opens (for the empty state). */
export function nextFestival(now = new Date()) {
  const o = FESTIVALS.filter((f) => opensOn(f) > now).sort((a, b) => opensOn(a) - opensOn(b))[0];
  return o && { o, opens: opensOn(o) };
}
/**
 * Top tabs of the home card box: birthdays always; festivals grouped under one tab
 * (sub-tabs for the festivals in season). Condolences are news posts, not cards (mook 2026-10-30).
 */
export const topTabs = () => [
  { k: 'birthday', tab: 'วันเกิด' },
  { k: 'festival', tab: 'เทศกาล' },
];
/** Book id for a person's book on an occasion. */
export const occBookId = (k, personId) => (k === 'birthday' ? personId : `${k}:${personId}`);

/**
 * Designed covers for the non-birthday occasions, drawn with CSS (no image):
 * bg = background, fg = text colour, ic = Lucide icon key, title / sub = text, ff = title font.
 */
export const OCC_COVERS = {
  'ny-night': { n: 'ค่ำคืนสีทอง', bg: 'radial-gradient(circle at 50% 30%,#2B5279,#1C3A5C 60%,#10243B)', fg: '#F2C76B', ic: 'sparkles', title: 'Happy New Year', sub: '2027', ff: 'DM Serif Display' },
  'ny-cream': { n: 'ครีมปาร์ตี้', bg: 'linear-gradient(160deg,#FFF6E3,#FFE5D2)', fg: '#C94B4B', ic: 'party-popper', title: 'สวัสดีปีใหม่', sub: '2570', ff: 'Mali' },
  'ny-mint': { n: 'มินต์สดใส', bg: 'linear-gradient(160deg,#D8F3E8,#B9E6D6)', fg: '#12986F', ic: 'star', title: 'Happy 2027', sub: 'NEW YEAR', ff: 'Montserrat' },
  'cny-red': { n: 'แดงมงคล', bg: 'radial-gradient(circle at 50% 35%,#E0353F,#B5121B 70%)', fg: '#FFD36B', ic: 'sparkles', title: 'ซินเจียยู่อี่', sub: 'HAPPY CHINESE NEW YEAR', ff: 'Mali' },
  'cny-gold': { n: 'ทองอร่าม', bg: 'linear-gradient(160deg,#FFE7A3,#F2C14E)', fg: '#B5121B', ic: 'clover', title: 'ซินนี้ฮวดไช้', sub: 'ขอให้ร่ำรวย เฮงๆ', ff: 'Mali' },
  'cny-peach': { n: 'ดอกท้อ', bg: 'linear-gradient(160deg,#FFE3EA,#FFC2D1)', fg: '#B5121B', ic: 'flower-2', title: 'ตรุษจีน', sub: 'HAPPY LUNAR NEW YEAR', ff: 'DM Serif Display' },
  'vd-pink': { n: 'ชมพูหวาน', bg: 'linear-gradient(160deg,#FFE3EA,#FFB8C9)', fg: '#C2456B', ic: 'heart', title: 'Happy Valentine\'s', sub: '14 FEB', ff: 'Allura' },
  'vd-red': { n: 'แดงหัวใจ', bg: 'radial-gradient(circle at 50% 35%,#E8557A,#C2456B 70%)', fg: '#FFF6E3', ic: 'heart', title: 'With Love', sub: 'VALENTINE\'S DAY', ff: 'Allura' },
  'vd-cream': { n: 'ครีมดอกไม้', bg: 'linear-gradient(160deg,#FFF6E3,#F7E3D6)', fg: '#C2456B', ic: 'flower-2', title: 'ขอบคุณที่น่ารักเสมอ', sub: 'HAPPY VALENTINE\'S DAY', ff: 'Mali' },
};

/** Sample cards already waiting in a few books, so the tabs are not empty in the prototype. */
const SEED = {
  'newyear:mook': [
    { id: 'y1', by: 'gong', cover: 'ny-night', paper: 'sky', msg: 'สวัสดีปีใหม่นะมุก ปีหน้าลุยงานกันต่อ!', stk: [{ e: 'sparkles', x: 82, y: 22, s: 1, r: 12 }], date: 'วันนี้' },
    { id: 'y2', by: 'aut', cover: 'ny-cream', paper: 'cream', msg: 'ขอให้ปีนี้มีแต่เรื่องดีๆ สุขภาพแข็งแรงนะ', stk: [], date: 'เมื่อวาน' },
  ],
  'newyear:gong': [{ id: 'y3', by: 'cac', cover: 'ny-mint', paper: 'mint', msg: 'สวัสดีปีใหม่ ขอบคุณที่ช่วยกันมาทั้งปี', stk: [], date: 'เมื่อวาน' }],
  'valentine:mook': [{ id: 'v1', by: 'ccm', cover: 'vd-pink', paper: 'pink', msg: 'ขอบคุณที่เป็นเพื่อนร่วมงานที่น่ารักเสมอ', stk: [{ e: 'heart', x: 80, y: 76, s: 1.1, r: -10 }], date: 'วันนี้' }],
};

/**
 * Books for every festival (one per person in the directory, mine sealed until the day) Birthday books come from createBooks().
 */
export function createOccasionBooks() {
  const books = {};
  OCCASIONS.filter((o) => o.due).forEach((o) => {
    BDIR.forEach(({ id }) => {
      const key = occBookId(o.k, id);
      books[key] = { owner: id, occ: o.k, dateTxt: o.dateTxt, due: [...o.due], locked: id === ME_ID, cards: [] };
    });
  });
  Object.entries(SEED).forEach(([k, cards]) => { if (books[k]) books[k].cards = cards.map((c) => ({ ...c, stk: c.stk.map((s) => ({ ...s })) })); });
  return books;
}
