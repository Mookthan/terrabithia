import { INITIAL_REVIEWS } from './data';

// The prototype kept course state in globals for the whole session, so
// favourites, searches and posted reviews survive leaving the page.
export const courseSession = {
  query: { my: '', all: '' },
  filter: { my: 'all', all: { type: 'all', cats: [], fav: false } },
  favs: [],
  reviews: INITIAL_REVIEWS,
};
