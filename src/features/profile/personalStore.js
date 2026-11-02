// The signed-in user's personal fields, shared by the profile box and their org-chart card (module level, like albumStore).
import { useSyncExternalStore } from 'react';
import { PERSONAL_FIELDS } from './data';

let values = Object.fromEntries(PERSONAL_FIELDS.map((f) => [f.k, f.v]));
const listeners = new Set();
const subscribe = (l) => { listeners.add(l); return () => listeners.delete(l); };

export const usePersonalValues = () => useSyncExternalStore(subscribe, () => values);
export function setPersonalValues(next) {
  values = next;
  listeners.forEach((l) => l());
}

/** Optional fields the user hid from their Org Chart card ({ edu, interests, social, skills }: true = hidden). */
let orgHidden = {};
export const useOrgHidden = () => useSyncExternalStore(subscribe, () => orgHidden);
export const orgHiddenNow = () => orgHidden;
export function setOrgHidden(next) {
  orgHidden = next;
  listeners.forEach((l) => l());
}
