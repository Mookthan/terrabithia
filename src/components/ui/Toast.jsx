export default function Toast({ text, show }) {
  return (
    <div
      role="status"
      className={`pointer-events-none fixed bottom-[90px] left-1/2 z-[3500] -translate-x-1/2 rounded-full bg-navy px-5 py-[11px] text-[13px] text-white transition-all duration-300 ${
        show ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
      }`}
    >
      {text}
    </div>
  );
}
