// Job description per org-chart person (mock, mook 2026-10-28): lets staff read a role and pass it on to a friend.
// Real JDs come from HR; mook's own reuses the profile JD so both places show the same document.
import { ORG_PEOPLE } from '@/data/org';
import { JD } from '@/features/profile/data';

const GENERIC_QUALS = ['ปริญญาตรีในสาขาที่เกี่ยวข้อง', 'ทำงานเป็นทีมและสื่อสารได้ดี'];

export function jdOf(id) {
  const p = ORG_PEOPLE[id];
  if (!p) return null;
  if (id === 'mook') return JD;
  return {
    title: p.pos,
    updated: '1 ม.ค. 2569',
    purpose: p.resp,
    duties: [p.resp],
    quals: GENERIC_QUALS,
    file: `JD_${p.pos.replace(/[^\w]+/g, '_')}.pdf`,
  };
}
