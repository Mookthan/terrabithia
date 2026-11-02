import { useEffect } from 'react';

/**
 * Calls `onOutside` on any click outside `ref` while `active` is true.
 * Clicks on nodes React already removed (e.g. a calendar day that closed its picker) are ignored.
 */
export default function useClickOutside(ref, onOutside, active = true) {
  useEffect(() => {
    if (!active) return undefined;
    const handler = (e) => { if (e.target.isConnected && ref.current && !ref.current.contains(e.target)) onOutside(e); };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [ref, onOutside, active]);
}
