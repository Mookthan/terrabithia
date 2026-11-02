import { useCallback, useRef } from 'react';
import { Search } from 'lucide-react';
import BackButton from '@/components/ui/BackButton';
import { FilterButton } from '@/components/ui/TextButton';
import useClickOutside from '@/hooks/useClickOutside';
import { RUAMITR_T } from '../../data';
import '../../about.css';
import DropPanel from '@/components/ui/DropPanel';

/** Back button, logo, video search and the sort dropdown of the Ruamitr video list. */
export default function RuamitrToolbar({ onBack, query, onQuery, sortAZ, onSort, filterOpen, setFilterOpen }) {
  const wrapRef = useRef(null);
  const close = useCallback(() => setFilterOpen(false), [setFilterOpen]);
  useClickOutside(wrapRef, close, filterOpen);
  const sortBtn = (on) => `block w-full cursor-pointer rounded-ctl border-none bg-transparent px-3 py-[9px] text-left text-[13px] transition-colors hover:bg-teal-veil ${on ? 'font-bold text-teal-bright' : 'text-ink'}`;

  return (
    <div className="mb-[26px] flex flex-wrap items-center gap-4">
      <BackButton className="mb-[18px]" onClick={onBack} />
      <div className="flex"><img src={RUAMITR_T} alt="Maxar Ruamitr" className="block h-[54px] w-auto" /></div>
      <div className="flex min-w-[200px] flex-1 items-center gap-2.5 rounded-ctl border border-[#d8d8d0] bg-white px-3.5 text-muted max-[640px]:min-w-0 max-[640px]:flex-[1_1_0] max-[640px]:gap-2 max-[640px]:rounded-ctl max-[640px]:px-2.5">
        <Search className="lc max-[640px]:!h-4 max-[640px]:!w-4" />
        <input
          className="w-full min-w-0 flex-1 border-none bg-transparent py-3 text-sm text-ink outline-none placeholder:text-faint max-[640px]:py-2 max-[640px]:text-[13px]"
          placeholder="ค้นหาวีดีโอ"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
        />
      </div>
      <div ref={wrapRef} className="prod-fwrap relative max-[640px]:flex-none">
        <FilterButton open={filterOpen} onClick={(e) => { e.stopPropagation(); setFilterOpen((o) => !o); }} className="max-[640px]:px-1 max-[640px]:text-[13.5px]" />
        <DropPanel open={filterOpen} className="absolute right-0 top-[calc(100%+6px)] z-40 min-w-[170px]" innerClassName="p-1.5">
          <button type="button" className={sortBtn(!sortAZ)} onClick={() => onSort(false)}>ลำดับเดิม</button>
          <button type="button" className={sortBtn(sortAZ)} onClick={() => onSort(true)}>เรียงตามชื่อ A–Z</button>
        </DropPanel>
      </div>
    </div>
  );
}
