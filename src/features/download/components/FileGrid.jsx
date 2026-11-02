import FileTile from './FileTile';

/** 4/3/2-column grid of file tiles; `section` (title) goes along with the opened file. */
export default function FileGrid({ files, section, onOpen, children }) {
  return (
    <div className="grid grid-cols-4 gap-x-5 gap-y-6 max-[1000px]:grid-cols-3 max-[760px]:grid-cols-2 max-[760px]:gap-x-3 max-[760px]:gap-y-[18px]">
      {files.map((f, i) => <FileTile key={`${f.n}-${i}`} file={f} onOpen={(file) => onOpen({ ...file, sec: section })} />)}
      {children}
    </div>
  );
}
