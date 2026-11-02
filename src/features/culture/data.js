// Static data for the Culture section, ported from the prototype.
import {
  Aperture, Camera, Castle, ChartNoAxesCombined, Film, Flag, Gift, HandHeart, Handshake, Heart,
  Image, Landmark, Lightbulb, MoonStar, PartyPopper, Sailboat, ShieldCheck, Sunrise, Ticket, WavesLadder,
} from 'lucide-react';
import { media } from '@/lib/media';

/* ---------- Our Activity ---------- */
/** Real photos of the 2569 new-year river cruise party (photographer's album, mook 2026-10-30). */
const NEWYEAR_PHOTOS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((n) => ({ src: media(`album-ny-${n}.jpg`) }));

export const ACTIVITIES = [
  { img: media('album-ny-1.jpg'), g: '#1a1a2e,#16213e', Icon: Sailboat, tag: 'กิจกรรมบริษัท', t: 'เฉลิมฉลองส่งท้ายปีเก่าต้อนรับปีใหม่ 2569', d: '14 ธ.ค 2568', photos: NEWYEAR_PHOTOS, desc: 'ล่องเรือเจ้าพระยาธีมฮาวายส่งท้ายปี ชมวิวแม่น้ำยามค่ำคืน ดนตรีสด และอาหารบนเรือกับเพื่อนพนักงานทุกคน' },
  { img: media('act-kayak.webp'), g: '#2b6cb0,#90cdf4', Icon: WavesLadder, tag: 'ทริปพนักงาน', t: 'พายเรือคายัคริมทะเล', d: '10 ส.ค 69' },
  { img: media('act-cny.webp'), g: '#c53030,#f56565', Icon: Ticket, tag: 'เทศกาล', t: 'สังสรรค์วันตรุษจีน', d: '8 ก.พ 69' },
  { img: media('act-sports.webp'), g: '#d53f8c,#ed64a6', Icon: Flag, tag: 'กีฬาสี', t: 'Terrabit Sports Day 2569', d: '20 ก.ค 69' },
  { img: media('act-merit.webp'), g: '#744210,#d69e2e', Icon: HandHeart, tag: 'ทำบุญ', t: 'ทำบุญบริษัทประจำปี', d: '5 ม.ค 69' },
  { img: media('act-songkran.webp'), g: '#553c9a,#9f7aea', Icon: MoonStar, tag: 'เทศกาล', t: 'สงกรานต์เทอราบิทเทีย 67', d: '13 เม.ย 69' },
  { img: media('act-temple.webp'), g: '#2c7a7b,#4fd1c5', Icon: Castle, tag: 'ทัศนศึกษา', t: 'ทัศนศึกษาวัดและโบราณสถาน', d: '2 มี.ค 69' },
  { img: media('act-overseas.webp'), g: '#2b6cb0,#63b3ed', Icon: Landmark, tag: 'ทัศนศึกษา', t: 'เยี่ยมชมสถาปัตยกรรมต่างแดน', d: '15 มี.ค 69' },
  { img: media('act-offering.webp'), g: '#975a16,#ecc94b', Icon: HandHeart, tag: 'ทำบุญ', t: 'ถวายภัตตาหารเพลพระสงฆ์', d: '5 ม.ค 69' },
  { img: media('act-oldtown.webp'), g: '#4a5568,#a0aec0', Icon: Castle, tag: 'ทัศนศึกษา', t: 'เดินชมเมืองเก่าสไตล์ยุโรป', d: '16 มี.ค 69' },
  { img: media('act-kayak2.webp'), g: '#2b6cb0,#90cdf4', Icon: WavesLadder, tag: 'ทริปพนักงาน', t: 'พายคายัครอบเกาะ', d: '11 ส.ค 69' },
  { img: media('act-gift.webp'), g: '#c05621,#f6ad55', Icon: Gift, tag: 'สวัสดิการ', t: 'ของขวัญสำหรับพนักงาน', d: '1 ก.ย 69' },
];

/** Buddhist-era year of an activity date such as '10 ส.ค 69' or '14 ธ.ค 2568'. */
export function activityYear(d) {
  const y = Number(d.trim().split(/\s+/).pop());
  return y < 100 ? 2500 + y : y;
}

const TH_MONTHS = ['ม.ค', 'ก.พ', 'มี.ค', 'เม.ย', 'พ.ค', 'มิ.ย', 'ก.ค', 'ส.ค', 'ก.ย', 'ต.ค', 'พ.ย', 'ธ.ค'];

