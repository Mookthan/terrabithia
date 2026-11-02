/** Section title row with an optional element (count or "see all" button) on the right.
 * Fixed at the button height so the grid below does not move when the count replaces the button. */
export default function SectionHead({ title, children }) {
  return (
    <div className="mb-[14px] flex min-h-9 items-center justify-between">
      <h2 className="text-[22px] font-semibold text-ink max-[760px]:text-[20px]">{title}</h2>
      {children}
    </div>
  );
}
