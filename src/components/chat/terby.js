/** Open the Terby chat from anywhere (e.g. the profile menu's "ช่วยเหลือ"). ChatWidget listens for it. */
export const TERBY_OPEN = 'terby:open';
export const openTerby = () => window.dispatchEvent(new Event(TERBY_OPEN));
