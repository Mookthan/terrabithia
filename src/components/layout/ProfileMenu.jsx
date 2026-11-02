import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User, CalendarDays, Gift, ShieldCheck, Bell, Globe, ChevronDown, LifeBuoy, LayoutDashboard, ClipboardCheck, LogOut, Coins,
} from 'lucide-react';
import { ME, ADMIN_ROLES } from '@/data/me';
import { PATHS } from '@/routes/paths';
import { useAuth } from '@/context/AuthContext';
import { useLang } from '@/context/LangContext';
import { useUI } from '@/context/UIContext';
import HelpModal from '@/components/help/HelpModal';
import useClickOutside from '@/hooks/useClickOutside';
import LangSwitch from './LangSwitch';

const itemCls = 'flex w-full items-center gap-2 rounded-ctl px-1.5 py-2 text-left text-[12.5px] text-white hover:bg-white/[.08]';

/** Children fade/slide in one after another when the card opens. */
const stagger = (i, open) => ({
  opacity: open ? 1 : 0,
  translate: open ? '0 0' : '0 -8px',
  transition: open
    ? `opacity .4s ease ${60 + Math.min(i, 6) * 30}ms, translate .45s cubic-bezier(.22,1,.36,1) ${60 + Math.min(i, 6) * 30}ms`
    : 'opacity .18s ease, translate .18s ease',
});

export default function ProfileMenu({ open, onToggle, onClose }) {
  const [langOpen, setLangOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { lang } = useLang();
  const { toast } = useUI();

  const close = useCallback(() => { onClose(); setLangOpen(false); }, [onClose]);
  useClickOutside(ref, close, open);

  const goTo = (to) => { close(); navigate(to); };
  // The admin console (and post approvals) live in the separate back office from the backend design.
  const toBackOffice = () => { close(); toast('ระบบหลังบ้านจะเปิดในแท็บใหม่ เมื่อเชื่อมระบบจริง'); };
  const doLogout = () => { close(); logout(); navigate(PATHS.home); window.scrollTo(0, 0); };

  const rows = [
    <div key="head" className="mb-1.5 flex items-center gap-2.5 border-b border-white/[.14] pb-3">
      <Avatar size="h-[34px] w-[34px]" />
      <div>
        <div className="text-[13.5px] font-bold">{ME.displayName}</div>
        <div className="text-[11px] opacity-65">{ME.email}</div>
      </div>
    </div>,
    <button key="profile" className={itemCls} onClick={() => goTo(PATHS.profile)}><User className="lc" /> ข้อมูลส่วนตัว</button>,
    <button key="leave" className={itemCls} onClick={() => goTo(PATHS.profileLeave)}><CalendarDays className="lc" /> สิทธิ์สำหรับวันลา</button>,
    <button key="cards" className={itemCls} onClick={() => goTo(PATHS.myCards)}><Gift className="lc" /> สมุดวันเกิดของฉัน</button>,
    <button key="rewards" className={itemCls} onClick={() => goTo(PATHS.rewards)}><Coins className="lc" /> แลกของรางวัล</button>,
    <button key="security" className={itemCls} onClick={() => goTo(PATHS.settings)}><ShieldCheck className="lc" /> บัญชีและความปลอดภัย</button>,
    <button key="noti" className={itemCls} onClick={() => goTo(PATHS.settingsNotify)}><Bell className="lc" /> ตั้งค่าการแจ้งเตือน</button>,
    <button key="lang" className={`${itemCls} min-[861px]:!hidden`} aria-expanded={langOpen} onClick={(e) => { e.stopPropagation(); setLangOpen((v) => !v); }}>
      <Globe className="lc" /> เปลี่ยนภาษา
      <span data-nt className="ml-auto text-xs opacity-65">{lang === 'en' ? 'English' : 'ไทย'}</span>
      <ChevronDown className={`lc !h-3.5 !w-3.5 text-teal-bright transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`} />
    </button>,
    <div key="langsub" className={`grid min-[861px]:hidden transition-[grid-template-rows] duration-300 ease-[cubic-bezier(.4,0,.2,1)] ${langOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
      <div className={`min-h-0 overflow-hidden px-2 ${langOpen ? 'pb-2 pt-1' : ''}`}><LangSwitch dark /></div>
    </div>,
    <button key="help" className={itemCls} onClick={() => { close(); setHelpOpen(true); }}><LifeBuoy className="lc" /> ช่วยเหลือ</button>,
    ADMIN_ROLES.includes(ME.role) && (
      <button key="console" className={`${itemCls} mt-1 !rounded-none border-t border-white/[.14] !pt-2.5`} onClick={toBackOffice}><LayoutDashboard className="lc" /> จัดการระบบ</button>
    ),
    ME.role === 'Approver' && (
      <button key="approve" className={itemCls} onClick={toBackOffice}><ClipboardCheck className="lc" /> รออนุมัติ</button>
    ),
    <button key="logout" className={`${itemCls} mt-1 !rounded-none border-t border-white/[.14] !pt-2.5 !text-[#FF8A73]`} onClick={doLogout}>
      <LogOut className="lc" /> ออกจากระบบ
    </button>,
    <div key="ver" className="mt-2.5 text-center text-[10px] opacity-50">Terrabithia V.01</div>,
  ].filter(Boolean);

  return (
    <div ref={ref} className="relative flex-none">
      <button onClick={onToggle} aria-label="เมนูโปรไฟล์" className="block">
        <Avatar />
      </button>
      <div
        className={`absolute right-0 top-[calc(100%+12px)] z-40 w-[230px] origin-top-right rounded-box bg-[#0D574A] p-3.5 text-white shadow-pop motion-reduce:transition-none ${
          open
            ? 'visible pointer-events-auto opacity-100 [clip-path:inset(-20px_-50px_-70px_-50px_round_14px)] [transition:clip-path_.5s_cubic-bezier(.22,1,.36,1),opacity_.2s_ease,transform_.5s_cubic-bezier(.22,1,.36,1),visibility_0s]'
            : 'invisible pointer-events-none -translate-y-1.5 scale-[.97] opacity-0 [clip-path:inset(0_-50px_100%_-50px_round_14px)] [transition:clip-path_.42s_cubic-bezier(.22,1,.36,1),opacity_.22s_ease,transform_.42s_cubic-bezier(.22,1,.36,1),visibility_0s_linear_.42s]'
        }`}
      >
        {rows.map((row, i) => <div key={row.key} style={stagger(i, open)}>{row}</div>)}
      </div>
      {helpOpen && <HelpModal onClose={() => setHelpOpen(false)} />}
    </div>
  );
}

function Avatar({ size = 'h-9 w-9' }) {
  return (
    <div className={`${size} cursor-pointer overflow-hidden rounded-full bg-olive`}>
      <img src={ME.photo} alt={ME.nick} className="block h-full w-full rounded-full object-cover" />
    </div>
  );
}
