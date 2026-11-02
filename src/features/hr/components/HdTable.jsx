import '../hr.css';

/** HR data table; turns into stacked cards on phones (see hr.css). */
export default function HdTable({ table }) {
  return (
    <div className="hr-twrap">
      <table className="hr-table">
        <thead>
          <tr>{table.head.map((h) => <th key={h}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {table.rows.map((r) => (
            <tr key={r[0]}>
              {r.map((c, i) => (i === 0
                ? <th key={i} scope="row">{c}</th>
                : <td key={i} data-label={table.head[i] || ''}>{c}</td>))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
