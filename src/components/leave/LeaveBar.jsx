import { fmtDays } from '@/data/leave';
import './leaveBar.css';

function BarText({ children }) {
  return (
    <div className="absolute inset-0 flex items-center whitespace-nowrap pl-4 text-[14px] font-semibold text-[#C4C4C4]">
      {children}
    </div>
  );
}

/** White "used x/y" bar; the teal fill shows what is left and grows in on mount. Shared by the profile grid and the home card. */
export default function LeaveBar({ leave }) {
  const used = leave.t - leave.r;
  const p = Math.max(leave.r / leave.t, 0);
  const label = `ใช้ไปแล้ว ${fmtDays(used)}/${fmtDays(leave.t)} ${leave.u}`;
  return (
    <div
      className="relative h-[46px] overflow-hidden rounded-ctl bg-white"
      role="img"
      aria-label={`${label} เหลือ ${fmtDays(leave.r)} ${leave.u}`}
    >
      <BarText>{label}</BarText>
      <div className="lv-on absolute inset-0 bg-teal-hover" style={{ '--p': p }}>
        <BarText>{label}</BarText>
      </div>
    </div>
  );
}
