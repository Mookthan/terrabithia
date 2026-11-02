import { useState } from 'react';
import { useUI } from '@/context/UIContext';
import { PROD_ASSETS, RUAMITR_VIDEOS, RV_COVERS, prodVideoSrc } from '../../data';
import RuamitrToolbar from './RuamitrToolbar';
import VideoTile from './VideoTile';
import EmptyState from '@/components/ui/EmptyState';

/** Maxar Ruamitr tutorial videos: searchable, optionally sorted A–Z. */
export default function RuamitrView({ onBack }) {
  const { openVideo } = useUI();
  const [query, setQuery] = useState('');
  const [sortAZ, setSortAZ] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  let items = RUAMITR_VIDEOS.map((t, i) => ({ t, i })).filter((o) => o.t.toLowerCase().includes(query.toLowerCase()));
  if (sortAZ) items = [...items].sort((a, b) => a.t.localeCompare(b.t, 'th'));

  return (
    <>
      <RuamitrToolbar
        onBack={onBack}
        query={query}
        onQuery={setQuery}
        sortAZ={sortAZ}
        onSort={(az) => { setSortAZ(az); setFilterOpen(false); }}
        filterOpen={filterOpen}
        setFilterOpen={setFilterOpen}
      />
      <div className="grid grid-cols-4 gap-x-[22px] gap-y-[26px] max-[1000px]:grid-cols-2 max-[560px]:grid-cols-1">
        {items.length ? items.map((o) => (
          <VideoTile
            key={o.i}
            title={o.t}
            cover={RV_COVERS[o.i] || PROD_ASSETS.posters[o.i % 4]}
            onPlay={() => openVideo(RUAMITR_VIDEOS[o.i], prodVideoSrc())}
          />
        )) : (
          <EmptyState className="col-span-full py-[30px] text-[13px]">ไม่พบวิดีโอ</EmptyState>
        )}
      </div>
    </>
  );
}
