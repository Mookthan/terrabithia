import CheckMark from '@/components/ui/CheckMark';
import { COURSES, CRS_CATS, FILTER_OPTIONS } from '../data';
import { canSee } from '../access';

/** Skill categories that have at least one course this employee can see. */
const CATS = Object.keys(CRS_CATS).filter((k) => COURSES.some((c) => c.cat === k && canSee(c)));

// Group headings are ink: green text in a menu reads as something to click.
const Group = ({ children }) => <div className="px-3 pb-0.5 pt-2 text-[12px] font-bold text-ink first:pt-0.5">{children}</div>;

function Check({ on, onClick, children }) {
  return (
    <div
      role="checkbox"
      aria-checked={on}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
      className="flex cursor-pointer items-center gap-[9px] rounded-ctl px-3 py-[7px] text-[13px] text-ink transition-colors hover:bg-teal-veil"
    >
      <CheckMark state={on} />
      {children}
    </div>
  );
}

/** How many catalogue filters are on, for the badge on the filter button. */
export const catalogCount = (f) => (f.type === 'all' ? 0 : 1) + f.cats.length + (f.fav ? 1 : 0);

/** Catalogue filter panel: one course type, any number of skill categories, and favourites only. */
export default function CatalogFilter({ value, onChange }) {
  const set = (patch) => onChange({ ...value, ...patch });
  const toggleCat = (k) => set({ cats: value.cats.includes(k) ? value.cats.filter((x) => x !== k) : [...value.cats, k] });
  return (
    <div className="flex min-w-[210px] flex-col gap-0.5">
      <Group>ประเภท</Group>
      {FILTER_OPTIONS.map(([k, label]) => (
        <button
          key={k}
          type="button"
          onClick={() => set({ type: k })}
          className={`block w-full rounded-ctl px-3 py-[7px] text-left text-[13px] transition-colors hover:bg-teal-veil ${value.type === k ? 'font-bold text-teal-bright' : 'text-ink'}`}
        >
          {label}
        </button>
      ))}
      <Group>หมวดทักษะ</Group>
      {CATS.map((k) => <Check key={k} on={value.cats.includes(k)} onClick={() => toggleCat(k)}>{CRS_CATS[k]}</Check>)}
      <Group>อื่น ๆ</Group>
      <Check on={value.fav} onClick={() => set({ fav: !value.fav })}>เฉพาะคอร์สที่ถูกใจ</Check>
    </div>
  );
}
