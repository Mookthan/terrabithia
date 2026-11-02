import { useCallback, useRef, useState } from 'react';
import { BD_TXTCOL, MAX_STICKERS, ME_ID, paperOf } from '../data';
import { occOf } from '../occasions';

const rnd = (a, b) => Math.round(a + Math.random() * b);
/** A spot in the top or bottom band of the paper, away from the message. */
const freeY = () => (Math.random() < 0.5 ? rnd(16, 14) : rnd(66, 12));

/**
 * Initial composer state for a friend's book: the card I already sent (edit) or a blank one.
 * `to` is the book id, `owner` the person, `occ` the occasion key.
 */
export function draftFor(bookId, book) {
  const o = occOf(book.occ);
  const base = { to: bookId, owner: book.owner, occ: o.k };
  const mine = book.cards.find((c) => c.by === ME_ID);
  if (mine) {
    return {
      ...base, cover: mine.cover || o.covers[0], paper: mine.paper || paperOf(mine).k, face: 'in', theme: mine.theme,
      msg: mine.msg, sticker: mine.sticker || '', stk: (mine.stk || []).map((k) => ({ ...k })), sel: -1, edit: true,
    };
  }
  return { ...base, cover: o.covers[0], paper: 'cream', face: 'in', theme: 0, msg: o.quick[0], sticker: '', stk: [], sel: -1, edit: false };
}

/**
 * Card composer state and its edit operations. `editing` is the text sticker being typed into (-1 = none).
 * Adding to a full card (12 pieces) calls `onFull` instead.
 */
export default function useComposer(initial, onFull) {
  const [draft, setDraft] = useState(initial);
  const [editing, setEditing] = useState(-1);
  const count = useRef(initial.stk.length);
  count.current = draft.stk.length;
  const update = useCallback((fn) => setDraft(fn), []);
  const set = useCallback((patch) => setDraft((d) => ({ ...d, ...patch })), []);

  /** Put a sticker on the inside paper and select it; returns its index, or -1 when the card is full. */
  const push = useCallback((k) => {
    if (count.current >= MAX_STICKERS) { onFull?.(); return -1; }
    const at = count.current;
    count.current += 1;
    setDraft((d) => ({ ...d, stk: [...d.stk, k], sel: d.stk.length, face: 'in' }));
    return at;
  }, [onFull]);

  const addSticker = useCallback((e) => push({ e, x: rnd(25, 50), y: freeY(), s: 1, r: rnd(-18, 36) }), [push]);
  const addPhoto = useCallback((album, i) => push({ ph: [album, i], x: rnd(25, 50), y: freeY(), s: 1, r: rnd(-12, 24) }), [push]);
  /** New text goes in the middle and is typed into straight away. */
  const addText = useCallback(() => {
    const at = push({ t: 'พิมพ์ข้อความ', c: BD_TXTCOL[0], ff: '', b: 1, x: 50, y: rnd(35, 30), s: 1.4, r: 0 });
    if (at >= 0) setEditing(at);
  }, [push]);

  /** Finish typing into text sticker `i`; empty text removes it. */
  const commitText = useCallback((i, t) => {
    setEditing(-1);
    setDraft((d) => {
      if (!d.stk[i]?.t) return d;
      if (!t) return { ...d, stk: d.stk.filter((_, j) => j !== i), sel: -1 };
      return { ...d, stk: d.stk.map((s, j) => (j === i ? { ...s, t } : s)) };
    });
  }, []);

  /** Text toolbar: 'ff' (font), 'c' (colour), 'b' / 'i' (toggle bold / italic) on the selected text. */
  const styleText = useCallback((f, v) => setDraft((d) => {
    const k = d.stk[d.sel];
    if (!k?.t) return d;
    const patch = f === 'b' ? { b: k.b === 0 ? 1 : 0 } : f === 'i' ? { i: k.i ? 0 : 1 } : { [f]: v };
    return { ...d, stk: d.stk.map((s, j) => (j === d.sel ? { ...s, ...patch } : s)) };
  }), []);

  const clearStickers = useCallback(() => { setEditing(-1); setDraft((d) => ({ ...d, stk: [], sel: -1 })); }, []);

  /** Sticker toolbar: '+', '-', 'l', 'r', 'del'. */
  const op = useCallback((o) => setDraft((d) => {
    if (!d.stk[d.sel]) return d;
    if (o === 'del') return { ...d, stk: d.stk.filter((_, j) => j !== d.sel), sel: -1 };
    const stk = d.stk.map((s) => ({ ...s }));
    const c = stk[d.sel];
    if (o === '+') c.s = Math.min(3, +(c.s * 1.15).toFixed(3));
    else if (o === '-') c.s = Math.max(0.4, +(c.s / 1.15).toFixed(3));
    else if (o === 'l') c.r -= 15;
    else if (o === 'r') c.r += 15;
    return { ...d, stk };
  }), []);

  return {
    draft, update, set, editing, setEditing, addSticker, addPhoto, addText, commitText, styleText, clearStickers, op,
  };
}
