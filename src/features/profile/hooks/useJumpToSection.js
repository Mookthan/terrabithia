import { useEffect, useRef } from 'react';
import { LEAVE_SCROLL_OFFSET } from '../data';

/**
 * When `active`, scrolls `ref` into view below the header, then re-tries after
 * 350ms and 900ms (images and reveal animations can shift the layout).
 * Arriving from another page jumps straight there; when the page is already open
 * (e.g. "สิทธิ์สำหรับวันลา" pressed while on the profile) it glides down smoothly.
 * Otherwise (e.g. "ข้อมูลส่วนตัว" from the profile menu) it goes back to the top.
 * `trigger` (e.g. the location key) re-runs the jump on repeated navigation.
 */
export default function useJumpToSection(ref, active, trigger) {
  const mounted = useRef(false);
  useEffect(() => {
    const first = !mounted.current;
    mounted.current = true;
    if (!active) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return undefined;
    }
    const jump = (smooth) => {
      const el = ref.current;
      if (!el) return;
      const y = el.getBoundingClientRect().top + window.scrollY - LEAVE_SCROLL_OFFSET;
      window.scrollTo({ top: Math.max(0, y), behavior: smooth ? 'smooth' : 'auto' });
    };
    if (!first) {
      jump(true);
      return undefined;
    }
    jump(false);
    const t1 = setTimeout(() => jump(true), 350);
    const t2 = setTimeout(() => jump(true), 900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [ref, active, trigger]);
}
