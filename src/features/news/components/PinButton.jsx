import { Pin } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useUI } from '@/context/UIContext';
import { MAX_PINS } from '../data';
import { togglePin, useNewsState } from '../newsStore';

/** Pin toggle in a news card's tag row (signed in); signed out, pinned cards just show the pin. */
export default function PinButton({ index }) {
  const { loggedIn } = useAuth();
  const { toast } = useUI();
  const { pinned } = useNewsState();
  const on = pinned.includes(index);
  const icon = <Pin className={`lc !h-[18px] !w-[18px] ${on ? 'fill-current' : ''}`} aria-hidden="true" />;
  if (!loggedIn) return on ? <span className="inline-flex p-1.5 text-teal-bright" title="ปักหมุด">{icon}</span> : null;
  const onClick = (e) => {
    e.stopPropagation();
    if (!togglePin(index)) toast(`ปักหมุดได้สูงสุด ${MAX_PINS} ข่าว`);
  };
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={on ? 'เลิกปักหมุด' : 'ปักหมุด'}
      title={on ? 'เลิกปักหมุด' : 'ปักหมุด'}
      aria-pressed={on}
      className={`inline-flex rounded-full border-0 bg-transparent p-1.5 transition-colors duration-200 hover:bg-teal-veil ${on ? 'text-teal-bright' : 'text-faint hover:text-teal-hover'}`}
    >
      {icon}
    </button>
  );
}
