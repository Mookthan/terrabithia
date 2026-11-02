import { useCallback, useEffect, useRef, useState } from 'react';
import useClickOutside from '@/hooks/useClickOutside';

const OPEN_MS = 450; // hover intent before the bar appears
const CLOSE_MS = 300; // grace period to move the pointer from the button to the bar
const PRESS_MS = 450; // touch long-press

/**
 * Facebook-style reaction trigger: hover (mouse) or long-press (touch) opens the emoji bar,
 * a plain click is the quick reaction. Put `ref` + `wrapProps` on the element holding button + bar,
 * `pressProps` on the button, and call `tap(fn)` from its onClick so a long-press doesn't also click.
 */
export default function useReactionPicker() {
  const [open, setOpen] = useState(false);
  const timer = useRef(0);
  const pressed = useRef(false);
  const ref = useRef(null);
  const clear = () => clearTimeout(timer.current);
  useEffect(() => clear, []);

  const later = (fn, ms) => { clear(); timer.current = setTimeout(fn, ms); };
  const close = useCallback(() => { clear(); pressed.current = false; setOpen(false); }, []);
  useClickOutside(ref, close, open);

  const wrapProps = {
    onPointerEnter: (e) => { if (e.pointerType === 'mouse') later(() => setOpen(true), OPEN_MS); },
    onPointerLeave: (e) => { if (e.pointerType === 'mouse') later(() => setOpen(false), CLOSE_MS); },
  };
  const pressProps = {
    onPointerDown: (e) => {
      if (e.pointerType === 'mouse') return;
      pressed.current = false;
      later(() => { pressed.current = true; setOpen(true); }, PRESS_MS);
    },
    onPointerUp: (e) => { if (e.pointerType !== 'mouse' && !pressed.current) clear(); },
    onContextMenu: (e) => e.preventDefault(),
  };
  /** Click handler guard: skip the click that ends a long-press. */
  const tap = (fn) => (e) => {
    e.stopPropagation();
    if (pressed.current) { pressed.current = false; return; }
    clear(); setOpen(false); fn();
  };

  return { ref, open, close, wrapProps, pressProps, tap };
}
