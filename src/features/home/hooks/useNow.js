import { useEffect, useState } from 'react';

/** Current date/time, refreshed every 15 seconds. */
export default function useNow() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 15000);
    return () => clearInterval(t);
  }, []);
  return now;
}
