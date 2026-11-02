import { useState } from 'react';
import { Coins } from 'lucide-react';
import { fmtCoins } from '@/features/rewards/data';
import { useCoins } from '@/features/rewards/coinStore';
import { WORK_INFO } from '../data';
import ProfileCard from './ProfileCard';
import InfoList from './InfoList';
import EvalResult, { LINK_BTN } from './EvalResult';
import EvalUnlockModal from './EvalUnlockModal';
import JdModal from './JdModal';
import KpiModal from './KpiModal';
import { KPIS, KPI_YEAR } from '../data';
import { evalLock, useEvalAutoLock, useEvalLock } from '../evalLock';
import ShiftButton from '@/components/ui/ShiftButton';
import CountUp from '@/components/ui/CountUp';

/** Live coin balance, shown like the home profile card (coin icon + "N เหรียญ"). */
function CoinBalance() {
  const { balance } = useCoins();
  return (
    <span className="flex items-center gap-1.5">
      <Coins className="lc !h-[15px] !w-[15px] flex-none text-[#E0A800]" aria-hidden="true" />
      <CountUp value={balance} format={(n) => `${fmtCoins(n)} เหรียญ`} />
    </span>
  );
}

/**
 * Work details from EzyHR; read-only here (changes go through HR). Shift staff get a shift-table download in the header.
 * The coin balance sits right after tenure, as on the home profile card, then the (locked) evaluation result and this year's KPIs;
 * the duties row links to the full JD. Evaluation result and KPI scores unlock together (evalLock).
 */
export default function WorkCard() {
  const { asking } = useEvalLock();
  useEvalAutoLock();
  const [jd, setJd] = useState(false);
  const [kpi, setKpi] = useState(false);
  const at = WORK_INFO.findIndex(([l]) => l === 'อายุงาน:') + 1;
  const kpiRow = (
    <span key="kpi" className="flex flex-wrap items-center gap-x-2.5">
      {`${KPIS[KPI_YEAR].length} ตัวชี้วัด`}
      <button type="button" className={LINK_BTN} onClick={() => setKpi(true)}>ดู KPI</button>
    </span>
  );
  const withJd = ([l, v]) => (l === 'หน้าที่ความรับผิดชอบ:'
    ? [l, <span key="jd">{v} <button type="button" className={LINK_BTN} onClick={() => setJd(true)}>ดู JD ฉบับเต็ม</button></span>]
    : [l, v]);
  const rows = [
    ...WORK_INFO.slice(0, at),
    ['เหรียญสะสม:', <CoinBalance key="coins" />],
    ['ผลการประเมิน:', <EvalResult key="eval" />],
    [`KPI ปี ${KPI_YEAR}:`, kpiRow],
    ...WORK_INFO.slice(at).map(withJd),
  ];
  return (
    <ProfileCard>
      <div className="mb-3.5 flex items-center justify-between">
        <b className="text-[15.5px] text-ink">ข้อมูลการทำงาน</b>
        <ShiftButton />
      </div>
      <InfoList rows={rows} className="mt-1.5" />
      {jd && <JdModal onClose={() => setJd(false)} />}
      {kpi && <KpiModal onClose={() => setKpi(false)} />}
      {asking && <EvalUnlockModal onClose={evalLock.cancel} onUnlock={evalLock.unlock} />}
    </ProfileCard>
  );
}
