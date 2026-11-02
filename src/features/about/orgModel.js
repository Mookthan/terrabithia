// Pure helpers over the shared org data (used by the org chart and its filter panel).
import { BR, ORGDATA, ORG_PEOPLE, avatarOf } from '@/data/org';
import { escapeHTML } from '@/lib/html';
import { INFO_SVG } from '@/lib/orgChart';

export const orgIsStaff = (id) => /-p\d+$/.test(id) || ['mook', 'gong', 'aut'].includes(id);
export const orgKids = (id) => ORGDATA.filter((d) => d.parentId === id);
export function orgDesc(id) {
  const out = [id];
  orgKids(id).forEach((k) => out.push(...orgDesc(k.id)));
  return out;
}
export const orgDeptsOf = (k) => orgKids(k).map((d) => d.id);
export const orgNode = (id) => ORGDATA.find((d) => d.id === id);
export const BRANCH_KEYS = Object.keys(BR);

/** Text a search query is matched against: person name / nickname / position + node label. */
export function orgHaystack(id) {
  const p = ORG_PEOPLE[id];
  return `${p ? `${p.name} ${p.nick} ${p.pos}` : ''} ${(orgNode(id) || {}).label}`.toLowerCase();
}

/** First node matching a free-text search (chart highlight). */
export function orgFindMatch(q) {
  return ORGDATA.find((d) => {
    const p = ORG_PEOPLE[d.id] || {};
    return `${p.name || ''} ${p.nick || ''} ${p.pos || ''} ${d.label}`.toLowerCase().includes(q);
  });
}

/**
 * HTML for one d3-org-chart node. d3-org-chart only accepts markup strings;
 * every interpolated text is escaped. The info button is handled by a delegated listener (data-org-info).
 */
export function orgNodeContent(d) {
  const n = d.data;
  const badge = n.count ? `<div class="org-badge">${n.count}</div>` : '';
  if (n.person) {
    const av = avatarOf(n.id);
    const inner = av
      ? `<img src="${escapeHTML(av)}" alt="">`
      : escapeHTML((ORG_PEOPLE[n.id]?.nick || n.label).charAt(0));
    return `<div class="org-node person" style="width:${d.width}px;height:${d.height}px">
      <button type="button" class="org-info" aria-label="ดูข้อมูล" title="ดูข้อมูล" data-org-info="${escapeHTML(n.id)}">${INFO_SVG}</button>
      <div class="org-avatar" style="background:${escapeHTML(n.color)}">${inner}</div>
      <div class="org-label">${escapeHTML(n.label)}</div>${badge}</div>`;
  }
  return `<div class="org-node dept" style="width:${d.width}px;height:${d.height}px;background:${escapeHTML(n.color)}">${escapeHTML(n.label)}${badge}</div>`;
}
