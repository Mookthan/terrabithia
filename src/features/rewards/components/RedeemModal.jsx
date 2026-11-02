import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import useEscape from '@/hooks/useEscape';
import useBodyLock from '@/hooks/useBodyLock';
import { OUTLINE_HOVER } from '@/components/ui/TextButton';
import { fmtCoins } from '../data';

/** Confirm before spending coins: what, how much, what's left, and how to collect. */
export default function RedeemModal({ reward, balance, onConfirm, onClose }) {
  const [shown, setShown] = useState(false);
  useEscape(onClose);
  useBodyLock(true);
  useEffect(() => { const r = requestAnimationFrame(() => setShown(true)); return () => cancelAnimationFrame(r); }, []);
  const rows = [['ใช้', `${fmtCoins(reward.cost)} เหรียญ`], ['คงเหลือหลังแลก', `${fmtCoins(balance - reward.cost)} เหรียญ`]];

  return createPortal(
    <div
      className={`fixed inset-0 z-[300] flex items-center justify-center bg-[rgba(20,30,28,.45)] p-4 backdrop-blur-[4px] transition-opacity duration-[250ms] ${shown ? 'opacity-100' : 'opacity-0'}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div role="dialog" aria-modal="true" aria-label="ยืนยันการแลก" className="w-[min(400px,100%)] rounded-box bg-white p-6 text-[14px] text-ink shadow-pop">
        <h2 className="m-0 text-[17px] font-bold">ยืนยันการแลก</h2>
        <p className="mb-4 mt-1.5 text-[14px]">{reward.l}</p>
        {rows.map(([l, v]) => (
          <div key={l} className="flex justify-between border-b border-line py-2 text-[13.5px] last:border-b-0">
            <span className="text-muted">{l}</span><b>{v}</b>
          </div>
        ))}
        <p className="mb-0 mt-3 text-[12px] leading-[1.6] text-muted">HR จะติดต่อนัดรับของรางวัลภายใน 3 วันทำการ ดูสถานะได้ที่แท็บประวัติเหรียญ</p>
        <div className="mt-5 flex justify-end gap-2">
          <button type="button" onClick={onClose} className={`cursor-pointer rounded-ctl border border-line bg-white px-4 py-2 text-[13px] font-semibold text-ink ${OUTLINE_HOVER}`}>ยกเลิก</button>
          <button type="button" onClick={onConfirm} className="cursor-pointer rounded-ctl border-0 bg-teal-bright px-4 py-2 text-[13px] font-semibold text-white transition-colors duration-200 hover:!bg-teal-hover">ยืนยันการแลก</button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
