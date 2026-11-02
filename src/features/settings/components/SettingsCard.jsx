/** One settings section inside the folder-tab box (sections split by a line), with a title and an optional one-line description. */
export default function SettingsCard({ title, desc, aside, children }) {
  return (
    <section data-reveal className="border-t border-line px-6 py-[22px] first:border-t-0 max-[640px]:px-4">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="m-0 text-[16px] font-bold text-ink">{title}</h2>
          {desc && <p className="mb-0 mt-1 text-[12.5px] text-muted">{desc}</p>}
        </div>
        {aside}
      </div>
      {children}
    </section>
  );
}
