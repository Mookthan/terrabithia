import { useMemo, useState } from 'react';
import SectionBar from '@/components/ui/SectionBar';
import Tabs from '@/components/ui/Tabs';
import { useBirthday } from './BirthdayProvider';
import { ME_ID } from './data';
import BookButton from './components/BookButton';
import PrivacySettings from './components/PrivacySettings';
import SentCardsGrid from './components/SentCardsGrid';


/** "My birthday book": privacy settings, my books (one card per page), and the cards I sent to friends. */
export default function MyCardsPage() {
  const { books, settings, toggleSetting, openBook, openCard } = useBirthday();
  const [tab, setTab] = useState('in');

  const sent = useMemo(() => {
    const out = [];
    Object.keys(books).forEach((k) => books[k].cards.forEach((c) => {
      if (c.by === ME_ID && !books[k].archive) out.push({ k, c, owner: books[k].owner, occ: books[k].occ });
    }));
    return out;
  }, [books]);
  const past = books.mook25;
  const now = books.mook;

  return (
    <>
      <SectionBar section="Profile" title="สมุดวันเกิดของฉัน" />
      <div className="mx-auto max-w-[1000px] text-[14px]">
        <PrivacySettings settings={settings} onToggle={toggleSetting} />
        <div className="mb-[22px] max-[640px]:[&>div]:flex max-[640px]:[&>div]:w-full max-[640px]:[&_button]:flex-1">
          <Tabs onCream items={[{ k: 'in', label: 'สมุดของฉัน' }, { k: 'out', label: `การ์ดที่ฉันส่งให้เพื่อน (${sent.length})` }]} value={tab} onChange={setTab} />
        </div>
        {tab === 'in' ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
            <BookButton
              year={past.year}
              title={`สมุดวันเกิดปี ${past.year}`}
              sub={`${past.dateTxt} · การ์ด ${past.cards.length} ใบจากเพื่อนๆ`}
              go="เปิดอ่าน"
              onClick={() => openBook('mook25')}
            />
            <BookButton
              locked
              year="2569"
              title="สมุดวันเกิดปีนี้"
              sub={`เปิดได้เช้าวันที่ ${now.dateTxt} · มีการ์ดรอแล้ว ${now.cards.length} ใบ`}
              go="ดู"
              onClick={() => openBook('mook')}
            />
          </div>
        ) : (
          <SentCardsGrid items={sent} onEdit={openCard} />
        )}
      </div>
    </>
  );
}
