// Skills people add to their profile and colleagues endorse, like LinkedIn but company-only (mook 2026-10-31).
// Used to find who can help with a task: org chart search and Terby. No pay or evaluation data is ever involved.
import { useSyncExternalStore } from 'react';
import { ORG_PEOPLE } from '@/data/org';
import { ME } from '@/data/me';
import { jdOf } from '@/features/about/orgJd';
import { earn, refund } from '@/features/rewards/coinStore';
import { orgHiddenNow } from '@/features/profile/personalStore';

export const SKILL_LIMIT = 10;
export const SKILL_MAX = 30;

/** Quick picks in the editor. */
export const SKILL_SUGGESTIONS = ['Excel', 'Power BI', 'Figma', 'Photoshop', 'ตัดต่อวิดีโอ', 'ถ่ายภาพ', 'เขียนคอนเทนต์', 'นำเสนองาน', 'ภาษาอังกฤษ', 'ภาษาญี่ปุ่น', 'SQL', 'Python', 'งานสัญญา', 'จัดอีเวนต์'];

/** Other words people type for a skill, so "ทำ dashboard" finds Power BI. Keys are lower case. */
const ALIASES = {
  'power bi': ['dashboard', 'แดชบอร์ด', 'รายงาน', 'report', 'กราฟ'],
  excel: ['สเปรดชีต', 'spreadsheet', 'ตาราง', 'สูตร'],
  figma: ['ui', 'ux', 'ออกแบบหน้าจอ', 'แอป', 'เว็บ'],
  photoshop: ['รีทัช', 'แต่งรูป', 'กราฟิก', 'โปสเตอร์'],
  illustrator: ['โลโก้', 'logo', 'กราฟิก', 'โปสเตอร์'],
  'ตัดต่อวิดีโอ': ['วิดีโอ', 'วีดีโอ', 'video', 'vdo', 'คลิป', 'premiere'],
  'ถ่ายภาพ': ['ถ่ายรูป', 'ช่างภาพ', 'photo'],
  'เขียนคอนเทนต์': ['คอนเทนต์', 'content', 'แคปชัน', 'บทความ', 'โพสต์'],
  'นำเสนองาน': ['พรีเซนต์', 'present', 'สไลด์', 'slide', 'pitch'],
  'ภาษาอังกฤษ': ['english', 'อังกฤษ', 'แปล'],
  'ภาษาญี่ปุ่น': ['japanese', 'ญี่ปุ่น'],
  sql: ['database', 'ฐานข้อมูล', 'query', 'ดึงข้อมูล'],
  python: ['script', 'สคริปต์', 'automate', 'อัตโนมัติ'],
  'งานสัญญา': ['สัญญา', 'contract', 'กฎหมาย'],
  'จัดอีเวนต์': ['อีเวนต์', 'event', 'งานเลี้ยง', 'กิจกรรม'],
  'customer experience': ['cx', 'ลูกค้า'],
  'contact center': ['คอลเซ็นเตอร์', 'call center', 'genesys'],
};

/** Mock skills: person id -> [[skill, [ids who endorsed]], ...]. */
const SEED = {
  mook: [['Figma', ['gong', 'aut', 'cac', 'coo']], ['Illustrator', ['gong', 'aut']], ['Photoshop', ['gong']], ['ถ่ายภาพ', []]],
  gong: [['Photoshop', ['mook', 'aut', 'cac', 'pmd', 'ccm']], ['Illustrator', ['mook', 'aut']], ['Figma', ['mook']]],
  aut: [['ตัดต่อวิดีโอ', ['mook', 'gong', 'cac', 'coo', 'ceo', 'pmd', 'isd', 'ccm']], ['ถ่ายภาพ', ['mook', 'gong']], ['ภาษาญี่ปุ่น', ['mook']]],
  coo: [['ถ่ายภาพ', ['aut', 'mook', 'gong']], ['นำเสนองาน', ['ceo', 'cso', 'cac']], ['Customer Experience', ['ccm', 'mbd']]],
  cso: [['Power BI', ['coo', 'sqa', 'pmd', 'ifs']], ['Excel', ['coo', 'ifs']], ['นำเสนองาน', ['ceo']]],
  cto: [['Python', ['isd', 'ccs', 'bss']], ['SQL', ['isd', 'bss']]],
  ccm: [['Contact Center', ['coo', 'cto', 'mbd', 'isd']], ['Customer Experience', ['coo', 'mbd']]],
  cac: [['เขียนคอนเทนต์', ['mook', 'gong', 'aut']], ['จัดอีเวนต์', ['mook', 'gong', 'aut', 'coo', 'ceo']], ['ภาษาอังกฤษ', ['coo']]],
  mbd: [['นำเสนองาน', ['coo', 'ceo', 'ccm']], ['ภาษาอังกฤษ', ['ceo', 'coo']]],
  pmd: [['Excel', ['cso', 'sqa', 'ifs']], ['นำเสนองาน', ['cso']]],
  sqa: [['Excel', ['pmd']], ['SQL', ['isd']]],
  ifs: [['Excel', ['cso', 'pmd', 'sqa', 'coo']], ['Power BI', ['cso', 'pmd']], ['งานสัญญา', ['ceo', 'coo', 'cso']]],
  isd: [['SQL', ['cto', 'bss', 'ccs']], ['Python', ['cto', 'sqa']], ['Power BI', ['cso']]],
  ccs: [['Contact Center', ['ccm', 'cto', 'isd']], ['Python', ['cto']]],
  bss: [['SQL', ['cto', 'isd']], ['Excel', ['ifs']]],
};

