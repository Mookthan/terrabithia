import { Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { PATHS } from '@/routes/paths';
import { useAuth } from '@/context/AuthContext';
import useReveal from '@/hooks/useReveal';
import HoverCursor from '@/components/ui/HoverCursor';
import Header from './Header';
import ChatWidget from '@/components/chat/ChatWidget';
import CoinPop from '@/features/rewards/components/CoinPop';
import UrgentBanner from '@/features/urgent/components/UrgentBanner';

/** Keeps body padding and the --hh variable in sync with the fixed header height. */
function useHeaderOffset(headerRef, hidden) {
  useLayoutEffect(() => {
    const el = headerRef.current;
    const update = () => {
      const h = hidden || !el ? 0 : 6 + el.offsetHeight;
      document.body.style.paddingTop = `${h || 6}px`;
      if (el) {
        // getBoundingClientRect is in zoomed pixels; CSS lengths get zoomed again, so undo the desktop zoom.
        const zoom = parseFloat(getComputedStyle(document.documentElement).zoom) || 1;
        document.documentElement.style.setProperty('--hh', `${el.getBoundingClientRect().bottom / zoom + 8}px`);
      }
    };
    update();
    if (!el) return undefined;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener('resize', update);
    return () => { ro.disconnect(); window.removeEventListener('resize', update); };
  }, [headerRef, hidden]);
}

/** Replays the page-enter animation on every route change. */
function usePageTransition(pathname) {
  const [animating, setAnimating] = useState(true);
  useEffect(() => {
    setAnimating(true);
    const t = setTimeout(() => setAnimating(false), 700);
    return () => clearTimeout(t);
  }, [pathname]);
  return animating;
}

export default function Layout() {
  const { pathname } = useLocation();
  const { loggedIn } = useAuth();
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const isLogin = pathname === PATHS.login;

  useHeaderOffset(headerRef, isLogin);
  useReveal(contentRef);
  const animating = usePageTransition(pathname);

  useEffect(() => {
    document.body.classList.toggle('homebg', pathname === PATHS.home && loggedIn);
  }, [pathname, loggedIn]);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[61] h-1.5 bg-teal-bright" />
      {!isLogin && <Header ref={headerRef} />}
      {loggedIn && !isLogin && <UrgentBanner />}
      <main className="mx-auto my-7 max-w-[720px] px-4 min-[861px]:px-5 min-[1001px]:max-w-[1000px]">
        <div
          ref={contentRef}
          id="content"
          data-fade-on-lang
          className={animating ? 'pt-in' : ''}
        >
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </div>
      </main>
      <ChatWidget />
      <CoinPop />
      <HoverCursor />
    </>
  );
}
