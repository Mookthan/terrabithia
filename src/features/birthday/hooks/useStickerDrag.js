import { useCallback, useRef } from 'react';

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

/**
 * Pointer handling for the editable card preview: drag a sticker to move it (the one you touch
 * comes to the top), drag its handle to scale + rotate, tap its red badge to delete it, press empty space to deselect.
 * Double-tapping a text sticker calls `onEditText(i)` so it can be typed into.
 * `draft` is the composer state, `update(fn)` applies a state change.
 */
export default function useStickerDrag(draft, update, onEditText) {
  const latest = useRef(draft);
  latest.current = draft;
  const lastTap = useRef({ i: -1, t: 0 });

  return useCallback((e) => {
    const root = e.currentTarget;
    const card = root.querySelector('[data-bcard]');
    if (!card || e.target.closest('[data-editing]')) return;
    if (document.activeElement?.isContentEditable) document.activeElement.blur();
    if (e.target.closest('[data-del]')) {
      e.preventDefault();
      update((d) => ({ ...d, stk: d.stk.filter((_, j) => j !== d.sel), sel: -1 }));
      return;
    }
    const handle = e.target.closest('[data-h]');
    const st = e.target.closest('[data-stk]');
    if (!st) {
      if (latest.current.sel !== -1) update((d) => ({ ...d, sel: -1 }));
      return;
    }
    e.preventDefault();
    let i = +st.dataset.stk;
    const k = latest.current.stk[i];
    if (!k) return;
    const last = latest.current.stk.length - 1;
    if (!handle && i !== last) {
      const from = i;
      update((d) => ({ ...d, stk: [...d.stk.filter((_, j) => j !== from), d.stk[from]], sel: last }));
      i = last;
    } else if (latest.current.sel !== i) update((d) => ({ ...d, sel: i }));

    if (k.t && !handle) {
      const now = Date.now();
      if (lastTap.current.i === i && now - lastTap.current.t < 420) {
        lastTap.current = { i: -1, t: 0 };
        onEditText?.(i);
        return;
      }
      lastTap.current = { i, t: now };
    }

    const r = card.getBoundingClientRect();
    const er = st.getBoundingClientRect();
    const cx = er.left + er.width / 2;
    const cy = er.top + er.height / 2;
    const sx = e.clientX;
    const sy = e.clientY;
    const d0 = Math.hypot(sx - cx, sy - cy) || 1;
    const a0 = Math.atan2(sy - cy, sx - cx);

    const setSticker = (patch) => update((d) => ({ ...d, stk: d.stk.map((s, j) => (j === i ? { ...s, ...patch } : s)) }));
    const mv = (ev) => {
      if (handle) {
        setSticker({
          s: +clamp(k.s * Math.hypot(ev.clientX - cx, ev.clientY - cy) / d0, 0.4, 3).toFixed(3),
          r: Math.round(k.r + (Math.atan2(ev.clientY - cy, ev.clientX - cx) - a0) * 180 / Math.PI),
        });
      } else {
        setSticker({
          x: clamp(k.x + (ev.clientX - sx) / r.width * 100, 0, 100),
          y: clamp(k.y + (ev.clientY - sy) / r.height * 100, 0, 100),
        });
      }
    };
    const up = () => {
      document.removeEventListener('pointermove', mv);
      document.removeEventListener('pointerup', up);
      document.removeEventListener('pointercancel', up);
    };
    document.addEventListener('pointermove', mv);
    document.addEventListener('pointerup', up);
    document.addEventListener('pointercancel', up);
  }, [update, onEditText]);
}
