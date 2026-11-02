import { useCallback, useRef } from 'react';
import { FilterButton } from '@/components/ui/TextButton';
import useClickOutside from '@/hooks/useClickOutside';
import { toggleNode } from '../depts';
import DeptTree from './DeptTree';

/** "Filter" button opening the department tree for the post list. */
export default function PostFilter({ sel, onChange, open, onOpenChange }) {
  const ref = useRef(null);
  const close = useCallback(() => onOpenChange(false), [onOpenChange]);
  useClickOutside(ref, close, open);
  return (
    <div ref={ref} className="relative max-[640px]:flex-none">
      <FilterButton open={open} count={sel.length} onClick={(e) => { e.stopPropagation(); onOpenChange(!open); }} className="max-[640px]:px-1 max-[640px]:text-[13.5px]" />
      <DeptTree sel={sel} open={open} align="right" onToggle={(k) => onChange(toggleNode(sel, k))} />
    </div>
  );
}
