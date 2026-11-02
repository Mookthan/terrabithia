import { avatarOf } from '@/data/org';

/** Round colleague photo (mint circle when there is none). */
export default function Avatar({ id, className = 'h-12 w-12' }) {
  const src = avatarOf(id);
  return (
    <span className={`flex-none overflow-hidden rounded-full bg-mint ${className}`}>
      {src && <img src={src} alt="" className="block h-full w-full object-cover" />}
    </span>
  );
}
