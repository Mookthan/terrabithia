import { useCallback, useRef, useState } from 'react';
import useClickOutside from '@/hooks/useClickOutside';
import { media } from '@/lib/media';
import DropPanel from '@/components/ui/DropPanel';
import AnnFilterPanel from './AnnFilterPanel';
import AnnSearchBar from './AnnSearchBar';

const ANN_LOGO = media('announcement-logo.webp');

/** Logo, title, search box and the filter dropdown under them. `end` sits at the far right (the popup's close button). */
export default function AnnHeader({ title, list, filter, end }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const close = useCallback(() => setOpen(false), []);
  useClickOutside(ref, close, open);
  return (
    <div ref={ref} className="relative">
      <div className="flex items-center gap-3 max-[640px]:flex-wrap">
        <span className="grid h-[50px] w-[50px] flex-none place-items-center rounded-full bg-white max-[640px]:h-10 max-[640px]:w-10">
          <img src={ANN_LOGO} alt="" className="h-[26px] w-auto max-[640px]:h-[21px]" />
        </span>
        <b className="mr-[6px] flex-none text-[22px] font-semibold text-ink max-[640px]:flex-1 max-[640px]:text-[20px]">{title}</b>
        <AnnSearchBar filter={filter} open={open} onToggle={() => setOpen((o) => !o)} />
        {end}
      </div>
      <DropPanel open={open} className="absolute left-0 right-0 top-[calc(100%-4px)] z-[12] mt-1.5 min-[769px]:left-auto min-[769px]:w-1/2 min-[769px]:min-w-[340px]">
        <AnnFilterPanel list={list} filter={filter} />
      </DropPanel>
    </div>
  );
}
