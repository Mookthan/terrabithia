import { ACTIVITIES_NEWEST, ACTIVITY_LAYOUT } from '../data';
import ActivityResults from './ActivityResults';
import ActivityTile from './ActivityTile';

// On phones every band and column flattens (display: contents) into one 2-column grid.
const FLAT = 'max-[700px]:contents';
const SLOTS = ACTIVITY_LAYOUT.flatMap((band) => band.items).reduce(function count(n, k) {
  return k.s !== undefined ? n + 1 : (k.col || k.row).reduce(count, n);
}, 0);

function Node({ node, chunk, onOpen }) {
  const style = { flexGrow: node.grow, flexBasis: 0 };
  if (node.s !== undefined) {
    const { a, i } = chunk[node.s];
    return (
      <ActivityTile activity={a} onOpen={() => onOpen(i)} style={style} className={`min-h-0 min-w-0 ${node.m ?? ''}`} />
    );
  }
  const kids = node.col || node.row;
  return (
    <div className={`flex min-h-0 min-w-0 gap-[14px] ${node.col ? 'flex-col' : ''} ${FLAT}`} style={style}>
      {kids.map((k, n) => <Node key={k.s ?? `g${n}`} node={k} chunk={chunk} onOpen={onOpen} />)}
    </div>
  );
}

/**
 * The Our Activity photo mosaic, newest activity top-left (mook 2026-10-30).
 * Every full set of activities repeats the design layout; any leftover older ones follow in a plain grid.
 */
export default function ActivityMosaic({ onOpen }) {
  const chunks = [];
  for (let n = 0; n + SLOTS <= ACTIVITIES_NEWEST.length; n += SLOTS) chunks.push(ACTIVITIES_NEWEST.slice(n, n + SLOTS));
  const rest = ACTIVITIES_NEWEST.slice(chunks.length * SLOTS);
  return (
    <div className="flex flex-col gap-[14px]">
      {chunks.map((chunk, c) => (
        <div key={c} className="flex flex-col gap-[14px] max-[700px]:grid max-[700px]:auto-rows-[120px] max-[700px]:grid-cols-2">
          {ACTIVITY_LAYOUT.map((band, b) => (
            <div key={b} className={`flex gap-[14px] ${FLAT}`} style={{ aspectRatio: band.ratio }}>
              {band.items.map((k, n) => <Node key={k.s ?? `g${n}`} node={k} chunk={chunk} onOpen={onOpen} />)}
            </div>
          ))}
        </div>
      ))}
      {rest.length > 0 && <ActivityResults items={rest} onOpen={onOpen} />}
    </div>
  );
}
