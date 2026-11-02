import { useEffect } from 'react';

/** Escape for an overlay opened on top of another: caught first (capture) so only the top one closes. */
export default function useTopEscape(onEscape, active = true) {
  useEffect(() => {
    if (!active) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') { e.stopPropagation(); onEscape(); } };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [onEscape, active]);
}
