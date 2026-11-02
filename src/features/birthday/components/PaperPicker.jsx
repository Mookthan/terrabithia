import { BD_PAPERS } from '../data';
import SectionLabel from './SectionLabel';

/** Pastel paper colour for the inside of the card. */
export default function PaperPicker({ value, onChange }) {
  return (
    <>
      <SectionLabel hint="สีพาสเทล ข้อความและสติกเกอร์อยู่ตรงนี้">กระดาษข้างใน</SectionLabel>
      <div className="flex flex-wrap gap-x-[10px] gap-y-2">
        {BD_PAPERS.map((p) => (
          <button
            key={p.k}
            type="button"
            onClick={() => onChange(p.k)}
            aria-label={`กระดาษสี${p.n}`}
            aria-pressed={value === p.k}
            className="flex w-14 cursor-pointer flex-col items-center gap-[3px] border-0 bg-transparent p-0"
          >
            <i
              className={`h-10 w-10 rounded-ctl border-2 border-white transition-[box-shadow,transform] duration-200 ${value === p.k ? 'scale-[1.06] shadow-[0_0_0_2.5px_#27AE97]' : 'shadow-[0_0_0_1.5px_#D5DEDB]'}`}
              style={{ background: p.c }}
            />
            <small className="text-[11.5px] text-ink">{p.n}</small>
          </button>
        ))}
      </div>
    </>
  );
}
