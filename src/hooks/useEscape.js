import { useEffect } from 'react';

export default function useEscape(onEscape, active = true) {
  useEffect(() => {
    if (!active) return undefined;
    const handler = (e) => e.key === 'Escape' && onEscape();
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onEscape, active]);
}
