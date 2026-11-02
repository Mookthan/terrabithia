import { useState } from 'react';
import SectionBar from '@/components/ui/SectionBar';
import GaugeRow from './GaugeRow';
import CourseToolbar from './CourseToolbar';
import MyCoursesTable from './MyCoursesTable';
import CourseGrid from './CourseGrid';
import CatalogFilter, { catalogCount } from './CatalogFilter';

const BAND = 'text-[14px] relative left-1/2 -ml-[50vw] w-screen';
const INNER = 'mx-auto max-w-[1100px] px-5';

/** List view: my progress + my courses (grey band), then the full catalogue (white band). */
export default function CourseList({ query, setQuery, filter, setFilter, favs, onToggleFav, onOpen }) {
  const [openFilter, setOpenFilter] = useState(null);
  const toolbar = (k, placeholder, panel) => (
    <CourseToolbar
      placeholder={placeholder}
      query={query[k]}
      onQuery={(v) => setQuery(k, v)}
      filter={filter[k]}
      onFilter={(v) => setFilter(k, v)}
      open={openFilter === k}
      onOpenChange={(o) => setOpenFilter((cur) => (o ? k : cur === k ? null : cur))}
      wide={Boolean(panel)}
      count={panel ? catalogCount(filter[k]) : 0}
    >
      {panel}
    </CourseToolbar>
  );

  return (
    <>
      <SectionBar title="Courses" flush />
      <div className={`${BAND} bg-cream pb-10 pt-11`}>
        <div className={INNER}>
          <GaugeRow />
          {toolbar('my', 'ค้นหาคอร์สเรียนของฉัน')}
          <MyCoursesTable query={query.my} filter={filter.my} />
        </div>
      </div>
      <div className={`${BAND} -mb-10 bg-white pb-[60px] pt-9`}>
        <div className={INNER}>
          {toolbar('all', 'ค้นหาคอร์สเรียน', <CatalogFilter value={filter.all} onChange={(v) => setFilter('all', v)} />)}
          <CourseGrid query={query.all} filter={filter.all} favs={favs} onToggleFav={onToggleFav} onOpen={onOpen} />
        </div>
      </div>
    </>
  );
}
