import { useState } from 'react';
import { Award, ChevronDown, Clock, Paperclip, Plus, Trash2 } from 'lucide-react';
import { ME } from '@/data/me';
import Fold from '@/components/ui/Fold';
import { ICON_BTN } from '@/components/ui/iconButton';
import OrgToggle from '@/features/showcase/components/OrgToggle';
import { setOrgHidden, useOrgHidden } from '../personalStore';
import CertViewer from './CertViewer';
import { TH_MONTH, addCert, certDate, removeCert, useCerts } from '../certStore';

const INPUT = 'w-full rounded-ctl border border-line bg-white px-3 py-2 text-[16px] text-ink outline-none placeholder:text-faint focus:border-teal-bright min-[641px]:text-[13px]';
const NOW_Y = new Date().getFullYear() + 543;
const YEARS = Array.from({ length: 15 }, (_, i) => NOW_Y - i);

function CertTile({ c, onOpen }) {
  return (
    <li data-reveal className="flex">
    <div
      data-cursor="ดูใบรับรอง"
      data-cursor-icon="eye"
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(); } }}
      className="flex w-full cursor-pointer items-start gap-3 rounded-box bg-white p-4 shadow-card transition-[transform,box-shadow] duration-[.25s] ease-[ease] hover:-translate-y-1 hover:shadow-pop focus-visible:-translate-y-1 focus-visible:shadow-pop motion-reduce:transition-none"
    >
      <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-[#E6F4F1] text-teal-bright">
        <Award className="lc !h-5 !w-5" aria-hidden="true" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <b className="text-[13.5px] font-semibold leading-[1.45] text-ink">{c.title}</b>
        <small className="text-[12px] text-muted">{`${c.issuer} · ${certDate(c)}`}</small>
        {c.status === 'pending' && (
          <span className="mt-1 inline-flex items-center gap-1 self-start rounded-full bg-[#FFF4DB] px-2 py-px text-[11px] font-semibold text-[#9A6B00]">
            <Clock className="lc !h-3 !w-3" aria-hidden="true" /> รอทีม PFM ตรวจ
          </span>
        )}
        {c.file && <small className="mt-0.5 inline-flex items-center gap-1 text-[11.5px] text-muted"><Paperclip className="lc !h-3 !w-3" aria-hidden="true" /><span data-nt className="truncate">{c.file}</span></small>}
      </span>
      {c.source === 'external' && (
        <button type="button" onClick={(e) => { e.stopPropagation(); removeCert(c.id); }} title="ลบใบรับรองนี้" aria-label={`ลบ ${c.title}`} className={`${ICON_BTN} h-8 w-8 text-muted`}>
          <Trash2 className="lc !h-4 !w-4" />
        </button>
      )}
    </div>
    </li>
  );
}

