import { useEffect, useState } from 'react';
import SectionBar from '@/components/ui/SectionBar';
import { track } from '@/lib/activityLog';
import RevealText from '@/components/ui/RevealText';
import ProductHero from './components/products/ProductHero';
import GlassCard from './components/products/GlassCard';
import PartnerCard from './components/products/PartnerCard';
import RuamitrView from './components/products/RuamitrView';
import { GLASS_PRODUCTS, PARTNERS } from './data';

export default function ProductsPage() {
  const [view, setView] = useState('main');
  const [entered, setEntered] = useState(false);

  useEffect(() => { if (entered) window.scrollTo(0, 0); }, [view, entered]);
  const show = (v) => { track('product', v === 'main' ? 'หน้ารวม' : 'Ruamitr'); setEntered(true); setView(v); };

  if (view === 'ruamitr') {
    return (
      <>
        <SectionBar section="About us" title="Products" />
        <RuamitrView onBack={() => show('main')} />
      </>
    );
  }

  return (
    <>
      <SectionBar section="About us" title="Products" flush />
      {/* Maxar family intro above the video hero, before drilling into each product (mook 2026-10-29). */}
      <div className="mx-auto max-w-[760px] py-9 text-center max-[600px]:py-6">
        <RevealText
          as="h2"
          className="text-[24px] font-bold leading-[1.45] text-ink max-[600px]:text-[18px]"
          text="ผลิตภัณฑ์กลุ่ม Maxar ที่พัฒนาขึ้นเพื่อสนับสนุนการทำงานด้าน Contact Center และ Customer Service ในหลากหลายมิติ"
        />
      </div>
      <ProductHero onOpenRuamitr={() => show('ruamitr')} />
      <div className="mb-[46px] grid grid-cols-3 gap-[22px] max-[860px]:mx-auto max-[860px]:max-w-[460px] max-[860px]:grid-cols-1">
        {GLASS_PRODUCTS.map((g) => <GlassCard key={g.wm} product={g} />)}
      </div>
      <RevealText as="h2" className="mb-[18px] block text-[22px] font-bold text-ink" text="Our Partnered Products" />
      <div className="grid grid-cols-3 gap-[22px] max-[860px]:grid-cols-2 max-[560px]:grid-cols-1">
        {PARTNERS.map((p) => (
          <PartnerCard key={p.k} partner={p} />
        ))}
      </div>
    </>
  );
}
