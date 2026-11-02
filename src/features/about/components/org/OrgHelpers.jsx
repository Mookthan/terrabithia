import { ORG_PEOPLE, avatarOf } from '@/data/org';
import { orgNode } from '../../orgModel';

/**
 * "คนที่ช่วยเรื่องนี้ได้": people whose skills or job duties match what was typed in the org chart search,
 * with why each one fits (`list` from findHelpers). Tapping a person opens their card (mook 2026-10-31).
 */
export default function OrgHelpers({ list, onPerson }) {
  if (!list.length) return null;
  return (
    <div className="mb-2 border-b border-line pb-2">
      <div className="px-2 pb-1.5 pt-0.5 text-[12px] font-bold text-muted">คนที่ช่วยเรื่องนี้ได้</div>
      <ul className="m-0 list-none p-0">
        {list.map(({ id, why }) => {
          const p = ORG_PEOPLE[id];
          const av = avatarOf(id);
          return (
            <li key={id}>
              <button
                type="button"
                onClick={() => onPerson(id)}
                className="flex w-full cursor-pointer items-center gap-3 rounded-ctl border-0 bg-transparent px-2 py-2 text-left transition-colors duration-200 hover:bg-teal-veil"
              >
                <span className="grid h-10 w-10 flex-none place-items-center overflow-hidden rounded-full text-[15px] font-bold text-white" style={{ background: orgNode(id)?.color }}>
                  {av ? <img src={av} alt="" className="block h-full w-full object-cover" /> : p.nick.charAt(0)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13.5px] font-bold text-teal-bright">{`${p.name} (${p.nick})`}</span>
                  <span className="block truncate text-[12px] text-muted">{p.pos}</span>
                  <span className="block text-[11.5px] text-ink">{why.join(' · ')}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      {/* Skills are for getting to know each other, not for handing out work (mook 2026-10-31). */}
      <p className="m-0 px-2 pt-1 text-[11.5px] text-muted">ทักไปคุยกับเจ้าตัวก่อนว่าสะดวกช่วยไหม ความถนัดเป็นข้อมูลให้รู้จักกัน ไม่ใช่การมอบหมายงาน</p>
    </div>
  );
}
