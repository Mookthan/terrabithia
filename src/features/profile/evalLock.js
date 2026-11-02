// Shared "evaluation unlocked" state for the work card: the evaluation result and KPI scores open together
// after one password check, and lock together (ซ่อน, leaving the page, or EVAL_IDLE_MS idle).
import { useEffect, useSyncExternalStore } from 'react';
import { EVAL_IDLE_MS } from './data';
import { track } from '@/lib/activityLog';

let state = { open: false, asking: false };
const subs = new Set();
const set = (patch) => { state = { ...state, ...patch }; subs.forEach((f) => f()); };

export const evalLock = {
  ask: () => set({ asking: true }),
  cancel: () => set({ asking: false }),
  unlock: () => { track('eval-unlock'); set({ open: true, asking: false }); },
  lock: () => set({ open: false, asking: false }),
};

export function useEvalLock() {
  return useSyncExternalStore((f) => { subs.add(f); return () => subs.delete(f); }, () => state);
}

/** Locks after EVAL_IDLE_MS without mouse, key or scroll activity, and when the owner unmounts. */
export function useEvalAutoLock() {
  const { open } = useEvalLock();
  useEffect(() => evalLock.lock, []);
  useEffect(() => {
    if (!open) return undefined;
    let t = setTimeout(evalLock.lock, EVAL_IDLE_MS);
    const bump = () => { clearTimeout(t); t = setTimeout(evalLock.lock, EVAL_IDLE_MS); };
    const evs = ['pointerdown', 'keydown', 'scroll', 'mousemove'];
    evs.forEach((e) => window.addEventListener(e, bump, { passive: true }));
    return () => { clearTimeout(t); evs.forEach((e) => window.removeEventListener(e, bump)); };
  }, [open]);
}