/** Sortable number (yyyymmdd) for an activity date such as '10 ส.ค 69'. */
export function activityStamp(d) {
  const [day, mon] = d.trim().split(/\s+/);
  return activityYear(d) * 10000 + (TH_MONTHS.indexOf(mon.replace(/\.$/, '')) + 1) * 100 + Number(day);
}

/** Activities as { a, i } (i = index in ACTIVITIES, used in the album URL), newest first (mook 2026-10-30). */
export const ACTIVITIES_NEWEST = ACTIVITIES.map((a, i) => ({ a, i })).sort((x, y) => activityStamp(y.a.d) - activityStamp(x.a.d));

/** Years that have activities, newest first (year filter options). */
export const ACTIVITY_YEARS = [...new Set(ACTIVITIES.map((a) => activityYear(a.d)))].sort((a, b) => b - a);

/** Placeholder photos for albums that have no real photos yet. `r` = width / height. */
export const PHOTO_VARIANTS = [
  { g: '#1a1a2e,#16213e', Icon: Camera, r: 4 / 3 },
  { g: '#2b6cb0,#90cdf4', Icon: Image, r: 3 / 4 },
  { g: '#c53030,#f56565', Icon: Film, r: 1 },
  { g: '#d53f8c,#ed64a6', Icon: Aperture, r: 3 / 2 },
  { g: '#744210,#d69e2e', Icon: Sunrise, r: 4 / 5 },
  { g: '#553c9a,#9f7aea', Icon: PartyPopper, r: 4 / 3 },
];

/* ---------- Core Value ---------- */
export const CORE_VALUES = [
  { l: 'A', en: 'Attentive', th: 'เอาใจใส่', Icon: Heart, c1: '#9FCB82', c2: '#FBFDE9', pts: [{ h: 'ใส่ใจคน', t: 'ครอบครัว, เพื่อนร่วมงาน, คู่ค้า, ลูกค้า' }, { h: 'ใส่ใจงาน', t: 'งานตัวเอง, งานของทีม-ส่วนรวม' }] },
  { l: 'C', en: 'Creative', th: 'ไอเดียบรรเจิด', Icon: Lightbulb, c1: '#C0D985', c2: '#FBFEE8', pts: [{ h: 'อย่านิ่งดูดาย', t: 'มองหาข้อบกพร่อง หรือจุดที่รอการพัฒนา เมื่อมีโอกาส' }, { h: 'กำจัดอุปสรรค', t: 'กำจัดความเกียจคร้าน ความกลัว หรือความอ่อนด้อยความรู้-ประสบการณ์ อันเป็นอุปสรรคสำคัญ ขัดขวางไม่ให้ทำงานได้อย่างสร้างสรรค์' }] },
  { l: 'C', en: 'Collaborative', th: 'สามัคคีเป็นเลิศ', Icon: Handshake, c1: '#C7E9E7', c2: '#E6FDFD', pts: [{ h: 'เมื่อรู้ ก็อยู่เย็น', t: 'ยอมรับข้อดี-ข้อด้อย ของตัวเอง และเพื่อนร่วมงาน เพื่อพัฒนาตัวเอง และเพิ่มประสิทธิภาพการทำงานร่วมกัน' }, { h: 'เลือกเป็น อยู่สบาย', t: 'เลือกมองหาสิ่งดี ๆ แม้จะอยู่ ในสถานการณ์แย่ ๆ เสมือนผึ้งน้อยที่มองหาเพียงน้ำหวาน แม้รอบข้างจะเต็มกองขยะ' }] },
  { l: 'R', en: 'Reliable', th: 'ไม่ละเมิดสัญญา', Icon: ShieldCheck, c1: '#A3E8D2', c2: '#F0FDFA', pts: [{ h: 'ซื่อสัตย์ต่อตัวเอง', t: 'ไม่หลอกตัวเอง ยอมรับในสิ่งที่เป็นอยู่ รวมถึงความผิดที่ได้กระทำลงไป' }, { h: 'ซื่อสัตย์ต่อคนรอบข้าง', t: 'ให้ความสำคัญกับหน้าที่ที่ได้รับมอบหมาย และไม่ละเมิดข้อตกลง ที่ให้ไว้กับทีมและลูกค้า' }] },
  { l: 'D', en: 'Dynamic', th: 'พัฒนากล้าเปลี่ยนแปลง', Icon: ChartNoAxesCombined, c1: '#A0CFDC', c2: '#F2FBFF', pts: [{ h: 'Challenges', t: 'รับมือกับความท้าทาย ในการทำงานทุกรูปแบบ' }, { h: 'Correct', t: 'แก้ไขข้อผิดพลาด ให้ถูกต้อง' }, { h: 'Work Hard', t: 'ทำงานให้หนักขึ้นเพื่อตัวเอง และองค์กร' }] },
];

