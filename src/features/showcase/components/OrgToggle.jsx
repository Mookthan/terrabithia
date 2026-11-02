import Switch from '@/components/ui/Switch';

/** Show / hide switch for an optional field on the person's Org Chart card (mook 2026-10-30). */
/** `compact` drops the words on phones (switch only) where the field row is narrow. */
export default function OrgToggle({ on, onChange, compact = false, className = '' }) {
  return (
    <span className={`inline-flex flex-none items-center gap-1.5 whitespace-nowrap text-[11.5px] font-semibold ${on ? 'text-teal-hover' : 'text-muted'} ${className}`}>
      <Switch on={on} onChange={onChange} label={on ? 'ซ่อนใน Org Chart' : 'โชว์ใน Org Chart'} />
      <span className={compact ? 'max-[480px]:hidden' : ''}>{on ? 'โชว์ใน Org Chart' : 'ซ่อนใน Org Chart'}</span>
    </span>
  );
}
