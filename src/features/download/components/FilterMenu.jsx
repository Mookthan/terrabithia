import { useCallback, useRef } from 'react';
import { FilterButton } from '@/components/ui/TextButton';
import useClickOutside from '@/hooks/useClickOutside';
import { DL_EXTS, DL_SEC } from '../data';
import '../download.css';
import DropPanel from '@/components/ui/DropPanel';

function Option({ value, current, onPick, children }) {
  const on = value === current;
  return (
    <button
      type="button"
      onClick={() => onPick(value)}
      className={`cursor-pointer rounded-ctl border-0 px-3 py-2 text-left text-[14px] transition-colors duration-200 hover:!text-teal-hover ${
        on ? 'bg-[rgba(39,174,151,.16)] font-bold text-[#12986F]' : 'bg-transparent text-ink hover:bg-teal-veil'
      }`}
    >
      {children}
    </button>
  );
}

// Group headings are ink: green text in a menu reads as something to click.
const Group = ({ children }) => <div className="px-3 pb-0.5 pt-2 text-[12px] font-bold text-ink">{children}</div>;

/** "Filter" button with a dropdown of sections and file types. */
export default function FilterMenu({ open, setOpen, cat, onPick }) {
  const ref = useRef(null);
  const close = useCallback(() => setOpen(false), [setOpen]);
  useClickOutside(ref, close, open);
  return (
    <div ref={ref} className="relative flex-none">
      <FilterButton open={open} onClick={() => setOpen((o) => !o)} className="max-[640px]:px-1 max-[640px]:text-[13.5px]" />
      <DropPanel open={open} className="absolute right-0 top-[calc(100%+8px)] z-[15] min-w-[210px]" innerClassName="flex flex-col gap-0.5 p-2">
        <Option value="all" current={cat} onPick={onPick}>ทั้งหมด</Option>
        <Group>หัวข้อ</Group>
        {DL_SEC.map((s) => <Option key={s.k} value={`sec:${s.k}`} current={cat} onPick={onPick}>{s.t}</Option>)}
        <Group>ประเภทไฟล์</Group>
        {DL_EXTS.map((e) => <Option key={e} value={`ext:${e}`} current={cat} onPick={onPick}>.{e}</Option>)}
      </DropPanel>
    </div>
  );
}
