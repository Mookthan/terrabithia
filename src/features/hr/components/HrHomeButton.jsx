import MegaphoneIcon from './MegaphoneIcon';

export default function HrHomeButton({ active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-2 px-[18px] py-2 text-left text-[14px] font-bold transition-[background,color,box-shadow] duration-[.25s] ${
        active ? 'bg-teal-bright text-white' : 'text-ink hover:bg-white/50'
      }`}
    >
      <MegaphoneIcon className={`lc !h-4 !w-4 ${active ? 'text-white' : 'text-[#2F6FBF]'}`} />
      ประกาศจาก HR
    </button>
  );
}
