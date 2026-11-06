import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight, Maximize2, Search } from 'lucide-react';
import { PATHS } from '@/routes/paths';
import useClickOutside from '@/hooks/useClickOutside';
import useEscape from '@/hooks/useEscape';
import { orgKids } from '../data';
import useCacChart from '../hooks/useCacChart';
import CacFilterList from './CacFilterList';
import DashCard from './DashCard';
import '../home.css';
import DropPanel from '@/components/ui/DropPanel';
import PersonModal from '@/features/about/components/org/PersonModal';
import CloseButton from '@/components/ui/CloseButton';

const ctlBtn = 'cursor-pointer rounded-ctl border-0 bg-none px-[10px] py-[7px] text-[13px] text-teal-hover transition-colors hover:bg-teal-veil max-[640px]:px-[7px] max-[640px]:py-[6px] max-[640px]:text-xs';

/** Org chart of the user's own team (CAC) with search, department filter and fullscreen; the header links to the daily guess-who game (mook 2026-11-06). */
export default function CacTeamCard() {
  const navigate = useNavigate();
  const boxRef = useRef(null);
  const topRef = useRef(null);
  const wrapRef = useRef(null);
  const [person, setPerson] = useState(null);
  const chart = useCacChart(boxRef, setPerson);
  const [sel, setSel] = useState(() => new Set());
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [fs, setFs] = useState(false);
  const searchTimer = useRef(0);
  const selDirty = useRef(false);

  useEffect(() => {
    if (!selDirty.current) return;
    selDirty.current = false;
    chart.applySelection(sel);
  }, [sel, chart]);
  useEffect(() => () => clearTimeout(searchTimer.current), []);

  const updateSel = (fn) => { selDirty.current = true; setSel((s) => { const n = new Set(s); fn(n); return n; }); };
  const toggleDept = (id) => updateSel((n) => (n.has(id) ? n.delete(id) : n.add(id)));
  const toggleAll = () => updateSel((n) => {
    const ds = orgKids('cac').map((d) => d.id);
    const all = ds.every((d) => n.has(d));
    ds.forEach((d) => (all ? n.delete(d) : n.add(d)));
  });

  const closePanel = useCallback(() => setOpen(false), []);
  useClickOutside(topRef, closePanel, open);

  const onQuery = (v) => {
    setQuery(v);
    setOpen(true);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => chart.search(v), 380);
  };
  const toggleFilter = (e) => { e.stopPropagation(); setOpen((o) => !o); };

  const reset = () => { setQuery(''); setSel(new Set()); chart.applySelection(new Set()); };

  /* ---- fullscreen ---- */
  const exitFs = useCallback(() => setFs(false), []);
  useEscape(exitFs, fs);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return undefined; }
    document.body.classList.toggle('overflow-hidden', fs);
    const timers = [setTimeout(chart.refit, 120), setTimeout(chart.refit, 600)];
    if (fs) {
      try { wrapRef.current?.requestFullscreen?.().catch(() => {}); } catch { /* unsupported */ }
      timers.push(setTimeout(chart.zoomMe, 1100));
    } else {
      try { if (document.fullscreenElement) document.exitFullscreen(); } catch { /* unsupported */ }
      return () => timers.forEach(clearTimeout);
    }
    const onFsChange = () => { if (!document.fullscreenElement) setFs(false); };
    const onResize = () => setTimeout(chart.refit, 150);
    document.addEventListener('fullscreenchange', onFsChange);
    window.addEventListener('resize', onResize);
    return () => {
      timers.forEach(clearTimeout);
      document.removeEventListener('fullscreenchange', onFsChange);
      window.removeEventListener('resize', onResize);
      document.body.classList.remove('overflow-hidden');
    };
  }, [fs, chart.refit, chart.zoomMe]);

  return (
    <DashCard i={5} dx="0px" dy="90px" rot="-3deg" className="flex min-h-[640px] flex-col bg-[#F5F7F3] max-[640px]:order-7 max-[640px]:min-h-0">
      <div className="flex items-center justify-between gap-3 bg-[#C9EBE6] px-[18px] py-[14px] text-[22px] font-medium text-ink">
        <span>CAC (Corporate Affairs &amp; Communications)</span>
      </div>
      <div
        ref={wrapRef}
        className={fs ? `home-cacfs fixed inset-0 z-[2000] flex min-h-0 flex-col bg-[#F5F7F3]` : 'relative flex flex-1 flex-col'}
      >
        {fs && (
          <CloseButton tone="float" label="ปิดเต็มจอ" onClick={exitFs} className="fixed right-3 top-[max(12px,env(safe-area-inset-top))] z-[2001]" />
        )}
        <div
          ref={topRef}
          className={`relative flex flex-wrap items-center ${fs
            ? 'm-0 w-[calc(50%-40px)] min-w-[300px] flex-none pb-[10px] pl-[14px] pr-[70px] pt-3 max-[640px]:w-[calc(100%-64px)] max-[640px]:min-w-0'
            : 'mx-[14px] my-3'}`}
        >
          <div
            className="flex flex-[0_0_100%] cursor-pointer items-center gap-[10px] rounded-ctl border border-[#d8d8d0] bg-white pl-[14px] pr-1 text-muted max-[640px]:gap-2 max-[640px]:rounded-ctl max-[640px]:pl-[10px]"
            onClick={toggleFilter}
          >
            <span className="flex"><Search className="lc !h-[18px] !w-[18px] max-[640px]:!h-4 max-[640px]:!w-4" /></span>
            <input
              className="min-w-0 flex-1 cursor-pointer border-none bg-transparent py-3 text-sm outline-none max-[640px]:py-2 max-[640px]:text-[13px]"
              placeholder="ค้นหาแผนก ทีม ชื่อหรือตำแหน่ง"
              value={query}
              onChange={(e) => onQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && chart.search(query)}
              autoComplete="off"
            />
            <button
              className="inline-flex cursor-pointer items-center gap-1 whitespace-nowrap rounded-ctl border-0 bg-none px-[10px] py-2 text-sm leading-[1.2] text-teal-bright transition-[background-color,color] duration-200 hover:bg-teal-veil hover:!text-teal-hover"
              onClick={toggleFilter}
              aria-label="ตัวกรอง"
              title="ตัวกรอง"
            >
              {sel.size > 0 && <span className="mr-[2px] min-w-[18px] rounded-ctl bg-teal-bright px-[6px] py-px text-[11px] text-white">{sel.size}</span>}
              <ChevronDown className={`lc !block !h-[18px] !w-[18px] text-teal-bright transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
            </button>
          </div>
          <DropPanel
            open={open}
            innerClassName="p-[10px]"
            className={`absolute top-full z-[8] mt-[6px] ${fs ? 'left-[14px] right-[70px] max-[640px]:right-16' : 'left-0 right-0'}`}
          >
                <div className="max-h-[340px] overflow-auto">
                  <CacFilterList query={query} sel={sel} onToggleDept={toggleDept} onToggleAll={toggleAll} />
                </div>
                <div className="mt-2 flex items-center justify-between gap-2 border-t border-line pt-2 text-[11.5px] text-muted">
                  <span>{sel.size ? `เลือก ${sel.size} แผนก` : 'ยังไม่ได้เลือก (แสดงทีมของฉัน)'}</span>
                  <button
                    className="cursor-pointer rounded-ctl border-0 bg-none px-2 py-[5px] text-[12.5px] text-teal-bright transition-colors duration-200 hover:bg-teal-veil hover:!text-teal-hover"
                    onClick={() => updateSel((n) => n.clear())}
                  >
                    ล้างตัวกรอง
                  </button>
                </div>
          </DropPanel>
        </div>
        <div
          className={`relative overflow-hidden border-line bg-[#fafaf7] ${fs
            ? 'flex min-h-0 flex-1 flex-col rounded-none border-t'
            : 'mx-[14px] mb-3 flex-1 rounded-box border'}`}
        >
          <div className="absolute left-3 right-3 top-3 z-[6] flex flex-nowrap items-center justify-between gap-2 max-[640px]:static max-[640px]:px-3 max-[640px]:pt-[10px]">
            <div className={`ml-auto flex flex-wrap justify-end gap-[2px] max-[640px]:gap-0 ${fs ? '' : 'mr-2'}`}>
              <button className={ctlBtn} onClick={reset}>ทีมของฉัน</button>
              <button className={ctlBtn} onClick={chart.expandAll}>ขยายทั้งหมด</button>
              <button className={ctlBtn} onClick={chart.collapseAll}>หุบทั้งหมด</button>
            </div>
            {!fs && (
              <button
                className="grid h-9 w-9 flex-none cursor-pointer place-items-center rounded-ctl border border-[rgba(39,174,151,.3)] bg-[rgba(39,174,151,.12)] p-0 text-teal-hover transition-colors hover:bg-[rgba(39,174,151,.22)]"
                onClick={() => setFs(true)}
                aria-label="เต็มจอ"
                title="เต็มจอ"
              >
                <Maximize2 className="lc !h-[19px] !w-[19px]" />
              </button>
            )}
          </div>
          <div
            ref={boxRef}
            className={`home-cacbox relative overflow-hidden rounded-ctl ${fs ? 'h-auto min-h-0 flex-1 rounded-none' : 'h-[520px] max-[640px]:h-[420px]'}`}
          />
        </div>
      </div>
      <button
        onClick={() => navigate(PATHS.aboutProfile)}
        className="mb-4 ml-auto mr-[14px] cursor-pointer self-end rounded-ctl border-none bg-teal-bright hover:!bg-teal-hover transition-colors duration-200 px-4 py-[9px] text-[12.5px] font-semibold text-white"
      >
        View organization <ChevronRight className="lc !h-[1.05em] !w-[1.05em] !align-[-.2em]" />
      </button>
      <PersonModal id={person} onClose={() => setPerson(null)} />
    </DashCard>
  );
}
