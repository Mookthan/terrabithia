import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HR_GROUPS } from '@/data/hrGroups';

/** Reads `?group=<k>&item=<i>`; returns null (HR home) when absent or invalid. */
function readSel(params) {
  const g = params.get('group');
  const grp = HR_GROUPS.find((x) => x.k === g);
  if (!grp) return null;
  const i = Number.parseInt(params.get('item') ?? '0', 10);
  return { g, i: Number.isInteger(i) && i >= 0 && i < grp.items.length ? i : 0 };
}

/**
 * HR rail state. The selected item lives in the URL (deep-linkable, back button
 * works); which group is unfolded is local, since a group can be folded while
 * one of its items stays selected.
 */
export default function useHrSelection() {
  const [params, setParams] = useSearchParams();
  const sel = readSel(params);
  const selKey = sel ? `${sel.g}:${sel.i}` : 'home';
  const [openGroup, setOpenGroup] = useState(sel ? sel.g : null);

  // Navigating to another item (rail, deep link, back button) unfolds its group.
  useEffect(() => { setOpenGroup(sel ? sel.g : null); }, [selKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const select = useCallback((g, i) => setParams({ group: g, item: String(i) }), [setParams]);
  const goHome = useCallback(() => { setOpenGroup(null); setParams({}); }, [setParams]);
  const toggleGroup = useCallback((k) => {
    if (openGroup === k) setOpenGroup(null);
    else select(k, 0);
  }, [openGroup, select]);

  return { sel, selKey, openGroup, select, goHome, toggleGroup };
}
