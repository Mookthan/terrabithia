import { forwardRef } from 'react';

/** Labelled input with a leading icon (and optional trailing element). Enter calls `onEnter`. */
const Field = forwardRef(function Field({ label, icon: Icon, trailing, onEnter, ...input }, ref) {
  return (
    <div className="mb-4 text-left">
      <label className="mb-[6px] block text-[12.5px] font-semibold text-ink">{label}</label>
      <div className="flex items-center gap-2 rounded-ctl border border-line px-[14px] py-[10px]">
        <span className="text-[14px] text-teal-bright"><Icon className="lc !h-4 !w-4 ![vertical-align:middle]" aria-hidden="true" /></span>
        <input
          ref={ref}
          {...input}
          onKeyDown={(e) => { if (e.key === 'Enter' && onEnter) { e.preventDefault(); onEnter(); } }}
          className="flex-1 border-none bg-transparent text-[13.5px] text-ink outline-none placeholder:text-faint"
        />
        {trailing}
      </div>
    </div>
  );
});

export default Field;
