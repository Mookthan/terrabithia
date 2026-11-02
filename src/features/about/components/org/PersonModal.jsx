import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown } from 'lucide-react';
import { portalTarget } from '@/lib/portalTarget';
import { ORG_PEOPLE, avatarOf } from '@/data/org';
import useEscape from '@/hooks/useEscape';
import PersonAlbum from '@/features/showcase/components/PersonAlbum';
import SocialLinks from '@/features/showcase/components/SocialLinks';
import { useSocial } from '@/features/showcase/social';
import SkillChips from '@/features/showcase/components/SkillChips';
import { useSkills } from '@/features/showcase/skills';
import { ME } from '@/data/me';
import { useOrgHidden, usePersonalValues } from '@/features/profile/personalStore';
import { orgNode } from '../../orgModel';
import { kpiOf, kpiSheetOf } from '../../orgKpi';
import { jdOf } from '../../orgJd';
import { KPI_YEAR } from '@/features/profile/data';
import Fold from '@/components/ui/Fold';
import PhoneSheet from '@/components/ui/PhoneSheet';
import usePhone from '@/hooks/usePhone';
import { JdBody } from '@/features/profile/components/JdModal';
import OrgKpiSheet, { OrgKpiBody } from './OrgKpiSheet';
import { LINK_BTN } from '@/features/profile/components/EvalResult';
import CloseButton from '@/components/ui/CloseButton';

function Row({ label, children }) {
  return (
    <div className="flex gap-3 border-b border-line py-2.5 text-[13.5px] leading-[1.6] last:border-b-0 max-[480px]:text-[13px]">
      <span className="w-[92px] flex-shrink-0 whitespace-nowrap text-muted max-[480px]:w-[84px]">{label}</span>
      {children}
    </div>
  );
}

