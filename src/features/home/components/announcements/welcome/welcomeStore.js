// Welcome posts for new staff and interns: emoji cheers and greetings per post (mook 2026-10-31).
// Prototype store for this browser session; the real site saves them per user in the back end.
import { useSyncExternalStore } from 'react';
import { earn, refund } from '@/features/rewards/coinStore';
import { ME } from '@/data/me';
import { media } from '@/lib/media';

/** Cheers shown under a welcome post; one per person, tap again to take it back. */
export const WELCOME_CHEERS = [
  { e: '🎉', l: 'ยินดีต้อนรับ' },
  { e: '👋', l: 'สวัสดี' },
  { e: '😍', l: 'น่ารัก' },
  { e: '🙏', l: 'ฝากตัวด้วย' },
];
/** One-tap greetings and stickers (stickers are Terby pictures). */
export const QUICK_GREETINGS = ['ยินดีต้อนรับนะคะ 🎉', 'ยินดีต้อนรับครับ 👋', 'ยินดีต้อนรับสู่ทีมค่ะ มีอะไรถามได้เลยนะ 😊'];
export const STICKERS = [media('birthday/terby-body.webp'), media('birthday/terby-face.webp')];

/** Mock activity so the posts look alive; `counts` are other people's cheers. */
const SEED = {
  'welcome-tonnam': {
    counts: { '🎉': 9, '👋': 4, '😍': 3, '🙏': 1 },
    greets: [
      { id: 's1', nick: 'เอมี่', sticker: 0 },
      { id: 's2', nick: 'ติ๊ก', text: 'ยินดีต้อนรับน้องต้นน้ำค่ะ มีอะไรทักมาถามได้เลยนะ' },
      { id: 's3', nick: 'ต้นน้ำ', text: 'สวัสดีค่ะ หนูต้นน้ำ ฝากเนื้อฝากตัวด้วยนะคะ 🙏😻', owner: true },
    ],
  },
  'welcome-boss': {
    counts: { '🎉': 21, '👋': 7, '😍': 2, '🙏': 5 },
    greets: [
      { id: 's4', nick: 'แบงค์', text: 'ยินดีต้อนรับพี่โบ๊ทเข้าทีม IT ครับ 🎉' },
      { id: 's5', nick: 'ฝน', sticker: 1 },
    ],
  },
};

let state = { mine: {}, greets: Object.fromEntries(Object.entries(SEED).map(([k, v]) => [k, v.greets])) };
let seq = 0;
const listeners = new Set();
const set = (patch) => { state = { ...state, ...patch }; listeners.forEach((l) => l()); };
const subscribe = (l) => { listeners.add(l); return () => listeners.delete(l); };
const snap = () => state;

/** Cheers, my cheer and greetings of one welcome post. */
export function useWelcome(id) {
  const s = useSyncExternalStore(subscribe, snap);
  const mine = s.mine[id] || null;
  const base = SEED[id]?.counts || {};
  const counts = Object.fromEntries(WELCOME_CHEERS.map((c) => [c.e, (base[c.e] || 0) + (mine === c.e ? 1 : 0)]));
  return { mine, counts, greets: s.greets[id] || [] };
}

/** Pick or take back my cheer; the first cheer earns the like coin, taking it back refunds it. */
export function cheer(id, e) {
  const was = state.mine[id];
  const next = was === e ? null : e;
  set({ mine: { ...state.mine, [id]: next } });
  if (!was && next) earn('like', `welcome:${id}`);
  if (was && !next) refund('like', `welcome:${id}`);
}

/** Post a greeting (text or sticker index); the first one on a post earns the comment coin. */
export function greet(id, { text, sticker }) {
  if (!text?.trim() && sticker == null) return;
  const g = { id: `g${(seq += 1)}`, nick: ME.nick, photo: ME.photo, me: true, text: text?.trim(), sticker };
  set({ greets: { ...state.greets, [id]: [...(state.greets[id] || []), g] } });
  earn('comment', `welcome:${id}`);
}

/** Edit the text of one of my greetings (stickers can only be deleted). */
export function editGreet(id, gid, text) {
  set({ greets: { ...state.greets, [id]: (state.greets[id] || []).map((g) => (g.id === gid ? { ...g, text, edited: true } : g)) } });
}

/** Delete one of my greetings; when none of mine is left on the post, its comment coin goes back. */
export function removeGreet(id, gid) {
  const left = (state.greets[id] || []).filter((g) => g.id !== gid);
  set({ greets: { ...state.greets, [id]: left } });
  if (!left.some((g) => g.me)) refund('comment', `welcome:${id}`);
}
