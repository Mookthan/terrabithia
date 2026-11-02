import { useRef, useState } from 'react';
import FolderTabs from '@/components/ui/FolderTabs';
import SectionBar from '@/components/ui/SectionBar';
import ClientTiles from './components/ClientTiles';
import { CLIENTS, CLIENT_TABS } from './data';

export default function ClientsPage() {
  const [tab, setTab] = useState('existing');
  const panelRef = useRef(null);
  const groups = CLIENTS[tab];
  const hasPh = groups.some((g) => g.items.some((it) => it.ph));

  const pick = (t) => {
    setTab(t);
    if (panelRef.current) panelRef.current.scrollTop = 0;
  };

  return (
    <>
      <SectionBar section="About us" title="Clients" />
      <div>
        <FolderTabs
          label="ลูกค้า"
          items={CLIENT_TABS.map(([k, label]) => ({ k, label }))}
          value={tab}
          onChange={pick}
          boxRef={panelRef}
          boxClassName="max-h-[calc(100vh-300px)] min-h-[320px] overflow-y-auto px-[34px] py-7 max-[560px]:max-h-[calc(100vh-250px)] max-[560px]:px-4 max-[560px]:py-5"
        >
          {groups.map((g, i) => <ClientTiles key={`${tab}-${g.g}`} group={g} first={i === 0} />)}
          {hasPh && (
            <div className="mt-[22px] flex items-center gap-2 text-xs text-ink">
              <span className="h-[18px] w-[18px] rounded-ctl border-[1.5px] border-dashed border-[#b9b9b0] bg-[#f9f9f6]" />
              ยังไม่มีไฟล์โลโก้ ใส่ชื่อแทน
            </div>
          )}
        </FolderTabs>
      </div>
    </>
  );
}
