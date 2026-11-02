import Avatar from './Avatar';

const TOOL = 'cursor-pointer rounded-ctl px-[14px] py-[9px] text-[14px] font-semibold transition-[background,filter] duration-200 max-[860px]:flex-1';

/** Frosted top bar of the book viewer: owner photo, title, subtitle and (once open) the reading tools. */
export default function BookBar({ owner, title, sub, expanded, onReadAll, onToggleExpand }) {
  return (
    <div className="flex flex-none flex-wrap items-center gap-3 border-b border-[rgba(120,90,40,.15)] bg-[rgba(255,248,230,.92)] py-3 pl-4 pr-[70px] backdrop-blur-[8px] max-[640px]:gap-2 max-[640px]:py-[10px] max-[640px]:pl-3 max-[640px]:pr-16">
      <Avatar id={owner} className="h-11 w-11" />
      <div className="min-w-0 flex-1">
        <b className="block text-[17px] text-ink">{title}</b>
        <small className="text-[12.5px] text-ink opacity-65">{sub}</small>
      </div>
      {onReadAll && (
        <div className="flex flex-none gap-2 max-[860px]:order-3 max-[860px]:w-full">
          <button type="button" onClick={onReadAll} className={`${TOOL} border-0 bg-teal-bright hover:!bg-teal-hover transition-colors duration-200 text-white`}>อ่านต่อเนื่อง</button>
          <button type="button" onClick={onToggleExpand} className={`${TOOL} border-[1.5px] border-solid border-teal-bright bg-transparent text-teal-bright hover:bg-white/70`}>
            {expanded ? 'ย่อ' : 'กางทั้งหมด'}
          </button>
        </div>
      )}
    </div>
  );
}
