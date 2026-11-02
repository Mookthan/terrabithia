// Static data for the birthday feature: each person's birthday book and the cards friends send into it.
import { ORG_PEOPLE } from '@/data/org';
import { media } from '@/lib/media';

/** The signed-in user (the prototype hard-codes "mook" everywhere in this feature). */
export const ME_ID = 'mook';
export const ME_NICK = 'มุก';

/** Old emoji sticker codes → icon keys. */
const EMO2KEY = { '🎈': 'balloon', '✨': 'sparkles', '🎀': 'ribbon', '🌸': 'flower-2', '🦋': 'bird', '🌿': 'leaf', '🍀': 'clover', '🎁': 'gift', '🎉': 'party-popper', '⭐': 'star', '💖': 'heart', '🌈': 'rainbow', '🍰': 'cake-slice', '☕': 'coffee', '🧋': 'cup-soda', '🎂': 'cake' };
export const stickerKey = (k) => EMO2KEY[k] || k;

/** Sticker colour per icon key. */
export const STKCOL = { star: '#F2B01E', heart: '#E8557A', rainbow: '#5B8DEF', balloon: '#E8557A', ribbon: '#C2456B', 'flower-2': '#E87FA8', 'cake-slice': '#D98B5F', 'party-popper': '#E8A317', sparkles: '#F2B01E', bird: '#3AA7C9', clover: '#3FA66A', gift: '#27AE97', leaf: '#3FA66A', coffee: '#8A5A3C', 'cup-soda': '#C98A4B', cake: '#C2456B' };

export const BD_THEMES = [
  { n: 'เค้ก', e: 'cake', b1: '#FFE3EA', b2: '#FFC2D1', ac: '#C2456B' },
  { n: 'ดอกไม้', e: 'flower-2', b1: '#E6F4EA', b2: '#BFE3CE', ac: '#2E8B63' },
  { n: 'ลูกโป่ง', e: 'balloon', b1: '#E3EEFF', b2: '#BCD4FF', ac: '#3563C9' },
  { n: 'ปาร์ตี้', e: 'party-popper', b1: '#FFF1CC', b2: '#FFD98A', ac: '#B8731A' },
  { n: 'มินิมอล', e: 'leaf', b1: '#F3EFE4', b2: '#DDE9D4', ac: '#27AE97' },
];
/** Picture stickers (the Terby mascot); every other sticker key is a Lucide icon. */
export const STICKER_IMG = { terby: media('birthday/terby-face.webp'), terby2: media('birthday/terby-body.webp') };
/** Free-placed stickers (max 12 per card, floating text included). */
export const BD_STK = ['terby2', 'terby', 'star', 'heart', 'rainbow', 'balloon', 'ribbon', 'flower-2', 'cake-slice', 'party-popper', 'sparkles', 'bird', 'clover', 'gift'];
export const MAX_STICKERS = 12;
/** Text on the card (Canva-style): max length, colours and fonts ([css font-family, label]). */
export const TEXT_MAX = 60;
export const BD_TXTCOL = ['#173F52', '#C2456B', '#12986F', '#3563C9', '#B8731A', '#7A4BC2', '#E0A800', '#2A2A2A', '#FFFFFF'];
export const BD_FONTS = [['', 'ปกติ (Sarabun)'], ["'Mali'", 'Mali ลายมือ'], ["'Gaegu'", 'Gaegu น่ารัก'], ["'Allura'", 'Allura สคริปต์'], ["'DM Serif Display'", 'DM Serif หัวข้อ'], ["'Montserrat'", 'Montserrat'], ["'Poppins'", 'Poppins'], ["'Josefin Sans'", 'Josefin Sans']];
/** Pastel paper for the inside of a card (message and stickers live there). */
export const BD_PAPERS = [{ k: 'cream', n: 'ครีม', c: '#FFF6E3' }, { k: 'pink', n: 'ชมพู', c: '#FFE3EA' }, { k: 'peach', n: 'พีช', c: '#FFE5D2' }, { k: 'butter', n: 'เหลืองเนย', c: '#FFF4B8' }, { k: 'mint', n: 'มินต์', c: '#D8F3E8' }, { k: 'sky', n: 'ฟ้า', c: '#DCEBFF' }, { k: 'lav', n: 'ลาเวนเดอร์', c: '#E8E0FA' }, { k: 'sage', n: 'เขียวเซจ', c: '#DDE9CF' }];
/** The card's paper, or a stable pick from its id for older cards without one. */
export function paperOf(c) {
  const f = BD_PAPERS.find((x) => x.k === c.paper);
  if (f) return f;
  const id = String(c.id || c.by || '');
  let h = 0;
  for (let i = 0; i < id.length; i += 1) h += id.charCodeAt(i);
  return BD_PAPERS[h % BD_PAPERS.length];
}
/** Closed cover of the owner's birthday book. */
export const BOOK_COVER_IMG = media('birthday/book-cover.webp');
export const BD_QUICK = ['สุขสันต์วันเกิดนะ ขอให้ปีนี้มีแต่เรื่องดีๆ', 'ขอให้สุขภาพแข็งแรง งานราบรื่น เจอแต่คนใจดี', 'Happy Birthday! ขอบคุณที่เป็นเพื่อนร่วมทีมที่ดีเสมอ'];
export const MSG_MAX = 140;