let state = SEED;
const listeners = new Set();
const subscribe = (l) => { listeners.add(l); return () => listeners.delete(l); };
const emit = () => listeners.forEach((l) => l());

export const useSkills = (id) => useSyncExternalStore(subscribe, () => state)[id] || [];
export const useAllSkills = () => useSyncExternalStore(subscribe, () => state);
export const skillsOf = (id) => state[id] || [];
/** Skills a person switched off for the Org Chart (only I can, in my profile): hidden from the card and the helper search (mook 2026-10-31). */
export const skillsHidden = (id) => id === ME.id && !!orgHiddenNow().skills;

/** Most endorsed first. */
export const sortedSkills = (list) => [...list].sort((a, b) => b[1].length - a[1].length);

/** Saves my skill names (blank and repeated ones dropped); kept skills keep their endorsements. */
export function setMySkills(names) {
  const old = Object.fromEntries(skillsOf(ME.id));
  const seen = new Set();
  const next = names.map((n) => n.trim().slice(0, SKILL_MAX)).filter((n) => {
    const k = n.toLowerCase();
    if (!n || seen.has(k)) return false;
    seen.add(k);
    return true;
  }).slice(0, SKILL_LIMIT).map((n) => [n, old[n] || []]);
  state = { ...state, [ME.id]: next };
  emit();
}

/** Endorse (or take back) someone else's skill as me: +1 coin (5 a day, once per skill), undo takes it back (mook 2026-10-31). */
export function toggleEndorse(id, skill) {
  if (id === ME.id) return;
  const had = (skillsOf(id).find(([s]) => s === skill)?.[1] || []).includes(ME.id);
  if (had) refund('endorse', `${id}:${skill}`); else earn('endorse', `${id}:${skill}`);
  state = {
    ...state,
    [id]: skillsOf(id).map(([s, by]) => (s !== skill ? [s, by] : [s, by.includes(ME.id) ? by.filter((x) => x !== ME.id) : [...by, ME.id]])),
  };
  emit();
}

const norm = (v) => (v || '').toLowerCase();
/** Does the query mention this skill (its name or one of its other words)? */
const skillHit = (q, skill) => {
  const k = norm(skill);
  return q.includes(k) || (q.length >= 3 && k.includes(q)) || (ALIASES[k] || []).some((a) => q.includes(a));
};
/** Does the query share a word of 3+ letters with this text (job duties, position)? */
const textHit = (q, text) => {
  const t = norm(text);
  if (q.length >= 3 && t.includes(q)) return true;
  return q.split(/\s+/).some((w) => w.length >= 3 && t.includes(w));
};

/**
 * People who can help with a task, best first: { id, why: [reasons] }.
 * Skills count most (more endorsements rank higher), then job duties in the JD and position. Only shows work info.
 */
export function findHelpers(query, limit = 5) {
  const q = norm(query).trim();
  if (q.length < 2) return [];
  return Object.keys(ORG_PEOPLE).map((id) => {
    const p = ORG_PEOPLE[id];
    const why = [];
    let score = 0;
    // Hidden skills are not searched: the person can still be found through their JD duties.
    sortedSkills(skillsHidden(id) ? [] : skillsOf(id)).forEach(([s, by]) => {
      if (!skillHit(q, s)) return;
      score += 10 + by.length;
      why.push(by.length ? `ถนัด ${s} · เพื่อนรับรอง ${by.length} คน` : `ถนัด ${s}`);
    });
    const jd = jdOf(id);
    if (textHit(q, [p.pos, p.resp, ...(jd?.duties || [])].join(' '))) { score += 4; why.push('ตรงกับหน้าที่ใน JD'); }
    return { id, score, why };
  }).filter((r) => r.score > 0).sort((a, b) => b.score - a.score).slice(0, limit);
}
