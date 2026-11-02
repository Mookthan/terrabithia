import { Search } from 'lucide-react';

export default function SearchBox({ value, onChange }) {
  const ic = 'lc !h-[22px] !w-[22px] flex-none text-muted max-[640px]:!h-[18px] max-[640px]:!w-[18px]';
  return (
    <div className="flex h-[50px] min-w-0 items-center gap-2.5 rounded-ctl border border-[#d9d9d9] bg-white px-4 text-teal-bright max-[760px]:h-[46px] max-[760px]:px-3 max-[640px]:h-10 max-[640px]:gap-2">
      <Search className={ic} />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="ค้นหาไฟล์"
        aria-label="ค้นหาไฟล์"
        autoComplete="off"
        className="w-full min-w-0 flex-1 border-0 bg-transparent text-[16px] text-ink outline-0 max-[760px]:text-[15px] max-[640px]:text-[14px]"
      />
    </div>
  );
}
