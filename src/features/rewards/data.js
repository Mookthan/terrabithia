// Engagement coins (mook, 2026-10-27): earned by using the site, redeemed for real rewards.
// Earning rules approved by mook on 2026-10-27. Rewards, stock and history are mock until the back office keeps the ledger.
import { Award, BadgeCheck, BookOpen, CalendarCheck, Coffee, Film, Gift, GraduationCap, Heart, MessageCircle, PenLine, Smile, ThumbsUp, Umbrella, CupSoda, CalendarHeart } from 'lucide-react';

/** Balance before the mock history below (the history adds up to it). */
export const START_COINS = 1250;

/**
 * How coins are earned. `daily` = max times per day, `perRef` = max coins per item (post, person).
 * Unliking takes the coin back; knowledge posts earn only once approved.
 */
export const EARN_RULES = [
  { k: 'checkin', icon: CalendarCheck, l: 'เข้าเว็บ (เช็กอินรายวัน)', pts: 5, daily: 1, cap: 'วันละครั้ง' },
  { k: 'like', icon: Heart, l: 'กดถูกใจข่าว', pts: 1, daily: 5, cap: '5 ครั้งต่อวัน' },
  { k: 'comment', icon: MessageCircle, l: 'คอมเมนต์ข่าวหรือโพสต์', pts: 2, daily: 10, cap: '10 ครั้งต่อวัน' },
  { k: 'card', icon: CalendarHeart, l: 'ส่งการ์ดวันเกิด', pts: 5, cap: 'ต่อคน ปีละครั้ง' },
  { k: 'festivalCard', icon: Gift, l: 'ส่งการ์ดเทศกาล', pts: 5, cap: 'ต่อคน เทศกาลละครั้ง' },
  { k: 'post', icon: PenLine, l: 'โพสต์ความรู้ที่ผ่านอนุมัติ', pts: 20, cap: 'ไม่จำกัด' },
  { k: 'postLiked', icon: ThumbsUp, l: 'โพสต์ความรู้ของคุณถูกกดถูกใจ', pts: 1, cap: '20 ต่อโพสต์' },
  { k: 'course', icon: GraduationCap, l: 'เรียนคอร์สจบ', pts: 30, cap: 'ไม่จำกัด' },
  // Skills (mook 2026-10-31): undoing an endorsement takes the coin back, like unliking news.
  { k: 'endorse', icon: BadgeCheck, l: 'รับรองความถนัดให้เพื่อน', pts: 1, daily: 5, cap: '5 ครั้งต่อวัน ความถนัดละครั้ง' },
  // Daily guess-the-colleague game (mook 2026-11-06): right answer only, once a day.
  { k: 'guess', icon: Smile, l: 'ทายใครเอ่ยถูก', pts: 5, daily: 1, cap: 'วันละครั้ง' },
  { k: 'endorsed', icon: Award, l: 'ความถนัดของคุณได้รับการรับรอง', pts: 1, cap: '20 ต่อความถนัด' },
];
export const ruleOf = (k) => EARN_RULES.find((r) => r.k === k);

/** Rewards catalogue (mock). `g` = the gift card's own decorative gradient (not brand colours), one per reward. */
export const REWARDS = [
  { id: 'coffee', icon: Coffee, g: ['#7B4A2C', '#D9A066'], l: 'บัตรกำนัลร้านกาแฟ 100 บาท', d: 'ใช้ได้ที่ร้านกาแฟชั้น 1 ของอาคาร', cost: 300, stock: 25 },
  { id: 'umbrella', icon: Umbrella, g: ['#1C3A5C', '#3E7CB1'], l: 'ร่มพับ Terrabit', d: 'ร่มพับกันแดดกันฝน ลายโลโก้บริษัท', cost: 400, stock: 12 },
  { id: 'tumbler', icon: CupSoda, g: ['#138F8A', '#6FD0C5'], l: 'แก้วเก็บความเย็น Terrabit', d: 'แก้วสแตนเลส 20 ออนซ์ เก็บเย็นได้นาน', cost: 600, stock: 8 },
  { id: 'movie', icon: Film, g: ['#5B2A86', '#E0567A'], l: 'บัตรชมภาพยนตร์ 2 ที่นั่ง', d: 'ใช้ได้ทุกสาขา ภายใน 3 เดือน', cost: 700, stock: 10 },
  { id: 'terby', icon: Smile, g: ['#E86A8A', '#F6B98E'], l: 'ตุ๊กตา Terby', d: 'ตุ๊กตามาสคอตรุ่นพิเศษ ผลิตจำนวนจำกัด', cost: 800, stock: 3 },
  { id: 'book', icon: BookOpen, g: ['#2F3E8F', '#6C8BE0'], l: 'บัตรกำนัลร้านหนังสือ 300 บาท', d: 'เลือกซื้อหนังสือหรือคอร์สออนไลน์ได้', cost: 900, stock: 6 },
  { id: 'halfday', icon: Gift, g: ['#12986F', '#A9CF5B'], l: 'ลาพิเศษครึ่งวัน', d: 'ใช้ได้ภายในปีนี้ แจ้งหัวหน้าก่อนอย่างน้อย 3 วัน', cost: 1500, stock: 5 },
];

/** Mock history, newest first; earned and spent add up to START_COINS. */
export const HISTORY_SEED = [
  { id: 'h1', k: 'post', pts: 20, date: '25 ต.ค 69' },
  { id: 'h2', k: 'card', pts: 5, date: '24 ต.ค 69' },
  { id: 'h3', redeem: 'coffee', pts: -300, date: '20 ต.ค 69', status: 'รับของแล้ว' },
  { id: 'h4', k: 'course', pts: 30, date: '18 ต.ค 69' },
  { id: 'h5', k: 'checkin', pts: 5, date: '18 ต.ค 69' },
];

/** 1250 → "1,250". */
export const fmtCoins = (n) => n.toLocaleString('en-US');
