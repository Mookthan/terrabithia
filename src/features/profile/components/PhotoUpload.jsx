import { useRef, useState } from 'react';
import { Camera } from 'lucide-react';
import { PHOTO_MAX_MB } from '../data';

/** Round profile photo with a camera button; picking a file previews it straight away. */
export default function PhotoUpload({ src, onPick }) {
  const input = useRef(null);
  const [error, setError] = useState('');
  return (
    <div className="flex items-center gap-3.5">
      <button
        type="button"
        onClick={() => input.current.click()}
        aria-label="เปลี่ยนรูปโปรไฟล์"
        className="group relative h-24 w-24 flex-none max-[480px]:h-20 max-[480px]:w-20 cursor-pointer overflow-hidden rounded-full border-0 bg-olive p-0"
      >
        <img src={src} alt="" className="block h-full w-full object-cover" />
        <span className="absolute inset-0 grid place-items-center bg-[rgba(23,63,82,.45)] text-white opacity-90 transition-opacity duration-200 group-hover:opacity-100">
          <Camera className="h-[22px] w-[22px]" aria-hidden="true" />
        </span>
      </button>
      <div className="min-w-0">
        <button
          type="button"
          onClick={() => input.current.click()}
          className="cursor-pointer rounded-ctl border border-teal-bright bg-white px-3 py-[5px] text-[12.5px] font-semibold text-teal-bright hover:bg-mint"
        >
          อัปโหลดรูปใหม่
        </button>
        <small className={`mt-1 block text-[11.5px] ${error ? 'text-[#C2456B]' : 'text-muted'}`}>
          {error || `JPG, PNG หรือ WEBP ไม่เกิน ${PHOTO_MAX_MB} MB`}
        </small>
      </div>
      <input
        ref={input}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => { setError(onPick(e.target.files[0])); e.target.value = ''; }}
      />
    </div>
  );
}
