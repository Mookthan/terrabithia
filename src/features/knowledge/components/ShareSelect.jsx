import { useCallback, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import useClickOutside from '@/hooks/useClickOutside';
import { selSummary, toggleNode } from '../depts';
import DeptTree from './DeptTree';

/** "แชร์ไปยัง" picker: a select-like button opening the department tree. */
export default function ShareSelect({ sel, onChange, open, onOpenChange, invalid }) {
  const ref = useRef(null);
  const close = useCallback(() => onOpenChange(false), [onOpenChange]);
  useClickOutside(ref, close, open);
  const summary = selSummary(sel);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onOpenChange(!open); }}
        aria-expanded={open}
        aria-invalid={invalid || undefined}
        className="flex w-full items-center justify-between rounded-ctl border bg-white px-3.5 py-[11px] text-[14px] border-[#d8d8d0] text-ink"
      >
        <span className={summary ? '' : 'text-[#aaa]'}>{summary || 'แผนก/ทีม'}</span>
        <span className="text-muted">
          <ChevronDown className={`lc text-teal-bright transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        </span>
      </button>
      <DeptTree sel={sel} open={open} onToggle={(k) => onChange(toggleNode(sel, k))} />
    </div>
  );
}
