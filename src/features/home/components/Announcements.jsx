import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { HOME_ANN } from '../data';
import DashCard from './DashCard';
import AllAnnouncementsModal from './announcements/AllAnnouncementsModal';
import AnnEmpty from './announcements/AnnEmpty';
import AnnHeader from './announcements/AnnHeader';
import AnnLightbox from './announcements/AnnLightbox';
import AnnRow from './announcements/AnnRow';
import { annOrder, annTs } from './announcements/annModel';
import useAnnFilter from './announcements/useAnnFilter';

/**
 * Announcements card: fixed height, the list scrolls inside. The card doesn't clip (and sits above its
 * neighbours) so the filter dropdown, with its date calendar, can hang below it without an inner scrollbar. Search + team / date filter in the header,
 * attachments (link, file, video, photos) under each post, one post can be pinned to the top (rows glide
 * to their new place). "ดูประกาศทั้งหมด" opens every post in full in a popup that shares the same filter.
 */
/** Phones show the newest few in full height (no scroll box inside the page); the rest are in "ดูประกาศทั้งหมด". */
/** Rows on the home card; the rest (and every search hit) are in "ดูประกาศทั้งหมด" (mook 2026-10-29: no inner scroll). */
const HOME_ROWS = 3;

/** Posts to list: urgent ones only once their strip has ended, newest first. */
const visibleAnn = () => HOME_ANN
  .filter((a) => !a.liveUntil || a.liveUntil <= Date.now())
  .sort((x, y) => annTs(y) - annTs(x));

export default function Announcements() {
  const filter = useAnnFilter();
  const list = useMemo(visibleAnn, []);
  const [pinned, setPinned] = useState(() => list.findIndex((a) => a.pin));
  const [showAll, setShowAll] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const rows = useRef(new Map());
  const before = useRef(null);
  const order = annOrder(list, filter.f, pinned);
  const openImage = (photos, index) => setLightbox({ photos, index });
  // "?ann=<id>" (from an HR post): highlight that post; open "ดูประกาศทั้งหมด" when it is not among the first rows.
  const [params, setParams] = useSearchParams();
  const annParam = params.get('ann');
  const [flash, setFlash] = useState(-1);
  useEffect(() => {
    if (!annParam) return undefined;
    const i = list.findIndex((a) => a.id === annParam);
    const next = new URLSearchParams(params);
    next.delete('ann');
    setParams(next, { replace: true });
    if (i < 0) return undefined;
    setFlash(i);
    if (order.indexOf(i) >= HOME_ROWS) setShowAll(true);
    return undefined;
  }, [annParam]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (flash < 0) return undefined;
    const t = setTimeout(() => setFlash(-1), 3600);
    return () => clearTimeout(t);
  }, [flash]);

  const togglePin = (i) => {
    before.current = new Map([...rows.current].map(([k, el]) => [k, el.getBoundingClientRect().top]));
    setPinned((p) => (p === i ? -1 : i));
  };

  // FLIP: animate each row from its old position to the new one.
  useLayoutEffect(() => {
    const first = before.current;
    before.current = null;
    if (!first || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    rows.current.forEach((el, k) => {
      const dy = first.get(k) - el.getBoundingClientRect().top;
      if (!dy) return;
      el.style.transition = 'none';
      el.style.transform = `translateY(${dy}px)`;
      el.style.zIndex = k === pinned ? '2' : '1';
      requestAnimationFrame(() => requestAnimationFrame(() => {
        el.style.transition = 'transform .5s cubic-bezier(.22,1,.36,1)';
        el.style.transform = '';
      }));
    });
  }, [pinned]);

  return (
    <DashCard
      i={4} dx="80px" dy="-40px" rot="4deg"
      className="relative z-[5] flex h-[716px] flex-col !overflow-visible bg-[#D6E5A3] px-[30px] pb-5 pt-[22px] max-[640px]:order-1 max-[640px]:h-auto max-[640px]:px-4 max-[640px]:pb-4 max-[640px]:pt-4"
    >
      <AnnHeader title="ประกาศ" list={list} filter={filter} />
      <div className="mt-[14px] min-h-0 flex-1 overflow-hidden max-[640px]:mt-3 max-[640px]:flex-none max-[640px]:overflow-visible">
        {order.length ? order.map((i, k) => (
          <AnnRow
            key={i}
            ref={(el) => (el ? rows.current.set(i, el) : rows.current.delete(i))}
            a={list[i]}
            pinned={i === pinned}
            onPin={() => togglePin(i)}
            clamp
            summary
            hidden={k >= HOME_ROWS}
            flash={i === flash && !showAll}
            onOpenImage={openImage}
            onGreet={() => { setFlash(i); setShowAll(true); }}
          />
        )) : <AnnEmpty q={filter.f.q} />}
      </div>
      <button
        type="button"
        onClick={() => setShowAll(true)}
        className="mt-4 cursor-pointer self-end rounded-ctl border-none bg-teal-bright hover:!bg-teal-hover transition-colors duration-200 px-4 py-[9px] text-[12.5px] font-semibold text-white max-[640px]:mt-3 max-[640px]:w-full max-[640px]:py-3 max-[640px]:text-[14px]"
      >
        {order.length < list.length ? `ดูผลค้นหาทั้งหมด (${order.length})` : `ดูประกาศทั้งหมด (${list.length})`} <ChevronRight className="lc !h-[1.05em] !w-[1.05em] !align-[-.2em]" />
      </button>
      {showAll && (
        <AllAnnouncementsModal list={list} filter={filter} pinned={pinned} flash={flash} onOpenImage={openImage} onClose={() => setShowAll(false)} />
      )}
      {lightbox && (
        <AnnLightbox
          photos={lightbox.photos}
          index={lightbox.index}
          onIndex={(index) => setLightbox((l) => ({ ...l, index }))}
          onClose={() => setLightbox(null)}
        />
      )}
    </DashCard>
  );
}
