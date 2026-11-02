import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { PATHS } from './paths';

/** Staff-only page that sits in the public menu: signed-out visitors go to the login page with `msg`, then come back here. */
export default function RequireLogin({ msg, children }) {
  const { loggedIn } = useAuth();
  const { pathname } = useLocation();
  return loggedIn ? children : <Navigate to={PATHS.login} replace state={{ from: pathname, msg }} />;
}
