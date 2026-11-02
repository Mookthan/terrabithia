import { useEffect, useState } from 'react';

const QUERY = '(max-width: 640px)';

/** True on phone widths (≤640px); follows rotation and window resizes. */
export default function usePhone() {
  const [phone, setPhone] = useState(() => window.matchMedia(QUERY).matches);
  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const on = () => setPhone(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return phone;
}
