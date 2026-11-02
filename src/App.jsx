import { lazy } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { LangProvider } from '@/context/LangContext';
import { UIProvider } from '@/context/UIContext';
import { BirthdayProvider } from '@/features/birthday/BirthdayProvider';
import Layout from '@/components/layout/Layout';
import RequireAuth from '@/routes/RequireAuth';
import RequireLogin from '@/routes/RequireLogin';
import ScrollToTop from '@/routes/ScrollToTop';
import ActivityTracker from '@/routes/ActivityTracker';

const HomePage = lazy(() => import('@/features/home/HomePage'));
const LoginPage = lazy(() => import('@/features/auth/LoginPage'));
const SettingsPage = lazy(() => import('@/features/settings/SettingsPage'));
const RewardsPage = lazy(() => import('@/features/rewards/RewardsPage'));
const NewsPage = lazy(() => import('@/features/news/NewsPage'));
const NewsDetailPage = lazy(() => import('@/features/news/NewsDetailPage'));
const CompanyProfilePage = lazy(() => import('@/features/about/CompanyProfilePage'));
const VisionPage = lazy(() => import('@/features/about/VisionPage'));
const MissionPage = lazy(() => import('@/features/about/MissionPage'));
const ClientsPage = lazy(() => import('@/features/about/ClientsPage'));
const ProductsPage = lazy(() => import('@/features/about/ProductsPage'));
const ServicesPage = lazy(() => import('@/features/about/ServicesPage'));
const CoreValuePage = lazy(() => import('@/features/culture/CoreValuePage'));
const CoreCompetencyPage = lazy(() => import('@/features/culture/CoreCompetencyPage'));
const ActivityPage = lazy(() => import('@/features/culture/ActivityPage'));
const AlbumPage = lazy(() => import('@/features/culture/AlbumPage'));
const HrPage = lazy(() => import('@/features/hr/HrPage'));
const RulesPage = lazy(() => import('@/features/rules/RulesPage'));
const CoursesPage = lazy(() => import('@/features/courses/CoursesPage'));
const KnowledgePage = lazy(() => import('@/features/knowledge/KnowledgePage'));
const DownloadPage = lazy(() => import('@/features/download/DownloadPage'));
const ProfilePage = lazy(() => import('@/features/profile/ProfilePage'));
const MyCardsPage = lazy(() => import('@/features/birthday/MyCardsPage'));

const priv = (el) => <RequireAuth>{el}</RequireAuth>;

export default function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <LangProvider>
          <UIProvider>
            <BirthdayProvider>
              <ScrollToTop />
              <ActivityTracker />
              <Routes>
                <Route element={<Layout />}>
                  <Route index element={<HomePage />} />
                  <Route path="login" element={<LoginPage />} />
                  <Route path="news" element={<NewsPage />} />
                  <Route path="news/:id" element={<NewsDetailPage />} />

                  <Route path="about/profile" element={<CompanyProfilePage />} />
                  <Route path="about/vision" element={<VisionPage />} />
                  <Route path="about/mission" element={<MissionPage />} />
                  <Route path="about/clients" element={<ClientsPage />} />
                  <Route path="about/products" element={<RequireLogin msg="หน้า Products สำหรับพนักงานเท่านั้น กรุณาเข้าสู่ระบบก่อน"><ProductsPage /></RequireLogin>} />
                  <Route path="about/services" element={<ServicesPage />} />

                  <Route path="culture/core-value" element={<CoreValuePage />} />
                  <Route path="culture/core-competency" element={<CoreCompetencyPage />} />
                  <Route path="culture/activity" element={<ActivityPage />} />
                  <Route path="culture/activity/:albumId" element={<AlbumPage />} />

                  <Route path="hr" element={priv(<HrPage />)} />
                  <Route path="rules" element={priv(<RulesPage />)} />
                  <Route path="courses" element={priv(<CoursesPage />)} />
                  <Route path="knowledge" element={priv(<KnowledgePage />)} />
                  <Route path="download" element={priv(<DownloadPage />)} />
                  <Route path="profile" element={priv(<ProfilePage />)} />
                  <Route path="my-cards" element={priv(<MyCardsPage />)} />
                  <Route path="settings" element={priv(<SettingsPage />)} />
                  <Route path="rewards" element={priv(<RewardsPage />)} />

                  <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
              </Routes>
            </BirthdayProvider>
          </UIProvider>
        </LangProvider>
      </AuthProvider>
    </HashRouter>
  );
}
