import { useCallback, useEffect, useRef, useState } from 'react';
import { Maximize2 } from 'lucide-react';
import useEscape from '@/hooks/useEscape';
import useOrgChart from '../../hooks/useOrgChart';
import { orgDeptsOf } from '../../orgModel';
import OrgSearchBar from './OrgSearchBar';
import '../../about.css';
import CloseButton from '@/components/ui/CloseButton';

const ctlBtn = 'cursor-pointer rounded-ctl border-0 bg-transparent px-2.5 py-[7px] text-[13px] text-teal-hover transition-colors hover:bg-teal-veil max-[640px]:px-[7px] max-[640px]:py-1.5 max-[640px]:text-xs';

/** Search/filter bar + the d3 org chart card, with a fullscreen mode. */
export default function OrgChartSection({ onPerson }) {
  const boxRef = useRef(null);
  const chart = useOrgChart(boxRef, onPerson);
  const [sel, setSel] = useState(() => new Set());
  const [query, setQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const wrapRef = useRef(null);
  const searchTimer = useRef(0);
  const selDirty = useRef(false);

  // Picking departments re-expands the chart (not on first render).
  useEffect(() => {
    if (!selDirty.current) return;
    selDirty.current = false;
    chart.applySelection(sel);
  }, [sel, chart]);

  const updateSel = (fn) => { selDirty.current = true; setSel((s) => { const n = new Set(s); fn(n); return n; }); };
  const toggleDept = (id) => updateSel((n) => (n.has(id) ? n.delete(id) : n.add(id)));
  const toggleChief = (k) => updateSel((n) => {
    const ds = orgDeptsOf(k);
    const all = ds.every((d) => n.has(d));
    ds.forEach((d) => (all ? n.delete(d) : n.add(d)));
  });
  const clearSel = () => updateSel((n) => n.clear());

  const onQuery = (v) => {
    setQuery(v);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => chart.search(v), 380);
  };
  useEffect(() => () => clearTimeout(searchTimer.current), []);

  const expandAll = () => { setSel(new Set()); chart.expandAll(); };
  const collapseAll = () => { setSel(new Set()); chart.collapseAll(); };

  /* ---- fullscreen ---- */
  const exitFullscreen = useCallback(() => setFullscreen(false), []);
  useEscape(exitFullscreen, fullscreen);
  const fsPrev = useRef(false);
  useEffect(() => {
    if (fsPrev.current === fullscreen && !fullscreen) return undefined; // initial mount: nothing to do
    fsPrev.current = fullscreen;
    document.body.classList.toggle('overflow-hidden', fullscreen);
    const timers = [setTimeout(chart.refit, 120), setTimeout(chart.refit, 600)];
    if (fullscreen) {
      try { wrapRef.current?.requestFullscreen?.().catch(() => {}); } catch { /* */ }
      timers.push(setTimeout(chart.zoomTop, 1100));
    } else {
      try { if (document.fullscreenElement) document.exitFullscreen(); } catch { /* */ }
    }
    if (!fullscreen) return () => timers.forEach(clearTimeout);
    const onFsChange = () => { if (!document.fullscreenElement) setFullscreen(false); };
    const onResize = () => setTimeout(chart.refit, 150);
    document.addEventListener('fullscreenchange', onFsChange);
    window.addEventListener('resize', onResize);
    return () => {
      timers.forEach(clearTimeout);
      document.removeEventListener('fullscreenchange', onFsChange);
      window.removeEventListener('resize', onResize);
      document.body.classList.remove('overflow-hidden');
    };
  }, [fullscreen, chart.refit, chart.zoomTop]);

  return (
    <div
      ref={wrapRef}
      className={fullscreen ? `org-fs fixed inset-0 z-[2000] flex min-h-0 flex-col bg-[#F5F7F3] p-0` : ''}
    >
      {fullscreen && (
        <CloseButton tone="float" label="ปิดเต็มจอ" onClick={exitFullscreen} className="fixed right-3 top-[max(12px,env(safe-area-inset-top))] z-[2001]" />
      )}
      <OrgSearchBar
        fullscreen={fullscreen}
        query={query}
        onQuery={onQuery}
        onSearch={() => chart.search(query)}
        open={filterOpen}
        setOpen={setFilterOpen}
        sel={sel}
        onToggleDept={toggleDept}
        onToggleChief={toggleChief}
        onClear={clearSel}
        onPerson={onPerson}
      />
      <div
        className={`relative overflow-hidden border border-line bg-[#fafaf7] ${
          fullscreen ? 'flex min-h-0 flex-1 flex-col rounded-none border-x-0 border-b-0' : 'rounded-box'
        }`}
      >
        <div className="absolute left-3 right-3 top-3 z-[6] flex flex-nowrap items-center justify-between gap-2 max-[640px]:static max-[640px]:gap-1.5 max-[640px]:px-3 max-[640px]:pt-2.5">
          <div className={`ml-auto flex flex-wrap justify-end gap-0.5 max-[640px]:gap-0 ${fullscreen ? '' : 'mr-2'}`}>
            <button type="button" className={ctlBtn} onClick={chart.fit}>Fit To The Screen</button>
            <button type="button" className={ctlBtn} onClick={expandAll}>Expand All</button>
            <button type="button" className={ctlBtn} onClick={collapseAll}>Collapse All</button>
          </div>
          {!fullscreen && (
            <button
              type="button"
              className="grid h-9 w-9 flex-none cursor-pointer place-items-center rounded-ctl border border-[rgba(39,174,151,.3)] bg-[rgba(39,174,151,.12)] p-0 text-teal-hover transition-colors hover:bg-[rgba(39,174,151,.22)]"
              onClick={() => setFullscreen(true)}
              aria-label="เต็มจอ"
              title="เต็มจอ"
            >
              <Maximize2 className="lc !h-[19px] !w-[19px]" />
            </button>
          )}
        </div>
        <div ref={boxRef} className={`org-box w-full overflow-hidden ${fullscreen ? 'h-auto min-h-0 flex-1' : 'h-[560px]'}`} />
      </div>
    </div>
  );
}
