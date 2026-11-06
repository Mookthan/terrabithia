import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ORG_PEOPLE } from '@/data/org';
import SectionBar from '@/components/ui/SectionBar';
import OrgChartSection from './components/org/OrgChartSection';
import GuessLink from '@/features/guess/components/GuessLink';
import PersonModal from './components/org/PersonModal';
import Milestones from './components/Milestones';

export default function CompanyProfilePage() {
  // A shared JD link (#/about/profile?jd=<id>) opens that person's card with the JD folded open;
  // ?person=<id> (from Terby's "who can help") opens the card as is.
  const [params, setParams] = useSearchParams();
  const shared = ORG_PEOPLE[params.get('jd')] ? params.get('jd') : null;
  const asked = ORG_PEOPLE[params.get('person')] ? params.get('person') : null;
  const [person, setPerson] = useState(shared || asked);
  useEffect(() => { if (asked) setPerson(asked); }, [asked]);
  const closePerson = useCallback(() => {
    setPerson(null);
    setParams({}, { replace: true });
  }, [setParams]);
  return (
    <>
      <SectionBar section="About us" title="Company Profile" />
      <div className="mb-3.5 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <h2 className="m-0 text-xl font-bold text-ink">Organizational Chart</h2>
        <GuessLink className="!mr-0" />
      </div>
      <OrgChartSection onPerson={setPerson} />
      <Milestones />
      <PersonModal id={person} openJd={!!shared && person === shared} onClose={closePerson} />
    </>
  );
}
