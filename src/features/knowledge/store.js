import { INITIAL_POSTS, INITIAL_SOCIAL } from './data';

// The prototype kept knowledge state in globals: posts, the saved draft and the
// current tab/search survive leaving the page during the session.
export const knowledgeSession = {
  posts: INITIAL_POSTS,
  tab: 'all',
  query: '',
  draft: null, // { subj, html, files, link, at }
  social: INITIAL_SOCIAL, // post id -> { reactions, replies }
};
