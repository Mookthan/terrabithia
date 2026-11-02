import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { COURSES } from './data';
import { courseSession } from './store';
import { canSee } from './access';
import CourseList from './components/CourseList';
import CourseDetail from './components/CourseDetail';

/** /courses (list) and /courses?course=<i> (detail) — browser back returns to the list. */
export default function CoursesPage() {
  const [params, setParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const raw = params.get('course');
  const sel = raw !== null && COURSES[Number(raw)] && canSee(COURSES[Number(raw)]) ? Number(raw) : null;

  const [query, setQueryState] = useState(courseSession.query);
  const [filter, setFilterState] = useState(courseSession.filter);
  const [favs, setFavs] = useState(courseSession.favs);
  const [reviews, setReviews] = useState(courseSession.reviews);

  useEffect(() => { Object.assign(courseSession, { query, filter, favs, reviews }); }, [query, filter, favs, reviews]);
  useEffect(() => { window.scrollTo(0, 0); }, [sel]);

  const setQuery = (k, v) => setQueryState((q) => ({ ...q, [k]: v }));
  const setFilter = (k, v) => setFilterState((f) => ({ ...f, [k]: v }));
  const toggleFav = (i) => setFavs((f) => (f.includes(i) ? f.filter((x) => x !== i) : [...f, i]));

  if (sel !== null) {
    return (
      <CourseDetail
        key={sel}
        index={sel}
        reviews={reviews}
        onAddReview={(r) => setReviews((rs) => [r, ...rs])}
        onBack={() => (location.state?.fromList ? navigate(-1) : setParams({}, { replace: true }))}
      />
    );
  }
  return (
    <CourseList
      query={query}
      setQuery={setQuery}
      filter={filter}
      setFilter={setFilter}
      favs={favs}
      onToggleFav={toggleFav}
      onOpen={(i) => setParams({ course: String(i) }, { state: { fromList: true } })}
    />
  );
}
