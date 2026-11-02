// Company news shown on the public home page, the News list and article pages.
import {
  Bot, Droplet, Droplets, Flame, Flower2, Gift, GraduationCap, HandHeart, Handshake, Headset, HeartPulse, Landmark,
  Laptop, Library, Megaphone, Palette, ShieldCheck, TreePalm, Trophy, UtensilsCrossed, Waves,
} from 'lucide-react';
import { media } from '@/lib/media';

/**
 * e: lucide icon shown when there is no photo; g: [from, to] gradient colours;
 * dept: key in DEPTS used by the news filter (null = company-wide, always shown).
 */
export const NEWS = [
  { e: Bot, g: ['#1C3A5C', '#27AE97'], tag: 'ทีม PMD', dept: 'pmd', img: media('10d9158d2b.jpg'), t: 'ยกระดับ Customer Experience ด้วยเทคโนโลยีปัญญา...', d: 'เมื่อวันที่ 15 มิถุนายน ทีมงานเทอราบิทได้รับเกียรติเข้าร่วมงาน Genesys CX Tour Bangkok 2026 ณ โรงแรม The Peninsula...', date: '16 มิ.ย 69' },
  { e: TreePalm, g: ['#27AE97', '#8EBA3E'], tag: 'ทีม HR', dept: 'cac-hr', t: 'ประกาศวันหยุดประจำปี 2569', d: 'ประกาศวันหยุดประจำปี 2569', date: '8 ส.ค 69' },
  { e: Flame, g: ['#C7DC86', '#8EBA3E'], tag: 'ทีม Admin', dept: 'cac', t: 'ประชาสัมพันธ์การซ้อมดับเพลิง และแผ่นดินไหว การไฟ...', d: 'ประกาศจากทางนิติบุคคลอาคารอรกานต์ ในวันจันทร์ที่ 3 สิงหาคม 2569 ระหว่างเวลา 08.30-12.00 น. และ 13.30-14.30 น...', date: '8 ส.ค 69' },
  { e: Library, g: ['#1C3A5C', '#BEE8DD'], tag: 'ประกาศ', img: media('0bceae6c21.jpg'), dept: null, t: 'เสริมศักยภาพทีม สร้างรากฐานองค์กร', d: 'เมื่อวันที่ 15 มิถุนายน คุณเมธัญกาญจน์ ชานลมัขณการุณย์ COO ของเทอราบิทได้จัดอบรมหัวข้อ Project Management Framework...', date: '1 ส.ค 69' },
  { e: Gift, g: ['#27AE97', '#1C3A5C'], tag: 'ประกาศ', img: media('77f086f50c.jpg'), dept: null, t: 'เทอราบิทขอส่งต่อความปรารถนาดี เนื่องในเทศกาลไหว้...', d: 'ด้วยบะจ่างโฮมเมดที่จัดทำขึ้นเป็นพิเศษ เพื่อให้ลูกค้าทุกท่านได้สัมผัสรสชาติแห่งความใส่ใจในเทศกาลมงคลนี้ ✨', date: '1 ส.ค 69' },
  { e: Droplet, g: ['#8EBA3E', '#27AE97'], tag: 'ประกาศ · ทีม Admin', img: media('4f252e55a5.jpg'), dept: 'cac', t: 'Terrabit ยกระดับความปลอดภัยเพื่อสุขอนามัยของทุกคน', d: 'เพราะสุขภาพของทีมงานคือหัวใจหลักขององค์กร เราจึงดำเนินการฉีดพ่นฆ่าเชื้อทั่วพื้นที่สำนักงาน ด้วยน้ำยาออร์แกนิกคุณภาพสูง...', date: '1 ส.ค 69' },
  { e: Megaphone, g: ['#1C3A5C', '#27AE97'], tag: 'ประกาศ', img: media('act-newyear.webp'), dept: null, t: 'สรุปงานเลี้ยงส่งท้ายปี 2568 บนเรือสำราญ', d: 'ขอบคุณพนักงานทุกคนที่ร่วมสนุกในงานเลี้ยงส่งท้ายปีบนเรือสำราญริมแม่น้ำเจ้าพระยา พร้อมกิจกรรมจับรางวัลและการแสดงจากแต่ละทีม...', date: '30 ก.ค 69' },
  { e: Trophy, g: ['#d53f8c', '#ed64a6'], tag: 'ทีม PFM', img: media('act-sports.webp'), dept: 'cac-pfm', t: 'ผลการแข่งขัน Terrabit Sports Day 2569', d: 'ขอแสดงความยินดีกับสีชมพูที่คว้าแชมป์รวมปีนี้ ขอบคุณทุกสีที่ร่วมเชียร์และแข่งขันกันอย่างสนุกสนาน...', date: '25 ก.ค 69' },
  { e: ShieldCheck, g: ['#1C3A5C', '#4A90A4'], tag: 'ทีม SQA', dept: 'sqa', t: 'ผ่านการตรวจประเมิน ISO/IEC 27001 ประจำปี', d: 'เทอราบิทผ่านการตรวจติดตามมาตรฐานความมั่นคงปลอดภัยสารสนเทศประจำปีโดยไม่มีข้อบกพร่องหลัก ขอบคุณทุกทีมที่ให้ความร่วมมือ...', date: '22 ก.ค 69' },
  { e: Laptop, g: ['#27AE97', '#1C3A5C'], tag: 'ทีม ISD', dept: 'isd', t: 'เปิดตัวระบบจองห้องประชุมออนไลน์', d: 'ตั้งแต่วันที่ 1 สิงหาคมเป็นต้นไป พนักงานสามารถจองห้องประชุมผ่านอินทราเน็ตได้ทันที ดูห้องว่างแบบเรียลไทม์และรับแจ้งเตือนก่อนเริ่มประชุม...', date: '18 ก.ค 69' },
  { e: HeartPulse, g: ['#27AE97', '#8EBA3E'], tag: 'ทีม HR', dept: 'cac-hr', t: 'เปิดลงทะเบียนตรวจสุขภาพประจำปี 2569', d: 'ฝ่าย HR เปิดให้ลงทะเบียนตรวจสุขภาพประจำปีที่โรงพยาบาลในเครือ เลือกวันและเวลาที่สะดวกได้ถึงวันที่ 31 กรกฎาคม...', date: '15 ก.ค 69' },
  { e: Waves, g: ['#2b6cb0', '#90cdf4'], tag: 'ทีม Admin', img: media('act-kayak.webp'), dept: 'cac', t: 'ทริปพนักงานพายคายัคริมทะเล 2569', d: 'ภาพบรรยากาศทริปพนักงานประจำปี พายคายัครอบเกาะ ดำน้ำดูปะการัง และปาร์ตี้ริมหาดยามเย็น...', date: '10 ก.ค 69' },
  { e: Handshake, g: ['#1C3A5C', '#BEE8DD'], tag: 'ทีม MBD', dept: 'mbd', t: 'ลงนามความร่วมมือกับพันธมิตรด้านคลาวด์รายใหม่', d: 'เทอราบิทลงนามบันทึกความร่วมมือกับผู้ให้บริการคลาวด์ระดับภูมิภาค เพื่อขยายบริการ Contact Center บนคลาวด์ให้ลูกค้าองค์กร...', date: '4 ก.ค 69' },
  { e: GraduationCap, g: ['#8EBA3E', '#27AE97'], tag: 'ทีม PFM', dept: 'cac-pfm', t: 'หลักสูตรใหม่ Data Literacy สำหรับทุกคน', d: 'คอร์สออนไลน์ 4 บท เรียนพื้นฐานการอ่านข้อมูลและสร้างกราฟอย่างถูกต้อง เรียนจบรับใบประกาศและเหรียญสะสม 30 เหรียญ...', date: '28 มิ.ย 69' },
  { e: Landmark, g: ['#2b6cb0', '#63b3ed'], tag: 'ประกาศ', img: media('act-overseas.webp'), dept: null, t: 'ทัศนศึกษาต่างประเทศ เยี่ยมชมสถาปัตยกรรมยุโรป', d: 'ทีมผู้บริหารและพนักงานดีเด่นร่วมเดินทางทัศนศึกษา เยี่ยมชมเมืองเก่าและแลกเปลี่ยนแนวคิดการทำงานกับพันธมิตรต่างประเทศ...', date: '20 มิ.ย 69' },
  { e: Headset, g: ['#C7DC86', '#8EBA3E'], tag: 'ทีม CCM', dept: 'ccm', t: 'ทีม Operation ทำ SLA ได้ 99% ติดต่อกัน 6 เดือน', d: 'ขอชื่นชมทีม Operation ที่รักษาระดับบริการได้ตามเป้าหมายต่อเนื่องครึ่งปี พร้อมคะแนนความพึงพอใจลูกค้าเฉลี่ย 4.8 จาก 5...', date: '12 มิ.ย 69' },
  { e: Palette, g: ['#27AE97', '#1C3A5C'], tag: 'ทีม Graphic', dept: 'cac-graphic', t: 'แนะนำ Brand Guideline ฉบับใหม่', d: 'ทีม Graphic ปรับคู่มือแบรนด์ใหม่ ใช้สีหลัก 4 สีและฟอนต์ชุดเดียวกันทุกช่องทาง ดาวน์โหลดเทมเพลตได้ที่หน้าดาวน์โหลด...', date: '5 มิ.ย 69' },
  { e: Droplets, g: ['#553c9a', '#9f7aea'], tag: 'ประกาศ', img: media('act-songkran.webp'), dept: null, t: 'สงกรานต์เทอราบิทเทีย รดน้ำขอพรผู้บริหาร', d: 'บรรยากาศงานสงกรานต์ประจำปี พนักงานร่วมรดน้ำขอพรผู้บริหาร แต่งกายผ้าไทย และร่วมเล่นเกมชิงรางวัล...', date: '15 เม.ย 69' },
  { e: HandHeart, g: ['#744210', '#d69e2e'], tag: 'ประกาศ', img: media('act-merit.webp'), dept: null, t: 'ทำบุญบริษัทประจำปี 2569', d: 'บริษัทจัดพิธีทำบุญตักบาตรและถวายภัตตาหารเพลพระสงฆ์ 9 รูป เพื่อเป็นสิริมงคลแก่พนักงานทุกคนในปีใหม่...', date: '6 ม.ค 69' },
  { e: Gift, g: ['#c05621', '#f6ad55'], tag: 'ทีม HR', img: media('act-gift.webp'), dept: 'cac-hr', t: 'ของขวัญปีใหม่สำหรับพนักงานทุกคน', d: 'รับของขวัญปีใหม่ได้ที่ฝ่าย HR ชั้น 12 ตั้งแต่วันนี้ถึงวันที่ 16 มกราคม กรุณานำบัตรพนักงานมาด้วย...', date: '2 ม.ค 69' },
  // Condolences are posted as a company notice people react to and comment on, not as cards (mook 2026-10-30). Mock until HR posts real ones.
  {
    e: Flower2, g: ['#4A5560', '#A7B1B8'], tag: 'ประกาศ', dept: null, condolence: true,
    t: 'ขอแสดงความเสียใจกับครอบครัวพี่อ้อม ศิริพร วงศ์ใหญ่', date: '29 ต.ค 69',
    d: 'ขอแสดงความเสียใจกับพี่อ้อม ศิริพร วงศ์ใหญ่ Chief, PMD และครอบครัว ในการสูญเสียคุณพ่อ',
    body: [
      'บริษัท เทอราบิท จำกัด และเพื่อนพนักงานทุกคน ขอแสดงความเสียใจอย่างสุดซึ้งกับพี่อ้อม ศิริพร วงศ์ใหญ่ Chief, PMD และครอบครัว ในการสูญเสียคุณพ่อ ขอให้ดวงวิญญาณของท่านไปสู่สุคติ',
      'สวดพระอภิธรรม วันที่ 29 ต.ค. – 2 พ.ย. 2569 เวลา 19:00 น. ณ ศาลา 7 วัดธาตุทอง ถนนสุขุมวิท ฌาปนกิจ วันที่ 3 พ.ย. 2569 เวลา 16:00 น.',
      'ร่วมแสดงความไว้อาลัยและส่งกำลังใจให้พี่อ้อมได้ที่ช่องความคิดเห็นด้านล่าง',
    ],
  },
  // Company lunch menu: `lunch` puts the menu and a link to this post on that day in the home calendar (mook 2026-10-30).
  {
    e: UtensilsCrossed, g: ['#1F7FB0', '#27AE97'], tag: 'ทีม Admin', dept: null, img: media('lunch-2569-11-02.gif'), poster: true,
    t: 'Happy Lunch จันทร์ 2 พ.ย. 69 บะหมี่ไก่ทอด + พุดดิ้งมะพร้าว', date: '30 ต.ค 69', annT: '30 ต.ค 69, 15:00 น.',
    d: 'เมนูเลี้ยงข้าวกลางวันบริษัทวันจันทร์ที่ 2 พฤศจิกายน 2569 บะหมี่ไก่ทอดร้านลุงเลื่อน และพุดดิ้งมะพร้าว',
    body: [
      'Happy Lunch รอบนี้ วันจันทร์ที่ 2 พฤศจิกายน 2569 เวลา 12:00 - 13:00 น. เสิร์ฟบะหมี่ไก่ทอดจากร้านลุงเลื่อน ร้านเก่าแก่ความอร่อยกว่า 60 ปี ตบท้ายด้วยพุดดิ้งมะพร้าวเย็นๆ',
      'เชิญพนักงานทุกคนที่ห้อง terrabistro ได้เลยค่ะ',
    ],
    lunch: { y: 2026, m: 10, d: 2, menu: 'บะหมี่ไก่ทอด (ร้านลุงเลื่อน) · พุดดิ้งมะพร้าว' },
  },
];

