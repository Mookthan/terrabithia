import { useState } from 'react';
import { Download, FileText, Link2, Pause, Play } from 'lucide-react';
import { useUI } from '@/context/UIContext';

const CARD = 'mt-[10px] rounded-ctl bg-white shadow-card';

/** Link preview: team-coloured icon tile, title, description and host. */
function AnnLink({ t }) {
  return (
    <a
      href={t.u}
      target="_blank"
      rel="noopener noreferrer"
      className={`${CARD} flex items-stretch overflow-hidden text-ink no-underline transition-[transform,box-shadow] duration-200 hover:-translate-y-px hover:shadow-pop`}
    >
      <span className="grid w-16 flex-none place-items-center bg-[linear-gradient(135deg,var(--g1),var(--g2))] text-white">
        <Link2 className="h-6 w-6" aria-hidden="true" />
      </span>
      <span className="flex min-w-0 flex-col gap-[2px] px-3 py-[9px]">
        <b className="text-[13.5px] font-semibold leading-[1.35]">{t.t}</b>
        {t.dsc && <em className="line-clamp-2 text-[12px] not-italic leading-[1.4] text-muted">{t.dsc}</em>}
        <small className="text-[11px] text-muted">{t.h}</small>
      </span>
    </a>
  );
}

/** File row: type icon, name, size and a download button (a demo toast here). */
function AnnFile({ t }) {
  const { toast } = useUI();
  return (
    <div className={`${CARD} flex items-center gap-3 px-[10px] py-[9px]`}>
      <span className="relative grid h-11 w-10 flex-none place-items-center rounded-ctl bg-[#FDE8E8] text-[#D64B4B]">
        <FileText className="h-6 w-6" aria-hidden="true" />
        <i className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 rounded-ctl bg-[#D64B4B] px-[5px] py-px text-[9px] font-bold not-italic text-white">{t.x}</i>
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <b className="truncate text-[13px] font-semibold text-ink">{t.n}</b>
        <small className="text-[11.5px] text-muted">{t.s}</small>
      </span>
      <button
        type="button"
        onClick={() => toast(`ดาวน์โหลด ${t.n} (ตัวอย่าง)`)}
        aria-label="ดาวน์โหลด"
        className="grid h-[38px] w-[38px] flex-none cursor-pointer place-items-center rounded-full border-0 bg-[#E3F6F1] text-teal-bright transition-colors duration-200 hover:bg-[#C9EBE2]"
      >
        <Download className="h-[18px] w-[18px]" aria-hidden="true" />
      </button>
    </div>
  );
}

/** Video tile: play / pause with a progress bar (a mock player). */
function AnnVideo({ t }) {
  const [on, setOn] = useState(false);
  const Icon = on ? Pause : Play;
  return (
    <button
      type="button"
      onClick={() => setOn((v) => !v)}
      aria-label={`${on ? 'หยุด' : 'เล่น'}วิดีโอ ${t.t}`}
      className="relative mt-[10px] block aspect-video w-full cursor-pointer overflow-hidden rounded-ctl border-0 bg-ink p-0 text-left"
    >
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,var(--g2),var(--g1)_80%)]" />
      <span className="absolute left-1/2 top-[44%] grid h-[54px] w-[54px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/[.92] text-ink shadow-card">
        <Icon className={`h-[22px] w-[22px] fill-current ${on ? '' : 'ml-[2px]'}`} aria-hidden="true" />
      </span>
      <span className="absolute bottom-[10px] left-3 right-16 text-[12.5px] font-semibold leading-[1.25] text-white [text-shadow:0_1px_4px_rgba(0,0,0,.5)]">{t.t}</span>
      <span className="absolute bottom-3 right-[10px] rounded-ctl bg-black/65 px-[7px] py-[2px] text-[11.5px] font-semibold text-white">{t.len}</span>
      <span className="absolute inset-x-0 bottom-0 h-[3px] bg-white/25">
        <i className={`block h-full w-0 bg-white ${on ? 'ann-prog' : ''}`} />
      </span>
    </button>
  );
}

/** Photo set: up to 4 tiles (the first one wide when there are 3), "+n" on the last; tap opens the lightbox. */
function AnnImages({ t, onOpen }) {
  const n = t.n.length;
  const cols = n === 1 ? 'grid-cols-1' : 'grid-cols-2';
  return (
    <div className={`mt-[10px] grid gap-[3px] overflow-hidden rounded-ctl ${cols}`}>
      {t.n.slice(0, 4).map((src, q) => (
        <button
          key={q}
          type="button"
          onClick={() => onOpen(q)}
          aria-label={`ดูรูปที่ ${q + 1}`}
          className={`relative cursor-pointer border-0 bg-cover bg-center p-0 transition-[filter] duration-200 hover:brightness-90 ${n === 3 && q === 0 ? 'col-span-full aspect-video' : 'aspect-[4/3]'}`}
          style={{ backgroundImage: `url('${src}')` }}
        >
          {q === 3 && n > 4 && <b className="absolute inset-0 grid place-items-center bg-[rgba(23,63,82,.55)] text-[22px] font-bold text-white">+{n - 4}</b>}
        </button>
      ))}
    </div>
  );
}

/** One attachment under an announcement (LINE-style): link, file, video or photo set. */
export default function AnnAttachment({ t, onOpenImage }) {
  if (t.k === 'link') return <AnnLink t={t} />;
  if (t.k === 'file') return <AnnFile t={t} />;
  if (t.k === 'video') return <AnnVideo t={t} />;
  if (t.k === 'img') return <AnnImages t={t} onOpen={(q) => onOpenImage(t.n, q)} />;
  return null;
}
