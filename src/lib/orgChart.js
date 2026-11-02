export { OrgChart } from 'd3-org-chart';

/**
 * d3-org-chart sizes its svg from the container's getBoundingClientRect(), which under the desktop
 * CSS zoom reports on-screen (zoomed) pixels, so a chart drew 85% wide and sat left of centre.
 * Make `box` report its layout size (clientWidth/Height) instead. Returns an undo function.
 */
export function measureByLayout(box) {
  box.getBoundingClientRect = function layoutRect() {
    const r = Element.prototype.getBoundingClientRect.call(this);
    return { x: r.x, y: r.y, top: r.top, left: r.left, right: r.right, bottom: r.bottom, width: this.clientWidth, height: this.clientHeight };
  };
  return () => { delete box.getBoundingClientRect; };
}

/** lucide "info" icon as markup (node content is an HTML string, so the React icon can't be used). */
export const INFO_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>';

/**
 * Info buttons (`data-org-info="<id>"`) live inside the chart's HTML; catch their clicks before
 * d3's node click and pass the person id to `onInfo`. Returns an undo function.
 */
export function listenInfo(box, onInfo) {
  const onClick = (e) => {
    const btn = e.target.closest('[data-org-info]');
    if (!btn) return;
    e.stopPropagation();
    onInfo(btn.dataset.orgInfo);
  };
  box.addEventListener('click', onClick, true);
  return () => box.removeEventListener('click', onClick, true);
}
