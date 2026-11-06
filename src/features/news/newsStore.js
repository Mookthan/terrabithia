// Session-wide news state (my reactions in `liked`: article index -> emoji; `faved`: the card heart; comments, views, pins, sort, department + liked-only filter, hero slide).
// Kept at module level like the prototype so it survives page changes.
import { useSyncExternalStore } from 'react';
import { DEPTS } from '@/data/departments';
import { INITIAL_COMMENTS, LIKE_COUNTS, LIKERS, MAX_PINS, NEWS, VIEW_COUNTS } from './data';
import { earn, refund } from '@/features/rewards/coinStore';
import { DEFAULT_REACTION } from '@/data/reactions';

const allFilter = (v) => {
  const f = { all: v };
  DEPTS.forEach((d) => { f[d.k] = v; (d.c || []).forEach((ch) => { f[ch.k] = v; }); });
  return f;
};

let state = {
  liked: {},
  faved: {}, // card heart = keep this story (no coins, separate from reactions)
  comments: { ...INITIAL_COMMENTS },
  filter: allFilter(true),
  likedOnly: false,
  sort: 'new', // NEWS_SORTS key
  views: {}, // views added this session, per article index
  pinned: [20, 1, 3], // story indexes, in pin order (mock: the condolence notice, the holiday notice and the training story)
};
const listeners = new Set();
const set = (patch) => { state = { ...state, ...patch }; listeners.forEach((l) => l()); };
const subscribe = (l) => { listeners.add(l); return () => listeners.delete(l); };

export const useNewsState = () => useSyncExternalStore(subscribe, () => state);

/** Set my reaction on article i; picking the one I already have removes it. Any reaction counts as one like for coins. */
export function react(i, emoji) {
  const had = state.liked[i];
  const next = had === emoji ? undefined : emoji;
  set({ liked: { ...state.liked, [i]: next } });
  if (!had && next) earn('like', i);
  else if (had && !next) refund('like', i);
}
/** Card heart: keep / unkeep a story for the "hearted only" filter. */
export const toggleFav = (i) => set({ faved: { ...state.faved, [i]: !state.faved[i] } });
/** Quick click: remove my reaction, or add the default one. */
export const toggleLike = (i, def = DEFAULT_REACTION) => react(i, state.liked[i] || def);
/** Double-tap on the photo: heart, unless I already reacted. */
export function likeOnce(i) {
  if (!state.liked[i]) react(i, '❤️');
}
let commentSeq = 0;
export function addComment(i, text) {
  const id = `c${(commentSeq += 1)}`;
  const list = [...(state.comments[i] || []), { id, me: true, n: 'มุก', t: text, d: 'เมื่อสักครู่' }];
  set({ comments: { ...state.comments, [i]: list } });
  earn('comment', `news:${id}`);
}

/** Edit the text of one of my own comments. */
export function editComment(i, id, text) {
  set({ comments: { ...state.comments, [i]: (state.comments[i] || []).map((c) => (c.id === id ? { ...c, t: text, edited: true } : c)) } });
}

/** Delete one of my own comments; the coins it earned go back (mook 2026-11-06: no comment-and-delete farming). */
export function removeComment(i, id) {
  set({ comments: { ...state.comments, [i]: (state.comments[i] || []).filter((c) => c.id !== id) } });
  refund('comment', `news:${id}`);
}

/** Pin or unpin story i. Returns false (and changes nothing) when MAX_PINS are already pinned. */
export function togglePin(i) {
  if (state.pinned.includes(i)) {
    set({ pinned: state.pinned.filter((p) => p !== i) });
    return true;
  }
  if (state.pinned.length >= MAX_PINS) return false;
  set({ pinned: [...state.pinned, i] });
  return true;
}

export const setSort = (sort) => set({ sort });
/** Counts one view of article i (once per opening of the article page). */
export const addView = (i) => set({ views: { ...state.views, [i]: (state.views[i] || 0) + 1 } });
export const viewCount = (views, i) => (VIEW_COUNTS[i] || 0) + (views[i] || 0);

const everyOn = (f) => Object.keys(f).every((k) => k === 'all' || f[k]);

export const setLikedOnly = (likedOnly) => set({ likedOnly });

export function toggleAllDepts() {
  set({ filter: allFilter(!everyOn(state.filter)) });
}
export function toggleDept(key) {
  const node = DEPTS.find((d) => d.k === key);
  const v = !state.filter[key];
  const f = { ...state.filter, [key]: v };
  if (node?.c) node.c.forEach((ch) => { f[ch.k] = v; });
  // A parent stays ticked while any of its teams is, so its department-wide news keeps showing.
  const parent = DEPTS.find((d) => d.c?.some((ch) => ch.k === key));
  if (parent) f[parent.k] = parent.c.some((ch) => f[ch.k]);
  f.all = everyOn(f);
  set({ filter: f });
}

export const likeCount = (liked, i) => (LIKE_COUNTS[i] || 0) + (liked[i] ? 1 : 0);
/** Engagement = likes + comments. */
export const engageCount = (s, i) => likeCount(s.liked, i) + (s.comments[i] || []).length;

// Mock spread of the seed likes over the emoji set (mostly 👍 and ❤️).
const SEED_MIX = ['👍', '👍', '❤️', '👍', '👏', '❤️', '😆', '👍', '😮', '❤️', '👏', '😢'];
const CALM_MIX = ['🙏', '🙏', '😢', '🙏', '❤️', '😢', '🙏'];

/** People who reacted to article i as [name, team, emoji] (the current user first when they did). */
export function likersOf(liked, i) {
  const n = LIKE_COUNTS[i] || 0;
  const out = [];
  for (let k = 0; k < n; k++) out.push([...LIKERS[(k + i * 3) % LIKERS.length], (NEWS[i]?.condolence ? CALM_MIX : SEED_MIX)[(k * 7 + i) % (NEWS[i]?.condolence ? CALM_MIX : SEED_MIX).length]]);
  if (liked[i]) out.unshift(['มุก (คุณ)', 'Design', liked[i]]);
  return out;
}
/** [emoji, count] pairs from likersOf(), most used first. */
export function reactionTotals(people) {
  const m = {};
  people.forEach((p) => { m[p[2]] = (m[p[2]] || 0) + 1; });
  return Object.entries(m).sort((a, b) => b[1] - a[1]);
}

/** Index of the slide the hero shows; shared by the home page and the News page. */
let heroIdx = 0;
export const getHeroIdx = () => heroIdx;
export const setHeroIdxStored = (i) => { heroIdx = i; };