/** Float animation duration per core-value card (seconds). */
export const CV_FLOAT = [6.4, 7.6, 5.8, 7, 6.1];

/* ---------- Core Competency ---------- */
export const CC_IMG = media('cec19b63f1.jpg');
export const CC_DATA = [{"t": "1. PASSION : เป้าหมาย จูงใจ", "c1": "#A3CC82", "c2": "#FBFEE9", "l": ["แสดงท่าทียินดี และกระตือรือร้นกับงานที่ได้รับมอบหมาย", "แสดงท่าทียินดี เมื่อได้รับผิดชอบงานมากขึ้น", "แสดงท่าทียินดีกับภารกิจอื่นเพิ่มเติม แม้อยู่นอกเหนือสายงานตัวเอง"], "r": ["กระตือรือร้นสม่ำเสมอ เสร็จงานแล้ว เร่งหางานชิ้นใหม่ทำทันที", "ปฏิบัติงานได้โดยไม่ต้องมีผู้กำกับดูแล แม้อยู่ในสภาวะกดดัน", "กำหนดเป้าหมายในการทำงานที่ท้าทาย และวัดผลได้ชัดเจน", "แสดงจุดมุ่งหมายและความหวัง ให้ผู้เกี่ยวข้องได้รับทราบ"]}, {"t": "2. EFFORT : มีวินัย ซื่อสัตย์", "c1": "#C0D985", "c2": "#FBFEE8", "l": ["ทุ่มเทสุดความสามารถ เพื่อผลสำเร็จสูงสุดของภารกิจ", "วางแผนได้อย่างเหมาะสม มีระบบชัดเจน", "ค้นคว้า-หาความรู้เกี่ยวกับงานอย่างสม่ำเสมอ", "เพียรฝึกฝนและเพิ่มความพยายาม เพื่อความสำเร็จสูงสุดของงาน", "จัดระเบียบชีวิตได้อย่างเหมาะสม ไม่ให้เป็นอุปสรรคในการปฏิบัติงาน", "ปฏิบัติหน้าที่ได้อย่างมีวินัย แม้อยู่นอกสถานที่"], "r": ["ปฏิบัติงานตรงตามเวลาที่ตกลงไว้", "บริหารเวลาได้อย่างมีประสิทธิภาพ งานเสร็จสมบูรณ์ตามเวลาที่กำหนดไว้", "ให้ความร่วมมือ และปฏิบัติตามกฎระเบียบขององค์กรอย่างเคร่งครัด", "แจ้งลาหยุดตามระเบียบ สถานการณ์ และช่องทางที่เหมาะสม", "รักษาความสะอาดและความเป็นระเบียบ ในพื้นที่ปฏิบัติงาน", "ดูแลภาพลักษณ์ แต่งกายสะอาดดูดี เหมาะสมกาลเทศะ"]}, {"t": "3. DEDICATION : ปฏิบัติ จริงจัง", "c1": "#D8E08F", "c2": "#FDFDE6", "l": ["ผลลัพธ์ของงานถูกต้อง มีคุณภาพ ตอบโจทย์ความต้องการ", "ปริมาณงานที่สำเร็จ ครบถ้วนตามได้รับมอบหมาย", "จบภารกิจได้ด้วยตัวเอง ไม่ต้องกำกับดูแล หรือแนะนำช่วยเหลือ", "เลือกใช้กระบวนการ แนวทาง วิธีการ หรืออุปกรณ์ ที่เหมาะสมกาลเทศะ", "ลำดับความสำคัญของงานได้ถูกต้อง เหมาะสม", "ส่งงานให้ผู้เกี่ยวข้องได้ถูกต้องและเหมาะสม"], "r": ["ทวนสอบข้อสงสัย ชี้จุดอ่อน-ข้อบกพร่อง ในงานที่รับผิดชอบ", "มีพัฒนาการชัดเจนในงานที่ทำเป็นประจำ", "ดูแลรักษาอุปกรณ์และทรัพย์สินต่าง ๆ ที่ใช้ในการปฏิบัติงาน", "เฝ้าระวังและติดตามความคืบหน้าของงานที่รับผิดชอบใกล้ชิด", "แจ้งผลให้ผู้เกี่ยวข้องรับทราบอย่างชัดเจน เหมาะสมกาลเทศะ", "สื่อสารอย่างมีไหวพริบปฏิภาณ ฉะฉาน ชัดเจนในทุกช่องทางการติดต่อ"]}, {"t": "4. INVESTIGATION : มุ่งมั่น พัฒนา", "c1": "#A3E8D2", "c2": "#F0FDFA", "l": ["หมั่นสังเกตและทำความเข้าใจ สถานการณ์หรือผลลัพธ์ของงาน", "บ่งชี้และแยกแยะปัญหา รวมถึงสาเหตุของปัญหาได้อย่างชัดเจน", "ร่วมนำเสนอวิธีพัฒนา แก้ไข หรือปรับปรุงชิ้นงาน", "พัฒนา ลงมือแก้ไข-ปรับปรุงคุณภาพงานอย่างทุ่มเทและสม่ำเสมอ"], "r": ["เฝ้าติดตามและประเมินผลในงานที่ทดลองหรือปรับแก้ไปแล้ว", "วางแผนอย่างรอบคอบ เพื่อป้องกันมิให้เกิดปัญหาซ้ำเดิมในอนาคต", "บันทึกข้อมูล ขั้นตอน เทคนิค/โนฮาว ในแหล่งจัดเก็บที่เข้าถึงได้", "ร่วมแบ่งปัน ถ่ายทอดความรู้และโนฮาว ที่ใช้งานได้จริงแก่ผู้เกี่ยวข้อง"]}, {"t": "5. TEAM SPIRIT : พร้อมหน้า พร้อมใจ", "c1": "#A0CFDC", "c2": "#F2FBFF", "l": ["ปฏิบัติงานร่วมกับผู้อื่นได้ โดยปราศจากความขัดแย้ง", "ขจัดความขัดแย้งอย่างถ้อยทีถ้อยอาศัยและเป็นมิตร", "น้อมรับคำติเตือนได้โดยปราศจากอคติหรือท่าทีปฏิปักษ์", "รับฟังและเคารพในความคิดเห็นที่แตกต่างด้วยความเข้าใจ"], "r": ["ปฏิบัติต่อลูกค้า เพื่อนร่วมงาน ด้วยท่าทียินดี สุภาพนอบน้อม สม่ำเสมอ", "สร้างแบบอย่างที่ดี และส่งเสริมทัศนคติแง่บวก ให้แก่เพื่อนร่วมงาน", "ส่งเสริมและสนับสนุนการทำงานเป็นทีม", "ร่วมกิจกรรมกับเพื่อนร่วมงาน ด้วยท่าทียินดีและเป็นมิตร"]}];

