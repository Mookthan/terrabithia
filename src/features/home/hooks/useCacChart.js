import { useCallback, useEffect, useRef } from 'react';
import { ORG_PEOPLE, avatarOf } from '@/data/org';
import { escapeHTML } from '@/lib/html';
import { INFO_SVG, OrgChart, listenInfo, measureByLayout } from '@/lib/orgChart';
import { MY_TEAM, buildCacOrgData, orgDescIds } from '../data';

/** Text a search query is matched against for one node. */
export function cacSearchText(id, label = '') {
  const pp = ORG_PEOPLE[id];
  return `${pp ? `${pp.name} ${pp.nick} ${pp.pos}` : ''} ${label}`.toLowerCase();
}

/** HTML for one chart node (d3-org-chart renders node content from strings). */
function nodeContent(d) {
  const n = d.data;
  const pp = ORG_PEOPLE[n.id] || {};
  const w = d.width, h = d.height;
  if (n.person) {
    const me = n.id === 'mook';
    const name = pp.nick || n.label;
    const av = avatarOf(n.id);
    return `<div class="home-cnode person${me ? ' me' : ''}" style="width:${w}px;height:${h}px">
      <button type="button" class="home-cinfo" aria-label="ดูข้อมูล" title="ดูข้อมูล" data-org-info="${escapeHTML(n.id)}">${INFO_SVG}</button>
      <span class="home-cnav" style="background:${n.color}">${av ? `<img src="${av}" alt="">` : escapeHTML(name.charAt(0))}</span>
      <span class="home-cninfo"><b>${escapeHTML(name)}${me ? ' <i>(คุณ)</i>' : ''}</b><small>${escapeHTML(pp.pos || '')}</small></span></div>`;
  }
  return `<div class="home-cnode dept" style="width:${w}px;height:${h}px;background:${n.color}">${escapeHTML(n.label)}${n.count ? `<span class="home-obadge">${n.count}</span>` : ''}</div>`;
}

function refitChart(chart, box) {
  if (!chart || !box) return;
  try {
    chart.svgHeight(box.clientHeight);
    chart.svgWidth(box.clientWidth);
    chart.render();
    chart.fit({ animate: true });
  } catch { /* chart not ready */ }
}

const resetFlags = (d) => { d._expanded = false; d._centered = false; d._highlighted = false; d._upToTheRootHighlighted = false; };

/** Owns the d3-org-chart of the user's CAC team rendered into `boxRef`. */
export default function useCacChart(boxRef, onPerson) {
  const chartRef = useRef(null);
  const onPersonRef = useRef(onPerson);
  onPersonRef.current = onPerson;

  const refit = useCallback(() => refitChart(chartRef.current, boxRef.current), [boxRef]);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return undefined;
    const unmeasure = measureByLayout(box);
    const chart = new OrgChart()
      .container(box)
      .svgHeight(box.clientHeight)
      .data(buildCacOrgData())
      .nodeWidth((d) => (d.data.person ? 214 : 150))
      .nodeHeight((d) => (d.data.person ? 62 : 42))
      .childrenMargin(() => 40)
      .compactMarginBetween(() => 14)
      .compactMarginPair(() => 20)
      .nodeContent(nodeContent)
      .onNodeClick((node) => { if (node.data.person) onPersonRef.current?.(node.data.id); })
      .onExpandOrCollapse(() => setTimeout(() => refitChart(chart, box), 450))
      .render();
    chartRef.current = chart;
    const unlisten = listenInfo(box, (pid) => onPersonRef.current?.(pid));
    const t = setTimeout(() => refitChart(chart, box), 1500);
    return () => { clearTimeout(t); unlisten(); chartRef.current = null; unmeasure(); box.replaceChildren(); };
  }, [boxRef]);

  /** Expand my team (no selection) or the picked departments. */
  const applySelection = useCallback((sel) => {
    const c = chartRef.current;
    if (!c) return;
    const data = c.data();
    data.forEach(resetFlags);
    const byId = {};
    data.forEach((d) => { byId[d.id] = d; });
    if (sel.size === 0) {
      MY_TEAM.forEach((id) => { if (byId[id]) byId[id]._expanded = true; });
    } else {
      byId['cac-hdr']._expanded = true;
      byId.cac._expanded = true;
      sel.forEach((id) => orgDescIds(id).forEach((x) => { if (byId[x]) byId[x]._expanded = true; }));
    }
    refit();
  }, [refit]);

  /** Highlight and centre the first node matching the query. */
  const search = useCallback((raw) => {
    const q = raw.trim().toLowerCase();
    const c = chartRef.current;
    if (!q || !c) return;
    const m = c.data().find((d) => d.id !== 'cac-hdr' && d.id !== 'cac' && cacSearchText(d.id, d.label).includes(q));
    if (m) c.setUpToTheRootHighlighted(m.id).setCentered(m.id).render();
  }, []);

  const later = useCallback(() => setTimeout(refit, 450), [refit]);
  const expandAll = useCallback(() => { chartRef.current?.expandAll(); later(); }, [later]);
  const collapseAll = useCallback(() => { chartRef.current?.collapseAll(); later(); }, [later]);

  /** Phone fullscreen: open at a readable zoom centred on me. */
  const zoomMe = useCallback(() => {
    const c = chartRef.current;
    if (!c || window.innerWidth > 640) return;
    try {
      const st = c.getChartState();
      c.setCentered('mook').render();
      setTimeout(() => { try { st.svg.transition().duration(350).call(st.zoomBehavior.scaleTo, 0.85); } catch { /* */ } }, 80);
    } catch { /* */ }
  }, []);

  return { applySelection, search, expandAll, collapseAll, refit, zoomMe };
}
