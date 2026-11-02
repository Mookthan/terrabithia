import { useMemo } from 'react';
import { ORG_PEOPLE } from '@/data/org';
import { daysUntil, BD_OPTOUT, BD_TEAM, BDIR, bdDept, bdNick, ME_ID } from '../data';
import { occBookId } from '../occasions';

const matches = (id, q) => {
  const p = ORG_PEOPLE[id] || {};
  return `${bdNick(id)} ${p.name || ''} ${p.nick || ''} ${bdDept(id)}`.toLowerCase().includes(q);
};

/**
 * Rows for the home card box on one occasion tab, as `{ id: bookId, book }`, filtered by scope and search:
 * birthdays soonest first; a festival lists my own book first, then everyone.
 */
export default function useUpcomingBirthdays(books, scope, query, occ = 'birthday') {
  return useMemo(() => {
    if (!occ) return []; // festival tab with nothing in season
    const q = query.trim().toLowerCase();
    const people = (ids) => (q ? ids.filter((id) => matches(id, q)) : ids);
    const team = scope === 'team' && !q ? BD_TEAM : BDIR.map((x) => x.id);

    if (occ !== 'birthday') {
      return people(team)
        .map((id) => ({ id: occBookId(occ, id), book: books[occBookId(occ, id)] }))
        .filter((x) => x.book)
        .sort((a, b) => (b.book.owner === ME_ID) - (a.book.owner === ME_ID));
    }
    return people(team)
      .filter((id) => !BD_OPTOUT[id])
      .map((id) => ({ id, book: books[id] }))
      .filter((x) => x.book && daysUntil(x.book) >= 0)
      .sort((a, b) => daysUntil(a.book) - daysUntil(b.book));
  }, [books, scope, query, occ]);
}
