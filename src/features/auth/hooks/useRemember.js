const KEY = 'tbRemember';

/** Saved "remember me" credentials: `{ on, e, p }`. */
export function loadRemember() {
  try {
    const o = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (o && o.e) return { on: true, e: o.e, p: o.p || '' };
  } catch { /* storage unavailable */ }
  return { on: false, e: '', p: '' };
}

export function saveRemember(on, e, p) {
  try {
    if (on) localStorage.setItem(KEY, JSON.stringify({ e, p }));
    else localStorage.removeItem(KEY);
  } catch { /* storage unavailable */ }
}

export function clearRemember() {
  try { localStorage.removeItem(KEY); } catch { /* storage unavailable */ }
}
