import { useCallback, useMemo, useState } from 'react';
import { Cake, Heart, PartyPopper, Search, Sparkles } from 'lucide-react';
import DashCard from '@/features/home/components/DashCard';
import { useBirthday } from './BirthdayProvider';
import { ME_ID } from './data';
import BirthdayRow from './components/BirthdayRow';
import OccasionTabs from './components/OccasionTabs';
import { FestivalChips, FestivalEmpty } from './components/FestivalPicker';
import { FESTIVALS, festivalOpen, nextFestival, topTabs } from './occasions';
import useUpcomingBirthdays from './hooks/useUpcomingBirthdays';
import EmptyState from '@/components/ui/EmptyState';
import Tabs from '@/components/ui/Tabs';

const SCOPES = [['team', 'ทีมฉัน'], ['all', 'ทั้งบริษัท']];
const ICONS = { birthday: Cake, newyear: PartyPopper, cny: Sparkles, valentine: Heart };

/**
 * "ส่งการ์ด" box on the signed-in home dashboard: tabs วันเกิด (always), เทศกาล (sub-tabs for the
 * festivals in season, see festivalOpen).
 * Every tab works like birthday cards (private card in the person's book).
 */
export default function BirthdayWidget() {
  const { books, settings, openBook, openCard } = useBirthday();
  const tabs = useMemo(topTabs, []);
  const [top, setTop] = useState('birthday');
  const [demo, setDemo] = useState(false); // prototype: preview every festival out of season
  const fests = useMemo(() => FESTIVALS.filter((o) => demo || festivalOpen(o)), [demo]);
  const [festPick, setFest] = useState(null);
  const fest = fests.some((o) => o.k === festPick) ? festPick : fests[0]?.k;
  const occ = top === 'festival' ? fest : top;
  const [scope, setScope] = useState('team');
  const [query, setQuery] = useState('');
  const rows = useUpcomingBirthdays(books, scope, query, occ || null);
  const Icon = ICONS[occ] || PartyPopper;
  const open = useCallback((id) => (books[id]?.owner === ME_ID ? openBook(id) : openCard(id)), [books, openBook, openCard]);

  return (
    <DashCard i={6} dx="-60px" dy="70px" rot="-3deg" className="bg-[#FFF7E6] px-5 pb-4 pt-5 text-[14px] max-[640px]:order-5">
      <div className="flex items-center gap-[10px] text-[20px] text-ink">
        <span className={`grid h-[38px] w-[38px] place-items-center rounded-ctl bg-[#FFE3EA] text-[#C2456B]`}>
          <Icon className="lc !h-[22px] !w-[22px]" aria-hidden="true" />
        </span>
        <b className="font-semibold">ส่งการ์ดถึงเพื่อน</b>
      </div>
      <OccasionTabs tabs={tabs} value={top} onChange={setTop} />
      {top === 'festival' && fests.length > 0 && <FestivalChips list={fests} value={fest} onChange={setFest} />}
      {occ ? (
        <>
          <div className="mb-3 mt-3.5 flex flex-wrap items-center gap-[10px]">
            <Tabs items={SCOPES.map(([k, label]) => ({ k, label }))} value={scope} onChange={setScope} />
            <label className="flex h-[34px] min-w-[150px] flex-1 items-center gap-2 rounded-ctl border border-line bg-white px-3 text-ink focus-within:border-teal-bright focus-within:shadow-[0_0_0_3px_rgba(39,174,151,.15)] max-[640px]:basis-full">
              <Search className="lc !h-[15px] !w-[15px] flex-none opacity-60" aria-hidden="true" />
              <input
                type="search"
                placeholder="ค้นหาเพื่อน หรือแผนก"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoComplete="off"
                className="min-w-0 flex-1 border-0 bg-transparent text-[13px] text-ink outline-0 placeholder:text-faint"
              />
            </label>
          </div>
          <div className="-m-[2px] flex max-h-[330px] flex-col gap-2 overflow-auto p-[2px] [scrollbar-width:thin] max-[640px]:max-h-none">
            {rows.length ? rows.map(({ id, book }) => (
              <BirthdayRow key={id} id={id} book={book} cardsOpen={settings.open} onOpen={open} />
            )) : (
              <EmptyState className="px-2 py-[18px] text-[13px]">{query.trim() ? 'ไม่พบเพื่อนที่ค้นหา' : 'ไม่พบวันเกิดที่ค้นหา'}</EmptyState>
            )}
          </div>
        </>
      ) : (
        <FestivalEmpty next={nextFestival()} onDemo={() => setDemo(true)} />
      )}
    </DashCard>
  );
}
