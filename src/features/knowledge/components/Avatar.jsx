import { avatarOf } from '@/data/org';

/** Author avatar: the employee's photo, or a teal initial bubble when there is none. */
export default function Avatar({ id, name = '', small = false }) {
  const size = small ? 'h-[26px] w-[26px] text-[11px]' : 'h-[38px] w-[38px] text-[15px]';
  const src = avatarOf(id);
  if (src) return <img src={src} alt="" className={`${size} shrink-0 rounded-full object-cover`} />;
  return (
    <span className={`flex shrink-0 items-center justify-center rounded-full bg-teal-bright font-bold text-white ${size}`}>
      {name.trim().charAt(0).toUpperCase()}
    </span>
  );
}
