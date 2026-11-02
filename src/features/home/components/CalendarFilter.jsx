import { useCallback, useRef, useState } from 'react';
import CheckMark from '@/components/ui/CheckMark';
import DropPanel from '@/components/ui/DropPanel';
import { FilterButton } from '@/components/ui/TextButton';
import useClickOutside from '@/hooks/useClickOutside';
import { CAL_GROUPS, CAL_LEGEND } from '../data';

const Dot = ({ c }) => <i className="inline-block h-2.5 w-2.5 flex-none rounded-full" style={{ background: c }} />;

function Row({ on, onClick, indent, children }) {
  return (
    <div
      role="checkbox"
      aria-checked={on === 'part' ? 'mixed' : !!on}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
      className={`flex cursor-pointer items-center gap-[9px] rounded-ctl py-[5px] pr-1.5 text-[13px] font-semibold text-ink hover:bg-teal-veil ${indent ? 'pl-7' : 'pl-1.5'}`}
    >
      <CheckMark state={on} />
      {children}
    </div>
  );
}

/**
 * "ตัวกรอง" dropdown for the calendar: which event types (legend colours) show as dots and in the day detail.
 * `types` = ticked colours; the badge counts them while not all are ticked. Opens upwards (it sits under the calendar).
 */
export default function CalendarFilter({ types, onChange, hide = [] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const close = useCallback(() => setOpen(false), []);
  useClickOutside(ref, close, open);
  const legend = CAL_LEGEND.filter(([c]) => !hide.includes(c));
  const all = legend.map(([c]) => c);
  const n = types.filter((c) => all.includes(c)).length;
  const toggle = (c) => onChange(types.includes(c) ? types.filter((x) => x !== c) : [...types, c]);
  // A group heading (กิจกรรมบริษัท) ticks or clears all of its rows; it shows part-ticked when only some are on.
  const toggleGroup = (cs) => {
    const allOn = cs.every((c) => types.includes(c));
    onChange(allOn ? types.filter((c) => !cs.includes(c)) : [...new Set([...types, ...cs])]);
  };
  const rows = [];
  legend.forEach(([c, l, g], i) => {
    if (g && legend.findIndex((x) => x[2] === g) === i) {
      const cs = legend.filter((x) => x[2] === g).map((x) => x[0]);
      const k = cs.filter((x) => types.includes(x)).length;
      rows.push(<Row key={g} on={k === cs.length ? true : k ? 'part' : false} onClick={() => toggleGroup(cs)}>{CAL_GROUPS[g]}</Row>);
    }
    rows.push(<Row key={c} indent={!!g} on={types.includes(c)} onClick={() => toggle(c)}><Dot c={c} />{l}</Row>);
  });

  return (
    <div ref={ref} className="relative">
      <FilterButton open={open} count={n < all.length ? n : 0} onClick={() => setOpen((o) => !o)} />
      <DropPanel open={open} className="absolute bottom-[115%] right-0 z-30 min-w-[230px] text-left" innerClassName="p-2.5">
        <Row on={n === all.length ? true : n ? 'part' : false} onClick={() => onChange(n === all.length ? types.filter((c) => !all.includes(c)) : [...new Set([...types, ...all])])}>ทั้งหมด</Row>
        {rows}
      </DropPanel>
    </div>
  );
}
