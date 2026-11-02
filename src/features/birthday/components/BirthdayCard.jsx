import { BD_THEMES, bdNick, ME_ID, paperOf } from '../data';
import CardCover from './CardCover';
import CardSticker from './CardSticker';
import StickerIcon from './StickerIcon';
import ThemeIcon from './ThemeIcon';

const SHELL = 'relative overflow-hidden rounded-box text-left text-ink shadow-card [container-type:inline-size]';

/**
 * One birthday card ("bcard"). A card with a `cover` has two faces:
 * - `face="cover"` (default): the designed cover with `owner`'s nickname and birthday, plus a "from" chip;
 * - `face="in"`: the pastel paper inside, with the message, footer `line`, corner sticker and free stickers.
 * Older cards without a cover use a themed gradient card. `edit` enables sticker dragging (see useStickerDrag),
 * `editing` is the text sticker being typed into; `clamp` cuts a themed card's message to two lines (the book pile).
 */
export default function BirthdayCard({
  card, owner, line, face = 'cover', edit = false, selected = -1, editing = -1, onEditDone, clamp = false, className = '',
}) {
  const stickers = (card.stk || []).map((s, i) => (
    <CardSticker
      key={i} s={s} index={i} edit={edit} selected={edit && selected === i}
      editing={edit && editing === i} onEditDone={(t) => onEditDone?.(i, t)}
    />
  ));
  const corner = card.sticker ? <StickerIcon k={card.sticker} variant="corner" /> : null;

  if (card.cover && face !== 'in') {
    return (
      <div data-bcard className={`${SHELL} bg-white ${className}`}>
        <CardCover cover={card.cover} owner={owner} />
        <span className="absolute bottom-[5cqw] left-[5cqw] z-[4] max-w-[80%] truncate rounded-full bg-white/[.92] px-[max(9px,3.6cqw)] py-[max(5px,1.8cqw)] text-[max(11.5px,3.8cqw)] font-bold leading-none shadow-card">
          จาก {bdNick(card.by || ME_ID)}
        </span>
      </div>
    );
  }

  if (card.cover) {
    return (
      <div
        data-bcard
        className={`${SHELL} aspect-[760/1011] bg-[var(--pp)] before:pointer-events-none before:absolute before:inset-[3.2cqw] before:rounded-ctl before:border-[1.2px] before:border-dashed before:border-[rgba(23,63,82,.2)] before:content-[''] ${className}`}
        style={{ '--pp': paperOf(card).c }}
      >
        <div className="absolute inset-x-[11cqw] bottom-[20cqw] top-[12cqw] flex items-center justify-center overflow-hidden whitespace-pre-wrap text-center text-[5.4cqw] leading-[1.6] [word-break:break-word]">
          {card.msg || ''}
        </div>
        <div className="absolute inset-x-[11cqw] bottom-[7cqw] flex items-center justify-between gap-2 text-[3.4cqw] text-[rgba(23,63,82,.7)]">
          <span>{line}</span>
          <span className="inline-flex text-[6cqw] leading-none">{corner}</span>
        </div>
        {stickers}
      </div>
    );
  }

  const t = BD_THEMES[card.theme] || BD_THEMES[0];
  return (
    <div
      data-bcard
      className={`${SHELL} flex min-h-[170px] flex-col gap-[10px] bg-[linear-gradient(145deg,var(--b1),var(--b2))] px-[22px] pb-[18px] pt-[22px] ${className}`}
      style={{ '--b1': t.b1, '--b2': t.b2, '--ac': t.ac }}
    >
      <span className="pointer-events-none absolute -right-[6px] -top-[10px] rotate-12 text-[78px] opacity-[.22]">
        <ThemeIcon k={t.e} strokeWidth={1.5} className="!h-[78px] !w-[78px]" />
      </span>
      <div className="text-[13px] font-bold tracking-[.02em] text-[var(--ac)]">
        <ThemeIcon k={t.e} className="mr-1 !h-[15px] !w-[15px] ![vertical-align:-3px]" /> Happy Birthday
      </div>
      <div className={`relative flex-1 break-words text-[16px] leading-[1.6] [word-break:break-word] ${clamp ? 'line-clamp-2' : ''}`}>{card.msg || ''}</div>
      <div className="flex items-center justify-between gap-2 text-[13px] opacity-[.85]">
        <span>{line}</span>
        <span className="inline-flex text-[30px] leading-none">{corner}</span>
      </div>
      {stickers}
    </div>
  );
}
