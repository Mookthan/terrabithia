import { useState } from 'react';
import { ChevronDown, Download, Hourglass } from 'lucide-react';
import Fold from '@/components/ui/Fold';
import PhoneSheet from '@/components/ui/PhoneSheet';
import usePhone from '@/hooks/usePhone';
import { useUI } from '@/context/UIContext';
import { TEXT_BTN, TEXT_LINK } from '@/components/ui/TextButton';
import { EVALUATIONS, KPIS } from '../data';
import { KpiList } from './KpiModal';
import ModalShell from './ModalShell';

export const GRADE_TONE = { A: 'bg-teal-bright text-white', 'B+': 'bg-teal-soft text-teal-hover', B: 'bg-cream text-ink' };

function Row({ ev, kpiOpen, onKpi }) {
  const { toast } = useUI();
  if (ev.pending) {
    return (
      <li className="flex items-center gap-4 py-3.5">
        <b className="w-[46px] flex-none text-[15px] text-ink">{ev.y}</b>
        <span className="inline-flex items-center gap-1.5 text-[13px] text-muted"><Hourglass className="lc !h-4 !w-4" aria-hidden="true" />รอประกาศผล</span>
      </li>
    );
  }
  return (
    <li className="flex flex-wrap items-center gap-x-3 gap-y-1 py-3.5">
      <b className="w-[46px] flex-none text-[15px] text-ink">{ev.y}</b>
      <span className={`grid h-10 w-10 flex-none place-items-center rounded-full text-[15px] font-bold ${GRADE_TONE[ev.grade] || 'bg-cream text-ink'}`}>{ev.grade}</span>
      <div className="min-w-0 flex-1 basis-[calc(100%-120px)]">
        <div className="text-[14px] font-semibold text-ink">{`${ev.label} · ${ev.score.toFixed(1)} / 5`}</div>
        <div className="text-[12px] text-muted">{`ผู้ประเมิน ${ev.by} · ประกาศผล ${ev.date}`}</div>
        {KPIS[ev.y] && (
          <button type="button" aria-expanded={kpiOpen} className={`${TEXT_LINK} gap-1 text-[12px] font-semibold`} onClick={onKpi}>
            {kpiOpen ? `ซ่อน KPI ปี ${ev.y}` : `ดู KPI ปี ${ev.y}`}
            <ChevronDown className={`lc !h-3.5 !w-3.5 text-teal-bright transition-transform duration-300 ${kpiOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
          </button>
        )}
      </div>
      <button type="button" className={`${TEXT_BTN} -my-1 ml-auto !text-[13px]`} onClick={() => toast(`ดาวน์โหลด ${ev.file}`)}>
        <Download className="lc !h-4 !w-4" aria-hidden="true" />ดาวน์โหลด PDF
      </button>
      {KPIS[ev.y] && (
        <Fold open={kpiOpen} className="w-full">
          <div className="mt-2 rounded-ctl border border-line px-3 py-2.5"><KpiList year={ev.y} compact /></div>
        </Fold>
      )}
    </li>
  );
}

/** Every year's evaluation result (opened from the work card once unlocked); each year folds open its KPIs in place. */
export default function EvalHistoryModal({ onClose }) {
  const [kpiYear, setKpiYear] = useState(null);
  const phone = usePhone();
  return (
    <ModalShell label="ผลการประเมินย้อนหลัง" onClose={onClose}>
      <h2 className="mb-2 text-[19px] font-bold text-ink">ผลการประเมินย้อนหลัง</h2>
      <ul className="m-0 list-none divide-y divide-line p-0">
        {EVALUATIONS.map((ev) => <Row key={ev.y} ev={ev} kpiOpen={!phone && kpiYear === ev.y} onKpi={() => setKpiYear((y) => (y === ev.y ? null : ev.y))} />)}
      </ul>
      {phone && kpiYear && (
        <PhoneSheet title={`KPI ปี ${kpiYear}`} onClose={() => setKpiYear(null)}>
          <KpiList year={kpiYear} compact />
        </PhoneSheet>
      )}
    </ModalShell>
  );
}
