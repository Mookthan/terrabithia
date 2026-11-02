import { useEffect } from 'react';

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Scroll-reveal for every `[data-reveal]` element inside `ref`, including ones
 * rendered later. Cards entering together are staggered left-to-right, top-to-bottom.
 */
export default function useReveal(ref) {
  useEffect(() => {
    const root = ref.current;
    if (!root || reduced() || !('IntersectionObserver' in window)) return undefined;

    const io = new IntersectionObserver((entries, obs) => {
      const visible = entries
        .filter((en) => en.isIntersecting)
        .sort((x, y) => {
          const a = x.boundingClientRect, b = y.boundingClientRect;
          return (Math.round(a.top / 40) - Math.round(b.top / 40)) || (a.left - b.left);
        });
      visible.forEach((en, i) => {
        const el = en.target;
        const delay = Math.min(i, 6) * 90;
        obs.unobserve(el);
        el.style.setProperty('--rd', `${delay}ms`);
        el.dataset.rv = 'in';
        setTimeout(() => { delete el.dataset.rv; el.style.removeProperty('--rd'); }, 1200 + delay);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });

    const watch = (scope) => {
      const els = scope.matches?.('[data-reveal]') ? [scope] : [];
      scope.querySelectorAll?.('[data-reveal]').forEach((el) => els.push(el));
      els.forEach((el) => {
        if (el.dataset.rvSeen) return;
        el.dataset.rvSeen = '1';
        el.dataset.rv = 'pending';
        io.observe(el);
      });
    };

    watch(root);
    const mo = new MutationObserver((muts) => muts.forEach((m) => m.addedNodes.forEach((n) => n.nodeType === 1 && watch(n))));
    mo.observe(root, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
      // Let a re-run (StrictMode, remount) pick up elements that never revealed.
      root.querySelectorAll('[data-rv="pending"]').forEach((el) => { delete el.dataset.rv; delete el.dataset.rvSeen; });
    };
  }, [ref]);
}
