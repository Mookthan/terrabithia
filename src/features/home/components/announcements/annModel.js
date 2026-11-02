// Announcements: posting teams, date parsing and the search / filter rules.

export const ANN_GROUPS = ['HR', 'Admin', 'PFM'];

/** Per team: badge colours and the gradient used by its link / video attachments. HR = sky, Admin = green, PFM = orange. */
export const GROUP_STYLE = {
  HR: { badge: 'bg-[#D3E8FB] text-[#1F5FA8]', g1: '#2F7DD6', g2: '#8CC1F2' },
  Admin: { badge: 'bg-[#D3F0DB] text-[#1E7A43]', g1: '#2E9E5B', g2: '#8BD3A5' },
  PFM: { badge: 'bg-[#FFE0C2] text-[#A85A12]', g1: '#F2A15E', g2: '#FFD2A5' },
};

export const RANGES = [['all', 'ทั้งหมด'], ['7', '7 วันล่าสุด'], ['30', '30 วันล่าสุด']];
export const EMPTY_FILTER = { q: '', groups: ANN_GROUPS, range: 'all', from: '', to: '' };

const TH_MON = { มค: 0, กพ: 1, มีค: 2, เมย: 3, พค: 4, มิย: 5, กค: 6, สค: 7, กย: 8, ตค: 9, พย: 10, ธค: 11 };

/** Posting time in ms from text like "13 ต.ค 69, 10:30 น." (Buddhist year, 2 digits); 0 if unreadable. */
export function annTs(a) {
  const m = /(\d+)\s*([^\s\d,]+)\s*(\d+),\s*(\d+):(\d+)/.exec(a.t || '');
  const mo = m && TH_MON[m[2].replace(/\./g, '')];
  if (mo === undefined || mo === null) return 0;
  return new Date(+m[3] + 2500 - 543, mo, +m[1], +m[4], +m[5]).getTime();
}

/** No team narrowing when none or all teams are ticked. */
export const allGroups = (f) => !f.groups.length || f.groups.length >= ANN_GROUPS.length;
/** Number of active filters (team, date) for the badge on the filter button. */
export const activeCount = (f) => (allGroups(f) ? 0 : 1) + (f.range !== 'all' ? 1 : 0);

/** Does announcement `a` pass the keyword, team and date filters? */
export function matchAnn(a, f) {
  if (!allGroups(f) && !f.groups.includes(a.d)) return false;
  const ts = annTs(a);
  if (f.range === '7' || f.range === '30') {
    if (ts < Date.now() - +f.range * 86400000) return false;
  } else if (f.range === 'custom') {
    if (f.from && ts < new Date(`${f.from}T00:00:00`).getTime()) return false;
    if (f.to && ts > new Date(`${f.to}T23:59:59`).getTime()) return false;
  }
  const q = f.q.trim().toLowerCase();
  if (!q) return true;
  const att = (a.at || []).map((t) => [t.t, t.n, t.h, t.dsc].filter((v) => typeof v === 'string').join(' '));
  return [a.d, a.t, a.x, a.jump?.l, a.urgent && 'ด่วน ประกาศด่วน urgent', a.welcome && `ต้อนรับ พนักงานใหม่ ${a.welcome.intern ? 'นักศึกษาฝึกงาน' : ''} ${a.welcome.name} ${a.welcome.nick} ${a.welcome.pos} ${a.welcome.dept}`, a.poll && `โหวต poll ${a.poll.q} ${a.poll.opts.map((o) => o.l).join(' ')}`, ...att].join(' ').toLowerCase().includes(q);
}

/** Indexes of the announcements to show: filtered, pinned one first, otherwise newest first (data order). */
export const annOrder = (list, f, pinned) => list.map((_, i) => i)
  .filter((i) => matchAnn(list[i], f))
  .sort((x, y) => ((y === pinned) - (x === pinned)) || x - y);
