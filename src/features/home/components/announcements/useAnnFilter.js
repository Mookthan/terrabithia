import { useCallback, useMemo, useState } from 'react';
import { ANN_GROUPS, EMPTY_FILTER, activeCount, allGroups } from './annModel';

/** Keyword + team + date filter shared by the home card and the "all announcements" popup. */
export default function useAnnFilter() {
  const [f, setF] = useState(EMPTY_FILTER);

  const setQ = useCallback((q) => setF((p) => ({ ...p, q })), []);
  /** From "all teams", ticking one team narrows to just that team; unticking the last one goes back to all. */
  const toggleGroup = useCallback((g) => setF((p) => {
    let groups;
    if (allGroups(p)) groups = [g];
    else groups = p.groups.includes(g) ? p.groups.filter((x) => x !== g) : [...p.groups, g];
    return { ...p, groups: groups.length ? groups : ANN_GROUPS };
  }), []);
  const allTeams = useCallback(() => setF((p) => ({ ...p, groups: ANN_GROUPS })), []);
  const setRange = useCallback((range) => setF((p) => ({ ...p, range, ...(range !== 'custom' ? { from: '', to: '' } : {}) })), []);
  /** Picking a from / to date switches to a custom range (cleared dates go back to "all"). */
  const setDate = useCallback((k, v) => setF((p) => {
    const n = { ...p, [k]: v };
    return { ...n, range: n.from || n.to ? 'custom' : 'all' };
  }), []);
  const clear = useCallback(() => setF((p) => ({ ...EMPTY_FILTER, q: p.q })), []);

  const active = activeCount(f);
  return useMemo(() => ({
    f, active, setQ, toggleGroup, allTeams, setRange, setDate, clear,
  }), [f, active, setQ, toggleGroup, allTeams, setRange, setDate, clear]);
}
