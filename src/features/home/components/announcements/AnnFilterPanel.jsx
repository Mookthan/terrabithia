import DateRangeField from '@/components/ui/DateRangeField';
import { ANN_GROUPS, RANGES, allGroups, matchAnn } from './annModel';

const ROW = 'flex cursor-pointer items-center gap-2 rounded-ctl p-1.5 pl-[10px] text-[12.5px] hover:bg-teal-veil';
const HEAD = 'mx-[6px] mb-[2px] mt-2 block text-[12.5px] font-bold text-ink first:mt-[2px]';
const Small = ({ children }) => <small className="ml-auto text-[11px] text-muted">{children}</small>;

/** Filter panel content (rendered inside a DropPanel): teams, posting date, a count and "clear". */
export default function AnnFilterPanel({ list, filter }) {
  const { f, active, toggleGroup, allTeams, setRange, setDate, clear } = filter;
  const shown = list.filter((a) => matchAnn(a, f)).length;
  return (
    <div className="p-2.5 text-ink">
      <div>
        <span className={HEAD}>ทีม</span>
        <label className={ROW}>
          <input type="checkbox" checked={allGroups(f)} onChange={allTeams} />
          <b>ทีมทั้งหมด</b>
          <Small>{list.length} ประกาศ</Small>
        </label>
        {ANN_GROUPS.map((g) => (
          <label key={g} className={ROW}>
            <input type="checkbox" checked={f.groups.includes(g)} onChange={() => toggleGroup(g)} />
            <span>{g}</span>
            <Small>{list.filter((a) => a.d === g).length} ประกาศ</Small>
          </label>
        ))}
        <span className={HEAD}>วันเวลาที่โพสต์</span>
        {RANGES.map(([k, label]) => (
          <label key={k} className={ROW}>
            <input type="radio" name="annRange" checked={f.range === k} onChange={() => setRange(k)} />
            <span>{label}</span>
          </label>
        ))}
        <div className="px-[6px] pb-[2px] pt-[6px]">
          <DateRangeField from={f.from} to={f.to} onChange={(a, b) => { setDate('from', a); setDate('to', b); }} />
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between gap-2 border-t border-line pt-2 text-[11.5px] text-muted">
        <span>{`แสดง ${shown} / ${list.length} ประกาศ`}</span>
        <button
          type="button"
          onClick={clear}
          className={`cursor-pointer rounded-ctl border-0 bg-transparent px-2 py-[5px] text-[12.5px] text-teal-bright transition-colors duration-200 hover:bg-teal-veil hover:!text-teal-hover ${active || f.from || f.to ? '' : 'invisible'}`}
        >
          ล้างตัวกรอง
        </button>
      </div>
    </div>
  );
}
