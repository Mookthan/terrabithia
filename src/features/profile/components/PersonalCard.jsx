import { useUI } from '@/context/UIContext';
import { ME } from '@/data/me';
import { PERSONAL_FIELDS } from '../data';
import usePersonalProfile from '../hooks/usePersonalProfile';
import ProfileCard from './ProfileCard';
import EditButton from './EditButton';
import InfoList from './InfoList';
import PersonalEditForm from './PersonalEditForm';
import PhotoUpload from './PhotoUpload';
import AlbumEditor from '@/features/showcase/components/AlbumEditor';
import AlbumPreview from '@/features/showcase/components/AlbumPreview';
import SocialEditor from '@/features/showcase/components/SocialEditor';
import SocialLinks from '@/features/showcase/components/SocialLinks';
import { useSocial } from '@/features/showcase/social';
import SkillChips from '@/features/showcase/components/SkillChips';
import SkillsEditor from '@/features/showcase/components/SkillsEditor';
import { useSkills } from '@/features/showcase/skills';
import { EyeOff } from 'lucide-react';

/** Marks a value the user hid from their Org Chart card. */
function HiddenNote() {
  return (
    <span className="mt-0.5 flex items-center gap-1 text-[11.5px] text-muted">
      <EyeOff className="h-3 w-3" aria-hidden="true" />ซ่อนใน Org Chart
    </span>
  );
}

/** Personal box. The pencil (top-right corner) opens edit mode: upload a new photo, change nickname, phone, interests, skills and
 * social accounts, and manage the interests album shown on the org chart. */
export default function PersonalCard() {
  const { toast } = useUI();
  const p = usePersonalProfile();
  const social = useSocial(ME.id);
  const skills = useSkills(ME.id);
  const save = () => { p.save(); toast('บันทึกข้อมูลส่วนตัวแล้ว'); };

  return (
    <ProfileCard>
      {/* Same header as the Org Chart popup: big photo with name and position to its right (mook 2026-10-30). */}
      <div className="relative mb-4 flex items-center gap-5 pr-8 max-[480px]:gap-4">
        {p.editing ? (
          <PhotoUpload src={p.draft.photo} onPick={p.pickPhoto} />
        ) : (
          <>
            <div className="h-24 w-24 flex-none overflow-hidden rounded-full bg-olive max-[480px]:h-20 max-[480px]:w-20">
              <img src={p.saved.photo} alt="" className="block h-full w-full object-cover" />
            </div>
            <div className="min-w-0">
              <div className="text-[21px] font-bold leading-tight text-ink max-[480px]:text-[18px]">{ME.fullName}</div>
              <div className="mt-1 text-[13.5px] text-muted">{ME.position}</div>
            </div>
            <EditButton onClick={p.start} className="absolute -right-2 -top-2" />
          </>
        )}
      </div>
      {p.editing && (
        <div className="mb-4">
          <div className="text-[19px] font-bold text-ink">{ME.fullName}</div>
          <div className="text-[13px] text-muted">{ME.position}</div>
        </div>
      )}
      {p.editing ? (
        <PersonalEditForm
          values={p.draft.values} hidden={p.draft.hidden} onChange={p.setValue} onShow={p.setShown} onSave={save} onCancel={p.cancel}
          social={<SocialEditor list={p.draft.social} onChange={p.setSocialDraft} shown={!p.draft.hidden.social} onShow={(on) => p.setShown('social', on)} />}
          skills={<SkillsEditor list={p.draft.skills} onChange={p.setSkillsDraft} shown={!p.draft.hidden.skills} onShow={(on) => p.setShown('skills', on)} />}
          album={<AlbumEditor />}
        />
      ) : (
        <>
          <InfoList
            rows={[
              ...PERSONAL_FIELDS.flatMap((f) => [
                // Social sits just before interests, so interests lead into the interests album (mook 2026-10-30).
                // Skills (endorsed by colleagues, used to find helpers; optional and can be hidden, mook 2026-10-31) then social, just before interests (mook 2026-10-31).
                ...(f.k === 'interests' ? [['ความถนัด:', <div className="min-w-0">{skills.length ? <SkillChips id={ME.id} list={skills} /> : <span className="text-muted">ไม่ระบุ</span>}{p.saved.hidden.skills && <HiddenNote />}</div>]] : []),
                ...(f.k === 'interests' ? [['โซเชียลมีเดีย:', <div className="min-w-0">{social.length ? <SocialLinks list={social} /> : <span className="text-muted">ไม่ระบุ</span>}{p.saved.hidden.social && <HiddenNote />}</div>]] : []),
                [f.l, <div className="min-w-0">{p.saved.values[f.k] || <span className="text-muted">ไม่ระบุ</span>}{f.optional && p.saved.hidden[f.k] && <HiddenNote />}</div>],
              ]),
            ]}
          />
          <AlbumPreview />
        </>
      )}
    </ProfileCard>
  );
}
