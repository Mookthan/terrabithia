import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { TEXT_MAX } from '../data';
import PhotoSticker from './PhotoSticker';
import StickerIcon from './StickerIcon';

/** Text sticker: fonts/bold/italic per sticker; while `editing` it is typed into directly (commits on blur). */
function StickerText({ s, editing, onEditDone }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!editing || !el) return;
    el.focus();
    const rg = document.createRange();
    rg.selectNodeContents(el);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(rg);
  }, [editing]);

  const read = () => ref.current.innerText.replace(/\u00a0/g, ' ');
  return (
    <span
      ref={ref}
      contentEditable={editing}
      suppressContentEditableWarning
      spellCheck={false}
      onInput={() => { if (read().length > TEXT_MAX) ref.current.innerText = read().slice(0, TEXT_MAX); }}
      onKeyDown={(e) => { if (e.key === 'Escape') { e.preventDefault(); ref.current.blur(); } e.stopPropagation(); }}
      onBlur={() => editing && onEditDone(read().trim())}
      className="inline-block whitespace-pre px-[.2em] py-[.1em] text-[.55em] leading-[1.1] outline-none"
      style={{ color: s.c || '#173F52', fontFamily: s.ff || 'inherit', fontWeight: s.b === 0 ? 500 : 800, fontStyle: s.i ? 'italic' : 'normal' }}
    >
      {s.t}
    </span>
  );
}

/**
 * A free-placed sticker on a card: an icon, a Terby picture, an Activity photo (`s.ph`) or text (`s.t`).
 * Icons get a die-cut white edge; text is flat ink. In edit mode it can be grabbed; the selected one shows
 * a resize/rotate handle and a delete badge. A text sticker being typed into (`editing`) hides both.
 */
export default function CardSticker({ s, index, edit, selected, editing = false, onEditDone }) {
  const look = s.t ? '' : s.ph ? 'bd-stk-photo' : 'bd-stk-diecut';
  return (
    <span
      data-stk={index}
      data-editing={editing ? '1' : undefined}
      className={`absolute z-[3] select-none leading-none [font-size:calc(var(--s,1)*10cqw)] [transform:translate(-50%,-50%)_rotate(var(--r,0deg))] ${look} ${
        edit ? 'pointer-events-auto cursor-grab touch-none p-[2px] active:cursor-grabbing' : 'pointer-events-none'
      } ${selected && !editing ? 'rounded-ctl outline-dashed outline-[1.5px] outline-offset-2 outline-teal-bright' : ''} ${
        editing ? '!cursor-text !touch-auto select-text rounded-ctl outline outline-[1.5px] outline-offset-[3px] outline-mint' : ''
      }`}
      style={{ left: `${s.x}%`, top: `${s.y}%`, '--s': s.s, '--r': `${s.r}deg` }}
    >
      {s.ph ? <PhotoSticker ph={s.ph} /> : s.t ? <StickerText key={editing ? 'edit' : 'view'} s={s} editing={editing} onEditDone={onEditDone} /> : <StickerIcon k={s.e} />}
      {selected && !editing && (
        <>
          <b
            data-del="1"
            role="button"
            aria-label="ลบสติกเกอร์"
            className="absolute -left-3 -top-3 z-[5] grid h-[26px] w-[26px] cursor-pointer touch-none place-items-center rounded-full border-2 border-white bg-[#F0515B] text-white shadow-card [transform:rotate(calc(var(--r,0deg)*-1))] after:absolute after:-inset-2 after:content-['']"
          >
            <X className="h-3 w-3" strokeWidth={3.2} aria-hidden="true" />
          </b>
          <b
            data-h="1"
            className="absolute -bottom-3 -right-3 h-5 w-5 cursor-nwse-resize touch-none rounded-full border-2 border-white bg-teal-bright text-[0] shadow-card [transform:rotate(calc(var(--r,0deg)*-1))] after:absolute after:inset-1 after:border-b-2 after:border-r-2 after:border-white after:content-[''] after:[transform:scale(.55)_translate(-1px,-1px)]"
          />
        </>
      )}
    </span>
  );
}
