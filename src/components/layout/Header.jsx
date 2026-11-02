import { forwardRef, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LOGO_SRC } from '@/data/me';
import { PATHS } from '@/routes/paths';
import { PRIVATE_NAV, PUBLIC_NAV } from '@/routes/navItems';
import useSingleOverlay from '@/hooks/useSingleOverlay';
import { useAuth } from '@/context/AuthContext';
import LangToggle from './LangToggle';
import MainNav from './MainNav';
import NotificationBell from './NotificationBell';
import ProfileMenu from './ProfileMenu';

function Hamburger({ open, onClick }) {
  const bar = 'block h-0.5 w-5 origin-center rounded-sm bg-navy transition-[transform,opacity] duration-300 ease-[cubic-bezier(.4,0,.2,1)] motion-reduce:transition-none';
  return (
    <button
      onClick={onClick}
      aria-label={open ? 'ปิดเมนู' : 'เปิดเมนู'}
      aria-expanded={open}
      className="hidden h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-full transition-colors hover:bg-teal-veil max-[860px]:flex"
    >
      <span className={`${bar} ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
      <span className={`${bar} ${open ? 'scale-x-0 opacity-0' : ''}`} />
      <span className={`${bar} ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
    </button>
  );
}

/** Fixed site header: brand, main nav, and either sign-in or the user's icons. */
const Header = forwardRef(function Header(_, ref) {
  const { loggedIn } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [navOpen, setNavOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useSingleOverlay('nav', navOpen, () => setNavOpen(false));
  useSingleOverlay('profile', profileOpen, () => setProfileOpen(false));

  // Close menus whenever the page changes.
  useEffect(() => { setNavOpen(false); setProfileOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', navOpen);
    return () => document.body.classList.remove('overflow-hidden');
  }, [navOpen]);

  return (
      <header
        ref={ref}
        data-fade-on-lang
        className="fixed inset-x-0 top-1.5 z-[60] flex flex-nowrap items-center justify-between gap-2 border-b border-line bg-white px-[18px] py-3 min-[861px]:flex-wrap min-[861px]:gap-2.5 min-[861px]:px-7 min-[861px]:py-3.5"
      >
        <button className="flex min-w-0 shrink items-center" onClick={() => navigate(PATHS.home)} aria-label="หน้าแรก">
          <img src={LOGO_SRC} alt="terrabithia" className="block h-auto w-[128px] min-[361px]:w-[150px] min-[861px]:w-[212px]" />
        </button>

        <MainNav items={loggedIn ? PRIVATE_NAV : PUBLIC_NAV} mobileOpen={navOpen} onNavigate={() => setNavOpen(false)} />

        <div className="flex flex-none flex-nowrap items-center gap-2 min-[861px]:gap-3">
          <div className="flex flex-nowrap items-center gap-1.5">
            {loggedIn ? (
              <>
                {/* Desktop: same spot as signed out; phones keep it in the profile menu (header too tight). */}
                <LangToggle className="max-[860px]:hidden" />
                <NotificationBell onOpenChange={() => setProfileOpen(false)} />
                <ProfileMenu
                  open={profileOpen}
                  onToggle={() => setProfileOpen((v) => !v)}
                  onClose={() => setProfileOpen(false)}
                />
              </>
            ) : (
              <>
              <LangToggle />
              <button
                onClick={() => navigate(PATHS.login)}
                className="whitespace-nowrap rounded-ctl bg-teal-bright hover:!bg-teal-hover transition-colors duration-200 px-2.5 py-[7px] text-xs font-semibold text-white min-[361px]:px-3 min-[361px]:py-2 min-[361px]:text-[12.5px] min-[861px]:px-[18px] min-[861px]:py-[9px] min-[861px]:text-[13.5px]"
              >
                →] เข้าสู่ระบบ
              </button>
              </>
            )}
          </div>
          <Hamburger open={navOpen} onClick={() => setNavOpen((v) => !v)} />
        </div>
      </header>
  );
});

export default Header;
