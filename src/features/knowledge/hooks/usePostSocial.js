import { useEffect, useState } from 'react';
import { knowledgeSession } from '../store';
import { MY_ID, MY_NAME } from '../data';

const EMPTY = { reactions: {}, replies: [] };
const now = () => {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const h = d.getHours();
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)} ${pad(h % 12 || 12)}:${pad(d.getMinutes())} ${h < 12 ? 'AM' : 'PM'}`;
};

/** Reactions and thread replies of one post; kept in the session store so they survive leaving the page. */
export default function usePostSocial(postId) {
  const [social, setSocial] = useState(() => knowledgeSession.social[postId] || EMPTY);
  useEffect(() => { knowledgeSession.social = { ...knowledgeSession.social, [postId]: social }; }, [postId, social]);

  /** Toggle my reaction: one emoji per person, like Teams. */
  const react = (emoji) => setSocial((s) => {
    const had = s.reactions[emoji]?.includes(MY_NAME);
    const reactions = {};
    Object.entries(s.reactions).forEach(([e, names]) => {
      const rest = names.filter((n) => n !== MY_NAME);
      if (rest.length) reactions[e] = rest;
    });
    if (!had) reactions[emoji] = [...(reactions[emoji] || []), MY_NAME];
    return { ...s, reactions };
  });

  const reply = (text) => setSocial((s) => ({
    ...s,
    replies: [...s.replies, { id: Date.now(), by: MY_ID, author: MY_NAME, time: now(), text }],
  }));

  return { ...social, react, reply };
}
