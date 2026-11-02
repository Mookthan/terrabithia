import { Plus, X } from 'lucide-react';
import { ICON_BTN } from '@/components/ui/iconButton';
import { SOCIAL_LIMIT, SOCIAL_MAX, SOCIAL_PLATFORMS, isSafeLink, platformOf } from '../social';
import SocialIcon from './SocialIcon';
import OrgToggle from './OrgToggle';

const INPUT = 'min-w-0 flex-1 rounded-ctl border border-[#d8d8d0] bg-white px-2.5 py-[6px] text-[12.5px] text-ink outline-none focus:border-teal-bright focus:shadow-[0_0_0_3px_rgba(39,174,151,.15)]';
const ADD_CHIP = 'inline-flex cursor-pointer items-center gap-1.5 rounded-ctl border border-line bg-white py-1 pl-1 pr-2.5 text-[12px] font-semibold text-ink transition-colors duration-200 hover:bg-teal-soft';

/** Edit the social accounts in the personal box: one row per account (link or account name), add from the platforms not used yet, up to SOCIAL_LIMIT. */
export default function SocialEditor({ list, onChange, shown = true, onShow }) {
  const used = list.map(([k]) => k);
  const left = list.length < SOCIAL_LIMIT ? SOCIAL_PLATFORMS.filter((p) => !used.includes(p.k)) : [];
  const setAt = (i, v) => onChange(list.map((row, j) => (j === i ? [row[0], v] : row)));

  return (
    <div className="mt-4 border-t border-line pt-4">
      <div className="mb-1 flex items-center justify-between gap-2 text-[14px] font-bold text-ink">โซเชียลมีเดีย{onShow && <OrgToggle on={shown} onChange={onShow} />}</div>
      <p className="m-0 mb-2.5 text-[11.5px] text-muted">{`วางลิงก์หรือพิมพ์ชื่อบัญชี ได้สูงสุด ${SOCIAL_LIMIT} ช่องทาง`}</p>
      {list.map(([k, v], i) => {
        const bad = platformOf(k).link && v.trim() && !isSafeLink(v);
        return (
        <div key={k} className="mb-2">
        <div className="flex items-center gap-2">
          <SocialIcon k={k} size={26} />
          <input
            value={v}
            maxLength={SOCIAL_MAX}
            aria-label={platformOf(k).l}
            placeholder={k === 'line' ? 'LINE ID' : platformOf(k).link ? 'https://' : `ลิงก์หรือชื่อบัญชี ${platformOf(k).l}`}
            onChange={(e) => setAt(i, e.target.value)}
            aria-invalid={bad || undefined}
            className={`${INPUT} ${bad ? '!border-[#C2453F]' : ''}`}
          />
          <button type="button" aria-label={`ลบ ${platformOf(k).l}`} className={`${ICON_BTN} h-8 w-8 text-muted hover:text-[#C2453F]`} onClick={() => onChange(list.filter((_, j) => j !== i))}>
            <X className="lc !h-4 !w-4" />
          </button>
        </div>
        {bad && <p className="m-0 ml-[34px] mt-1 text-[11.5px] text-[#C2453F]">ใส่ลิงก์เต็มที่ขึ้นต้นด้วย https:// ลิงก์นี้จะไม่ถูกบันทึก</p>}
        </div>
        );
      })}
      {left.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {left.map((p) => (
            <button key={p.k} type="button" className={ADD_CHIP} onClick={() => onChange([...list, [p.k, '']])}>
              <SocialIcon k={p.k} size={20} />
              {p.l}
              <Plus className="lc !h-3.5 !w-3.5 text-teal-bright" aria-hidden="true" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
