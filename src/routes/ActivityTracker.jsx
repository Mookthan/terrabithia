import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { endPage, onVisibility, startPage, track } from '@/lib/activityLog';

/** Logs page time for signed-in staff, and copy actions on sensitive pages. */
export default function ActivityTracker() {
  const { pathname } = useLocation();
  const { loggedIn } = useAuth();

  useEffect(() => {
    if (!loggedIn) return undefined;
    startPage(pathname);
    return endPage;
  }, [pathname, loggedIn]);

  useEffect(() => {
    if (!loggedIn) return undefined;
    const onCopy = () => track('copy', window.getSelection()?.toString());
    document.addEventListener('visibilitychange', onVisibility);
    document.addEventListener('copy', onCopy);
    window.addEventListener('pagehide', endPage);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      document.removeEventListener('copy', onCopy);
      window.removeEventListener('pagehide', endPage);
    };
  }, [loggedIn]);

  return null;
}
