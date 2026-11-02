/** Red error box or green confirmation box above a form. */
export default function Notice({ kind = 'error', children }) {
  return (
    <div className={`mb-4 rounded-ctl px-[14px] py-[10px] text-left text-[12.5px] ${kind === 'error' ? 'bg-[#F6DEDA]' : 'text-[#2f5a38]'}`}>
      {children}
    </div>
  );
}
