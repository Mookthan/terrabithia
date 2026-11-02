/** Small bold label above a composer section, with an optional muted hint and right-aligned extra. */
export default function SectionLabel({ children, hint, extra }) {
  return (
    <div className="mb-2 mt-4 text-[13px] font-bold text-ink">
      {extra}
      {children}
      {hint && <i className="ml-[6px] font-normal not-italic opacity-[.55]">{hint}</i>}
    </div>
  );
}
