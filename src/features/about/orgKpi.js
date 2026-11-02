// Mock KPIs per role for the org-chart person card (mook, 2026-10-27). Real KPIs come from HR / Performance Mgmt.
import { ORG_PEOPLE } from '@/data/org';
import { KPIS, KPI_YEAR } from '@/features/profile/data';

const BY_ID = {
  chairman: ['ผลตอบแทนผู้ถือหุ้นตามเป้าหมาย', 'แผนกลยุทธ์ 3 ปีผ่านการอนุมัติ'],
  ceo: ['รายได้รวมเติบโต 15% ต่อปี', 'ความพึงพอใจลูกค้า ≥ 90%'],
  coo: ['งานปฏิบัติการตรงตาม SLA ≥ 98%', 'ลดต้นทุนการดำเนินงาน 5%'],
  cso: ['ส่งมอบโครงการตรงเวลา ≥ 90%', 'ผ่านการตรวจมาตรฐาน ISO ทุกครั้ง'],
  cto: ['ระบบพร้อมใช้งาน ≥ 99.9%', 'ส่งมอบฟีเจอร์ตาม Roadmap ≥ 85%'],
  mook: ['ส่งงานออกแบบตรงเวลา ≥ 95%', 'แก้งานไม่เกิน 2 รอบต่อชิ้น'],
  gong: ['ส่งงานออกแบบตรงเวลา ≥ 95%', 'คอนเทนต์ภาพเคลื่อนไหว 8 ชิ้นต่อเดือน'],
  aut: ['ตัดต่อวิดีโอเสร็จตามกำหนด ≥ 95%', 'วิดีโอภายในองค์กร 4 ชิ้นต่อเดือน'],
};

const BY_DEPT = {
  HR: ['สรรหาพนักงานได้ภายใน 45 วัน', 'อัตราการลาออก < 10% ต่อปี'],
  'Finance Dept.': ['ปิดงบรายเดือนภายในวันที่ 5', 'ข้อผิดพลาดทางบัญชี 0 รายการ'],
  'Performance Mgmt. Dept.': ['ประเมินผลครบ 100% ตามรอบ', 'รายงาน KPI องค์กรทุกเดือน'],
  'CAA Dept.': ['ข่าวสารองค์กรเผยแพร่ตามแผน ≥ 95%', 'ตอบสื่อ/พันธมิตรภายใน 2 วัน'],
  'Admin Dept.': ['ดำเนินการคำขอภายใน 2 วันทำการ', 'ความพึงพอใจพนักงานต่องานธุรการ ≥ 85%'],
  'Operation Dept.': ['ตอบรับสายภายใน 20 วินาที ≥ 80%', 'แก้ปัญหาได้ในการติดต่อครั้งแรก ≥ 75%'],
  QA: ['คะแนนคุณภาพการบริการ ≥ 90%', 'ตรวจสอบสายสุ่ม 200 สายต่อเดือน'],
  'Sales Dept.': ['ยอดขายตามเป้ารายไตรมาส', 'ลูกค้าใหม่ 3 รายต่อไตรมาส'],
  'Assistant to MBD': ['เตรียมเอกสารประชุมครบก่อน 1 วัน', 'ติดตามงานตามมติประชุม 100%'],
  PM: ['ส่งมอบโครงการตรงเวลา ≥ 90%', 'งบประมาณไม่เกินแผน'],
  BA: ['Requirement ผ่านการยืนยันก่อนพัฒนา 100%', 'Change request หลังเริ่มพัฒนา < 10%'],
  'Std. Auditing': ['ตรวจติดตามภายในครบตามแผน', 'ข้อบกพร่องปิดภายใน 30 วัน'],
  'Tester Dept.': ['Test coverage ≥ 80%', 'บั๊กหลุดสู่ Production < 2 ต่อรอบ'],
  'System Infra.': ['ระบบพร้อมใช้งาน ≥ 99.9%', 'แพตช์ความปลอดภัยภายใน 14 วัน'],
  'IT Security': ['ไม่มีเหตุข้อมูลรั่วไหล', 'พนักงานผ่านอบรม Security 100%'],
  'Dev. Dept.': ['ส่งงานตาม Sprint ≥ 85%', 'Code review ภายใน 1 วัน'],
  'SA Dept.': ['ออกแบบระบบเสร็จก่อนเริ่ม Sprint', 'เอกสารระบบอัปเดตทุกรีลีส'],
  'System Engineer Dept.': ['ติดตั้งระบบลูกค้าตามกำหนด ≥ 95%', 'เคสแก้ไขภายใน SLA ≥ 95%'],
  'TBC Dept.': ['ดำเนินการคำขอภายใน SLA ≥ 95%', 'ความพึงพอใจผู้ใช้ ≥ 85%'],
  'IT Service Delivery Dept.': ['ปิด Ticket ภายใน SLA ≥ 95%', 'ความพึงพอใจผู้ใช้ ≥ 90%'],
  'IT Service Mgmt. Dept.': ['รายงานบริการ IT ทุกเดือน', 'ลด Incident ซ้ำ 20%'],
};
const CHIEF = ['บรรลุ KPI ของฝ่าย ≥ 90%', 'พัฒนาทีมตามแผน IDP ครบ 100%'];

/** KPI lines for a person in the org chart, or [] when none. */
export function kpiOf(id) {
  if (BY_ID[id]) return BY_ID[id];
  const p = ORG_PEOPLE[id];
  if (!p) return [];
  if (p.pos?.startsWith('Chief')) return CHIEF;
  const dept = p.dept?.split(' · ')[1];
  return BY_DEPT[dept] || [];
}

/** Shared items every role carries after its own KPIs. */
const COMMON = [
  { n: 'พัฒนาตนเองตามแผน IDP', target: '≥ 2 หลักสูตรต่อปี' },
  { n: 'การทำงานร่วมกับทีม', target: 'คะแนนจากหัวหน้า ≥ 4 / 5' },
];
const split = (line) => {
  const m = /^(.*?)\s*((?:≥|<|ภายใน|ไม่เกิน|\d).*)$/.exec(line);
  return m && m[1] ? { n: m[1], target: m[2] } : { n: line, target: 'ตามแผนของฝ่าย' };
};

/**
 * Full KPI list for the org-chart card: what the role must achieve this year (name + target).
 * Weights, progress and scores stay in the owner's profile only.
 */
export function kpiSheetOf(id) {
  if (id === 'mook') return KPIS[KPI_YEAR].map(({ n, target }) => ({ n, target }));
  const own = kpiOf(id).map(split);
  return [...own, ...COMMON];
}
