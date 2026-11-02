import { bdNick } from '../data';
import PileCard from './PileCard';

/** The open book: every card at once, heaped loosely on the page. Messages show two lines until `expanded`. */
export default function BookPile({ book, expanded, onOpen, onHide, onReport }) {
  if (!book.cards.length) {
    return (
      <div className="m-auto px-6 text-center text-ink">
        <b className="block text-[18px]">ยังไม่มีการ์ดในสมุดเล่มนี้</b>
        <span className="text-[14px] opacity-70">เมื่อเพื่อนส่งการ์ดถึง{bdNick(book.owner)} จะมาอยู่ตรงนี้</span>
      </div>
    );
  }

  return (
    <div className="min-h-0 flex-1 overflow-auto px-6 pb-20 pt-10 max-[640px]:px-4 max-[640px]:pt-7">
      <div
        className={`mx-auto grid max-w-[1040px] gap-x-3 gap-y-0 ${
          expanded ? 'grid-cols-[repeat(auto-fill,minmax(300px,1fr))] max-[640px]:grid-cols-1' : 'grid-cols-[repeat(auto-fill,minmax(220px,1fr))] max-[640px]:grid-cols-2 max-[640px]:gap-x-2'
        }`}
      >
        {book.cards.map((c, i) => (
          <PileCard
            key={c.id}
            card={c}
            index={i}
            owner={book.owner}
            archive={book.archive}
            clamp={!expanded}
            onOpen={() => onOpen(c.id)}
            onHide={() => onHide(c.id)}
            onReport={() => onReport(c)}
          />
        ))}
      </div>
    </div>
  );
}
