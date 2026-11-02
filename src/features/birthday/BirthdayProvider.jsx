import { createContext, useContext } from 'react';
import BirthdayOverlays from './components/BirthdayOverlays';
import useBirthdayController from './hooks/useBirthdayController';
import './birthday.css';

const BirthdayContext = createContext(null);

/**
 * Birthday books, cards and settings, available app-wide.
 * The overlays render here so `openCard('gong')` works from any page (e.g. header notifications).
 */
export function BirthdayProvider({ children }) {
  const { api, overlays } = useBirthdayController();
  return (
    <BirthdayContext.Provider value={api}>
      {children}
      <BirthdayOverlays o={overlays} />
    </BirthdayContext.Provider>
  );
}

/** `{ openCard(personId), openBook(myBookId), books, settings, toggleSetting(key) }` */
export const useBirthday = () => useContext(BirthdayContext);
