// Emoji reactions shared by News and Knowledge (mook 2026-10-28). Workplace set: no "angry".
// One reaction per person; any reaction counts as a like for coins.
export const REACTIONS = [
  { e: '👍', l: 'ถูกใจ', c: '#12986F' },
  { e: '❤️', l: 'รักเลย', c: '#ED4956' },
  { e: '👏', l: 'ปรบมือ', c: '#D9891A' },
  { e: '😆', l: 'ฮา', c: '#D9891A' },
  { e: '😮', l: 'ว้าว', c: '#D9891A' },
  { e: '😢', l: 'เศร้า', c: '#D9891A' },
];
export const DEFAULT_REACTION = '👍';
/** Condolence posts use a quiet set instead (no ฮา / ว้าว), and a quick tap gives 🙏 (mook 2026-10-30). */
export const CONDOLENCE_REACTIONS = [
  { e: '🙏', l: 'ไว้อาลัย', c: '#4A5560' },
  { e: '😢', l: 'เสียใจด้วย', c: '#4A5560' },
  { e: '❤️', l: 'ส่งกำลังใจ', c: '#ED4956' },
];
export const reactionsFor = (n) => (n?.condolence ? CONDOLENCE_REACTIONS : REACTIONS);
export const reactionOf = (e, list = REACTIONS) => list.find((r) => r.e === e) || REACTIONS.find((r) => r.e === e) || list[0];
