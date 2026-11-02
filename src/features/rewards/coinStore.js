// Session-wide coin balance, history and today's earn counts (module level, like newsStore).
// Prototype only: the real ledger lives in the back office.
import { useSyncExternalStore } from 'react';
import { HISTORY_SEED, REWARDS, START_COINS, ruleOf } from './data';

let seq = 0;
let state = {
  balance: START_COINS,
  history: HISTORY_SEED,
  today: {},          // rule key → times earned today
  refs: {},           // "rule:ref" → true when that item already earned
  stock: Object.fromEntries(REWARDS.map((r) => [r.id, r.stock])),
  pop: null,          // last earn, for the floating "+N" chip
};
const listeners = new Set();
const set = (patch) => { state = { ...state, ...patch }; listeners.forEach((l) => l()); };
const subscribe = (l) => { listeners.add(l); return () => listeners.delete(l); };

export const useCoins = () => useSyncExternalStore(subscribe, () => state);

const entry = (fields) => ({ id: `n${(seq += 1)}`, date: 'วันนี้', ...fields });

/** Award a rule's coins unless today's cap or this item's cap is reached. Returns coins given. */
export function earn(k, ref) {
  const rule = ruleOf(k);
  const key = ref == null ? null : `${k}:${ref}`;
  if (!rule || (rule.daily && (state.today[k] || 0) >= rule.daily) || (key && state.refs[key])) return 0;
  set({
    balance: state.balance + rule.pts,
    history: [entry({ k, pts: rule.pts }), ...state.history],
    today: { ...state.today, [k]: (state.today[k] || 0) + 1 },
    refs: key ? { ...state.refs, [key]: true } : state.refs,
    pop: { id: seq, pts: rule.pts, k },
  });
  return rule.pts;
}

/** Take back the coins an item earned (e.g. unliking news). */
export function refund(k, ref) {
  const key = `${k}:${ref}`;
  if (!state.refs[key]) return;
  const rule = ruleOf(k);
  const refs = { ...state.refs };
  delete refs[key];
  set({
    balance: state.balance - rule.pts,
    history: [entry({ k, pts: -rule.pts, undo: true }), ...state.history],
    today: { ...state.today, [k]: Math.max(0, (state.today[k] || 0) - 1) },
    refs,
  });
}

/** Spend coins on a reward. Returns false when there are not enough coins or no stock. */
export function redeem(reward) {
  if (state.balance < reward.cost || state.stock[reward.id] < 1) return false;
  set({
    balance: state.balance - reward.cost,
    history: [entry({ redeem: reward.id, pts: -reward.cost, status: 'รอรับของ' }), ...state.history],
    stock: { ...state.stock, [reward.id]: state.stock[reward.id] - 1 },
  });
  return true;
}
