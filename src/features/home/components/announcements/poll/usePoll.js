import { useCallback, useEffect, useState } from 'react';

// My votes per poll id, kept in this browser (the real site stores them per user).
const KEY = 'tbPollVotes';
const EVENT = 'tb-poll-vote';
const read = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } };

/** Time left until `end` as "x วัน / ชั่วโมง / นาที"; null once closed. */
export function timeLeft(end) {
  const ms = end - Date.now();
  if (ms <= 0) return null;
  const d = Math.floor(ms / 86400000);
  if (d >= 1) return `${d} วัน`;
  const h = Math.floor(ms / 3600000);
  return h >= 1 ? `${h} ชั่วโมง` : `${Math.max(1, Math.ceil(ms / 60000))} นาที`;
}

/** Poll state shared by every copy of the same poll on the page (home card and "ประกาศทั้งหมด"). */
export default function usePoll(poll) {
  const [mine, setMine] = useState(() => read()[poll.id] || null);

  useEffect(() => {
    const sync = () => setMine(read()[poll.id] || null);
    window.addEventListener(EVENT, sync);
    return () => window.removeEventListener(EVENT, sync);
  }, [poll.id]);

  const vote = useCallback((optId) => {
    try { localStorage.setItem(KEY, JSON.stringify({ ...read(), [poll.id]: optId })); } catch { /* storage blocked */ }
    setMine(optId);
    window.dispatchEvent(new Event(EVENT));
  }, [poll.id]);

  const counts = poll.opts.map((o) => o.n + (mine === o.id ? 1 : 0));
  const total = counts.reduce((s, n) => s + n, 0);
  const left = timeLeft(poll.end);
  const top = Math.max(...counts);
  const winners = left ? [] : poll.opts.filter((_, i) => counts[i] === top && top > 0).map((o) => o.id);
  return { mine, vote, counts, total, left, closed: !left, winners };
}
