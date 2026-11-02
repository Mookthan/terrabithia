// Personal "showcase" albums (mook, 2026-10-27): photos of what someone is into, shown on their org-chart card.
// Prototype: photos live in the browser session; the real files go to the storage the back office picks.
import { media } from '@/lib/media';
import { ORG_PEOPLE } from '@/data/org';
import { BRANCH_KEYS, orgDeptsOf } from '@/features/about/orgModel';
import { interestTiles } from './interestTiles';

/** Storage per person. Placeholder until mook sets the real limit. */
export const MAX_MB = 20;
export const MAX_BYTES = MAX_MB * 1024 * 1024;
export const ACCEPT = 'image/jpeg,image/png,image/webp,image/gif';

/**
 * Who can see an album. `dept` = the owner's team (e.g. Graphic Design Dept.),
 * `branch` = the owner's division (e.g. CAC), `custom` = picked departments (org node ids), plus a division's
 * id when all its departments are picked so its chief can see too.
 */
export const VIS_OPTIONS = [
  { k: 'dept', l: 'ทีมของฉัน', d: 'คนในแผนกเดียวกัน' },
  { k: 'branch', l: 'ฝ่ายของฉัน', d: 'ทุกแผนกในฝ่ายเดียวกัน' },
  { k: 'company', l: 'ทั้งบริษัท', d: 'ทุกคนในบริษัท' },
  { k: 'custom', l: 'เลือกทีมหรือฝ่าย', d: 'ค้นหาและติ๊กเลือกได้หลายแผนก' },
];
export const visOf = (k) => VIS_OPTIONS.find((o) => o.k === k);
/** Short label of an album setting, e.g. "เลือก 3 แผนก". */
export const visLabel = (vis) => (vis.k === 'custom' && vis.ids.length ? `เลือก ${vis.ids.filter((i) => !BRANCH_KEYS.includes(i)).length} แผนก` : visOf(vis.k).l);

const ph = (file, cap, size) => ({ id: file, src: media(file), cap, size });

/**
 * Mock albums. mook's own has real photos; everyone else gets tiles from their interests (interestTiles).
 * Settings vary by person so the org chart shows both cases; `null` = no album yet, so nothing appears.
 */
const OWN = {
  mook: { vis: { k: 'company', ids: [] }, photos: [ph('0bceae6c21.jpg', 'ทริปถ่ายรูปวันหยุด', 1.8e6), ph('77f086f50c.jpg', 'งานคอนเสิร์ตที่ชอบ', 2.4e6), ph('1ebdd74f8e.jpg', '', 1.5e6)] },
};
const FIXED_VIS = { gong: 'dept', aut: null, coo: 'company', ceo: 'company', 'isd-0-p1': 'custom', 'sqa-1-p0': 'dept' };
// Repeating pattern for the rest: most share with the company, some keep it to their team/division, some have no album.
const VIS_CYCLE = ['company', 'company', null, 'dept', 'company', 'branch', 'company', null];

function buildSeed() {
  const out = { ...OWN };
  Object.entries(ORG_PEOPLE).forEach(([id, p], n) => {
    if (out[id] || !p.interest) return;
    const k = id in FIXED_VIS ? FIXED_VIS[id] : VIS_CYCLE[n % VIS_CYCLE.length];
    if (!k) return;
    out[id] = { vis: { k, ids: k === 'custom' ? ['cac', ...orgDeptsOf('cac'), 'isd', ...orgDeptsOf('isd')] : [] }, photos: interestTiles(p.interest, n) };
  });
  return out;
}
export const SEED_ALBUMS = buildSeed();

/** 2_400_000 → "2.3 MB"; under 1 MB → "340 KB". */
export const fmtMB = (bytes) => (bytes < 1024 * 1024
  ? `${Math.max(1, Math.round(bytes / 1024))} KB`
  : `${(bytes / 1024 / 1024).toFixed(1).replace(/\.0$/, '')} MB`);
