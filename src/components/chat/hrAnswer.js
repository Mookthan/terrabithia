// Terby as HR assistant (mook 2026-10-31): answers HR questions from the HR page's own documents.
// Prototype: keyword match per topic. The real assistant will read the same HR documents through the back end.
import { PATHS } from '@/routes/paths';
import { HR_GROUPS } from '@/data/hrGroups';
import { HR_DOCS, HR_NEWS } from '@/features/hr/data';

/** Extra words people use for each topic ("group:index"); the topic title always counts too. Lower case. */
const TOPIC_WORDS = {
  'benefit:0': ['ประกันสังคม', 'sso', 'ประกันตน'],
  'benefit:1': ['เงินทดแทน', 'บาดเจ็บจากงาน', 'ประสบอันตราย', 'อุบัติเหตุจากงาน'],
  'benefit:2': ['สำรองเลี้ยงชีพ', 'pvd', 'provident'],
  'benefit:3': ['สงเคราะห์ลูกจ้าง'],
  'benefit:4': ['ประกันสุขภาพ', 'ประกันอุบัติเหตุ', 'ประกันกลุ่ม', 'ค่ารักษา', 'opd', 'ipd', 'เบิกค่า'],
  'benefit:5': ['ตรวจสุขภาพ'],
  'benefit:6': ['ของขวัญ', 'เงินช่วยเหลือ', 'งานแต่ง', 'แต่งงาน', 'งานศพ'],
  'leave:0': ['วันหยุดประจำปี', 'วันหยุดบริษัท', 'วันหยุดนักขัตฤกษ์', 'ปฏิทินวันหยุด', 'หยุดวันไหน'],
  'leave:1': ['สิทธิ์ลา', 'สิทธิในการลา', 'ลาได้กี่วัน', 'ลาอะไรได้บ้าง'],
  'leave:2': ['พักร้อน', 'annual leave'],
  'leave:3': ['ลากิจ'],
  'leave:4': ['ลาป่วย', 'ใบรับรองแพทย์', 'ไม่สบาย', 'ป่วย'],
  'leave:5': ['ลาคลอด', 'คลอดบุตร', 'ตั้งครรภ์', 'ท้อง'],
  'leave:6': ['รับราชการ', 'เกณฑ์ทหาร', 'ทหาร'],
  'leave:7': ['ศาสนกิจ', 'ลาบวช', 'อุปสมบท', 'ฮัจญ์'],
  'leave:8': ['ฝึกอบรม', 'ลาเรียน', 'ลาสอบ'],
  'regulations:0': ['วันทำงาน', 'เวลาทำงาน', 'เข้างานกี่โมง', 'เวลาเข้างาน', 'เลิกงาน', 'ทำงานกี่โมง'],
  'regulations:1': ['standby', 'สแตนด์บาย', 'สแตนบาย'],
  'regulations:2': ['มาสาย', 'เข้างานสาย', 'เข้าสาย', 'มาทำงานสาย'],
  'regulations:3': ['ขาดงาน'],
  'regulations:4': ['ลาออก', 'resign'],
};

/** HR posts Terby can also point to: [post id, words]. */
const POST_WORDS = [['fgf-2569', ['แนะนำเพื่อน', 'ชวนเพื่อน', 'friend get friend', 'ค่าแนะนำ']]];

const TOPICS = HR_GROUPS.flatMap((g) => g.items.map((t, i) => {
  const k = `${g.k}:${i}`;
  return { k, g: g.k, i, t, words: [t.toLowerCase(), ...(TOPIC_WORDS[k] || [])] };
}));

/** Plain text of an HR document, tags and line breaks flattened. */
function plain(v) {
  if (typeof v === 'string') return v.replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  if (Array.isArray(v)) return v.map(plain).filter(Boolean).join(' ');
  if (v && typeof v === 'object') return Object.values(v).map(plain).filter(Boolean).join(' ');
  return '';
}

/** The short answer for a topic: its key sentence, else its first note or text, cut to a readable length. */
function summary(doc) {
  if (!doc) return '';
  const s = doc.key || doc.note || plain(doc.parts?.[0]?.note) || plain(doc.parts?.[0]) || plain(doc.cards?.[0]) || '';
  const t = plain(s);
  return t.length > 240 ? `${t.slice(0, 238).replace(/\s+\S*$/, '')}…` : t;
}

/** Longest word of `words` found in the question (0 = no match). */
const hitLen = (q, words) => Math.max(0, ...words.filter((w) => q.includes(w)).map((w) => w.length));

/** Reply for an HR question, or null when no HR topic matches. */
export function hrAnswer(q) {
  const ql = q.toLowerCase();
  const post = POST_WORDS.map(([id, words]) => ({ id, n: hitLen(ql, words) })).sort((a, b) => b.n - a.n)[0];
  const best = TOPICS.map((t) => ({ t, n: hitLen(ql, t.words) })).sort((a, b) => b.n - a.n)[0];
  if (post?.n && post.n >= (best?.n || 0)) {
    const n = HR_NEWS.find((x) => x.id === post.id);
    return { text: `${n.t}\n${summary(HR_DOCS['post:fgf'])}`, links: [{ label: 'ดูประกาศจาก HR', to: PATHS.hrPost(post.id) }] };
  }
  if (!best?.n) return null;
  const { t } = best;
  const s = summary(HR_DOCS[t.k]);
  return {
    text: s ? `เรื่อง${t.t}ค่ะ\n${s}\nรายละเอียดทั้งหมดอยู่ในหัวข้อนี้ที่หน้า HR ถ้ายังไม่ชัด ติดต่อ HR ได้ที่ hr@terrabit.co.th ค่ะ` : `เรื่อง${t.t} อยู่ในหน้า HR ค่ะ กดปุ่มด้านล่างเพื่อดูรายละเอียดได้เลย`,
    links: [{ label: `เปิดหัวข้อ ${t.t}`, to: PATHS.hrItem(t.g, t.i) }],
  };
}
