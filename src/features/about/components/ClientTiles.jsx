const tileCls = 'flex h-28 w-28 items-center justify-center overflow-hidden rounded-ctl bg-white transition-[transform,box-shadow] duration-200 ease-in-out hover:-translate-y-[3px] hover:shadow-pop max-[560px]:h-[92px] max-[560px]:w-[92px]';

/** One industry group of client logos; logo-less clients show a dashed name tile. */
export default function ClientTiles({ group, first }) {
  return (
    <div className={first ? '' : 'mt-6 border-t border-[#cfcfcf] pt-6'}>
      <h3 className="mb-3.5 text-[17px] font-bold text-ink">{group.g}</h3>
      <div className="flex flex-wrap gap-4 max-[560px]:gap-3">
        {group.items.map((it, i) => (it.ph ? (
          <div key={i} data-reveal className={`${tileCls} flex-col gap-1 border-[1.5px] border-dashed border-[#b9b9b0] bg-[#f9f9f6] p-1.5 text-center`} title={it.n}>
            <b className="text-xs leading-[1.3] text-ink">{it.n}</b>
            <small className="text-[10px] text-muted">ยังไม่มีโลโก้</small>
          </div>
        ) : (
          <div key={i} data-reveal className={`${tileCls} border border-[#d9d9d9]`} title={it.n}>
            <img src={it.i} alt={it.n || 'โลโก้ลูกค้า'} className="block h-full w-full object-cover" />
          </div>
        )))}
      </div>
    </div>
  );
}
