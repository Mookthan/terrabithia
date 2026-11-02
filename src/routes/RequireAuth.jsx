import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { PATHS } from './paths';

/** Private pages bounce signed-out visitors to the public home page. */
export default function RequireAuth({ children }) {
  const { loggedIn } = useAuth();
  return loggedIn ? children : <Navigate to={PATHS.home} replace />;
}
