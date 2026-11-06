import { useRef, useState } from 'react';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import useClickOutside from '@/hooks/useClickOutside';
import { ICON_BTN } from '../iconButton';
import { TEXT_BTN } from '../TextButton';

const ITEM = 'flex w-full cursor-pointer items-center gap-2 rounded-ctl border-0 bg-transparent px-3 py-2 text-left text-[13px] text-ink transition-colors hover:bg-teal-veil';

/**
 * "⋯" on something I wrote myself (comments, greetings, reviews; mook 2026-11-06). Others never see it.
 * Menu: แก้ไข (when `onEdit` is given) and ลบ, which asks in place ("ลบความคิดเห็นนี้?" ยกเลิก / ลบ)
 * instead of a popup, so it also works inside popups.
 */
export default function OwnActions({ onEdit, onDelete, label = 'ความคิดเห็น', className = '' }) {
  const [mode, setMode] = useState(null); // null | 'menu' | 'ask'
  const ref = useRef(null);
  useClickOutside(ref, () => setMode(null), mode !== null);
  const stop = (fn) => (e) => { e.stopPropagation(); fn(); };

  if (mode === 'ask') {
    return (
      <span ref={ref} className={`inline-flex flex-wrap items-center gap-1 text-[12px] text-ink ${className}`} style={{ animation: 'ptFade .2s ease-out' }}>
        {`ลบ${label}นี้?`}
        <button type="button" onClick={stop(() => setMode(null))} className={`${TEXT_BTN} !px-2 !py-1 !text-[12px]`}>ยกเลิก</button>
        <button
          type="button"
          onClick={stop(() => { setMode(null); onDelete(); })}
          className="cursor-pointer rounded-ctl border-0 bg-[#F0515B] px-2.5 py-1 text-[12px] font-semibold text-white transition-colors hover:bg-[#D93A45]"
        >
          ลบ
        </button>
      </span>
    );
  }
  return (
    <span ref={ref} className={`relative inline-flex ${className}`}>
      <button
        type="button"
        aria-label={`ตัวเลือก${label}`}
        aria-expanded={mode === 'menu'}
        onClick={stop(() => setMode(mode === 'menu' ? null : 'menu'))}
        className={`${ICON_BTN} h-7 w-7 rounded-full text-muted`}
      >
        <MoreHorizontal className="lc !h-4 !w-4" />
      </button>
      {mode === 'menu' && (
        <span role="menu" className="absolute right-0 top-full z-20 mt-1 flex w-[132px] flex-col rounded-box bg-white p-1 shadow-pop" style={{ animation: 'ptFade .15s ease-out' }}>
          {onEdit && (
            <button type="button" role="menuitem" onClick={stop(() => { setMode(null); onEdit(); })} className={ITEM}>
              <Pencil className="lc !h-[15px] !w-[15px] text-teal-bright" />แก้ไข
            </button>
          )}
          <button type="button" role="menuitem" onClick={stop(() => setMode('ask'))} className={`${ITEM} !text-[#D93A45]`}>
            <Trash2 className="lc !h-[15px] !w-[15px]" />ลบ
          </button>
        </span>
      )}
    </span>
  );
}
