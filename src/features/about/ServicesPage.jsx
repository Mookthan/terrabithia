import { useRef, useState } from 'react';
import SectionBar from '@/components/ui/SectionBar';
import ServiceCard from './components/ServiceCard';
import usePointerTilt from './hooks/usePointerTilt';
import { SERVICES } from './data';

export default function ServicesPage() {
  const wrapRef = useRef(null);
  const gridRef = useRef(null);
  const [flipped, setFlipped] = useState(-1);
  usePointerTilt(wrapRef, gridRef);

  // Mouse devices flip on hover (CSS); touch devices flip one card at a time on tap.
  const flip = (i) => {
    if (window.matchMedia('(hover:hover)').matches) return;
    setFlipped((f) => (f === i ? -1 : i));
  };

  return (
    <>
      <SectionBar section="About us" title="Services" />
      <div ref={wrapRef} className="pb-3.5 pt-[34px] [perspective:1600px]">
        <div ref={gridRef} className="svc-grid grid grid-cols-3 gap-6 will-change-transform max-[860px]:mx-auto max-[860px]:max-w-[420px] max-[860px]:grid-cols-1">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.en} svc={s} flipped={flipped === i} onFlip={() => flip(i)} />
          ))}
        </div>
      </div>
    </>
  );
}
