// Reactions on interest-album photos (mook 2026-11-01): same emoji set as News, one per person.
// Coins: the reactor gets the like coin when reacting (shared daily cap, once per photo) and keeps it even if the
// owner later deletes the photo; only taking the reaction back refunds it. Owners earn nothing from reactions
// (so re-uploading can't farm coins). Deleting a photo simply drops its reactions. Prototype store; real counts come from the back end.
import { useSyncExternalStore } from 'react';
import { REACTIONS } from '@/data/reactions';
import { earn, refund } from '@/features/rewards/coinStore';

let mine = {};
const listeners = new Set();
const subscribe = (l) => { listeners.add(l); return () => listeners.delete(l); };
const snap = () => mine;

/** Other people's reactions, made up from the photo id so the mock looks alive and stays the same. */
function seed(key) {
  let h = 0;
  for (const ch of key) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const out = {};
  REACTIONS.slice(0, 4).forEach((r, i) => { out[r.e] = (h >>> (i * 3)) % (i ? 4 : 9); });
  return out;
}

const keyOf = (owner, photoId) => `${owner}:${photoId}`;

/** Counts per emoji (biggest first), total and my reaction for one photo. */
export function usePhotoReactions(owner, photoId) {
  const m = useSyncExternalStore(subscribe, snap);
  const key = keyOf(owner, photoId);
  const counts = seed(key);
  const my = m[key] || null;
  if (my) counts[my] = (counts[my] || 0) + 1;
  const top = Object.entries(counts).filter(([, n]) => n > 0).sort((a, b) => b[1] - a[1]);
  return { mine: my, top, total: top.reduce((s, [, n]) => s + n, 0) };
}

/** Set my reaction (same emoji again = take it back). */
export function reactPhoto(owner, photoId, e) {
  const key = keyOf(owner, photoId);
  const was = mine[key];
  const next = was === e ? null : e;
  mine = { ...mine, [key]: next };
  listeners.forEach((l) => l());
  if (!was && next) earn('like', `photo:${key}`);
  if (was && !next) refund('like', `photo:${key}`);
}
