import { useAuth } from '@/context/AuthContext';
import HomeDashboard from './components/HomeDashboard';
import HomePublic from './components/HomePublic';

/** "/": dashboard when signed in, public news hero + latest news otherwise. */
export default function HomePage() {
  const { loggedIn } = useAuth();
  return loggedIn ? <HomeDashboard /> : <HomePublic />;
}
