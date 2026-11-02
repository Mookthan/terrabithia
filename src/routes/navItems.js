import { PATHS } from './paths';

const ABOUT = {
  label: 'About us',
  children: [
    { label: 'Company Profile', to: PATHS.aboutProfile },
    { label: 'Vision', to: PATHS.aboutVision },
    { label: 'Mission', to: PATHS.aboutMission },
    { label: 'Clients', to: PATHS.aboutClients },
    { label: 'Products', to: PATHS.aboutProducts },
    { label: 'Services', to: PATHS.aboutServices },
  ],
};

const CULTURE = {
  label: 'Culture',
  children: [
    { label: 'Core Value', to: PATHS.cultureCoreValue },
    { label: 'Core Competency', to: PATHS.cultureCoreCompetency },
    { label: 'Our Activity', to: PATHS.cultureActivity },
  ],
};

const NEWS = { label: 'News', to: PATHS.news };

export const PUBLIC_NAV = [NEWS, ABOUT, CULTURE];

export const PRIVATE_NAV = [
  NEWS, ABOUT, CULTURE,
  { label: 'HR', to: PATHS.hr },
  { label: 'Rules', to: PATHS.rules },
  { label: 'Courses', to: PATHS.courses },
  { label: 'Knowledge', to: PATHS.knowledge },
  { label: 'Download', to: PATHS.download },
];

/** Is `item` (or one of its children) the current page? */
export function isNavActive(item, pathname) {
  const match = (to) => pathname === to || (to !== '/' && pathname.startsWith(`${to}/`));
  return item.to ? match(item.to) : item.children.some((c) => match(c.to));
}
