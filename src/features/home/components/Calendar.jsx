import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MapPin, UtensilsCrossed } from 'lucide-react';
import { PATHS } from '@/routes/paths';
import { CAL_DOW, CAL_LEGEND, MONTHNAMES, calEvents, isCalHoliday } from '../data';
import { WORK, roleMonth } from '../calendarRoles';
import CalendarFilter from './CalendarFilter';
import DashCard from './DashCard';
import MonthPicker from './MonthPicker';
import '../home.css';

const cellSize = 'h-[clamp(32px,8vw,42px)] min-w-[clamp(32px,8vw,42px)] leading-[clamp(32px,8vw,42px)]';
const navBtn = 'grid h-[clamp(30px,8vw,40px)] w-[clamp(30px,8vw,40px)] cursor-pointer place-items-center rounded-full border-2 border-teal-bright bg-transparent text-[20px] text-teal-bright transition-colors duration-200 hover:border-teal-hover hover:bg-teal-hover hover:!text-white';

/** Split a month into weeks of 7 cells (null = blank). */
function monthWeeks(y, m) {
  const flat = Array(new Date(y, m, 1).getDay()).fill(null);
  const days = new Date(y, m + 1, 0).getDate();
  for (let d = 1; d <= days; d++) flat.push(d);
  while (flat.length % 7) flat.push(null);
  const weeks = [];
  for (let i = 0; i < flat.length; i += 7) weeks.push(flat.slice(i, i + 7));
  return weeks;
}

/** Past company activity with photos: green link to its album. */
function AlbumLink({ e }) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => navigate(PATHS.activityAlbum(e.album))}
      className="inline-flex cursor-pointer items-center gap-0.5 border-0 bg-transparent p-0 text-left text-[13px] font-bold text-teal-bright transition-colors hover:text-teal-hover"
    >
      {e.t}
      <ChevronRight className="lc !h-4 !w-4 flex-none" aria-hidden="true" />
    </button>
  );
}

/** Event that came from an HR post: green link back to the post. */
function HrPostLink({ id }) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => { navigate(PATHS.hrPost(id)); window.scrollTo({ top: 0 }); }}
      className="mt-1 inline-flex cursor-pointer items-center gap-0.5 border-0 bg-transparent p-0 text-left text-xs font-semibold text-teal-bright transition-colors hover:text-teal-hover"
    >
      ดูประกาศจาก HR
      <ChevronRight className="lc !h-3.5 !w-3.5 flex-none" aria-hidden="true" />
    </button>
  );
}

/** Event with a News post (lunch menu): green link to the post. */
function NewsPostLink({ id }) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => { navigate(PATHS.newsDetail(id)); window.scrollTo({ top: 0 }); }}
      className="mt-1 inline-flex cursor-pointer items-center gap-0.5 border-0 bg-transparent p-0 text-left text-xs font-semibold text-teal-bright transition-colors hover:text-teal-hover"
    >
      ดูประกาศเมนู
      <ChevronRight className="lc !h-3.5 !w-3.5 flex-none" aria-hidden="true" />
    </button>
  );
}

/** Company events plus the job layer ("งานของฉัน") for one day. */
const dayEvents = (d, m, y, role) => [...calEvents(d, m, y), ...(roleMonth(role, y, m, isCalHoliday)[d] || [])];

