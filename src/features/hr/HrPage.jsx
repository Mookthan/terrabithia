import { useEffect, useRef } from 'react';
import SectionBar from '@/components/ui/SectionBar';
import HrRail from './components/HrRail';
import HrContent from './components/HrContent';
import useHrSelection from './hooks/useHrSelection';
import './hr.css';

const reducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export default function HrPage() {
  const { sel, selKey, openGroup, select, goHome, toggleGroup } = useHrSelection();
  const mainRef = useRef(null);
  const toTop = useRef(false);
  // The pane is re-mounted per selection (key); after the first change it plays the swap animation.
  const initialKey = useRef(selKey);
  const changed = useRef(false);
  if (selKey !== initialKey.current) changed.current = true;
  const animate = changed.current && !reducedMotion();

  // On every content change: bring the pane into view like the prototype.
  useEffect(() => {
    if (!changed.current) return;
    if (toTop.current) {
      toTop.current = false;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (mainRef.current) {
      const top = mainRef.current.getBoundingClientRect().top + window.scrollY - 84;
      if (window.scrollY > top + 40) window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }
  }, [selKey]);

  // Announcement links behave like the prototype's openHrItem: select, then scroll to the top.
  const openFromNews = (g, i) => { toTop.current = true; select(g, i); };

  return (
    <>
      <SectionBar title="HR" flush />
      <div className="relative left-1/2 -mb-[68px] text-[14px] -ml-[50vw] flex min-h-[calc(100vh-160px)] w-screen max-[860px]:min-h-0 max-[860px]:flex-col">
        <div className="w-[250px] shrink-0 bg-[#DDF7F0] max-[860px]:w-full">
          <HrRail sel={sel} openGroup={openGroup} onHome={goHome} onToggleGroup={toggleGroup} onSelectItem={select} />
        </div>
        <section
          ref={mainRef}
          key={selKey}
          className={`min-w-0 flex-1 px-[44px] pb-[96px] pt-[46px] max-[860px]:px-[18px] max-[860px]:pt-7 ${animate ? 'hr-in' : ''}`}
        >
          {/* Content sits centred in the space beside the rail, same width as other pages (mook 2026-10-30). */}
          <div className="mx-auto w-full max-w-[1000px]">
            <HrContent sel={sel} onOpenItem={openFromNews} />
          </div>
        </section>
      </div>
    </>
  );
}
