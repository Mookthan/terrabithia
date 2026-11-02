/** Section with the lime title strip used on the course page. */
export default function DetailSection({ title, children }) {
  return (
    <section className="mb-[26px]">
      <h2 className="bg-[#D6E4A5] px-3 py-[9px] text-center text-[17px] font-semibold text-ink">{title}</h2>
      {children}
    </section>
  );
}
