import { DEMO_ERRORS } from '../data';

/** Demo buttons choosing how the next sign-in should fail. */
export default function DemoErrorRow({ value, onChange }) {
  return (
    <div className="mt-[18px] flex flex-wrap justify-center gap-[6px] border-t border-dashed border-line pt-4">
      {DEMO_ERRORS.map(([k, label]) => (
        <button
          key={k}
          type="button"
          onClick={() => onChange(k)}
          className={`cursor-pointer rounded-ctl border border-dashed px-[9px] py-[5px] text-[10.5px] ${value === k ? 'border-teal-bright bg-teal-bright text-white' : 'border-[#b7bdb3] bg-[#fafaf6] text-muted'}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
