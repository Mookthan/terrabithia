import { useState } from 'react';
import BackButton from '@/components/ui/BackButton';
import SectionBar from '@/components/ui/SectionBar';
import { COURSES } from '../data';
import CourseInfoCard from './CourseInfoCard';
import DetailSection from './DetailSection';
import LearnList from './LearnList';
import RatingSummary from './RatingSummary';
import ReviewCard from './ReviewCard';
import Pager from './Pager';
import CommentForm from './CommentForm';

/** Course page: blurred hero, learning outcomes, reviews, comment form and a sticky info card. */
export default function CourseDetail({ index, reviews, onAddReview, onEditReview, onRemoveReview, onBack }) {
  const course = COURSES[index];
  const [page, setPage] = useState(1);

  return (
    <>
      <SectionBar title="Courses" flush />
      <div className="relative left-1/2 -mb-10 text-[14px] -ml-[50vw] w-screen bg-cream pb-[60px]">
        <div className="relative h-[410px] overflow-hidden bg-black max-[900px]:h-[240px]">
          <img src={course.img} alt="" className="h-full w-full scale-[1.04] object-cover [filter:blur(2px)_brightness(.62)_saturate(.8)]" />
          <BackButton onClick={onBack} className="absolute left-[max(24px,calc(50%-560px))] top-6 z-[2]" />
        </div>
        <div className="relative mx-auto -mt-[370px] grid max-w-[1120px] grid-cols-[1fr_430px] gap-[30px] px-5 max-[900px]:-mt-[90px] max-[900px]:grid-cols-1 max-[900px]:gap-0">
          <div className="pointer-events-none [&>*:not(.crs-space)]:pointer-events-auto">
            <div className="crs-space h-[400px] max-[900px]:hidden" />
            <DetailSection title="สิ่งที่จะได้เรียนรู้"><LearnList /></DetailSection>
            <DetailSection title="รีวิวและความคิดเห็นทั้งหมด"><RatingSummary /></DetailSection>
            <div>
              {reviews.map((r, i) => <ReviewCard key={r.id || `${r.n}-${r.d}-${reviews.length - i}`} review={r} onEdit={onEditReview} onRemove={onRemoveReview} />)}
              <Pager page={page} onPage={setPage} />
            </div>
            <DetailSection title="ความคิดเห็น">
              <CommentForm onSubmit={(r) => { onAddReview(r); setPage(1); }} />
            </DetailSection>
          </div>
          <CourseInfoCard course={course} />
        </div>
      </div>
    </>
  );
}
