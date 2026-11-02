import { useEffect, useRef, useState } from 'react';

/**
 * File name on one line: the base name gets "…" but the extension always stays visible
 * ("Terrabit Center Email….png"). When it is cut, hovering (or focusing) the tile shows the
 * full name in a small tooltip. On phones (no hover) it may wrap to two lines instead.
 */
export default function FileName({ name }) {
  const ref = useRef(null);
  const dot = name.lastIndexOf('.');
  const base = dot > 0 ? name.slice(0, dot) : name;
  const ext = dot > 0 ? name.slice(dot) : '';
  const [cut, setCut] = useState(false);

  useEffect(() => {
    const el = ref.current;
    const measure = () => setCut(el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight + 1);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [name]);

  return (
    <div className="relative mt-2.5">
      <div className="flex text-[16px] font-semibold text-ink transition-colors duration-200 group-hover:text-teal-hover group-focus-visible:text-teal-hover max-[760px]:line-clamp-2 max-[760px]:break-words max-[760px]:text-[14px]">
        <span ref={ref} className="min-w-0 truncate max-[760px]:inline max-[760px]:whitespace-normal">{base}</span>
        <span className="shrink-0">{ext}</span>
      </div>
      {cut && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-full z-10 mt-1 max-w-full break-words rounded-ctl bg-ink px-2.5 py-1.5 text-[12.5px] font-medium text-white opacity-0 shadow-pop transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 max-[760px]:hidden"
        >
          {name}
        </div>
      )}
    </div>
  );
}
