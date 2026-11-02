import { HR_GROUPS } from '@/data/hrGroups';
import { HR_DOCS } from './data';

/** Every string inside an HR document (headings, notes, tables, cards), tags stripped. */
function docText(v) {
  if (typeof v === 'string') return v.replace(/<[^>]+>/g, ' ');
  if (Array.isArray(v)) return v.map(docText).join(' ');
  if (v && typeof v === 'object') return Object.values(v).map(docText).join(' ');
  return '';
}

/** One searchable row per HR topic: its group, index, title and the full text of its document. */
const INDEX = HR_GROUPS.flatMap((g) => g.items.map((t, i) => ({
  g: g.k, i, t, group: g.l, text: `${t} ${docText(HR_DOCS[`${g.k}:${i}`])}`.toLowerCase(),
})));

/** HR topics whose title or content contains every word of `q`; title hits first. */
export function searchHr(q) {
  const words = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  const hits = INDEX.filter((r) => words.every((w) => r.text.includes(w)));
  const inTitle = (r) => words.every((w) => r.t.toLowerCase().includes(w));
  return [...hits.filter(inTitle), ...hits.filter((r) => !inTitle(r))];
}
