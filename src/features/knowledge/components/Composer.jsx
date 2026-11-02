import { forwardRef, useEffect, useRef, useState } from 'react';
import { ChevronDown, FilePen } from 'lucide-react';
import { MY_ID } from '../data';
import Avatar from './Avatar';
import ShareSelect from './ShareSelect';
import RichEditor from './RichEditor';
import ComposerActions from './ComposerActions';
import { FieldHint } from '../fieldError';

/**
 * Post composer (lime card). It starts folded into a single bar (every screen size, mook 2026-10-28)
 * and unfolds when tapped; the bar shows a "แบบร่าง" badge when it was closed with unsent text.
 */
const Composer = forwardRef(function Composer(
  { subject, onSubject, share, onShare, shareOpen, onShareOpen, attach, msg, sending, draftState, savedDraft, onDiscardDraft, errors = {}, onBodyInput, onPreview, onDraft, onSubmit },
  bodyRef,
) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false); // fold animation finished → allow dropdown overflow
  const [hasDraft, setHasDraft] = useState(Boolean(savedDraft));
  const timer = useRef(0);
  useEffect(() => () => clearTimeout(timer.current), []);

  const toggle = () => {
    const next = !open;
    clearTimeout(timer.current);
    setOpen(next);
    setDone(false);
    if (next) timer.current = setTimeout(() => setDone(true), 430);
    else {
      onShareOpen(false);
      const body = (bodyRef.current?.textContent || '').trim();
      setHasDraft(Boolean(subject.trim() || body));
    }
  };

  return (
    <div className="self-start overflow-visible rounded-box bg-[#D9E8A5] shadow-card">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        className="flex w-full items-center gap-3 border-0 bg-transparent px-4 py-3 text-left text-[14.5px] text-[#4d6a58] min-[861px]:px-5"
      >
        <Avatar id={MY_ID} />
        <span
          className={`min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap rounded-box py-2.5 pr-4 ${
            open ? 'bg-transparent pl-0 font-semibold text-ink' : 'bg-white pl-4 text-muted'
          }`}
        >
          แชร์ความรู้ให้ทีม…
        </span>
        {hasDraft && <span className="rounded-ctl bg-teal-hover px-2 py-0.5 text-[11px] text-white">แบบร่าง</span>}
        <ChevronDown className={`lc !h-5 !w-5 text-teal-bright transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div
        className={`grid transition-[grid-template-rows,visibility] duration-[var(--acc-dur)] ease-[var(--acc-ease)] motion-reduce:transition-none ${
          open ? 'visible grid-rows-[1fr]' : 'invisible grid-rows-[0fr]'
        }`}
      >
        <div
          className={`min-h-0 px-4 min-[861px]:px-5 ${open ? 'pb-4 min-[861px]:pb-5' : ''} ${open && done ? 'overflow-visible' : 'overflow-hidden'}`}
        >
          {/* The saved draft lives right here in the composer; this bar says so and lets it be thrown away. */}
          {savedDraft && (
            <div className="mb-3 flex items-center gap-2 rounded-ctl bg-white/70 py-1.5 pl-3 pr-1.5 text-[12.5px] text-ink">
              <FilePen className="lc !h-4 !w-4 flex-none text-teal-hover" aria-hidden="true" />
              <span className="min-w-0 flex-1">
                <b className="font-semibold">แบบร่างที่บันทึกไว้</b>
                <span className="text-muted">{` · ${savedDraft.at}`}</span>
              </span>
              <button type="button" onClick={onDiscardDraft} className="flex-none rounded-ctl px-2 py-1 text-[12px] text-muted transition-colors hover:bg-teal-veil hover:text-ink">
                ลบแบบร่าง
              </button>
            </div>
          )}
          <div className="mb-1.5 text-[13px] text-ink"><span className="text-[#D93A44]" aria-hidden="true">*</span> แชร์ไปยัง</div>
          <ShareSelect sel={share} onChange={onShare} open={shareOpen} onOpenChange={onShareOpen} invalid={errors.share} />
          <FieldHint text={errors.share && 'กรุณาเลือกแผนก/ทีมที่ต้องการแชร์ไปยัง'} />
          <RichEditor ref={bodyRef} subject={subject} onSubject={onSubject} attach={attach} errors={errors} onBodyInput={onBodyInput} />
          <FieldHint text={[errors.subject && 'กรุณาใส่หัวข้อ', errors.body && 'กรุณาพิมพ์ข้อความ'].filter(Boolean).join(' และ')} />
          <div className={`mx-0.5 mt-2.5 min-h-[18px] text-[12px] ${msg?.err ? 'text-ink' : 'text-[#1f6b3a]'}`}>{msg?.text}</div>
          <ComposerActions onPreview={onPreview} onDraft={onDraft} onSubmit={onSubmit} sending={sending} draftState={draftState} />
        </div>
      </div>
    </div>
  );
});

export default Composer;
