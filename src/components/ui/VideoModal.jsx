import { useEffect, useRef } from 'react';
import CloseButton from '@/components/ui/CloseButton';

/** Full-screen video player. `video` is { title, src } or null. */
export default function VideoModal({ video, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!video) return undefined;
    ref.current?.play().catch(() => {});
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [video, onClose]);

  if (!video) return null;
  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-[rgba(8,14,20,.82)] p-5 backdrop-blur-[4px]"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-[min(920px,100%)] animate-svc-in">
        <CloseButton tone="float" onClick={onClose} className="absolute -top-2 right-0" />
        <div className="mb-2.5 ml-0.5 mr-11 text-base font-bold text-white">{video.title}</div>
        <video
          ref={ref}
          src={video.src}
          controls
          playsInline
          loop
          className="block aspect-video w-full rounded-box bg-black shadow-pop"
        />
      </div>
    </div>
  );
}
