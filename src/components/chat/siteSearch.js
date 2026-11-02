// Terby's site-wide search (mook 2026-10-31): news, albums, courses, knowledge posts and download files,
// so a question about anything on the site gets a link to where it is. Prototype keyword match.
import { PATHS } from '@/routes/paths';
import { NEWS, fullTitle } from '@/features/news/data';
import { ACTIVITIES } from '@/features/culture/data';
import { COURSES } from '@/features/courses/data';
import { INITIAL_POSTS } from '@/features/knowledge/data';
import { DL_SEC } from '@/features/download/data';

const strip = (v) => (v || '').replace(/<[^>]+>/g, ' ');

/** One row per thing: kind (shown in the reply), title, searchable text, link, sign-in needed. */
let index = null;
function build() {
  if (index) return index;
  index = [
    ...NEWS.map((n, i) => ({ kind: 'ข่าว', t: fullTitle(n), text: `${n.t} ${n.d} ${n.tag}`, to: PATHS.newsDetail(i) })),
    ...ACTIVITIES.map((a, i) => ({ kind: 'อัลบั้ม', t: a.t, text: `${a.t} ${a.tag} ${a.desc || ''}`, to: PATHS.activityAlbum(i) })),
    ...COURSES.map((c) => ({ kind: 'คอร์ส', t: c.ti, text: `${c.ti} ${c.d} ${c.tag}`, to: PATHS.courses, priv: true })),
    ...INITIAL_POSTS.map((p) => ({ kind: 'คลังความรู้', t: p.preview?.title || strip(p.html).slice(0, 60), text: `${strip(p.html)} ${p.preview?.title || ''}`, to: PATHS.knowledge, priv: true })),
    ...DL_SEC.map((s) => ({ kind: 'ดาวน์โหลด', t: s.t, text: `${s.t} ${s.f.map((f) => f.n).join(' ')}`, to: PATHS.download, priv: true })),
  ].map((r) => ({ ...r, text: r.text.replace(/\u2060/g, '').toLowerCase() }));
  return index;
}

/** Words that only make a question a question. */
const FILLER = /อยากรู้|อยากได้|อยากดู|มีไหม|มีมั้ย|หน่อย|ค่ะ|ครับ|คะ|ไหม|มั้ย|อะไร|บ้าง|เรื่อง|ขอ|หา|ดู|\?/g;

/** Score: letters of the question's words found in the row, plus letters of the row's title words found in the question
 * (Thai has no spaces, so "รูปงานตรุษจีน" still finds the album "สังสรรค์วันตรุษจีน"). */
function score(r, ql, words) {
  const a = words.filter((w) => r.text.includes(w)).reduce((n, w) => n + w.length, 0);
  const b = r.t.toLowerCase().split(/[\s:()（）/,-]+/).filter((w) => w.length >= 3 && ql.includes(w)).reduce((n, w) => n + w.length, 0);
  const th = (r.t.match(/[\u0E00-\u0E7F]{4,}/g) || []).flatMap((w) => [w.slice(-4), w.slice(-5), w.slice(-6)]).filter((w) => w.length >= 4 && ql.includes(w)).reduce((n, w) => Math.max(n, w.length), 0);
  return Math.max(a, b, th);
}

/** Best matches for a question: rows sharing the most words with it. */
export function searchSite(q, loggedIn, limit = 3) {
  const ql = q.toLowerCase().replace(FILLER, ' ');
  const words = ql.split(/\s+/).filter((w) => w.length >= 2);
  if (!words.length) return [];
  return build()
    .filter((r) => loggedIn || !r.priv)
    .map((r) => ({ r, n: score(r, ql, words) }))
    .filter((x) => x.n >= 3)
    .sort((a, b) => b.n - a.n)
    .slice(0, limit)
    .map((x) => x.r);
}
