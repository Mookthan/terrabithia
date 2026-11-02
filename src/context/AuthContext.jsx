import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);
const KEY = 'tbLoggedIn';

const readSession = () => {
  try { return sessionStorage.getItem(KEY) === '1'; } catch { return false; }
};
const writeSession = (v) => {
  try { v ? sessionStorage.setItem(KEY, '1') : sessionStorage.removeItem(KEY); } catch { /* storage unavailable */ }
};

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(readSession);

  const login = useCallback(() => { writeSession(true); setLoggedIn(true); }, []);
  const logout = useCallback(() => { writeSession(false); setLoggedIn(false); }, []);

  const value = useMemo(() => ({ loggedIn, login, logout }), [loggedIn, login, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
