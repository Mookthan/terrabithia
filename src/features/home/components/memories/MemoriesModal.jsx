import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { TEXT_BTN } from '@/components/ui/TextButton';
import useBodyLock from '@/hooks/useBodyLock';
import useEscape from '@/hooks/useEscape';
import { ACTIVITIES } from '@/features/culture/data';
import { PATHS } from '@/routes/paths';
import CloseButton from '@/components/ui/CloseButton';

const TH_MON = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];

/** Popup listing today's memories, newest year first; each opens its activity album. */
export default function MemoriesModal({ items, date, onClose }) {
  const navigate = useNavigate();
  useEscape(onClose, true);
  useBodyLock(true);
  const dayTxt = `${date.getDate()} ${TH_MON[date.getMonth()]}`;

  return createPortal(
    <div
      className="fixed inset-0 z-[2100] flex items-center justify-center bg-[rgba(10,20,18,.45)] p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div role="dialog" aria-label="วันนี้ในอดีต" className="relative max-h-[90vh] w-[480px] max-w-full overflow-y-auto rounded-box bg-white px-6 py-6 shadow-pop">
        <CloseButton onClick={onClose} className="absolute right-3 top-3" />
        <h2 className="text-[19px] font-bold text-ink">วันนี้ในอดีต</h2>
        <p className="mb-4 text-[13px] text-muted">{`กิจกรรมของเราในวันที่ ${dayTxt} ปีก่อนๆ`}</p>
        <div className="flex flex-col gap-5">
          {items.map((m) => {
            const a = ACTIVITIES[m.album];
            const year = date.getFullYear() + 543 - m.ago;
            return (
              <article key={m.ago}>
                <div className="mb-2 text-[13px] font-semibold text-ink">{`${m.ago} ปีก่อน · ${dayTxt} ${year}`}</div>
                <img src={a.img} alt="" className="block aspect-[16/10] w-full rounded-box object-cover" />
                <div className="mt-2 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <b className="block text-[14.5px] text-ink">{a.t}</b>
                    <span className="text-[12px] text-muted">{a.tag}</span>
                  </div>
                  <button type="button" className={`${TEXT_BTN} flex-none text-[13px]`} onClick={() => { onClose(); navigate(PATHS.activityAlbum(m.album)); }}>
                    ดูอัลบั้ม <ChevronRight className="lc !h-4 !w-4" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>,
    document.body,
  );
}
