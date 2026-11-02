// Single source of truth for URLs. Pages navigate with PATHS.* (or pathFor(key)).
export const PATHS = {
  home: '/',
  login: '/login',
  news: '/news',
  newsDetail: (id) => `/news/${id}`,
  aboutProfile: '/about/profile',
  aboutVision: '/about/vision',
  aboutMission: '/about/mission',
  aboutClients: '/about/clients',
  aboutProducts: '/about/products',
  aboutServices: '/about/services',
  cultureCoreValue: '/culture/core-value',
  cultureCoreCompetency: '/culture/core-competency',
  cultureActivity: '/culture/activity',
  activityAlbum: (index) => `/culture/activity/${index}`,
  hr: '/hr',
  /** Deep link into one HR article: group key + item index. */
  hrItem: (group, item) => `/hr?group=${group}&item=${item}`,
  /** HR home scrolled to one announcement post. */
  hrPost: (id) => `/hr?post=${id}`,
  /** Home with the calendar opened on a day (`m` 0-based) / with one green announcement highlighted. */
  homeCal: (y, m, d) => `/?cal=${y}-${m + 1}-${d}`,
  homeAnn: (id) => `/?ann=${id}`,
  rules: '/rules',
  courses: '/courses',
  knowledge: '/knowledge',
  download: '/download',
  profile: '/profile',
  /** Profile page scrolled to the leave-entitlement section. */
  profileLeave: '/profile?section=leave',
  myCards: '/my-cards',
  settings: '/settings',
  settingsNotify: '/settings?tab=notify',
  rewards: '/rewards',
};

/** Pages only visible after signing in. */
export const PRIVATE_PATHS = [
  PATHS.hr, PATHS.rules, PATHS.courses, PATHS.knowledge, PATHS.download, PATHS.profile, PATHS.myCards, PATHS.settings, PATHS.rewards,
];

export const isPrivatePath = (pathname) =>
  PRIVATE_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
