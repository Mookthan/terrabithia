// Daily "ทายใครเอ่ย" game (mook 2026-11-06): one colleague a day, clues from what they show on the Org Chart.
import { ORG_PEOPLE } from '@/data/org';
import { ME } from '@/data/me';
import { skillsOf, sortedSkills } from '@/features/showcase/skills';

/** People who can be an answer: anyone in the company but me with interests to give away.
 *  mook 2026-11-06: one whole-company game, linked only from the big Org Chart (no division game). */
const POOL = Object.keys(ORG_PEOPLE).filter((id) => id !== ME.id && ORG_PEOPLE[id].interest);

export const dayKey = (d = new Date()) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

// Small seeded random so everyone gets the same person and the same choices on the same day.
function rng(seed) {
  let h = 2166136261;
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

/** Today's puzzle: the answer, 4 shuffled choices and up to 4 clues (interests, skills, position, department last). */
export function puzzleFor(key = dayKey()) {
  const pool = POOL;
  const r = rng(key);
  const answer = pool[Math.floor(r() * pool.length)];
  const others = pool.filter((id) => id !== answer).sort(() => r() - 0.5).slice(0, 3);
  const choices = [answer, ...others].sort(() => r() - 0.5);
  const p = ORG_PEOPLE[answer];
  const skills = sortedSkills(skillsOf(answer)).slice(0, 3).map(([name]) => name);
  const clues = [
    { k: 'interest', label: 'ชอบ', text: p.interest },
    skills.length ? { k: 'skills', label: 'ถนัด', text: skills.join(', ') } : { k: 'edu', label: 'เรียนจบ', text: p.edu },
    { k: 'pos', label: 'ตำแหน่ง', text: p.pos },
    // mook 2026-11-06: the department is the last, easiest clue.
    { k: 'dept', label: 'แผนก', text: p.dept },
  ].filter((c) => c.text);
  return { key, answer, choices, clues };
}
