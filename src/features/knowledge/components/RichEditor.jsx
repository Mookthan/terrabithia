import { forwardRef } from 'react';
import '../knowledge.css';
import { useLang } from '@/context/LangContext';
import AttachMenu from './AttachMenu';
import AttachList from './AttachList';

const FORMATS = [
  ['bold', <b key="b">B</b>],
  ['italic', <i key="i">I</i>],
  ['underline', <u key="u">U</u>],
  ['strikeThrough', <s key="s">ab</s>],
  ['subscript', <span key="sub">x<sub>2</sub></span>],
  ['superscript', <span key="sup">x<sup>2</sup></span>],
];

/**
 * Subject line + contenteditable body with a small formatting toolbar, then the attachments.
 * The body is uncontrolled (read through `bodyRef`); its HTML is sanitised before use.
 */
const RichEditor = forwardRef(function RichEditor({ subject, onSubject, onBodyInput, attach, errors = {} }, bodyRef) {
  const { t } = useLang();
  const fmt = (cmd) => {
    if (!bodyRef.current) return;
    bodyRef.current.focus();
    document.execCommand(cmd, false, null);
    onBodyInput?.();
  };
  return (
    <div className="mt-3 overflow-hidden rounded-ctl bg-white">
      <input
        value={subject}
        onChange={(e) => onSubject(e.target.value)}
        placeholder="* หัวข้อ"
        aria-required="true"
        aria-invalid={errors.subject || undefined}
        className="w-full border-0 border-b border-solid border-[#eee] bg-white px-3.5 py-[13px] text-[13.5px] text-ink outline-none placeholder:text-faint"
      />
      <div className="flex gap-0.5 border-b border-[#eee] px-2 py-1.5">
        {FORMATS.map(([cmd, face]) => (
          <button
            key={cmd}
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => fmt(cmd)}
            className="h-7 w-[30px] rounded-ctl text-[13px] text-ink"
          >
            {face}
          </button>
        ))}
      </div>
      <div
        ref={bodyRef}
        data-nt
        contentEditable
        suppressContentEditableWarning
        onInput={onBodyInput}
        data-ph={t('* ข้อความ')}
        role="textbox"
        aria-multiline="true"
        aria-required="true"
        aria-invalid={errors.body || undefined}
        className="kn-editor min-h-[200px] px-3.5 py-3 text-[13.5px] leading-[1.7] outline-none max-[860px]:min-h-[140px]"
      />
      <AttachList files={attach.files} link={attach.link} onRemoveFile={attach.removeFile} onRemoveLink={() => attach.setLink('')} />
      <AttachMenu hasLink={Boolean(attach.link)} onFiles={attach.addFiles} onLink={attach.setLink} />
    </div>
  );
});

export default RichEditor;