/** Green "ดู … ⌄" link that folds a section open inside the card (no popup on a popup, mook 2026-10-29). */
function FoldLink({ open, onToggle, show, hide }) {
  return (
    <button type="button" aria-expanded={open} className={`${LINK_BTN} gap-1`} onClick={onToggle}>
      {open ? hide : show}
      <ChevronDown className={`lc !h-4 !w-4 text-teal-bright transition-transform duration-300 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
    </button>
  );
}

/** A link that reopens the org chart with this person's JD, for sending to a friend who might fit the role. */
const jdLink = (id) => `${window.location.origin}${window.location.pathname}#/about/profile?jd=${id}`;

/** Profile card for one org-chart person (`id` null = closed); `openJd` starts with their JD folded open. */
export default function PersonModal({ id, openJd = false, onClose }) {
  const [jd, setJd] = useState(openJd);
  const [kpi, setKpi] = useState(false);
  const phone = usePhone();
  const social = useSocial(id);
  const skills = useSkills(id);
  const mine = usePersonalValues();
  const hidden = useOrgHidden();
  useEffect(() => { setJd(openJd); setKpi(false); }, [id, openJd]);
  useEscape(onClose, !!id && !(phone && (jd || kpi))); // on phones the JD / KPI page closes first
  const base = id ? ORG_PEOPLE[id] : null;
  // My own card follows what I saved in my profile. Education and interests are optional: empty ones are left out.
  // Fields switched off in my profile are left out too (mook 2026-10-30).
  const p = base && id === ME.id ? { ...base, nick: mine.nick, edu: hidden.edu ? '' : mine.edu, interest: hidden.interests ? '' : mine.interests } : base;
  const edu = p?.edu && p.edu !== '-' ? p.edu : '';
  if (!p) return null;
  const av = avatarOf(id);
  // Portal into the fullscreen chart when it is fullscreen, so the card shows on top of it.
  return createPortal(
    <div
      className="fixed inset-0 z-[2100] flex items-center justify-center bg-[rgba(10,20,18,.45)]"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative max-h-[90vh] w-[540px] max-w-[92vw] overflow-y-auto rounded-box bg-white px-8 py-7 shadow-pop max-[480px]:px-5 max-[480px]:py-6">
        <CloseButton onClick={onClose} className="absolute right-3 top-3" />
        {/* Header: big photo with name and position to its right (mook 2026-10-30). */}
        <div className="mb-4 flex items-center gap-5 pr-8 max-[480px]:gap-4">
          <div
            className="flex h-24 w-24 flex-none items-center justify-center overflow-hidden rounded-full text-[32px] font-bold text-white max-[480px]:h-20 max-[480px]:w-20"
            style={{ background: orgNode(id)?.color }}
          >
            {av ? <img src={av} alt="" className="block h-full w-full object-cover" /> : p.nick.charAt(0)}
          </div>
          <div className="min-w-0">
            <div className="text-[21px] font-bold leading-tight text-ink max-[480px]:text-[18px]">{p.name}</div>
            <div className="mt-1 text-[13.5px] text-muted">{p.pos}</div>
          </div>
        </div>
        {p.dept && <Row label="สังกัด:">{p.dept}</Row>}
        <Row label="ชื่อเล่น:">{p.nick}</Row>
        <Row label="หน้าที่:">
          <div className="min-w-0 flex-1">
            {p.resp}{' '}
            {phone
              ? <button type="button" className={LINK_BTN} onClick={() => setJd(true)}>ดู JD ฉบับเต็ม</button>
              : <FoldLink open={jd} onToggle={() => setJd((v) => !v)} show="ดู JD ฉบับเต็ม" hide="ซ่อน JD" />}
            <Fold open={jd && !phone}>
              <div className="mt-2 rounded-ctl bg-cream px-3 pb-2 pt-2.5"><JdBody jd={jdOf(id)} shareUrl={jdLink(id)} compact /></div>
            </Fold>
          </div>
        </Row>
        {kpiOf(id).length > 0 && (
          <Row label="KPI:">
            <div className="min-w-0 flex-1">
              {!(kpi && !phone) && <ul className="m-0 list-disc pl-4">{kpiOf(id).map((k) => <li key={k}>{k}</li>)}</ul>}
              <span className="mt-1 block">
                {phone
                  ? <button type="button" className={LINK_BTN} onClick={() => setKpi(true)}>ดู KPI ทั้งหมด</button>
                  : <FoldLink open={kpi} onToggle={() => setKpi((v) => !v)} show="ดู KPI ทั้งหมด" hide="ซ่อน KPI" />}
              </span>
              <OrgKpiSheet open={kpi && !phone} items={kpiSheetOf(id)} />
            </div>
          </Row>
        )}
        {/* Skills: colleagues tap one to endorse it; left out when the owner hid them (mook 2026-10-31). */}
        {skills.length > 0 && !(id === ME.id && hidden.skills) && (
          <Row label="ความถนัด:">
            <div className="min-w-0 flex-1">
              <SkillChips id={id} list={skills} endorsable={id !== ME.id} />
            </div>
          </Row>
        )}
        {edu && <Row label="การศึกษา:">{edu}</Row>}
        {social.length > 0 && !(id === ME.id && hidden.social) && <Row label="โซเชียลมีเดีย:"><SocialLinks list={social} /></Row>}
        {p.interest && <Row label="ความสนใจ:">{p.interest}</Row>}
        <PersonAlbum id={id} />
      </div>
      {phone && jd && (
        <PhoneSheet title="Job Description" onClose={() => setJd(false)}>
          <JdBody jd={jdOf(id)} shareUrl={jdLink(id)} />
        </PhoneSheet>
      )}
      {phone && kpi && (
        <PhoneSheet title={`KPI · ${p.nick}`} onClose={() => setKpi(false)}>
          <h2 className="text-[19px] font-bold text-ink">{`เป้าหมายปี ${KPI_YEAR}`}</h2>
          <p className="mb-2 text-[12px] text-muted">{`${p.name} · ${p.pos}`}</p>
          <OrgKpiBody items={kpiSheetOf(id)} boxed={false} />
        </PhoneSheet>
      )}
    </div>,
    portalTarget(),
  );
}
