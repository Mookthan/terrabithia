import CheckMark from '@/components/ui/CheckMark';
import { DEPTS } from '@/data/departments';
import { ALL_LEAVES, deptLeaves, treeState } from '../depts';
import '../knowledge.css';
import DropPanel from '@/components/ui/DropPanel';

const PAD = ['', 'pl-[22px]', 'pl-11'];

function Row({ label, level, state, onClick }) {
  return (
    <div
      role="checkbox"
      aria-checked={state === 'on' ? true : state === 'part' ? 'mixed' : false}
      tabIndex={0}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
      className={`flex cursor-pointer items-center gap-[9px] whitespace-nowrap rounded-ctl px-1.5 py-[5px] text-[13px] text-ink transition-colors hover:bg-teal-veil ${level < 2 ? 'font-semibold' : ''} ${PAD[level]}`}
    >
      <CheckMark state={state === 'on' ? true : state === 'part' ? 'part' : false} />
      {label}
    </div>
  );
}

/** Checkbox tree of all departments (tri-state parents). `align="right"` for the filter panel. */
export default function DeptTree({ sel, onToggle, open, align = 'left' }) {
  return (
    <DropPanel
      open={open}
      innerClassName="max-h-[340px] overflow-y-auto px-3.5 py-3"
      className={`absolute top-[calc(100%+6px)] z-40 max-[860px]:w-auto max-[860px]:min-w-full max-[860px]:max-w-[calc(100vw-48px)] ${
        align === 'right' ? 'left-auto right-0 w-max min-w-[240px] max-w-[90vw]' : 'left-0 w-max min-w-full max-w-[90vw]'
      }`}
    >
      <Row label="แผนกทั้งหมด" level={0} state={treeState(sel, ALL_LEAVES)} onClick={() => onToggle('ALL')} />
      {DEPTS.map((d) => (
        <div key={d.k}>
          <Row label={d.l} level={1} state={treeState(sel, deptLeaves(d))} onClick={() => onToggle(d.k)} />
          {d.c && d.c.map((c) => (
            <Row key={c.k} label={c.l} level={2} state={treeState(sel, [c.k])} onClick={() => onToggle(c.k)} />
          ))}
        </div>
      ))}
    </DropPanel>
  );
}
