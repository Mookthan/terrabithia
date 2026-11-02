import { useState } from 'react';
import { useUI } from '@/context/UIContext';
import { ME } from '@/data/me';
import SettingsCard from './SettingsCard';

/** LINE's brand green, used only for the LINE mark. */
const LINE_GREEN = '#06C755';

function LineMark() {
  return (
    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-[11px] font-extrabold tracking-wide text-white" style={{ background: LINE_GREEN }}>
      LINE
    </span>
  );
}

/**
 * Link the person's LINE to the company LINE Official Account (Messaging API account linking).
 * Only urgent notices go to LINE; everything else stays on the bell and email. Mock: toggles locally.
 */
export default function LineCard() {
  const { toast } = useUI();
  const [linked, setLinked] = useState(false);
  const toggle = () => {
    setLinked((v) => !v);
    toast(linked ? 'ยกเลิกการเชื่อม LINE แล้ว' : 'เชื่อม LINE เรียบร้อย จะได้รับประกาศด่วนทาง LINE');
  };

  return (
    <SettingsCard title="รับประกาศด่วนทาง LINE" desc="เพิ่มเพื่อน LINE ของบริษัทแล้วเชื่อมบัญชีครั้งเดียว เวลามีเรื่องด่วน เช่น ปิดซ่อมห้องน้ำ ไฟดับ จะเด้งเข้า LINE ทันที">
      <div className="flex items-center gap-3.5 rounded-ctl border border-line px-4 py-3 max-[640px]:flex-wrap">
        <LineMark />
        <div className="min-w-0 flex-1">
          <div className="text-[13.5px] font-semibold text-ink">{linked ? `เชื่อมแล้ว · LINE ของ${ME.nick}` : 'ยังไม่ได้เชื่อม'}</div>
          <div className="text-[12px] text-muted">{linked ? 'ส่งเฉพาะประกาศด่วนเท่านั้น ไม่มีข่าวหรือโฆษณา' : '@terrabithia · บัญชีทางการของบริษัท'}</div>
        </div>
        {linked ? (
          <button type="button" onClick={toggle} className="rounded-ctl border border-line bg-white px-4 py-2 text-[13px] font-semibold text-ink transition-colors hover:bg-teal-soft max-[640px]:w-full">
            ยกเลิกการเชื่อม
          </button>
        ) : (
          <button type="button" onClick={toggle} className="rounded-ctl bg-teal-bright px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-teal-hover max-[640px]:w-full">
            เชื่อม LINE
          </button>
        )}
      </div>
    </SettingsCard>
  );
}