/** News index of the lunch-menu post for a day, or -1. */
export const lunchPostIndex = (y, m, d) => NEWS.findIndex((n) => n.lunch && n.lunch.y === y && n.lunch.m === m && n.lunch.d === d);

/** Keyword match on title, summary, tag and date (case-insensitive). Empty keyword matches everything. */
export const matchNews = (n, q) => {
  const k = q.trim().toLowerCase();
  return !k || [n.t, n.d, n.tag, n.date].some((v) => v?.toLowerCase().includes(k));
};

/** Second paragraph shared by every article body. */
export const ARTICLE_OUTRO = 'เทอราบิทยังคงมุ่งมั่นพัฒนาโซลูชันและยกระดับการให้บริการอย่างต่อเนื่อง เพื่อส่งมอบคุณค่าและประสบการณ์ที่เหนือความคาดหมายให้แก่คู่ค้าและพันธมิตรของเรา';

/** Likes other people already gave, per article index. */
export const LIKE_COUNTS = {
  0: 12, 1: 8, 2: 5, 3: 15, 4: 7, 5: 9, 6: 24, 7: 31, 8: 11, 9: 18, 10: 6, 11: 21, 12: 9,
  13: 7, 14: 13, 15: 10, 16: 8, 17: 19, 18: 16, 19: 27, 20: 42, 21: 17,
};

