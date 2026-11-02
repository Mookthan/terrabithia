import { useEffect, useRef } from 'react';

const EVENT = 'tb-overlay-open';
/**
 * One popup at a time on every screen (phones 2026-10-28, desktop too 2026-10-30, mook): when this overlay
 * opens it tells the others (menu, notifications, profile menu, Terby chat, poll) to fold away.
 */
export default function useSingleOverlay(id, open, close) {
  const closeRef = useRef(close);
  closeRef.current = close;

  useEffect(() => {
    if (open) window.dispatchEvent(new CustomEvent(EVENT, { detail: id }));
  }, [id, open]);

  useEffect(() => {
    if (!open) return undefined;
    const onOther = (e) => { if (e.detail !== id) closeRef.current(); };
    window.addEventListener(EVENT, onOther);
    return () => window.removeEventListener(EVENT, onOther);
  }, [id, open]);
}