/**
 * Our Activity mosaic, measured from mook's design (2026-10-16).
 * A band is a row of columns; `grow` is the box's width (in a row) or height (in a column) in design px.
 * `s` is the slot in reading order (0 = big box top-left), filled with the newest activities first. `m` holds the tile's span (full class names, so Tailwind sees them) on the 2-column phone grid.
 */
export const ACTIVITY_LAYOUT = [
  { ratio: '1011/451', items: [
    { grow: 395, col: [
      { s: 0, grow: 248, m: 'max-[700px]:row-span-2' },
      { grow: 190, row: [{ s: 1, grow: 1 }, { s: 2, grow: 1 }] },
    ] },
    { s: 3, grow: 315, m: 'max-[700px]:row-span-3' },
    { grow: 271, col: [{ s: 4, grow: 161 }, { s: 5, grow: 275, m: 'max-[700px]:row-span-2' }] },
  ] },
  { ratio: '1011/274', items: [
    { s: 6, grow: 610, m: 'max-[700px]:col-span-2 max-[700px]:row-span-2' },
    { s: 7, grow: 386, m: 'max-[700px]:col-span-2 max-[700px]:row-span-2' },
  ] },
  { ratio: '1011/484', items: [
    { s: 8, grow: 329, m: 'max-[700px]:row-span-3' },
    { grow: 329, col: [{ s: 9, grow: 145 }, { s: 10, grow: 325, m: 'max-[700px]:row-span-2' }] },
    { s: 11, grow: 329, m: 'max-[700px]:col-span-2 max-[700px]:row-span-2' },
  ] },
];
