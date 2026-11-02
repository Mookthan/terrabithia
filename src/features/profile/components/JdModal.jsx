import { Download, Link2 } from 'lucide-react';
import { useUI } from '@/context/UIContext';
import { TEXT_BTN } from '@/components/ui/TextButton';
import { JD, WORK_INFO } from '../data';
import ModalShell from './ModalShell';

function Block({ title, children }) {
  return (
    <div className="mt-4">
      <h3 className="mb-1.5 text-[14px] font-bold text-ink">{title}</h3>
      {children}
    </div>
  );
}

const List = ({ items }) => (
  <ul className="m-0 list-disc space-y-1 pl-5 text-[13px] leading-[1.7] text-ink marker:text-teal-bright">
    {items.map((t) => <li key={t}>{t}</li>)}
  </ul>
);

/**
 * JD content (purpose, duties, qualifications) with share / PDF actions; shown in JdModal on the profile
 * and folded open inside the org-chart person card (no popup on a popup).
 */
export function JdBody({ jd = JD, boss, shareUrl, compact = false }) {
  const { toast } = useUI();
  const share = () => {
    navigator.clipboard?.writeText(shareUrl).catch(() => {});
    toast('คัดลอกลิงก์ JD แล้ว ส่งต่อให้เพื่อนได้เลย');
  };
  return (
    <>
      {!compact && <h2 className="pr-8 text-[19px] font-bold text-ink">{`Job Description · ${jd.title}`}</h2>}
      <p className={`text-[12px] text-muted ${compact ? '' : 'mt-0.5'}`}>{`${compact ? `${jd.title} · ` : ''}${boss ? `ผู้บังคับบัญชา ${boss} · ` : ''}อัปเดต ${jd.updated}`}</p>
      <Block title="วัตถุประสงค์ของตำแหน่ง"><p className="text-[13px] leading-[1.7] text-ink">{jd.purpose}</p></Block>
      <Block title="หน้าที่หลัก"><List items={jd.duties} /></Block>
      <Block title="คุณสมบัติ"><List items={jd.quals} /></Block>
      <div className={`flex flex-wrap justify-end gap-1 ${compact ? 'mt-3' : 'mt-5'}`}>
        {shareUrl && (
          <button type="button" className={`${TEXT_BTN} !text-[13px]`} onClick={share}>
            <Link2 className="lc !h-4 !w-4" aria-hidden="true" />คัดลอกลิงก์ส่งต่อ
          </button>
        )}
        <button type="button" className={`${TEXT_BTN} !text-[13px]`} onClick={() => toast(`ดาวน์โหลด ${jd.file}`)}>
          <Download className="lc !h-4 !w-4" aria-hidden="true" />ดาวน์โหลด PDF
        </button>
      </div>
    </>
  );
}

/** The signed-in user's full JD in a popup (profile work card). */
export default function JdModal({ jd = JD, boss = WORK_INFO.find(([l]) => l === 'ผู้บังคับบัญชา:')?.[1], shareUrl, onClose }) {
  return (
    <ModalShell label="Job Description" onClose={onClose}>
      <JdBody jd={jd} boss={boss} shareUrl={shareUrl} />
    </ModalShell>
  );
}
