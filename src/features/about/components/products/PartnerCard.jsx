import { ArrowUpRight } from 'lucide-react';
import { PROD_ASSETS } from '../../data';
import '../../about.css';

/** Partner logo tile that opens the partner's website in a new tab, with a description underneath. */
export default function PartnerCard({ partner }) {
  return (
    <div>
      <a
        data-reveal
        href={partner.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${partner.name} (เปิดแท็บใหม่)`}
        className="prod-pcard group/pc relative flex h-[210px] cursor-pointer items-center justify-center overflow-hidden rounded-box bg-[#FAFCF2] shadow-card outline-none"
        data-cursor="ไปที่เว็บไซต์"
        data-cursor-icon="go"
      >
        <img src={PROD_ASSETS[partner.k]} alt={partner.name} className="max-h-[62%] max-w-[82%] object-contain mix-blend-multiply transition-transform duration-700 ease-[cubic-bezier(.19,1,.22,1)] group-hover/pc:scale-110" />
        <div className="prod-scrim">
          <span className="prod-pplay !pl-0">
            <ArrowUpRight className="lc" />
          </span>
        </div>
      </a>
      <p className="mt-4 text-xs leading-[1.7] text-ink">{partner.desc}</p>
    </div>
  );
}
