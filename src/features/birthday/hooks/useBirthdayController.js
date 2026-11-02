import { useCallback, useEffect, useMemo, useState } from 'react';
import { useUI } from '@/context/UIContext';
import { earn } from '@/features/rewards/coinStore';
import { bdNick, ME_ID } from '../data';
import { occOf } from '../occasions';
import useBodyLock from '@/hooks/useBodyLock';
import useBooks from './useBooks';
import { draftFor } from './useComposer';

/**
 * Everything behind the birthday feature: books, privacy settings,
 * and which overlay (my book / card composer / report dialog) is open.
 */
export default function useBirthdayController() {
  const { books, sendCard: saveCard, toggleHidden, reportCard, markRead, unlock } = useBooks();
  const { toast } = useUI();
  const [settings, setSettings] = useState({ open: true, listed: true });
  const [bookId, setBookId] = useState(null);
  const [composer, setComposer] = useState(null);
  const [report, setReport] = useState(null);

  /** Only the owner can open a book (this year's sealed one or a past year). */
  const openBook = useCallback((id) => {
    if (books[id]?.owner === ME_ID) setBookId(id);
  }, [books]);
  const closeBook = useCallback(() => setBookId(null), []);

  const openCard = useCallback((id) => {
    const b = books[id];
    if (!b || b.archive || b.owner === ME_ID) return;
    setComposer({ key: Date.now(), initial: draftFor(id, b), dateTxt: b.dateTxt });
  }, [books]);
  const closeCard = useCallback(() => setComposer(null), []);

  const sendCard = useCallback((d) => {
    const b = books[d.to];
    if (!b || !d.msg.trim()) return;
    const existing = b.cards.find((c) => c.by === ME_ID);
    const o = occOf(b.occ);
    const nick = bdNick(b.owner);
    saveCard(d.to, {
      id: existing ? existing.id : `m${Date.now()}`, by: ME_ID, cover: d.cover, paper: d.paper, theme: d.theme, msg: d.msg.trim(), sticker: d.sticker,
      stk: d.stk.map((k) => ({ ...k })), date: 'วันนี้',
    });
    // Birthday and festival cards earn coins (once per person per occasion).
    if (!existing && o.k === 'birthday') earn('card', d.to);
    else if (!existing && o.due) earn('festivalCard', d.to);
    setComposer(null);
    toast(existing ? `บันทึกการ์ดแล้ว · ${nick}จะเห็น${o.reveal}` : `ส่งการ์ดให้${nick}แล้ว · เป็นความลับจนถึง${o.reveal.replace('เมื่อถึง', '')}`);
  }, [books, saveCard, toast]);

  const hideCard = useCallback((cardId) => toggleHidden(bookId, cardId), [bookId, toggleHidden]);
  const readCard = useCallback((cardId) => markRead(bookId, cardId), [bookId, markRead]);
  const sendReport = useCallback((cardId) => {
    reportCard(bookId, cardId);
    setReport(null);
  }, [bookId, reportCard]);

  const toggleSetting = useCallback((k) => setSettings((s) => ({ ...s, [k]: !s[k] })), []);

  // Escape closes the top-most overlay only.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      if (report) setReport(null);
      else if (composer) setComposer(null);
      else if (bookId) closeBook();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [report, composer, bookId, closeBook]);

  useBodyLock(!!(bookId || composer));

  const api = useMemo(() => ({ books, settings, toggleSetting, openBook, openCard }), [books, settings, toggleSetting, openBook, openCard]);
  const overlays = {
    book: bookId ? books[bookId] : null, bookId, settings, composer, report,
    closeBook, closeCard, sendCard, hideCard, readCard, unlock, openReport: setReport, closeReport: () => setReport(null), sendReport,
  };
  return { api, overlays };
}
