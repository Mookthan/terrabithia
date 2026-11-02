import { ME } from '@/data/me';
import { DEPTS } from '@/data/departments';

const DEPT_LABEL = Object.fromEntries(DEPTS.flatMap((d) => [[d.k, d.l], ...(d.c || []).map((ch) => [ch.k, ch.l])]));

/** Whether the signed-in employee may see a course: open to all, or their department (or its parent) is listed. */
export function canSee(course, dept = ME.dept) {
  return course.aud === 'all' || course.aud.some((k) => dept === k || dept.startsWith(`${k}-`));
}

/** "ทุกแผนก" or the listed departments, for the course info card. */
export function audienceLabel(course) {
  return course.aud === 'all' ? 'ทุกแผนก' : `เฉพาะ ${course.aud.map((k) => DEPT_LABEL[k] || k).join(', ')}`;
}