/** Folds open under the heading (no popup); the owner adds an outside course or training. */
function AddForm({ onDone }) {
  const [f, setF] = useState({ title: '', issuer: '', m: new Date().getMonth() + 1, y: NOW_Y, file: '', src: '' });
  const [err, setErr] = useState('');
  const save = (e) => {
    e.preventDefault();
    if (!f.title.trim() || !f.issuer.trim()) return setErr('กรุณากรอกชื่อหลักสูตรและหน่วยงานที่ออกใบรับรอง');
    if (!f.file) return setErr('กรุณาแนบไฟล์ใบรับรอง เพื่อให้ทีม PFM ตรวจ');
    addCert({ ...f, title: f.title.trim(), issuer: f.issuer.trim(), m: +f.m, y: +f.y });
    setF({ ...f, title: '', issuer: '', file: '', src: '' });
    setErr('');
    return onDone();
  };
  return (
    <form onSubmit={save} className="mb-4 rounded-box bg-white p-5 shadow-card">
      <div className="grid grid-cols-2 gap-3 max-[640px]:grid-cols-1">
        <label className="flex flex-col gap-1 text-[12.5px] text-muted">ชื่อหลักสูตร / การอบรม
          <input value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} placeholder="เช่น Google UX Design Certificate" className={INPUT} />
        </label>
        <label className="flex flex-col gap-1 text-[12.5px] text-muted">หน่วยงานที่ออกใบรับรอง
          <input value={f.issuer} onChange={(e) => setF({ ...f, issuer: e.target.value })} placeholder="เช่น Coursera" className={INPUT} />
        </label>
        <div className="flex flex-col gap-1 text-[12.5px] text-muted">วันที่ได้รับ
          <div className="flex gap-2">
            <select aria-label="เดือน" value={f.m} onChange={(e) => setF({ ...f, m: e.target.value })} className={INPUT}>
              {TH_MONTH.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
            </select>
            <select aria-label="ปี" value={f.y} onChange={(e) => setF({ ...f, y: e.target.value })} className={INPUT}>
              {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
        </div>
        <label className="flex flex-col gap-1 text-[12.5px] text-muted">แนบไฟล์ใบรับรอง (รูปหรือ PDF)
          <input type="file" accept="image/jpeg,image/png,application/pdf" onChange={(e) => { const file = e.target.files?.[0]; setF({ ...f, file: file?.name || '', src: file && file.type.startsWith('image/') ? URL.createObjectURL(file) : '' }); }} className="w-full rounded-ctl border border-dashed border-line bg-white px-3 py-[7px] text-[12.5px] text-ink file:mr-3 file:cursor-pointer file:rounded-ctl file:border-0 file:bg-teal-veil file:px-3 file:py-1 file:text-[12px] file:font-semibold file:text-teal-hover" />
        </label>
      </div>
      <p className="mt-3 text-[12px] text-muted">ใบที่เพิ่มเองจะขึ้นใน Org Chart หลังทีม PFM ตรวจแล้ว</p>
      {err && <p className="mt-2 text-[12.5px] text-[#C2333D]">{err}</p>}
      <div className="mt-4 flex justify-end gap-2">
        <button type="button" onClick={onDone} className="rounded-ctl border border-line bg-white px-4 py-2 text-[13px] font-semibold text-ink transition-colors hover:bg-teal-soft">ยกเลิก</button>
        <button type="submit" className="rounded-ctl bg-teal-bright px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:!bg-teal-hover">บันทึก</button>
      </div>
    </form>
  );
}

/**
 * Certificates on my profile (mook 2026-11-05): site courses arrive by themselves, outside ones the owner adds
 * (or HR adds). Always shown here, with a short empty line when there are none; the Org Chart card leaves the
 * row out when it is empty or switched off.
 */
export default function CertSection() {
  const list = useCerts(ME.id);
  const hidden = useOrgHidden();
  const [adding, setAdding] = useState(false);
  const [view, setView] = useState(null);
  return (
    <section className="mb-[38px] text-[14px]">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 max-[640px]:px-1">
        <h2 className="m-0 text-[19px] font-bold text-ink max-[640px]:text-[17px]">ใบรับรองและการอบรม</h2>
        <div className="flex flex-wrap items-center gap-3">
          <OrgToggle on={!hidden.certs} onChange={(on) => setOrgHidden({ ...hidden, certs: !on })} />
          <button
            type="button"
            aria-expanded={adding}
            onClick={() => setAdding((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-ctl bg-teal-bright px-4 py-2 text-[13.5px] font-semibold text-white transition-colors hover:!bg-teal-hover"
          >
            <Plus className="lc !h-4 !w-4" aria-hidden="true" /> เพิ่มใบรับรอง
            <ChevronDown className={`lc !h-4 !w-4 transition-transform duration-300 ${adding ? 'rotate-180' : ''}`} aria-hidden="true" />
          </button>
        </div>
      </div>
      <Fold open={adding}><AddForm onDone={() => setAdding(false)} /></Fold>
      {list.length ? (
        <ul className="grid grid-cols-3 gap-4 max-[1100px]:grid-cols-2 max-[640px]:grid-cols-1">
          {list.map((c) => <CertTile key={c.id} c={c} onOpen={() => setView(c)} />)}
        </ul>
      ) : (
        <p className="rounded-box border border-dashed border-line px-5 py-6 text-center text-[13px] text-muted">
          ยังไม่มีใบรับรอง คอร์สที่เรียนจบในเว็บจะขึ้นที่นี่เอง ส่วนการอบรมข้างนอกกด "เพิ่มใบรับรอง" ได้เลย
        </p>
      )}
      {view && <CertViewer c={view} owner={ME.id} onClose={() => setView(null)} />}
    </section>
  );
}
