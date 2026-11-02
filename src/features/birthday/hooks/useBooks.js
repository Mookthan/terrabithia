import { useCallback, useMemo, useReducer } from 'react';
import { createBooks, ME_ID } from '../data';
import { createOccasionBooks } from '../occasions';

const createAll = () => ({ ...createBooks(), ...createOccasionBooks() });

const mapCards = (state, bookId, fn) => {
  const b = state[bookId];
  return b ? { ...state, [bookId]: { ...b, cards: fn(b.cards) } } : state;
};

function reducer(state, a) {
  switch (a.type) {
    case 'send':
      return mapCards(state, a.bookId, (cards) => {
        const ix = cards.findIndex((c) => c.by === ME_ID);
        if (ix < 0) return [...cards, a.card];
        return cards.map((c, i) => (i === ix ? { ...a.card, id: c.id } : c));
      });
    case 'hide':
      return mapCards(state, a.bookId, (cards) => cards.map((c) => (c.id === a.cardId ? { ...c, hidden: !c.hidden } : c)));
    case 'report':
      return mapCards(state, a.bookId, (cards) => cards.map((c) => (c.id === a.cardId ? { ...c, hidden: true, reported: true } : c)));
    case 'read':
      return mapCards(state, a.bookId, (cards) => cards.map((c) => (c.id === a.cardId && !c.read ? { ...c, read: true } : c)));
    case 'unlock':
      return { ...state, [a.bookId]: { ...state[a.bookId], opened: true } };
    default:
      return state;
  }
}

/** Everyone's birthday and occasion books, and the actions that change them. */
export default function useBooks() {
  const [books, dispatch] = useReducer(reducer, undefined, createAll);
  const sendCard = useCallback((bookId, card) => dispatch({ type: 'send', bookId, card }), []);
  const toggleHidden = useCallback((bookId, cardId) => dispatch({ type: 'hide', bookId, cardId }), []);
  const reportCard = useCallback((bookId, cardId) => dispatch({ type: 'report', bookId, cardId }), []);
  const markRead = useCallback((bookId, cardId) => dispatch({ type: 'read', bookId, cardId }), []);
  const unlock = useCallback((bookId) => dispatch({ type: 'unlock', bookId }), []);
  return useMemo(() => ({ books, sendCard, toggleHidden, reportCard, markRead, unlock }), [books, sendCard, toggleHidden, reportCard, markRead, unlock]);
}
