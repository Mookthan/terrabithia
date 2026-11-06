import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Download } from 'lucide-react';
import { ORG_PEOPLE } from '@/data/org';
import { ME } from '@/data/me';
import { portalTarget } from '@/lib/portalTarget';
import CloseButton from '@/components/ui/CloseButton';
import { certDate } from '../certStore';

const fullName = (id) => (id === ME.id ? ME.fullName : ORG_PEOPLE[id]?.name || '');

/**
 * Stand-in certificate drawn from the record, until real scans come from the back end
 * (a certificate added with an image file shows that image instead). Kept in Thai as a document (data-nt).
 */
export function CertPaper({ c, owner, svgRef }) {
  return (
    <svg ref={svgRef} data-nt viewBox="0 0 1000 707" xmlns="http://www.w3.org/2000/svg" className="block h-auto w-full rounded-ctl bg-white" role="img" aria-label={c.title}>
      <rect width="1000" height="707" fill="#FBF8F0" />
      <rect x="22" y="22" width="956" height="663" fill="none" stroke="#27AE97" strokeWidth="6" />
      <rect x="40" y="40" width="920" height="627" fill="none" stroke="#1C3A5C" strokeWidth="1.5" />
      <text x="500" y="140" textAnchor="middle" fontFamily="DM Serif Display, serif" fontSize="58" fill="#1C3A5C" letterSpacing="6">CERTIFICATE</text>
      <text x="500" y="182" textAnchor="middle" fontFamily="Sarabun, sans-serif" fontSize="22" fill="#12986F" letterSpacing="4">OF COMPLETION</text>
      <text x="500" y="252" textAnchor="middle" fontFamily="Sarabun, sans-serif" fontSize="22" fill="#5b6b68">ใบรับรองนี้มอบให้แก่</text>
      <text x="500" y="322" textAnchor="middle" fontFamily="Sarabun, sans-serif" fontSize="46" fontWeight="700" fill="#1C3A5C">{fullName(owner)}</text>
      <line x1="270" y1="346" x2="730" y2="346" stroke="#D7E6DD" strokeWidth="2" />
      <text x="500" y="398" textAnchor="middle" fontFamily="Sarabun, sans-serif" fontSize="22" fill="#5b6b68">เพื่อแสดงว่าได้ผ่านหลักสูตร</text>
      <text x="500" y="450" textAnchor="middle" fontFamily="Sarabun, sans-serif" fontSize={c.title.length > 34 ? 28 : 34} fontWeight="700" fill="#12986F">{c.title}</text>
      <text x="230" y="590" textAnchor="middle" fontFamily="Sarabun, sans-serif" fontSize="22" fontWeight="600" fill="#1C3A5C">{c.issuer}</text>
      <line x1="120" y1="606" x2="340" y2="606" stroke="#1C3A5C" strokeWidth="1.2" />
      <text x="230" y="632" textAnchor="middle" fontFamily="Sarabun, sans-serif" fontSize="17" fill="#5b6b68">ผู้ออกใบรับรอง</text>
      <text x="770" y="590" textAnchor="middle" fontFamily="Sarabun, sans-serif" fontSize="22" fontWeight="600" fill="#1C3A5C">{certDate(c)}</text>
      <line x1="660" y1="606" x2="880" y2="606" stroke="#1C3A5C" strokeWidth="1.2" />
      <text x="770" y="632" textAnchor="middle" fontFamily="Sarabun, sans-serif" fontSize="17" fill="#5b6b68">วันที่ได้รับ</text>
      <circle cx="500" cy="580" r="54" fill="#27AE97" />
      <circle cx="500" cy="580" r="44" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="4 5" />
      <path d="M500 548l9 19 21 3-15 15 4 21-19-10-19 10 4-21-15-15 21-3z" fill="#fff" />
    </svg>
  );
}

/**
 * Big view of one certificate (mook 2026-11-05). Everyone can look; only the owner gets the download button.
 * A photo viewer, so it may open over the Org Chart card.
 */
export default function CertViewer({ c, owner, onClose }) {
  const svgRef = useRef(null);
  const mine = owner === ME.id;
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') { e.stopPropagation(); onClose(); } };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [onClose]);

  const download = () => {
    if (c.src) {
      const a = document.createElement('a'); a.href = c.src; a.download = c.file || `${c.title}.png`; a.click();
      return;
    }
    const xml = new XMLSerializer().serializeToString(svgRef.current);
    const url = URL.createObjectURL(new Blob([xml], { type: 'image/svg+xml' }));
    const a = document.createElement('a'); a.href = url; a.download = `${c.title}.svg`; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return createPortal(
    <div
      role="dialog"
      aria-label={c.title}
      className="ann-fade fixed inset-0 z-[3200] flex flex-col items-center justify-center gap-4 bg-[rgba(10,24,30,.88)] px-4 py-14"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <CloseButton tone="float" onClick={onClose} className="absolute right-[14px] top-[14px]" />
      <div className="w-full max-w-[920px] shadow-pop">
        {c.src ? <img src={c.src} alt={c.title} className="block max-h-[75vh] w-full rounded-ctl bg-white object-contain" /> : <CertPaper c={c} owner={owner} svgRef={svgRef} />}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center text-[13px] text-white">
        <span><b>{c.title}</b>{` · ${c.issuer} · ${certDate(c)}`}</span>
        {mine && (
          <button type="button" onClick={download} className="inline-flex items-center gap-1.5 rounded-ctl bg-mint px-4 py-2 text-[13px] font-semibold text-teal-hover transition-colors hover:bg-white">
            <Download className="lc !h-4 !w-4" aria-hidden="true" /> ดาวน์โหลด
          </button>
        )}
      </div>
    </div>,
    portalTarget(),
  );
}
