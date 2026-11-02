import { useEffect, useRef, useState } from 'react';
import { daysUntil } from '../data';
import { occOf } from '../occasions';
import BookBar from './BookBar';
import BookClosed from './BookClosed';
import BookPile from './BookPile';
import CardReader from './CardReader';
import Confetti from './Confetti';
import CloseButton from '@/components/ui/CloseButton';

const OPEN_MS = 850;

/**
 * Full-screen birthday book for its owner: the closed book (sealed until the birthday morning),
 * which swings open onto every card heaped together; tapping a card reads it in the spotlight.
 */
export default function BookViewer({ bookId, book, cardsOpen, onClose, onHide, onRead, onReport, onUnlock }) {
  const [stage, setStage] = useState('closed'); // closed → opening → open
  const [expanded, setExpanded] = useState(false);
  const [readerId, setReaderId] = useState(null);
  const [burst, setBurst] = useState(0);
  const timer = useRef(0);
  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    if (!burst) return undefined;
    const t = setTimeout(() => setBurst(0), 2200);
    return () => clearTimeout(t);
  }, [burst]);

  const occ = occOf(book.occ);
  const days = book.due ? daysUntil(book) : 0;
  const sealed = book.locked && days > 0 && !book.opened;
  const n = book.cards.length;
  const visible = book.cards.filter((c) => !c.hidden);

  const openBook = () => {
    if (stage !== 'closed') return;
    setStage('opening');
    timer.current = setTimeout(() => {
      setStage('open');
      if (!book.archive && occ.party) setBurst(Date.now());
    }, OPEN_MS);
  };
  const demoUnlock = () => { onUnlock(bookId); setTimeout(openBook, 60); };
  const readAll = () => {
    const first = visible.find((c) => !c.read && !book.archive) || visible[0];
    if (first) setReaderId(first.id);
  };

  const title = book.archive ? `สมุดวันเกิดปี ${book.year}` : occ.k === 'birthday' ? 'สมุดวันเกิดของคุณ' : `สมุดการ์ด${occ.tab}ของคุณ`;
  let body;
  if (stage !== 'open') {
    const sub = sealed
      ? <>{`มีการ์ดจากเพื่อนๆ ${n} ใบรอคุณอยู่ · เปิดได้เช้าวันที่ ${book.dateTxt} (อีก ${days} วัน)`}{!cardsOpen && <><br /><b>ตอนนี้คุณปิดรับการ์ดใหม่จากเพื่อนอยู่</b></>}</>
      : `มีการ์ดจากเพื่อนๆ ${n} ใบ · แตะที่ปกเพื่อเปิด`;
    body = <BookClosed count={n} title={title} sub={sub} locked={sealed} opening={stage === 'opening'} onOpen={openBook} onDemoUnlock={demoUnlock} />;
  } else {
    body = <BookPile book={book} expanded={expanded} onOpen={setReaderId} onHide={onHide} onReport={onReport} />;
  }

  return (
    <div className="bd-fs fixed inset-0 z-[2000] flex flex-col overflow-hidden bg-[#E9D9B8] bg-[radial-gradient(rgba(120,90,40,.16)_1.2px,transparent_1.4px)] bg-[length:16px_16px] text-[14px]">
      <CloseButton tone="float" onClick={onClose} className="fixed right-3 top-[max(12px,env(safe-area-inset-top))] z-[2001]" />
      {stage === 'open' && (
        <BookBar
          owner={book.owner}
          title={title}
          sub={`${book.dateTxt} · การ์ดจากเพื่อน ${n} ใบ`}
          expanded={expanded}
          onReadAll={visible.length ? readAll : null}
          onToggleExpand={() => setExpanded((x) => !x)}
        />
      )}
      <div className="relative isolate flex min-h-0 flex-1 flex-col">
        {body}
        {burst ? <Confetti key={burst} className="fixed top-[35%]" /> : null}
      </div>
      {readerId && (
        <CardReader cards={visible} startId={readerId} owner={book.owner} onRead={onRead} onClose={() => setReaderId(null)} />
      )}
    </div>
  );
}
