import { useEffect } from 'react';

/** Stops the page behind a full-screen overlay from scrolling while `active`. */
export default function useBodyLock(active) {
  useEffect(() => {
    if (!active) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [active]);
}
