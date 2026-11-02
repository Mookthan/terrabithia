// Static profile data for the signed-in user (prototype values).
/**
 * Personal box. Fields with `edit` can be changed by the employee; the rest come from EzyHR / the account
 * and are changed through HR. `max` caps the length, `type` is the input type. `org` fields also show on the Org Chart card; optional ones get a show/hide switch. Education comes from EzyHR (locked, mook 2026-10-30). `optional` fields may be left empty:
 * empty ones are left out of the org-chart card (name, position, nickname, JD and KPI always show company-wide, mook 2026-10-30).
 */
export const PERSONAL_FIELDS = [
  { k: 'nick', l: 'ชื่อเล่น:', v: 'มุก', edit: true, max: 20, org: true },
  { k: 'gender', l: 'เพศ:', v: 'หญิง' },
  { k: 'birthday', l: 'วันเกิด:', v: '20 พ.ย 2541' },
  { k: 'phone', l: 'เบอร์ติดต่อ:', v: '063 369 5456', edit: true, type: 'tel', max: 20 },
  { k: 'email', l: 'อีเมล:', v: 'thanchanok@terrabit.co.th' },
  { k: 'edu', l: 'การศึกษา:', v: 'ปริญญาตรี นิเทศศาสตร์ — Silpakorn University', optional: true, org: true },
  { k: 'interests', l: 'ความสนใจ:', v: 'เพลง, ศิลปะ, เกม', edit: true, max: 100, optional: true, org: true },
];

/** Profile photo upload limits. */
export const PHOTO_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const PHOTO_MAX_MB = 5;

export const WORK_INFO = [
  ['รหัสพนักงาน:', '20522199'],
  ['แผนก:', 'Corporate Affairs & Communications (CAC)'],
  ['ตำแหน่ง:', 'Creative Designer'],
  ['ระดับ:', 'Tier 7'],
  ['วันที่เริ่มงาน:', '15 พ.ค 2565'],
  ['อายุงาน:', '4 ปี 5 เดือน 10 วัน'],
  ['ประเภทพนักงาน:', 'Full-Time'],
  ['ผู้บังคับบัญชา:', 'Peerapat Lohaanukul (Teelek)'],
  ['หน้าที่ความรับผิดชอบ:', 'ดูแลงานดีไซน์ภายในองค์กร ออกแบบเว็บไซต์ แอปพลิเคชัน ทำงานร่วมกับทีม ISD (SA,Dev)'],
];

/** Header offset used when jumping to the leave section. */
export const LEAVE_SCROLL_OFFSET = 84;

/**
 * Yearly evaluation results (mock; real data comes from HR). Today these go out by email as
 * password-protected files, so the profile keeps them hidden until the user re-enters their password.
 * y = Buddhist-era year, pending = not announced yet, file = PDF name for download.
 */
export const EVALUATIONS = [
  { y: 2569, pending: true },
  { y: 2568, grade: 'A', score: 4.6, label: 'ดีเยี่ยม', by: 'คุณทีเล็ก', date: '15 ม.ค. 2569', file: 'ผลประเมิน_2568.pdf' },
  { y: 2567, grade: 'B+', score: 4.1, label: 'ดีมาก', by: 'คุณทีเล็ก', date: '17 ม.ค. 2568', file: 'ผลประเมิน_2567.pdf' },
  { y: 2566, grade: 'B', score: 3.8, label: 'ดี', by: 'คุณพีเอ็ม', date: '16 ม.ค. 2567', file: 'ผลประเมิน_2566.pdf' },
];
/** Results hide again after this long without activity on the page. */
export const EVAL_IDLE_MS = 2 * 60 * 1000;

/** Full job description behind "ดู JD ฉบับเต็ม" (mock; real JD comes from HR). */
export const JD = {
  title: 'Creative Designer',
  updated: '1 ม.ค. 2569',
  purpose: 'ออกแบบสื่อและประสบการณ์ใช้งานดิจิทัลขององค์กร ให้สื่อสารแบรนด์ Terrabit ได้ชัดเจนและสม่ำเสมอทุกช่องทาง',
  duties: [
    'ออกแบบสื่อภายในองค์กร เช่น ประกาศ อินโฟกราฟิก และสื่อกิจกรรม',
    'ออกแบบ UI/UX ของเว็บไซต์และแอปพลิเคชันร่วมกับทีม ISD (SA, Dev)',
    'ดูแลและอัปเดต Brand Guideline และ Design System ของบริษัท',
    'เตรียมไฟล์งานและส่งต่อให้นักพัฒนาหรือโรงพิมพ์อย่างถูกต้อง',
    'สนับสนุนงานออกแบบให้ทีมอื่นตามที่ได้รับมอบหมาย',
  ],
  quals: [
    'ปริญญาตรีด้านออกแบบ นิเทศศิลป์ หรือสาขาที่เกี่ยวข้อง',
    'ใช้ Figma, Adobe Illustrator และ Photoshop ได้คล่อง',
    'เข้าใจหลัก UX และการออกแบบสำหรับหลายขนาดหน้าจอ',
  ],
  file: 'JD_Creative_Designer.pdf',
};

/**
 * KPIs per Buddhist-era year (mock). w = weight %, progress = % done (current year),
 * score = result out of 5 (locked with the evaluation result; null while the year is running).
 */
export const KPIS = {
  2569: [
    { n: 'ส่งงานออกแบบตรงเวลา', w: 30, target: '≥ 95% ของงานทั้งหมด', progress: 82, score: null },
    { n: 'ความพึงพอใจของผู้ขอใช้งาน', w: 25, target: 'คะแนนเฉลี่ย ≥ 4.2 / 5', progress: 70, score: null },
    { n: 'อัปเดต Design System', w: 20, target: '2 เวอร์ชันต่อปี', progress: 50, score: null },
    { n: 'เว็บไซต์ภายใน Terrabithia', w: 15, target: 'เปิดใช้งานภายใน Q4', progress: 90, score: null },
    { n: 'อบรมพัฒนาตนเอง', w: 10, target: '≥ 3 หลักสูตร', progress: 66, score: null },
  ],
  2568: [
    { n: 'ส่งงานออกแบบตรงเวลา', w: 30, target: '≥ 95% ของงานทั้งหมด', progress: 100, score: 4.8 },
    { n: 'ความพึงพอใจของผู้ขอใช้งาน', w: 30, target: 'คะแนนเฉลี่ย ≥ 4.0 / 5', progress: 100, score: 4.5 },
    { n: 'Brand Guideline ฉบับใหม่', w: 25, target: 'เผยแพร่ภายใน Q3', progress: 100, score: 4.6 },
    { n: 'อบรมพัฒนาตนเอง', w: 15, target: '≥ 3 หลักสูตร', progress: 100, score: 4.2 },
  ],
  2567: [
    { n: 'ส่งงานออกแบบตรงเวลา', w: 40, target: '≥ 90% ของงานทั้งหมด', progress: 100, score: 4.2 },
    { n: 'ความพึงพอใจของผู้ขอใช้งาน', w: 35, target: 'คะแนนเฉลี่ย ≥ 4.0 / 5', progress: 100, score: 4.0 },
    { n: 'อบรมพัฒนาตนเอง', w: 25, target: '≥ 2 หลักสูตร', progress: 100, score: 4.1 },
  ],
};
export const KPI_YEAR = 2569;
