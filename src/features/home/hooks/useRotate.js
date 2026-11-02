import { useEffect, useState } from 'react';

/** Index that steps 0…count-1 every `ms`, held while `paused` or while the tab is hidden. */
export default function useRotate(count, ms, paused) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (paused || count < 2) return undefined;
    const id = setInterval(() => {
      if (!document.hidden) setI((v) => (v + 1) % count);
    }, ms);
    return () => clearInterval(id);
  }, [count, ms, paused, i]);
  return [i, setI];
}
