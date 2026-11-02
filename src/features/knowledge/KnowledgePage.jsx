import { useEffect, useRef, useState } from 'react';
import SectionBar from '@/components/ui/SectionBar';
import { useUI } from '@/context/UIContext';
import { sanitizeHTML } from '@/lib/html';
import { MY_NAME, MY_ID } from './data';
import { selSummary } from './depts';
import { linkType, MAX_FILE_MB, toAttachment } from './attachments';
import { knowledgeSession } from './store';
import Composer from './components/Composer';
import PostsPanel from './components/PostsPanel';
import PreviewModal from './components/PreviewModal';
import SubmittedModal from './components/SubmittedModal';

/** A short pause on "ส่งอนุมัติ" so sending reads as a real step before the confirmation. */
const SEND_DELAY = 900;
const DRAFT_DELAY = 500;

/** "dd/mm hh:mm AM" like the prototype's post timestamps. */
function nowStamp() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  let h = d.getHours();
  const ap = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)} ${pad(h)}:${pad(d.getMinutes())} ${ap}`;
}

export default function KnowledgePage() {
  const [posts, setPosts] = useState(knowledgeSession.posts);
  const [tab, setTab] = useState(knowledgeSession.tab);
  const [query, setQuery] = useState(knowledgeSession.query);
  const [deptSel, setDeptSel] = useState([]);
  const [share, setShare] = useState([]);
  const [shareOpen, setShareOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [subject, setSubject] = useState(knowledgeSession.draft?.subj ?? '');
  const [msg, setMsg] = useState(null);
  const [preview, setPreview] = useState(null);
  const [files, setFiles] = useState(knowledgeSession.draft?.files ?? []);
  const [link, setLink] = useState(knowledgeSession.draft?.link ?? '');
  const [composerKey, setComposerKey] = useState(0);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [draftState, setDraftState] = useState('idle');
  const [errors, setErrors] = useState({});
  const { toast } = useUI();
  const bodyRef = useRef(null);
  const sendTimer = useRef(0);
  const draftTimer = useRef(0);
  useEffect(() => () => { clearTimeout(sendTimer.current); clearTimeout(draftTimer.current); }, []);

  useEffect(() => { Object.assign(knowledgeSession, { posts, tab, query }); }, [posts, tab, query]);

  // Restore a saved draft body into the (uncontrolled) editor.
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.innerHTML = knowledgeSession.draft ? sanitizeHTML(knowledgeSession.draft.html) : '';
  }, [composerKey]);

  const openShare = (o) => { setShareOpen(o); if (o) setFilterOpen(false); };
  const openFilter = (o) => { setFilterOpen(o); if (o) setShareOpen(false); };

  const addFiles = (list) => {
    const big = list.filter((f) => f.size > MAX_FILE_MB * 1024 * 1024);
    const ok = list.filter((f) => f.size <= MAX_FILE_MB * 1024 * 1024).map(toAttachment);
    setFiles((cur) => [...cur, ...ok.filter((a) => !cur.some((c) => c.id === a.id))]);
    setMsg(big.length ? { text: `ไฟล์ใหญ่เกิน ${MAX_FILE_MB} MB: ${big.map((f) => f.name).join(', ')}`, err: true } : null);
  };
  const attach = { files, link, addFiles, setLink, removeFile: (id) => setFiles((cur) => cur.filter((f) => f.id !== id)) };

  /** The post as it will be saved; also what the preview draws. */
  const draftPost = (extra = {}) => ({
    by: MY_ID, author: MY_NAME, time: nowStamp(), subject: subject.trim(), html: sanitizeHTML(bodyRef.current?.innerHTML || ''),
    link, type: linkType(link), files, depts: [...share], status: 'pending', mine: true, ...extra,
  });

  // One draft only, kept in the composer itself (restored next visit), so there is no drafts tab.
  const saveDraft = () => {
    if (draftState === 'saving') return;
    knowledgeSession.draft = { subj: subject, html: bodyRef.current?.innerHTML || '', files, link, at: nowStamp() };
    setMsg(null); setDraftState('saving');
    clearTimeout(draftTimer.current);
    draftTimer.current = setTimeout(() => {
      setDraftState('saved');
      toast('บันทึกแบบร่างแล้ว กลับมาเขียนต่อได้ทุกเมื่อ');
      draftTimer.current = setTimeout(() => setDraftState('idle'), 2000);
    }, DRAFT_DELAY);
  };

  const discardDraft = () => {
    knowledgeSession.draft = null;
    setSubject(''); setFiles([]); setLink(''); setMsg(null); setErrors({}); setDraftState('idle');
    setComposerKey((k) => k + 1);
    toast('ลบแบบร่างแล้ว');
  };

  const showPreview = () => setPreview({ share: selSummary(share), post: draftPost() });

  const submit = () => {
    // Mark every missing field at once (red outline + hint) instead of one message at a time.
    const missing = {
      share: !share.length,
      subject: !subject.trim(),
      body: !bodyRef.current?.textContent.trim(),
    };
    setErrors(missing);
    if (missing.share || missing.subject || missing.body) { setMsg(null); return; }
    if (sending) return;
    const post = draftPost({ id: Date.now() });
    setMsg(null); setShareOpen(false); setSending(true);
    sendTimer.current = setTimeout(() => {
      setPosts((ps) => [post, ...ps]);
      knowledgeSession.draft = null;
      setFiles([]); setLink(''); setShare([]); setSubject('');
      setComposerKey((k) => k + 1); // fresh composer, like the prototype's re-render
      setSending(false); setSent(true);
    }, SEND_DELAY);
  };

  return (
    <>
      <SectionBar title="Knowledge" />
      <div className="grid grid-cols-[380px_1fr] text-[14px] items-start gap-[22px] min-[861px]:items-stretch max-[860px]:grid-cols-[minmax(0,1fr)] max-[860px]:[&>*]:min-w-0">
        <Composer
          key={composerKey}
          ref={bodyRef}
          subject={subject}
          onSubject={(v) => { setSubject(v); if (v.trim()) setErrors((e) => ({ ...e, subject: false })); }}
          share={share}
          onShare={(v) => { setShare(v); if (v.length) setErrors((e) => ({ ...e, share: false })); }}
          shareOpen={shareOpen}
          onShareOpen={openShare}
          attach={attach}
          msg={msg}
          sending={sending}
          draftState={draftState}
          savedDraft={draftState === 'saving' ? null : knowledgeSession.draft}
          onDiscardDraft={discardDraft}
          errors={errors}
          onBodyInput={() => { if (bodyRef.current?.textContent.trim()) setErrors((e) => (e.body ? { ...e, body: false } : e)); }}
          onPreview={showPreview}
          onDraft={saveDraft}
          onSubmit={submit}
        />
        <PostsPanel
          posts={posts}
          tab={tab}
          onTab={setTab}
          query={query}
          onQuery={setQuery}
          deptSel={deptSel}
          onDeptSel={setDeptSel}
          filterOpen={filterOpen}
          onFilterOpen={openFilter}
        />
      </div>
      <PreviewModal data={preview} onClose={() => setPreview(null)} />
      <SubmittedModal open={sent} onClose={() => setSent(false)} onViewPending={() => { setSent(false); setTab('pending'); }} />
    </>
  );
}