/** Views from before this session, per article index (mock until the back office counts them). */
export const VIEW_COUNTS = {
  0: 486, 1: 1290, 2: 342, 3: 615, 4: 271, 5: 398, 6: 1034, 7: 872, 8: 455, 9: 520, 10: 233, 11: 690, 12: 318,
  13: 207, 14: 301, 15: 264, 16: 377, 17: 1148, 18: 742, 19: 905, 20: 318, 21: 264,
};

const TH_MONTHS = ['ม.ค', 'ก.พ', 'มี.ค', 'เม.ย', 'พ.ค', 'มิ.ย', 'ก.ค', 'ส.ค', 'ก.ย', 'ต.ค', 'พ.ย', 'ธ.ค'];
/** "16 มิ.ย 69" → sortable number (yymmdd). */
export function newsTime(n) {
  const [d, m, y] = n.date.split(' ');
  return Number(y) * 10000 + (TH_MONTHS.indexOf(m) + 1) * 100 + Number(d);
}

/** Sort choices in the news filter. */
/** "ข่าวที่ถูกใจ" filter: every story, or only the ones hearted on their card. */
export const NEWS_LIKED = [['all', 'ทุกข่าว'], ['hearted', 'เฉพาะที่กดหัวใจไว้']];
export const NEWS_SORTS = [['new', 'ข่าวใหม่สุด'], ['views', 'ยอดดูมากสุด'], ['engage', 'มีส่วนร่วมมากสุด']];

