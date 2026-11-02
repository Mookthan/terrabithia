import { useEffect, useRef, useState } from 'react';
import { ME } from '@/data/me';
import { PERSONAL_FIELDS, PHOTO_MAX_MB, PHOTO_TYPES } from '../data';
import { orgHiddenNow, setOrgHidden, setPersonalValues, useOrgHidden, usePersonalValues } from '../personalStore';
import { setSocial, socialOf } from '@/features/showcase/social';
import { setMySkills, skillsOf } from '@/features/showcase/skills';

/**
 * Personal box state: saved values + photo, and a draft (also holding social accounts and skills) while editing.
 * `pickPhoto(file)` checks type and size and returns an error message (or '') for the form to show.
 */
export default function usePersonalProfile() {
  const values = usePersonalValues();
  const hidden = useOrgHidden();
  const [photo, setPhoto] = useState(ME.photo);
  const saved = { values, photo, hidden };
  const [draft, setDraft] = useState(null);
  const urls = useRef([]);

  // Free the preview URLs of uploaded photos when the page goes away.
  useEffect(() => () => urls.current.forEach((u) => URL.revokeObjectURL(u)), []);

  const start = () => setDraft({ values: { ...saved.values }, photo: saved.photo, social: socialOf(ME.id), skills: skillsOf(ME.id).map(([n]) => n), hidden: { ...orgHiddenNow() } });
  const cancel = () => setDraft(null);
  const setValue = (k, v) => setDraft((d) => ({ ...d, values: { ...d.values, [k]: v } }));
  const setSocialDraft = (social) => setDraft((d) => ({ ...d, social }));
  const setSkillsDraft = (skills) => setDraft((d) => ({ ...d, skills }));
  /** Show (`on`) or hide field k on my Org Chart card. */
  const setShown = (k, on) => setDraft((d) => ({ ...d, hidden: { ...d.hidden, [k]: !on } }));
  const save = () => {
    const next = Object.fromEntries(Object.entries(draft.values).map(([k, v]) => [k, v.trim()]));
    // Required fields (nickname) keep their old value when cleared.
    PERSONAL_FIELDS.forEach((f) => { if (f.edit && !f.optional && !next[f.k]) next[f.k] = values[f.k]; });
    setPersonalValues(next);
    setPhoto(draft.photo);
    setSocial(draft.social); // shared with the org chart card
    setMySkills(draft.skills); // endorsements of kept skills stay
    setOrgHidden(draft.hidden);
    setDraft(null);
  };

  const pickPhoto = (file) => {
    if (!file) return '';
    if (!PHOTO_TYPES.includes(file.type)) return 'รองรับเฉพาะไฟล์ JPG, PNG หรือ WEBP';
    if (file.size > PHOTO_MAX_MB * 1024 * 1024) return `ไฟล์ใหญ่เกิน ${PHOTO_MAX_MB} MB`;
    const url = URL.createObjectURL(file);
    urls.current.push(url);
    setDraft((d) => ({ ...d, photo: url }));
    return '';
  };

  return { saved, draft, editing: !!draft, start, cancel, save, setValue, setSocialDraft, setSkillsDraft, setShown, pickPhoto };
}
