/** Label / value rows used in both profile cards. */
export default function InfoList({ rows, className = '' }) {
  return (
    <div className={className}>
      {rows.map(([label, value]) => (
        <div key={label} className="flex gap-2 border-b border-line py-[7px] text-[12.5px] last:border-b-0">
          <span className="min-w-[110px] shrink-0 text-muted">{label}</span>
          {value}
        </div>
      ))}
    </div>
  );
}