/** Seed comments per article index. */
export const INITIAL_COMMENTS = {
  0: [{ n: 'ก้อง', t: 'ยินดีด้วยครับทีม PMD 👏', d: '2 ชม.ที่แล้ว' }, { n: 'อรรถ', t: 'งานนี้ได้ความรู้เยอะเลย อยากไปด้วยครั้งหน้า', d: '1 ชม.ที่แล้ว' }],
  1: [{ n: 'พี่เล็ก', t: 'ขอบคุณสำหรับประกาศค่ะ', d: 'เมื่อวาน' }],
  20: [{ n: 'ก้อง', t: 'ขอแสดงความเสียใจด้วยครับพี่อ้อม 🙏', d: '3 ชม.ที่แล้ว' }, { n: 'อรรถ', t: 'ขอให้คุณพ่อไปสู่สุคตินะครับ ส่งกำลังใจให้ครับ', d: '2 ชม.ที่แล้ว' }],
};

/** Pool of colleagues used to fill the "liked by" list. [name, team] */
export const LIKERS = [['สมชาย ใจดี', 'ทีม HR'], ['พิมพ์ชนก รุ่งเรือง', 'Marketing'], ['ธนากร วงศ์สกุล', 'Engineering'], ['นภัสสร แก้วมณี', 'Design'], ['วีรภัทร สุขสวัสดิ์', 'Sales'], ['กนกวรรณ ศรีสุข', 'Finance'], ['ภูริช เจริญผล', 'Engineering'], ['อรอุมา พงษ์ไทย', 'ทีม HR'], ['ชยุต มั่นคง', 'Operations'], ['ปาริชาติ ทองดี', 'Marketing'], ['ณัฐพล บุญมา', 'Engineering'], ['สุพัตรา คำแก้ว', 'Legal'], ['รัชพล ชัยมงคล', 'Sales'], ['มนัสวี อินทร์แก้ว', 'Design'], ['ศิริพร เพชรรัตน์', 'Finance']];


/** Title without the trailing "..." used on cards. */
export const fullTitle = (n) => n.t.replace('...', '');

/** Publisher name shown in meta lines ("ทีม PMD" → "PMD"). */
export const publisher = (n) => n.tag.replace('ทีม ', '');

/** How many stories can be pinned to the top of the News page. */
export const MAX_PINS = 3;

/** How many of the newest stories the signed-in hero slider shows. */
export const FEATURED_COUNT = 6;

/** How many of the newest stories the public home page shows (2 rows of 4). */
export const HOME_NEWS_COUNT = 8;

export const wrapIndex = (i) => ((i % NEWS.length) + NEWS.length) % NEWS.length;

/** Inline background for a news image: the photo, or the gradient when there is none. */
export const newsBg = (n) => (n.img
  ? { backgroundImage: `url(${n.img})` }
  : { background: `linear-gradient(135deg,${n.g[0]},${n.g[1]})` });
