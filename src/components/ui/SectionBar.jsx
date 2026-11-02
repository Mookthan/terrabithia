/**
 * Full-bleed teal title bar used at the top of most pages.
 * `section` is the small "Section: X" tag on the left (hidden on phones). Phones get a compact 56px bar (mook, 2026-10-14).
 */
export default function SectionBar({ section, title, flush = false }) {
  return (
    <div
      className={`relative left-1/2 -ml-[50vw] -mt-7 flex h-14 w-screen items-center justify-center bg-teal-bright text-white min-[641px]:h-20 ${
        flush ? 'mb-0' : 'mb-[18px] min-[641px]:mb-[26px]'
      }`}
    >
      {section && (
        <div className="absolute left-[22px] top-1/2 m-0 hidden -translate-y-1/2 text-left text-sm leading-none opacity-95 min-[641px]:block">
          {`Section: ${section}`}
        </div>
      )}
      <h1 className="m-0 px-4 text-center text-[20px] font-medium leading-tight min-[641px]:text-[26px] min-[861px]:text-[30px]">{title}</h1>
    </div>
  );
}
