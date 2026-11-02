import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import SectionBar from '@/components/ui/SectionBar';
import BackButton from '@/components/ui/BackButton';
import { useUI } from '@/context/UIContext';
import { track } from '@/lib/activityLog';
import { SECTIONS, filterFiles } from './utils';
import SearchBox from './components/SearchBox';
import FilterMenu from './components/FilterMenu';
import SectionHead from './components/SectionHead';
import FileGrid from './components/FileGrid';
import Empty from './components/Empty';
import FileDetail from './components/FileDetail';

export default function DownloadPage() {
  const { toast } = useUI();
  const [sec, setSec] = useState(null);
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('all');
  const [fOpen, setFOpen] = useState(false);
  const [detail, setDetail] = useState(null); // file whose details popup is open

  const onGet = (n) => { track('download', n); toast(`กำลังดาวน์โหลด ${n}`); };
  const openSec = (k) => { setSec(k); setQ(''); setFOpen(false); window.scrollTo(0, 0); };
  const back = () => { setSec(null); window.scrollTo(0, 0); };
  const pickCat = (v) => { setCat(v); setFOpen(false); };

  let body;
  if (sec) {
    const sc = SECTIONS.find((s) => s.k === sec);
    const fs = filterFiles(sc, q, cat);
    body = (
      <>
        <SectionHead title={sc.t}><span className="text-[13px] text-ink">{`ทั้งหมด: ${fs.length} ไฟล์`}</span></SectionHead>
        <FileGrid files={fs} section={sc.t} onOpen={setDetail}>
          {!fs.length && <Empty className="col-span-full">ไม่พบไฟล์</Empty>}
        </FileGrid>
      </>
    );
  } else {
    const secs = SECTIONS.map((sc) => ({ sc, fs: filterFiles(sc, q, cat) })).filter((x) => x.fs.length);
    body = secs.length ? secs.map(({ sc, fs }) => (
      <section key={sc.k} className="mb-[46px]">
        <SectionHead title={sc.t}>
          {fs.length > 4 && (
            <button
              type="button"
              onClick={() => openSec(sc.k)}
              className="flex h-9 cursor-pointer items-center gap-1.5 rounded-ctl border-0 bg-teal-bright px-4 text-[13px] font-semibold text-white transition-colors duration-200 hover:!bg-teal-hover"
            >
              ดูทั้งหมด <ChevronRight className="lc !h-[15px] !w-[15px]" />
            </button>
          )}
        </SectionHead>
        <FileGrid files={fs.slice(0, 4)} section={sc.t} onOpen={setDetail} />
      </section>
    )) : <Empty>ไม่พบไฟล์ที่ค้นหา</Empty>;
  }

  return (
    <>
      <SectionBar title="Download" />
      <div className="mx-auto w-[min(1460px,100%)] pb-[60px] pt-1.5 max-[760px]:px-0.5">
        <div className="mb-7 mt-[14px] grid grid-cols-[150px_1fr_auto] items-center gap-5 max-[760px]:mb-[22px] max-[760px]:mt-2 max-[760px]:grid-cols-[minmax(0,1fr)_auto] max-[760px]:gap-3">
          <BackButton
            onClick={back}
            style={{ visibility: sec ? 'visible' : 'hidden' }}
            className="justify-self-start max-[760px]:col-span-full"
          />
          <SearchBox value={q} onChange={setQ} />
          <FilterMenu open={fOpen} setOpen={setFOpen} cat={cat} onPick={pickCat} />
        </div>
        <div>{body}</div>
      </div>
      {detail && <FileDetail file={detail} onGet={onGet} onClose={() => setDetail(null)} />}
    </>
  );
}
