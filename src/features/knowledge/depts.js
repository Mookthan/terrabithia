// Department-tree helpers for the share target and the post filter.
import { DEPTS } from '@/data/departments';

export const ALL_LEAVES = [];
export const LEAF_LABEL = {};
DEPTS.forEach((d) => {
  if (d.c) d.c.forEach((c) => { ALL_LEAVES.push(c.k); LEAF_LABEL[c.k] = c.l; });
  else { ALL_LEAVES.push(d.k); LEAF_LABEL[d.k] = d.l; }
});

export const deptLeaves = (d) => (d.c ? d.c.map((x) => x.k) : [d.k]);

/** '' (none), 'on' (all) or 'part' for a set of leaf keys. */
export function treeState(sel, leaves) {
  const n = leaves.filter((k) => sel.includes(k)).length;
  if (n === 0) return '';
  return n === leaves.length ? 'on' : 'part';
}

/** Toggle a node ('ALL', a department key or a leaf key) in a selection array. */
export function toggleNode(sel, key) {
  let leaves;
  if (key === 'ALL') leaves = ALL_LEAVES;
  else {
    const d = DEPTS.find((x) => x.k === key);
    leaves = d ? deptLeaves(d) : [key];
  }
  const allIn = leaves.every((k) => sel.includes(k));
  return allIn ? sel.filter((k) => !leaves.includes(k)) : [...sel, ...leaves.filter((k) => !sel.includes(k))];
}

/** Labels of a selection: a whole department by its name, otherwise "Dept: Team". */
export function selParts(sel) {
  if (sel.length && sel.length === ALL_LEAVES.length) return ['ทุกแผนก'];
  const parts = [];
  DEPTS.forEach((d) => {
    const lv = deptLeaves(d);
    const n = lv.filter((k) => sel.includes(k)).length;
    if (!n) return;
    if (n === lv.length) parts.push(d.l);
    else lv.filter((k) => sel.includes(k)).forEach((k) => parts.push(`${d.l}: ${LEAF_LABEL[k]}`));
  });
  return parts;
}

/** Short human summary of a selection ("ทุกแผนก", "CAC, ISD: Dev +2"…). */
export function selSummary(sel) {
  const parts = selParts(sel);
  return parts.length > 2 ? `${parts.slice(0, 2).join(', ')} +${parts.length - 2}` : parts.join(', ');
}