const BDAYS = { gong: { name: 'ก้อง', pos: 'Creative Designer · CAC' } };

const MYCARDS = [
  { from: 'aut', theme: 3, msg: 'สุขสันต์วันเกิดนะมุก ขอให้ปีนี้มีแต่เรื่องดีๆ เข้ามาเยอะๆ', sticker: '☕', stk: [{ e: '🎈', x: 84, y: 70, s: 1.2, r: 14 }, { e: '✨', x: 12, y: 78, s: 0.8, r: -12 }, { e: '🎀', x: 70, y: 20, s: 0.9, r: 20 }], date: '20 พ.ย. 2568' },
  { from: 'gong', theme: 0, msg: 'Happy Birthday! ขอบคุณที่เป็นเพื่อนร่วมทีมที่ดีเสมอ', sticker: '🍰', date: '20 พ.ย. 2568' },
  { from: 'cac', theme: 4, msg: 'ขอให้สุขภาพแข็งแรง งานราบรื่น เจอแต่คนใจดี', sticker: '', date: '20 พ.ย. 2568' },
];

/** Birthday books by owner. Each friend sends their own card; only the owner reads the book. */
const BASE_BOOKS = {
  gong: { owner: 'gong', dateTxt: '10 ต.ค.', due: [2026, 9, 10], cards: [
    { id: 'n1', by: 'aut', gift: true, theme: 3, msg: 'สุขสันต์วันเกิดนะกอง! ขอบคุณที่ช่วยงานกราฟิกตลอด ขอให้ปีนี้ปังๆ', sticker: '☕', stk: [{ e: '🎈', x: 86, y: 66, s: 1.1, r: 14 }, { e: '✨', x: 10, y: 76, s: 0.8, r: -12 }], date: 'วันนี้' },
    { id: 'n2', by: 'cac', theme: 4, msg: 'ขอให้สุขภาพแข็งแรง งานราบรื่น เจอแต่คนใจดี', gift: true, sticker: '🍰', stk: [{ e: '🌿', x: 84, y: 24, s: 1, r: 20 }], date: 'วันนี้' },
    { id: 'n3', by: 'ccm', theme: 1, msg: 'Happy Birthday! ขอให้มีความสุขมากๆ นะคะ', sticker: '', stk: [{ e: '🌸', x: 80, y: 70, s: 1.3, r: -10 }, { e: '🦋', x: 16, y: 30, s: 0.9, r: 12 }], date: 'เมื่อวาน' },
    { id: 'n4', by: 'pmd', theme: 2, msg: 'ขอให้ปีนี้มีแต่เรื่องดีๆ เข้ามา กินเค้กเยอะๆ นะ', sticker: '🎁', stk: [], date: '2 วันก่อน' },
    { id: 'n5', by: 'isd', gift: true, theme: 0, msg: 'สุขสันต์วันเกิด ขอให้โชคดีทุกวัน', sticker: '🍀', stk: [{ e: '🎀', x: 14, y: 76, s: 1, r: -14 }], date: '3 วันก่อน' },
    { id: 'n6', by: 'sqa', theme: 3, msg: 'ขอให้ร่ำรวย เฮงๆ ปังๆ นะ', sticker: '🧋', stk: [{ e: '🎉', x: 84, y: 25, s: 1, r: 18 }], date: '3 วันก่อน' },
    { id: 'n7', by: 'mbd', theme: 4, msg: 'ขอบคุณที่เป็นเพื่อนร่วมทีมที่ดีเสมอ', sticker: '', stk: [], date: '4 วันก่อน' },
  ] },
  aut: { owner: 'aut', dateTxt: '24 ต.ค.', due: [2026, 9, 24], cards: [
    { id: 'a1', by: 'gong', theme: 2, msg: 'ล่วงหน้าไว้ก่อน! ขอให้มีแต่เรื่องดีๆ นะเอ๋', sticker: '🍰', stk: [{ e: '🎈', x: 82, y: 70, s: 1.2, r: 12 }], date: 'เมื่อวาน' },
    { id: 'a2', by: 'cac', theme: 4, msg: 'ขอบคุณสำหรับงานวิดีโอสวยๆ ทุกชิ้น', sticker: '', stk: [], date: '2 วันก่อน' },
    { id: 'a3', by: 'ifs', theme: 0, msg: 'Happy Birthday ล่วงหน้า!', sticker: '🎁', stk: [], date: '3 วันก่อน' },
  ] },
  mook: { owner: 'mook', dateTxt: '20 พ.ย.', due: [2026, 10, 20], locked: true, cards: [
    { id: 'k1', by: 'gong', cover: 'cup', theme: 0, msg: 'สุขสันต์วันเกิดนะมุก! ขอให้ปีนี้ปังทุกงาน', sticker: '', stk: [{ e: 'terby2', x: 86, y: 55, s: 1.1, r: 10 }], gift: true, date: 'วันนี้' },
    { id: 'k2', by: 'aut', cover: 'water', theme: 1, msg: 'ขอบคุณที่ดูแลงานดีไซน์ให้ทีมเสมอ ขอให้มีความสุขมากๆ', sticker: '☕', stk: [{ ph: [0, 1], x: 76, y: 24, s: 1.05, r: 8 }, { e: 'sparkles', x: 20, y: 78, s: 0.9, r: -10 }], date: 'เมื่อวาน' },
    { id: 'k3', by: 'cac', cover: 'sun', theme: 2, msg: 'ขอให้สุขภาพแข็งแรง เจอแต่เรื่องดีๆ', sticker: '', stk: [{ e: 'sparkles', x: 16, y: 82, s: 1, r: -10 }], date: 'เมื่อวาน' },
    { id: 'k4', by: 'ccm', cover: 'daisy', theme: 3, msg: 'Happy Birthday! กินเค้กเยอะๆ นะ', sticker: '🍰', stk: [], gift: true, date: '2 วันก่อน' },
    { id: 'k5', by: 'pmd', cover: 'garden', theme: 4, msg: 'ขอให้ได้พักผ่อนเยอะๆ และมีความสุขมากๆ', sticker: '', stk: [{ ph: [2, 4], x: 24, y: 74, s: 1.1, r: -9 }, { ph: [2, 5], x: 78, y: 72, s: 0.85, r: 7 }], date: '2 วันก่อน' },
    { id: 'k6', by: 'mbd', cover: 'arch', theme: 0, msg: 'ขอบคุณที่เป็นเพื่อนร่วมงานที่ดีเสมอ', sticker: '🍀', stk: [], date: '3 วันก่อน' },
    { id: 'k7', by: 'isd', cover: 'geo', theme: 1, msg: 'ขอให้ปีนี้โชคดี งานราบรื่น', sticker: '', stk: [{ e: 'terby', x: 80, y: 80, s: 1, r: -8 }], date: '3 วันก่อน' },
    { id: 'k8', by: 'sqa', cover: 'hbd', theme: 2, msg: 'สุขสันต์วันเกิด ขอให้ร่ำรวยเฮงๆ นะ', sticker: '🧋', stk: [], date: '4 วันก่อน' },
  ] },
  mook25: { owner: 'mook', year: 2568, dateTxt: '20 พ.ย. 2568', archive: true,
    cards: MYCARDS.slice(0, 2).map((c, i) => ({ id: `o${i}`, by: c.from, cover: ['floral', 'sun', ''][i] || '', theme: c.theme, msg: c.msg, sticker: c.sticker, stk: c.stk || [], date: c.date })) },
};

