import { CRS_TYPES } from '../data';

const COLORS = {
  req: 'bg-[#D5EBC9] text-[#3C9A4F]',
  sel: 'bg-[#D6DDF6] text-[#3359C9]',
  free: 'bg-[#F9D5E1] text-[#CF4278]',
  dept: 'bg-[#D6EEDB] text-[#2E8B57]',
};

/** Coloured course-type (or department) tag. `small` = the card variant. */
export default function TypePill({ type, label, small = false }) {
  return (
    <i
      className={`inline-block rounded-ctl not-italic ${COLORS[type]} ${
        small ? 'mr-1.5 px-3 py-1 text-[11px]' : 'px-3.5 py-[5px] text-[11.5px]'
      }`}
    >
      {label ?? CRS_TYPES[type].l}
    </i>
  );
}