function DayDetail({ y, m, day, types, today, role }) {
  const evs = dayEvents(day, m, y, role).filter((e) => e.t && types.includes(e.c));
  const dt = new Date(y, m, day);
  const past = dt < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return (
    <div className="home-caldetail mb-2 mt-[14px] min-h-[150px] rounded-box bg-cream px-[22px] pb-[22px] pt-[18px]">
      <div className="mb-3 text-[clamp(18px,4.4vw,26px)] font-medium text-ink">{`${CAL_DOW[dt.getDay()]} ${day} ${MONTHNAMES[m].slice(0, 3)}`}</div>
      {evs.length ? evs.map((e, k) => (
        <div key={k} className="flex items-start gap-3 py-[7px] text-[13.5px]">
          <i className={`mt-[2px] h-[14px] w-[14px] shrink-0 rounded-full ${e.off ? 'opacity-40' : ''}`} style={{ background: e.c }} />
          <div>
            {past && e.album != null ? <AlbumLink e={e} /> : <b className={`text-[13px] ${e.off ? 'text-muted' : ''}`}>{e.t}</b>}
            {e.tag && <span className="ml-1.5 rounded-full bg-[#E3E9F0] px-2 py-px text-[11px] font-semibold text-navy">{e.tag}</span>}
            
            {e.time && <div className="mt-[2px] text-xs text-muted">{e.time}</div>}
            {e.menu && (
              <div className="mt-1 flex items-start gap-1.5 text-xs text-ink">
                <UtensilsCrossed className="lc mt-px !h-3.5 !w-3.5 flex-none text-teal-bright" aria-hidden="true" />
                <span>{`เมนู: ${e.menu}`}</span>
              </div>
            )}
            {e.place && (
              <div className="mt-1 flex items-start gap-1.5 text-xs text-ink">
                <MapPin className="lc mt-px !h-3.5 !w-3.5 flex-none text-teal-bright" aria-hidden="true" />
                <span>{e.place}</span>
              </div>
            )}
            {e.note && <div className="mt-0.5 text-xs text-muted">{e.note}</div>}
            {e.hrPost && <div><HrPostLink id={e.hrPost} /></div>}
            {e.news != null && <div><NewsPostLink id={e.news} /></div>}
          </div>
        </div>
      )) : <div className="py-[6px] text-xs text-muted">ไม่มีกิจกรรมในวันนี้</div>}
    </div>
  );
}

