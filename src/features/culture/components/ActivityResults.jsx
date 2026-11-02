import ActivityTile from './ActivityTile';

/** Plain grid of the activities that match a search or year (the mosaic only fits the full set). */
export default function ActivityResults({ items, onOpen }) {
  return (
    <div className="grid grid-cols-3 gap-[14px] max-[900px]:grid-cols-2">
      {items.map(({ a, i }) => (
        <ActivityTile key={i} activity={a} onOpen={() => onOpen(i)} className="aspect-[4/3]" />
      ))}
    </div>
  );
}