const BD_DEPT = { mook: 'CAC', gong: 'CAC', aut: 'CAC', cac: 'CAC', ccm: 'CCM', mbd: 'MBD', pmd: 'PMD', sqa: 'SQA', ifs: 'IFS', isd: 'ISD', ccs: 'CCS', bss: 'BSS', ceo: 'CEO', coo: 'COO', cso: 'CSO', cto: 'CTO', chairman: 'Board' };
/** Company birthday directory (month is 1-based). */
export const BDIR = [{ id: 'gong', m: 10, d: 10 }, { id: 'cto', m: 10, d: 15 }, { id: 'ifs', m: 10, d: 18 }, { id: 'aut', m: 10, d: 24 }, { id: 'pmd', m: 10, d: 31 }, { id: 'ccm', m: 11, d: 3 }, { id: 'sqa', m: 11, d: 12 }, { id: 'mook', m: 11, d: 20 }, { id: 'isd', m: 11, d: 27 }, { id: 'cac', m: 12, d: 5 }];
export const BD_TEAM = ['gong', 'aut', 'mook', 'cac'];
/** People who opted out of the company birthday list. */
export const BD_OPTOUT = { ifs: true };
const TH_MON = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];

export const REPORT_REASONS = ['ข้อความไม่เหมาะสม', 'รู้สึกถูกคุกคามหรือรบกวน', 'มีข้อมูลส่วนตัวของผู้อื่น', 'เหตุผลอื่นๆ'];
export const CONFETTI_COLORS = ['#27AE97', '#F5B2B2', '#FFD98A', '#7AAEFC', '#8DC63F', '#C2456B'];

