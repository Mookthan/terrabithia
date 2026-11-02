// Usage log, two levels (mook 2026-10-28):
//  1. every page: who opened which path, when, and how long it stayed visible (hidden-tab time not counted);
//  2. sensitive pages (SENSITIVE): also each action on them (video play, download, copy, open a product, unlock evaluation).
// The prototype keeps entries in memory; production sends each finished entry to POST /api/activity
// (navigator.sendBeacon, so the last page still arrives when the tab closes). Admin reads them on the Log page.

export const SENSITIVE = ['/about/products', '/download', '/profile'];
export const isSensitive = (path) => SENSITIVE.some((p) => path === p || path.startsWith(`${p}/`));

const MAX_KEEP = 500;
const entries = [];
let cur = null; // { path, at, ms, since, events }

const now = () => Date.now();
const device = () => (window.matchMedia?.('(max-width: 767px)').matches ? 'mobile' : 'desktop');

function send(entry) {
  entries.push(entry);
  if (entries.length > MAX_KEEP) entries.shift();
  // production: navigator.sendBeacon('/api/activity', JSON.stringify(entry));
}

function pause() {
  if (cur?.since) { cur.ms += now() - cur.since; cur.since = 0; }
}
function resume() {
  if (cur && !cur.since) cur.since = now();
}

/** Close the current page entry (if any) and send it. */
export function endPage() {
  if (!cur) return;
  pause();
  const { path, at, ms, events } = cur;
  cur = null;
  send({ path, at, sec: Math.round(ms / 1000), device: device(), sensitive: isSensitive(path), events });
}

/** A new page became current: finish the previous one and start timing this one. */
export function startPage(path) {
  endPage();
  cur = { path, at: now(), ms: 0, since: document.hidden ? 0 : now(), events: [] };
}

/** Record an action. Kept only on sensitive pages, so ordinary pages log time only. */
export function track(type, detail = '') {
  if (!cur || !isSensitive(cur.path)) return;
  cur.events.push({ type, detail: String(detail).slice(0, 120), t: Math.round((now() - cur.at) / 1000) });
}

export const onVisibility = () => (document.hidden ? pause() : resume());

/** Finished entries, newest first (prototype inspection). */
export const activityEntries = () => entries.slice().reverse();
if (typeof window !== 'undefined') window.__tbActivity = activityEntries; // prototype only: inspect from the console
