// Certificates (courses finished on the site + outside training) and warning letters (mook 2026-11-05).
// Mock data until the back end: certificates from site courses arrive by themselves, outside ones are added
// by the owner (the PFM team approves them before they show on the Org Chart) or by HR; warning letters are added by HR only and are seen by the owner and HR, never on the Org Chart.
import { useSyncExternalStore } from 'react';
import { ME } from '@/data/me';

/** source: course = finished on the site (automatic), external = outside training, hr = added by HR. */
const SEED = {
  [ME.id]: [
    { id: 'c1', title: 'ปฐมนิเทศพนักงานใหม่', issuer: 'Terrabit Academy', m: 5, y: 2567, source: 'course' },
    { id: 'c2', title: 'ความปลอดภัยในการทำงาน', issuer: 'Terrabit Academy', m: 6, y: 2567, source: 'course' },
    { id: 'c3', title: 'Adobe Certified Professional: Illustrator', issuer: 'Adobe', m: 2, y: 2568, source: 'external', file: 'adobe-illustrator-cert.pdf' },
    { id: 'c5', title: 'Google UX Design Certificate', issuer: 'Coursera', m: 9, y: 2569, source: 'external', status: 'pending', file: 'google-ux-cert.pdf' },
    { id: 'c4', title: 'Figma Advanced Workshop', issuer: 'Skooldio', m: 8, y: 2568, source: 'hr' },
  ],
  gong: [
    { id: 'g1', title: 'Motion Design with After Effects', issuer: 'SkillLane', m: 11, y: 2567, source: 'external' },
    { id: 'g2', title: 'ปฐมนิเทศพนักงานใหม่', issuer: 'Terrabit Academy', m: 3, y: 2566, source: 'course' },
  ],
  aut: [{ id: 'a1', title: 'Premiere Pro for Video Editors', issuer: 'Adobe', m: 4, y: 2568, source: 'external' }],
  pmd: [{ id: 'p1', title: 'PMP (Project Management Professional)', issuer: 'PMI', m: 9, y: 2566, source: 'hr' }],
};

export const TH_MONTH = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
export const certDate = (c) => `${TH_MONTH[c.m - 1]} ${c.y}`;

let certs = SEED;
const subs = new Set();
const subscribe = (f) => { subs.add(f); return () => subs.delete(f); };
const emit = () => subs.forEach((f) => f());

const EMPTY = [];
/** Newest first. Includes certificates still waiting for HR (status 'pending'); see useApprovedCerts for the Org Chart. */
export function useCerts(id) {
  const all = useSyncExternalStore(subscribe, () => certs);
  return all[id] || EMPTY;
}
/** Only approved ones: what colleagues see on the Org Chart (mook 2026-11-05: the PFM team approves self-added certificates). */
export function useApprovedCerts(id) {
  const list = useCerts(id);
  return list.some((c) => c.status === 'pending') ? list.filter((c) => c.status !== 'pending') : list;
}
const sortNewest = (list) => [...list].sort((a, b) => b.y - a.y || b.m - a.m);
let nextId = 1;
export function addCert(cert) {
  certs = { ...certs, [ME.id]: sortNewest([...(certs[ME.id] || []), { ...cert, id: `n${nextId++}`, source: 'external', status: 'pending' }]) };
  emit();
}
/** Only certificates the owner added themselves can be removed by them. */
export function removeCert(id) {
  certs = { ...certs, [ME.id]: (certs[ME.id] || []).filter((c) => c.id !== id || c.source !== 'external') };
  emit();
}
certs = Object.fromEntries(Object.entries(certs).map(([k, v]) => [k, sortNewest(v)]));

/** The signed-in user's warning letters (HR adds them). level: verbal | written | final. */
export const WARNINGS = [
  { id: 'w1', level: 'verbal', reason: 'มาทำงานสายเกิน 3 ครั้งในเดือนเดียว', m: 3, y: 2567, until: 'มี.ค. 2568', active: false },
];
export const WARNING_LEVEL = {
  verbal: 'ตักเตือนด้วยวาจา',
  written: 'หนังสือเตือน',
  final: 'หนังสือเตือนครั้งสุดท้าย',
};