export const bdNick = (id) => BDAYS[id]?.name || ORG_PEOPLE[id]?.nick || id;
export const bdPos = (id) => BDAYS[id]?.pos || ORG_PEOPLE[id]?.pos || '';
export const bdDept = (id) => BD_DEPT[id] || '';
/** Birthday as [year, month0, day] for cover text (only day and month are shown). */
export function bdDue(id) {
  const e = BDIR.find((x) => x.id === id);
  return e ? [2026, e.m - 1, e.d] : [2026, 0, 1];
}

/** Whole days from today until the book owner's birthday (negative = passed). */
export function daysUntil(b) {
  const d = new Date(b.due[0], b.due[1], b.due[2]);
  const t = new Date(); t.setHours(0, 0, 0, 0);
  return Math.round((d - t) / 86400000);
}

/** Fresh, mutable copy of every book, plus an empty book for each directory entry without one. */
export function createBooks() {
  const books = JSON.parse(JSON.stringify(BASE_BOOKS));
  const n = new Date();
  const today = new Date(n.getFullYear(), n.getMonth(), n.getDate());
  BDIR.forEach((e) => {
    if (books[e.id]) return;
    let y = n.getFullYear();
    if (new Date(y, e.m - 1, e.d) < today) y += 1;
    books[e.id] = { owner: e.id, dateTxt: `${e.d} ${TH_MON[e.m - 1]}`, due: [y, e.m - 1, e.d], cards: [] };
  });
  return books;
}
