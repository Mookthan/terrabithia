import { BD_COVERS } from '../covers';
import { OCC_COVERS } from '../occasions';
import Accordion from './Accordion';
import CardCover from './CardCover';

const coverName = (k) => OCC_COVERS[k]?.n || BD_COVERS.find((c) => c.k === k)?.n;

/** Grid of the occasion's covers (`keys`), each previewed with the recipient's own nickname (and birthday). */
export default function CoverPicker({ keys, birthday = true, value, owner, onChange }) {
  return (
    <Accordion title="ปกการ์ด" hint={birthday ? 'ชื่อเล่นและวันเกิดเปลี่ยนตามผู้รับ' : 'ชื่อเล่นเปลี่ยนตามผู้รับ'} defaultOpen>
      <div className="grid grid-cols-3 gap-[10px] px-[2px] pb-2 pt-[2px] min-[900px]:grid-cols-4">
        {keys.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => onChange(k)}
            aria-pressed={value === k}
            className={`flex cursor-pointer flex-col items-center gap-1 rounded-ctl border-2 bg-white p-1 text-ink transition-[border-color,box-shadow] duration-200 ${
              value === k ? 'border-teal-bright shadow-[0_0_0_2px_rgba(39,174,151,.22)]' : 'border-[#DCE6E3] hover:border-mint'
            }`}
          >
            <span className="pointer-events-none block w-full overflow-hidden rounded-ctl [container-type:inline-size]">
              <CardCover cover={k} owner={owner} />
            </span>
            <small className="text-center text-[12px] leading-[1.2]">{coverName(k)}</small>
          </button>
        ))}
      </div>
    </Accordion>
  );
}
