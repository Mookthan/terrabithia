import { useState } from 'react';
import './nav.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { isNavActive } from '@/routes/navItems';


function NavLinkButton({ item, active, onGo }) {
  return (
    <div className="relative w-full min-[861px]:w-auto">
      <button
        onClick={() => onGo(item.to)}
        className={`nav-underline relative w-full rounded-ctl px-3 py-2 text-left text-[14.5px] font-semibold text-ink hover:bg-mint max-[860px]:rounded-ctl max-[860px]:px-4 max-[860px]:py-3.5 max-[860px]:text-[17px] max-[860px]:hover:bg-teal-bright/[.12] ${
          active ? 'is-active !bg-transparent !font-extrabold !text-teal-bright' : ''
        }`}
      >
        {item.label}
      </button>
    </div>
  );
}

function NavDropdown({ item, active, pathname, open, onToggle, onGo }) {
  const [closing, setClosing] = useState(false);
  const shown = open && !closing;

  const pick = (to) => {
    setClosing(true); // let hover-opened desktop menus close right after a pick
    onGo(to);
  };

  return (
    <div className={`group relative w-full min-[861px]:w-auto ${shown ? 'is-open' : ''} ${closing ? 'is-closing' : ''}`} onMouseLeave={() => setClosing(false)}>
      <button
        onClick={onToggle}
        className={`nav-underline relative flex w-full items-center gap-1 rounded-ctl px-3 py-2 text-left text-[14.5px] font-semibold text-ink hover:bg-mint max-[860px]:justify-between max-[860px]:rounded-ctl max-[860px]:px-4 max-[860px]:py-3.5 max-[860px]:text-[17px] max-[860px]:hover:bg-teal-bright/[.12] ${
          active ? 'is-active !bg-transparent !font-extrabold !text-teal-bright' : ''
        }`}
      >
        {item.label}
        <ChevronDown className="lc nav-chev ml-auto text-teal-bright transition-transform duration-[250ms] min-[861px]:ml-0" />
      </button>
      <div className="nav-dropdown">
        <div className="nav-dropdown-inner">
          {item.children.map((c, n) => {
            const on = pathname === c.to;
            return (
              <button
                key={c.to}
                style={{ '--n': n }}
                onClick={() => pick(c.to)}
                className={`nav-dd-item ${on ? 'is-active' : ''}`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/** Top navigation. Desktop: inline with hover dropdowns. Phone: full-height glass sheet. */
export default function MainNav({ items, mobileOpen, onNavigate }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [openLabel, setOpenLabel] = useState(null);

  const go = (to) => {
    setOpenLabel(null);
    onNavigate?.();
    navigate(to);
    window.scrollTo(0, 0);
  };

  return (
    <nav className={`main-nav ${mobileOpen ? 'is-open' : ''}`} aria-label="เมนูหลัก">
      <div className="main-nav-inner">
        {items.map((item) =>
          item.children ? (
            <NavDropdown
              key={item.label}
              item={item}
              pathname={pathname}
              active={isNavActive(item, pathname)}
              open={openLabel === item.label}
              onToggle={() => setOpenLabel((l) => (l === item.label ? null : item.label))}
              onGo={go}
            />
          ) : (
            <NavLinkButton key={item.label} item={item} active={isNavActive(item, pathname)} onGo={go} />
          ),
        )}
      </div>
    </nav>
  );
}

