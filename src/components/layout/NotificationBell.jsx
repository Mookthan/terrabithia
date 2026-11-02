import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, CalendarCheck, Megaphone, Cake, GraduationCap, Newspaper, CheckCheck, Siren, Vote, CircleCheck, Heart } from 'lucide-react';
import { INITIAL_NOTIFICATIONS } from '@/data/notifications';
import { ME } from '@/data/me';
import { useBirthday } from '@/features/birthday/BirthdayProvider';
import useClickOutside from '@/hooks/useClickOutside';
import useSingleOverlay from '@/hooks/useSingleOverlay';
import useEscape from '@/hooks/useEscape';

const ICONS = { 'calendar-check': CalendarCheck, megaphone: Megaphone, cake: Cake, 'graduation-cap': GraduationCap, newspaper: Newspaper, siren: Siren, vote: Vote, 'circle-check': CircleCheck, heart: Heart };

function NotificationRow({ n, onOpen }) {
  const Icon = ICONS[n.icon];
  return (
    <button
      onClick={() => onOpen(n)}
      className={`relative flex w-full items-start gap-3 rounded-ctl px-3 py-2.5 text-left transition-colors hover:bg-teal-bright/[.12] ${n.unread ? 'bg-teal-bright/[.07]' : ''}`}
    >
      <span className={`flex h-9 w-9 flex-none items-center justify-center rounded-full ${n.resolved ? 'bg-teal-bright text-white' : n.urgent ? 'bg-[#F0515B] text-white' : 'bg-[#E6F4F1] text-[#1B7A6B]'}`}>
        <Icon className="lc !h-[18px] !w-[18px]" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <b className="text-[13.5px] font-semibold leading-[1.4] text-ink">{n.title}</b>
        <small className="text-xs leading-[1.4] text-ink">{n.detail}</small>
        <em className="text-[11px] not-italic text-muted">{n.time}</em>
      </span>
      {n.unread && <i className="absolute right-3 top-4 h-2 w-2 rounded-full bg-[#F0515B]" />}
    </button>
  );
}

export default function NotificationBell({ onOpenChange }) {
  const [items, setItems] = useState(INITIAL_NOTIFICATIONS);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const navigate = useNavigate();
  const { openCard, books } = useBirthday();
  const sentToGong = !!books?.gong?.cards.some((c) => c.by === ME.id);

  // Once I've sent Gong a card, its reminder turns into a read confirmation.
  useEffect(() => {
    if (!sentToGong) return;
    setItems((list) => list.map((x) => (x.id === 3 ? { ...x, unread: false, detail: 'คุณส่งการ์ดให้ก้องแล้ว ✓' } : x)));
  }, [sentToGong]);
  const unread = items.filter((n) => n.unread).length;
  // Ring once shortly after the page loads when something is unread, and again whenever the count goes up.
  const [ring, setRing] = useState(false);
  const lastUnread = useRef(0);
  useEffect(() => {
    if (unread > lastUnread.current) setTimeout(() => setRing(true), lastUnread.current === 0 ? 1200 : 0);
    lastUnread.current = unread;
  }, [unread]);

  const close = useCallback(() => setOpen(false), []);
  useClickOutside(wrapRef, close, open);
  useEscape(close, open);
  useSingleOverlay('notifications', open, close);

  const toggle = () => {
    const next = !open;
    setOpen(next);
    if (next) onOpenChange?.();
  };

  const openItem = (n) => {
    setItems((list) => list.map((x) => (x.id === n.id ? { ...x, unread: false } : x)));
    setOpen(false);
    if (n.action.card) openCard(n.action.card);
    else navigate(n.action.to);
    window.scrollTo(0, 0);
  };

  return (
    <div ref={wrapRef} className="relative flex-none">
      <button
        onClick={toggle}
        aria-label="การแจ้งเตือน"
        onAnimationEnd={() => setRing(false)}
        className={`icon-pop relative flex h-9 w-9 items-center justify-center rounded-full text-teal-bright transition-colors hover:bg-teal-veil min-[861px]:h-10 min-[861px]:w-10 ${ring ? 'bell-ring' : ''}`}
      >
        <Bell className="lc !h-[23px] !w-[23px] min-[861px]:!h-6 min-[861px]:!w-6" />
        {unread > 0 && (
          <span className="pointer-events-none absolute -right-px top-px flex h-[17px] min-w-[17px] items-center justify-center rounded-ctl border-2 border-white bg-[#F0515B] px-1 text-[10px] font-bold leading-none text-white">
            {unread}
          </span>
        )}
      </button>

      {/* Stretches open and shut (grid-rows fold, like DateRangeField) instead of popping in. */}
      <div
        aria-hidden={!open}
        inert={open ? undefined : ''}
        className={`fixed left-2.5 right-2.5 top-[72px] z-50 grid overflow-hidden rounded-box border border-white/85 bg-white/[.78] shadow-[0_24px_56px_rgba(21,80,70,.2),inset_0_1px_0_rgba(255,255,255,.95)] backdrop-blur-[20px] backdrop-saturate-[180%] transition-[grid-template-rows,opacity,visibility] duration-[.42s] ease-[cubic-bezier(.4,0,.2,1)] motion-reduce:transition-none min-[861px]:absolute min-[861px]:left-auto min-[861px]:-right-[60px] min-[861px]:top-[calc(100%+12px)] min-[861px]:w-[min(380px,92vw)] ${
          open ? 'visible grid-rows-[1fr] opacity-100' : 'invisible grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="min-h-0">
        <div className="flex items-center justify-between px-4 pb-2 pt-3.5">
          <b className="text-base text-ink">การแจ้งเตือน</b>
          <button
            onClick={() => setItems((list) => list.map((x) => ({ ...x, unread: false })))}
            className="flex items-center gap-[5px] text-[12.5px] text-teal-bright transition-colors duration-200 hover:!text-teal-hover"
          >
            <CheckCheck className="lc !h-4 !w-4" /> อ่านทั้งหมด
          </button>
        </div>
        <div className="max-h-[min(60vh,420px)] overflow-auto px-2 pb-2.5">
          {items.length
            ? items.map((n) => <NotificationRow key={n.id} n={n} onOpen={openItem} />)
            : <div className="p-[26px] text-center text-[13px] text-muted">ไม่มีการแจ้งเตือน</div>}
        </div>
        </div>
      </div>
    </div>
  );
}
