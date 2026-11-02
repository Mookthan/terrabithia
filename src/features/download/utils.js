import { DL_SEC } from './data';

export const dlExt = (n) => n.split('.').pop().toLowerCase();

const TH_MONTHS = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
/** A file only counts as new for this long after its upload. */
const NEW_DAYS = 30;

/** "5 ต.ค. 69" (Buddhist year, 2 digits) -> timestamp. */
export function parseThaiDate(s) {
  const [d, m, y] = s.split(' ');
  return new Date(2500 + Number(y) - 543, TH_MONTHS.indexOf(m), Number(d)).getTime();
}

/**
 * Newest upload first; the "ใหม่" badge goes only on the section's latest upload (every file
 * sharing that date), and only while it is recent, so it always sits at the top left.
 */
function prepare(sc, now) {
  const files = sc.f
    .map((f) => ({ ...f, at: parseThaiDate(f.u) }))
    .sort((a, b) => b.at - a.at);
  const latest = files[0]?.at;
  const fresh = latest && now - latest <= NEW_DAYS * 864e5;
  return { ...sc, f: files.map((f) => ({ ...f, nw: Boolean(fresh && f.at === latest) })) };
}

export const SECTIONS = DL_SEC.map((sc) => prepare(sc, Date.now()));

/** Files of section `sc` matching the search query and category filter. */
export function filterFiles(sc, query, cat) {
  const q = query.trim().toLowerCase();
  return sc.f.filter((f) =>
    (!q || f.n.toLowerCase().includes(q) || sc.t.toLowerCase().includes(q))
    && (cat === 'all' || (cat.startsWith('ext:') ? dlExt(f.n) === cat.slice(4) : cat === `sec:${sc.k}`)));
}
