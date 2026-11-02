import { useCallback, useEffect, useRef } from 'react';
import { ORGDATA } from '@/data/org';
import { OrgChart, listenInfo, measureByLayout } from '@/lib/orgChart';
import { orgDesc, orgFindMatch, orgIsStaff, orgNodeContent } from '../orgModel';

/** Re-measure the container, re-render and animate a fit. */
export function refitChart(chart, box) {
  if (!chart || !box) return;
  try {
    chart.svgHeight(box.clientHeight);
    chart.svgWidth(box.clientWidth);
    chart.render();
    chart.fit({ animate: true });
  } catch { /* chart not ready */ }
}

/**
 * Owns the d3-org-chart instance rendered into `boxRef`.
 * `onPerson(id)` fires when a node's info button is clicked.
 */
export default function useOrgChart(boxRef, onPerson) {
  const chartRef = useRef(null);
  const onPersonRef = useRef(onPerson);
  onPersonRef.current = onPerson;

  const refit = useCallback(() => refitChart(chartRef.current, boxRef.current), [boxRef]);
  const refitLater = useCallback((ms = 450) => setTimeout(refit, ms), [refit]);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return undefined;
    const unmeasure = measureByLayout(box);
    const chart = new OrgChart()
      .container(box)
      .svgHeight(box.clientHeight)
      .data(ORGDATA.map((d) => ({ ...d })))
      .initialExpandLevel(5)
      .nodeWidth(() => 112)
      .nodeHeight(() => 64)
      .childrenMargin(() => 50)
      .compactMarginBetween(() => 20)
      .compactMarginPair(() => 26)
      .nodeContent(orgNodeContent)
      .onExpandOrCollapse(() => setTimeout(() => refitChart(chart, box), 450))
      .render();
    chartRef.current = chart;

    const unlisten = listenInfo(box, (pid) => onPersonRef.current?.(pid));
    return () => {
      unlisten();
      chartRef.current = null;
      unmeasure();
      box.replaceChildren();
    };
  }, [boxRef]);

  /** Expand only the picked departments (or everything above staff level when none picked). */
  const applySelection = useCallback((sel) => {
    const c = chartRef.current;
    if (!c) return;
    const data = c.data();
    data.forEach((d) => { d._expanded = false; d._centered = false; d._highlighted = false; d._upToTheRootHighlighted = false; });
    if (sel.size === 0) {
      data.forEach((d) => { d._expanded = !orgIsStaff(d.id); });
    } else {
      const byId = {};
      data.forEach((d) => { byId[d.id] = d; });
      byId.chairman._expanded = true;
      sel.forEach((id) => orgDesc(id).forEach((x) => { if (byId[x]) byId[x]._expanded = true; }));
    }
    refit();
  }, [refit]);

  const search = useCallback((raw) => {
    const q = raw.trim().toLowerCase();
    const c = chartRef.current;
    if (!q || !c) return;
    const match = orgFindMatch(q);
    if (match) c.setUpToTheRootHighlighted(match.id).setCentered(match.id).render();
  }, []);

  const fit = useCallback(() => chartRef.current?.fit(), []);
  const expandAll = useCallback(() => { chartRef.current?.expandAll(); refitLater(); }, [refitLater]);
  const collapseAll = useCallback(() => { chartRef.current?.collapseAll(); refitLater(); }, [refitLater]);

  /** Phone fullscreen: open at a readable zoom on the top of the tree. */
  const zoomTop = useCallback(() => {
    const c = chartRef.current;
    if (!c || window.innerWidth > 640) return;
    try {
      const st = c.getChartState();
      c.setCentered(st.root.data.id).render();
      setTimeout(() => { try { st.svg.transition().duration(350).call(st.zoomBehavior.scaleTo, 0.7); } catch { /* */ } }, 80);
    } catch { /* */ }
  }, []);

  return { applySelection, search, fit, expandAll, collapseAll, refit, zoomTop };
}
