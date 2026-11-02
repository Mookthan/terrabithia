import RichText from './RichText';

/** Body of an HR document card: big figure, list, label/value rows, text, footnote. */
export default function HdBody({ c }) {
  return (
    <>
      {c.pre && <small className="m-0 text-[14px] text-ink opacity-85">{c.pre}</small>}
      {c.big && <div className="text-[28px] font-semibold leading-[1.3]">{c.big}</div>}
      {c.list && (
        <ul className="m-0 grid list-none gap-2.5 p-0 text-left">
          {c.list.map((x, i) => (
            <li
              key={i}
              className="relative pl-[22px] before:absolute before:left-0.5 before:top-[.7em] before:h-2 before:w-2 before:rounded-full before:bg-[#5B9BE0] before:content-['']"
            >
              {x}
            </li>
          ))}
        </ul>
      )}
      {c.rows && (
        <div className="grid w-full gap-3 text-left">
          {c.rows.map((r) => (
            <div key={r[0]} className="flex items-baseline justify-between gap-3.5">
              <span>{r[0]}</span>
              <b className="whitespace-nowrap text-[20px] font-semibold">{r[1]}</b>
            </div>
          ))}
        </div>
      )}
      {c.b && <p className="m-0"><RichText html={c.b} /></p>}
      {c.empty && <p className="m-0"><span className="opacity-50">พื้นที่สำหรับใส่ข้อมูล</span></p>}
      {c.sm && <small className={`mt-1 text-[13.5px] text-ink opacity-70 ${c.list ? 'text-left' : ''}`}>{c.sm}</small>}
    </>
  );
}