/** Month calendar; picking a day slides a detail panel open under its week. The title opens a month / year picker; the filter hides event types. */
export default function Calendar() {
  const [today] = useState(() => new Date());
  const [ym, setYm] = useState({ y: today.getFullYear(), m: today.getMonth() });
  const [sel, setSel] = useState(today.getDate());
  const [shown, setShown] = useState(today.getDate()); // day whose detail is rendered (kept while folding)
  const [init, setInit] = useState(true); // first paint: open without animating
  const [types, setTypes] = useState(() => CAL_LEGEND.map(([c]) => c));
  // The "งานของฉัน" layer follows the logged-in user's job, set in the back end (office staff have none).
  const role = 'office';
  const cardRef = useRef(null);
  const [params, setParams] = useSearchParams();
  const calParam = params.get('cal');

  // "?cal=Y-M-D" (from an HR post or announcement): open that day and bring the calendar into view.
  useEffect(() => {
    const [cy, cm, cd] = (calParam || '').split('-').map(Number);
    if (!cy || !cm || !cd) return undefined;
    setYm({ y: cy, m: cm - 1 });
    setSel(cd);
    setShown(cd);
    // Wait for the dashboard cards to fly in, scroll so the calendar sits under the header, then drop the parameter.
    const t = setTimeout(() => {
      const el = cardRef.current;
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 110, behavior: 'smooth' });
      const next = new URLSearchParams(params);
      next.delete('cal');
      setParams(next, { replace: true });
    }, 900);
    return () => clearTimeout(t);
  }, [calParam]); // eslint-disable-line react-hooks/exhaustive-deps

  useLayoutEffect(() => {
    if (!init) return undefined;
    const r = requestAnimationFrame(() => setInit(false));
    return () => cancelAnimationFrame(r);
  }, [init]);

  const changeMonth = (d) => {
    setYm(({ y, m }) => {
      let nm = m + d, ny = y;
      if (nm < 0) { nm = 11; ny--; }
      if (nm > 11) { nm = 0; ny++; }
      return { y: ny, m: nm };
    });
    setSel(null);
  };
  const jumpTo = (ny, nm) => {
    setYm({ y: ny, m: nm });
    const here = ny === today.getFullYear() && nm === today.getMonth();
    setSel(here ? today.getDate() : null);
    if (here) setShown(today.getDate());
  };
  const pick = (d) => {
    if (sel === d) { setSel(null); return; }
    setSel(d);
    setShown(d);
  };

  const { y, m } = ym;
  const weeks = monthWeeks(y, m);
  const isToday = (d) => d === today.getDate() && m === today.getMonth() && y === today.getFullYear();

  return (
    <DashCard i={3} dx="-80px" dy="70px" rot="-4deg" className="bg-white px-[22px] pb-6 pt-[18px] text-ink max-[640px]:order-4">
      <div ref={cardRef} className="mb-[22px] flex items-center justify-between">
        <button className={navBtn} onClick={() => changeMonth(-1)} aria-label="เดือนก่อนหน้า"><ChevronLeft className="lc !h-[60%] !w-[60%]" /></button>
        <MonthPicker y={y} m={m} today={today} onPick={jumpTo} />
        <button className={navBtn} onClick={() => changeMonth(1)} aria-label="เดือนถัดไป"><ChevronRight className="lc !h-[60%] !w-[60%]" /></button>
      </div>
      <div className="mb-[10px] grid grid-cols-7 text-center text-[clamp(13px,3.4vw,20px)] text-ink [&>span:first-child]:text-[#F0515B] [&>span:last-child]:text-[#F0515B]">
        {CAL_DOW.map((x) => <span key={x}>{x}</span>)}
      </div>
      {weeks.map((w, wi) => {
        const selCol = w.indexOf(sel);
        const shownCol = w.indexOf(shown);
        const open = sel != null && selCol >= 0;
        const col = open ? selCol : shownCol;
        return (
          <div key={`${y}-${m}-${wi}`}>
            <div className="grid animate-[calFade_.3s_ease] grid-cols-7">
              {w.map((d, ci) => {
                if (d === null) return <div key={ci} className="h-[clamp(46px,9.5vw,64px)]" />;
                const evs = dayEvents(d, m, y, role).filter((e) => types.includes(e.c));
                const red = ci === 0 || ci === 6 || isCalHoliday(d, m, y);
                const selected = d === sel;
                let tone = red ? 'text-[#F0515B]' : '';
                if (isToday(d)) tone = 'bg-lime font-semibold text-teal-bright';
                if (selected) tone = 'bg-teal-bright font-semibold text-white';
                return (
                  <div
                    key={ci}
                    className="group relative flex h-[clamp(46px,9.5vw,64px)] cursor-pointer flex-col items-center justify-start text-[12.5px] text-ink"
                    onClick={() => pick(d)}
                  >
                    <span className={`block rounded-ctl text-center text-[clamp(15px,4.2vw,27px)] transition-[background,color,transform] duration-200 group-hover:scale-[1.06] group-hover:bg-mint ${cellSize} ${tone}`}>{d}</span>
                    {evs.length > 0 && (
                      <div className="mt-[3px] flex gap-1">
                        {[...new Map(evs.map((e) => [e.c + (e.off ? '~' : ''), e])).entries()].map(([k, e]) => (
                          <i key={k} className={`h-[clamp(6px,1.6vw,9px)] w-[clamp(6px,1.6vw,9px)] rounded-full ${e.off ? 'opacity-40' : ''}`} style={{ background: e.c }} />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className={`home-calpanel ${open ? 'open' : ''} ${init ? 'calinit' : ''}`}>
              <div>
                {col >= 0 && (
                  <>
                    <div className="home-calarrow" style={{ '--arrowx': `${(col + 0.5) * (100 / 7)}%` }} />
                    <DayDetail y={y} m={m} day={open ? sel : shown} types={types} today={today} role={role} />
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
      <div className="mt-3 flex items-center justify-end gap-2">
        <CalendarFilter types={types} onChange={setTypes} hide={role === 'office' ? [WORK] : []} />
      </div>
    </DashCard>
  );
}
