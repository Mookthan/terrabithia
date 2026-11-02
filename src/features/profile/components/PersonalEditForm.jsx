import { useState } from 'react';
import { Heart, Lock, Sparkles, UserRound } from 'lucide-react';
import { OUTLINE_HOVER } from '@/components/ui/TextButton';
import { PERSONAL_FIELDS } from '../data';
import OrgToggle from '@/features/showcase/components/OrgToggle';
import Tabs from '@/components/ui/Tabs';

const ROW = 'flex items-center gap-2 border-b border-line py-[7px] text-[12.5px] last:border-b-0';

/** Tabs of the edit form (mook 2026-11-01: the one long form was too long). */
const TABS = [['general', 'ข้อมูลทั่วไป', UserRound], ['skills', 'ความถนัด', Sparkles], ['interests', 'ความสนใจ', Heart]];

/**
 * Edit mode of the personal box, in three tabs: ข้อมูลทั่วไป (fields + `social`), ความถนัด (`skills`) and
 * ความสนใจ (the interests field + `album`). Nickname, phone and interests are inputs; the other fields
 * (from EzyHR / the account) stay read-only with a lock, changed through HR. One บันทึก saves every tab.
 */
export default function PersonalEditForm({ values, hidden, onChange, onShow, onSave, onCancel, social, skills, album }) {
  const [tab, setTab] = useState('general');
  const fields = PERSONAL_FIELDS.filter((f) => (tab === 'interests' ? f.k === 'interests' : tab === 'general' && f.k !== 'interests'));
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(); }}>
      <Tabs full className="mb-3" label="หมวดข้อมูล" items={TABS.map(([k, label, icon, short]) => ({ k, label, icon, short }))} value={tab} onChange={setTab} />
      <div key={tab} role="tabpanel" className="tab-fade">
      {fields.map((f) => {
        // A locked row is a div, so a click on it does not flip the row's switch.
        const Row = f.edit ? 'label' : 'div';
        return (
        <Row key={f.k} className={ROW}>
          <span className="min-w-[110px] shrink-0 text-muted max-[480px]:min-w-[86px]">{f.l}</span>
          {f.edit ? (
            <input
              type={f.type || 'text'}
              value={values[f.k]}
              maxLength={f.max}
              placeholder={f.optional ? 'ไม่บังคับ' : undefined}
              onChange={(e) => onChange(f.k, e.target.value)}
              className="min-w-0 flex-1 rounded-ctl border border-[#d8d8d0] bg-white px-2.5 py-[6px] text-[12.5px] text-ink outline-none focus:border-teal-bright focus:shadow-[0_0_0_3px_rgba(39,174,151,.15)]"
            />
          ) : (
            <span className="flex flex-1 items-center justify-between gap-2 text-muted">
              {values[f.k]}
              <Lock className="h-3.5 w-3.5 flex-none opacity-70" aria-label="แก้ไขผ่าน HR" />
            </span>
          )}
          {f.org && f.optional && <OrgToggle compact on={!hidden[f.k]} onChange={(on) => onShow(f.k, on)} />}
        </Row>
        );
      })}
      {tab === 'general' && social}
      {tab === 'skills' && skills}
      {tab === 'interests' && album}
      </div>
      <div className="mt-3.5 flex justify-end gap-2">
        <button type="button" onClick={onCancel} className={`cursor-pointer rounded-ctl border border-line bg-white px-4 py-[7px] text-[13px] font-semibold text-ink ${OUTLINE_HOVER}`}>ยกเลิก</button>
        <button type="submit" className="cursor-pointer rounded-ctl border-0 bg-teal-bright hover:!bg-teal-hover transition-colors duration-200 px-4 py-[7px] text-[13px] font-semibold text-white">บันทึก</button>
      </div>
    </form>
  );
}
