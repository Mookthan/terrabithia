import { useEffect, useRef, useState } from 'react';
import AlbumPhoto from './AlbumPhoto';

const GAP = 12;
// Target row height by container width: desktop / tablet / phone.
const rowHeight = (w) => (w > 1000 ? 300 : w > 640 ? 230 : 150);

/** Reads each real photo's own width/height once it loads; placeholders use their `r`. */
function useRatios(photos) {
  const [ratios, setRatios] = useState({});
  const srcs = photos.map((p) => p.src).filter(Boolean).join('|');
  useEffect(() => {
    srcs.split('|').forEach((src) => {
      if (!src) return;
      const img = new Image();
      img.onload = () => setRatios((m) => (m[src] ? m : { ...m, [src]: img.naturalWidth / img.naturalHeight }));
      img.src = src;
    });
  }, [srcs]);
  return (p) => (p.src ? ratios[p.src] || 3 / 2 : p.r || 4 / 3);
}

/** Splits photos into rows that fill the width exactly at one height each. */
function buildRows(items, ratioOf, width) {
  const target = rowHeight(width);
  const rows = [];
  let row = [];
  let sum = 0;
  items.forEach((it) => {
    const r = ratioOf(it.p);
    row.push({ ...it, r });
    sum += r;
    if (sum * target + GAP * (row.length - 1) >= width) {
      rows.push({ cells: row, h: (width - GAP * (row.length - 1)) / sum });
      row = [];
      sum = 0;
    }
  });
  if (row.length) {
    // Leftovers: stretch them to the full width when that keeps them near the row height, otherwise
    // fold them into the row above (a little shorter), so the album never ends with a ragged half row.
    const fit = (cells) => (width - GAP * (cells.length - 1)) / cells.reduce((a, c) => a + c.r, 0);
    const prev = rows[rows.length - 1];
    const merged = prev && [...prev.cells, ...row];
    if (fit(row) <= target * 1.2) rows.push({ cells: row, h: fit(row) });
    else if (merged && fit(merged) >= target * 0.55) rows[rows.length - 1] = { cells: merged, h: fit(merged) };
    else if (merged) {
      // Too many for one row: split the two rows again with about equal width each.
      const half = merged.reduce((a, c) => a + c.r, 0) / 2;
      let k = 0;
      for (let acc = 0; k < merged.length - 1 && acc + merged[k].r / 2 < half; k += 1) acc += merged[k].r;
      const a = merged.slice(0, k);
      const b = merged.slice(k);
      rows.splice(-1, 1, { cells: a, h: fit(a) }, { cells: b, h: fit(b) });
    } else rows.push({ cells: row, h: target });
  }
  return rows;
}

/**
 * Album photos in justified rows (mook 2026-10-30): every photo is shown whole at its own shape,
 * landscape photos stay wide, and each row lines up to the full width. `items` are { p, i } (i = lightbox index).
 */
export default function AlbumRows({ items, onOpen }) {
  const box = useRef(null);
  const [width, setWidth] = useState(0);
  const ratioOf = useRatios(items.map((it) => it.p));

  useEffect(() => {
    const el = box.current;
    const ro = new ResizeObserver(([e]) => setWidth(Math.floor(e.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={box} className="flex flex-col" style={{ gap: GAP }}>
      {width > 0 &&
        buildRows(items, ratioOf, width).map((row, k) => (
          <div key={k} className="flex" style={{ gap: GAP }}>
            {row.cells.map(({ p, i, r }) => (
              <div key={i} className="shrink-0" style={{ width: r * row.h, height: row.h }}>
                <AlbumPhoto photo={p} onOpen={() => onOpen(i)} />
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}
