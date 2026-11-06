import { useRef } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import SectionBar from '@/components/ui/SectionBar';
import PersonalCard from './components/PersonalCard';
import WorkCard from './components/WorkCard';
import CourseProgress from './components/CourseProgress';
import CertSection from './components/CertSection';
import LeaveSection from './components/LeaveSection';
import useJumpToSection from './hooks/useJumpToSection';

export default function ProfilePage() {
  const [params] = useSearchParams();
  const { key } = useLocation();
  const leaveRef = useRef(null);
  useJumpToSection(leaveRef, params.get('section') === 'leave', key);

  return (
    <>
      <SectionBar section="Profile" title="Profile" />
      <div className="mb-[34px] grid text-[14px] grid-cols-2 gap-5 max-[760px]:grid-cols-1">
        <PersonalCard />
        <WorkCard />
      </div>
      <CourseProgress />
      <CertSection />
      <LeaveSection ref={leaveRef} />
    </>
  );
}
