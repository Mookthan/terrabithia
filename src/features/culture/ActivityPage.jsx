import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmptyState from '@/components/ui/EmptyState';
import SectionBar from '@/components/ui/SectionBar';
import { PATHS } from '@/routes/paths';
import ActivityMosaic from './components/ActivityMosaic';
import ActivityResults from './components/ActivityResults';
import ActivitySearchRow from './components/ActivitySearchRow';
import { ACTIVITIES_NEWEST, activityYear } from './data';

export default function ActivityPage() {
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const [year, setYear] = useState(null);
  const needle = q.trim().toLowerCase();
  const filtering = !!needle || !!year;
  const items = useMemo(
    () => ACTIVITIES_NEWEST.filter(({ a }) => (
      (!needle || `${a.t} ${a.tag}`.toLowerCase().includes(needle)) && (!year || activityYear(a.d) === year)
    )),
    [needle, year],
  );
  const open = (i) => navigate(PATHS.activityAlbum(i));
  return (
    <>
      <SectionBar section="Culture" title="Our Activity" />
      <ActivitySearchRow q={q} onQ={setQ} year={year} onYear={setYear} />
      {!filtering && <ActivityMosaic onOpen={open} />}
      {filtering && items.length > 0 && <ActivityResults items={items} onOpen={open} />}
      {filtering && !items.length && <EmptyState>ไม่พบกิจกรรมที่ค้นหา</EmptyState>}
    </>
  );
}
