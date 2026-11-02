import { useEffect } from 'react';
import { useUI } from '@/context/UIContext';
import { bdNick, bdPos, MAX_STICKERS, ME_NICK } from '../data';
import { occOf } from '../occasions';
import useComposer from '../hooks/useComposer';
import useStickerDrag from '../hooks/useStickerDrag';
import Avatar from './Avatar';
import BirthdayCard from './BirthdayCard';
import CoverPicker from './CoverPicker';
import FaceTabs from './FaceTabs';
import MessageField from './MessageField';
import PaperPicker from './PaperPicker';
import Sheet from './Sheet';
import StickerOps from './StickerOps';
import StickerTray from './StickerTray';
import TextToolbar from './TextToolbar';

/**
 * Overlay for writing (or editing) the card I send to a colleague's birthday (or festival) book.
 * Phones: header, live preview, then the controls. From 900px: controls on the left, the preview sticky on the right.
 * The header stays fixed while the rest scrolls.
 */
export default function CardComposer({ initial, dateTxt, onClose, onSend }) {
  const { toast } = useUI();
  const {
    draft, update, set, editing, setEditing, addSticker, addPhoto, addText, commitText, styleText, clearStickers, op,
  } = useComposer(initial, () => toast(`วางได้สูงสุด ${MAX_STICKERS} ชิ้น`));
  const onPointerDown = useStickerDrag(draft, update, setEditing);
  const o = occOf(draft.occ);
  const nick = bdNick(draft.owner);
  const selected = draft.stk[draft.sel];

  // Delete / Backspace removes the selected sticker (outside form fields and text being typed).
  useEffect(() => {
    const onKey = (e) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && draft.sel >= 0
        && !/TEXTAREA|INPUT|SELECT/.test(e.target.tagName || '') && !e.target.isContentEditable) {
        e.preventDefault();
        op('del');
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [draft.sel, op]);

  const send = () => { if (draft.msg.trim()) onSend(draft); };

  return (
    <Sheet
      onClose={onClose}
      flush
      width="w-[min(520px,100%)] min-[900px]:w-[min(960px,100%)]"
      maxH="max-h-[min(92dvh,760px)] min-[900px]:max-h-[min(92dvh,820px)]"
    >
      <div className="min-[900px]:grid min-[900px]:grid-cols-[minmax(0,1fr)_340px] min-[900px]:items-start min-[900px]:gap-x-7">
        <div className="sticky top-0 z-[4] -mx-[22px] mb-[6px] flex items-center gap-3 bg-white pb-3 pl-[22px] pr-[62px] pt-[22px] shadow-card max-[640px]:-mx-4 max-[640px]:pl-4 max-[640px]:pr-[58px] max-[640px]:pt-5 min-[900px]:col-span-2">
          <Avatar id={draft.owner} />
          <div>
            <b className="block text-[17px] text-ink">{draft.edit ? 'แก้ไขการ์ดถึง' : 'ส่งการ์ดถึง'}{nick}</b>
            <small className="text-[12.5px] text-ink opacity-65">{bdPos(draft.owner)} · {o.label}{dateTxt ? ` ${dateTxt}` : ''}</small>
          </div>
        </div>

        <div className="min-[900px]:sticky min-[900px]:top-[100px] min-[900px]:col-start-2 min-[900px]:row-start-2">
          <FaceTabs value={draft.face} onChange={(face) => set({ face, sel: -1 })} />
          <div className="mb-[2px]" onPointerDown={onPointerDown}>
            <BirthdayCard
              card={draft} owner={draft.owner} line={`จาก ${ME_NICK} → ${nick}`} face={draft.face}
              edit={draft.face === 'in'} selected={draft.sel} editing={editing} onEditDone={commitText}
            />
          </div>
          {selected?.t && <TextToolbar s={selected} onStyle={styleText} onOp={op} onEdit={() => setEditing(draft.sel)} />}
        </div>

        <div className="min-w-0 min-[900px]:col-start-1 min-[900px]:row-start-2">
          <CoverPicker keys={o.covers} birthday={o.k === 'birthday'} value={draft.cover} owner={draft.owner} onChange={(cover) => set({ cover, face: 'cover', sel: -1 })} />
          <PaperPicker value={draft.paper} onChange={(paper) => set({ paper, face: 'in' })} />
          <MessageField value={draft.msg} onChange={(msg) => set({ msg, face: 'in' })} toNick={nick} quick={o.quick} reveal={o.reveal} />
          <StickerTray stickers={o.stickers} count={draft.stk.length} onAdd={addSticker} onAddPhoto={addPhoto} onAddText={addText} onClear={clearStickers} />
          {selected && !selected.t && <StickerOps onOp={op} />}
          <button
            type="button"
            onClick={send}
            disabled={!draft.msg.trim()}
            className="mt-5 w-full cursor-pointer rounded-ctl border-0 bg-teal-bright hover:!bg-teal-hover p-[13px] text-[15px] font-semibold text-white transition-[background-color,transform] duration-200 active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-45"
          >
            {draft.edit ? 'บันทึกการ์ดของฉัน' : `ส่งการ์ดให้${nick}`}
          </button>
        </div>
      </div>
    </Sheet>
  );
}
