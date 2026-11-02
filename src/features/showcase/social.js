// Social media accounts people add to their profile; shown on their org-chart card (mook 2026-10-30).
import { useSyncExternalStore } from 'react';
import { ME } from '@/data/me';

/** k, label, profile URL prefix for a bare account name (LINE has none: its ID is only shown). */
export const SOCIAL_PLATFORMS = [
  { k: 'facebook', l: 'Facebook', base: 'https://www.facebook.com/' },
  { k: 'instagram', l: 'Instagram', base: 'https://www.instagram.com/' },
  { k: 'tiktok', l: 'TikTok', base: 'https://www.tiktok.com/@' },
  { k: 'x', l: 'X', base: 'https://x.com/' },
  { k: 'linkedin', l: 'LinkedIn', base: 'https://www.linkedin.com/in/' },
  { k: 'youtube', l: 'YouTube', base: 'https://www.youtube.com/@' },
  { k: 'line', l: 'LINE' },
  // Any other https link (portfolio, Behance, GitHub...); shown by its address, never a custom name (mook 2026-10-30).
  { k: 'web', l: 'ลิงก์อื่นๆ', link: true },
];
export const platformOf = (k) => SOCIAL_PLATFORMS.find((p) => p.k === k);
export const SOCIAL_MAX = 100;
/** Accounts per person, so the org-chart card stays short (mook 2026-10-30). */
export const SOCIAL_LIMIT = 3;

/** Other links must be full https:// addresses. */
export const isSafeLink = (v) => /^https:\/\/[^\s/]+\.[^\s]+$/i.test(v.trim());

const isUrl = (v) => /^https?:\/\//i.test(v) || /^(www\.)?[\w-]+\.[a-z]{2,}\//i.test(v);

/** Link to open for an account: a pasted link as is, or the platform's profile URL for a bare name. */
export function socialHref(k, v) {
  if (platformOf(k)?.link) return isSafeLink(v) ? v.trim() : null;
  if (isUrl(v)) return /^https?:\/\//i.test(v) ? v : `https://${v}`;
  const base = platformOf(k)?.base;
  return base ? base + encodeURIComponent(v.replace(/^@/, '')) : null;
}

/** Short text to show: the link without https://www., or @name for a bare name. */
export function socialLabel(k, v) {
  if (isUrl(v)) return v.replace(/^https?:\/\//i, '').replace(/^www\./i, '').replace(/\/$/, '');
  return k === 'line' ? v : `@${v.replace(/^@/, '')}`;
}

/** Mock accounts: person id -> [[platform, link or account name], ...]. */
const SEED = {
  mook: [['instagram', 'mook.draws'], ['line', 'mook_tc']],
  coo: [['instagram', 'teelek.photo'], ['linkedin', 'https://www.linkedin.com/in/peerapat-l']],
  gong: [['facebook', 'gong.cac'], ['tiktok', '@gong.design'], ['web', 'https://www.behance.net/gongcac']],
  aut: [['youtube', 'AutEdits'], ['x', 'aut_vdo']],
};

let state = SEED;
const listeners = new Set();
const subscribe = (l) => { listeners.add(l); return () => listeners.delete(l); };

export const useSocial = (id) => useSyncExternalStore(subscribe, () => state)[id] || [];
export const socialOf = (id) => state[id] || [];
/** Saves a person's accounts (empty values and other links that are not https:// dropped). */
export function setSocial(list, id = ME.id) {
  state = { ...state, [id]: list.map(([k, v]) => [k, v.trim()]).filter(([k, v]) => v && (!platformOf(k)?.link || isSafeLink(v))).slice(0, SOCIAL_LIMIT) };
  listeners.forEach((l) => l());
}
