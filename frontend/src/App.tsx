import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from './store/auth.store';
import { getProfile } from './api/users.api';

import PrivateRoute from './components/layout/PrivateRoute';
import Layout from './components/layout/Layout';
import HomePage from './pages/home/HomePage';
import ContactoPage from './pages/contacto/ContactoPage';
import SobreNosotrosPage from './pages/sobre-nosotros/SobreNosotrosPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import VerifyEmailPage from './pages/auth/VerifyEmailPage';
import TermsPage from './pages/legal/TermsPage';
import PrivacyPage from './pages/legal/PrivacyPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import CamposPage from './pages/campos/CamposPage';
import CampoDetailPage from './pages/campos/CampoDetailPage';
import LoteDetailPage from './pages/campos/LoteDetailPage';
import SiembrasPage from './pages/siembras/SiembrasPage';
import InsumosPage from './pages/insumos/InsumosPage';
import CultivosPage from './pages/cultivos/CultivosPage';
import GanadoPage from './pages/ganado/GanadoPage';
import TareasPage from './pages/tareas/TareasPage';
import ReportesPage from './pages/reportes/ReportesPage';
import FinanzasPage from './pages/finanzas/FinanzasPage';
import CampaniasPage from './pages/campanias/CampaniasPage';
import RentabilidadPage from './pages/rentabilidad/RentabilidadPage';
import ClimaPage from './pages/clima/ClimaPage';
import PreciosPage from './pages/precios/PreciosPage';
import PerfilPage from './pages/perfil/PerfilPage';
import AdminPage from './pages/admin/AdminPage';
import SuscripcionExitosaPage from './pages/plan/SuscripcionExitosaPage';

const queryClient = new QueryClient();

export default function App() {
  const { token, setAuth, logout } = useAuthStore();

  useEffect(() => {
    if (!token) return;
    getProfile()
      .then((profile) => setAuth(profile, token))
      .catch(() => { logout(); });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/precios" element={<PreciosPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="/sobre-nosotros" element={<SobreNosotrosPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/suscripcion-exitosa" element={<SuscripcionExitosaPage />} />
          <Route path="/terminos" element={<TermsPage />} />
          <Route path="/privacidad" element={<PrivacyPage />} />
          <Route element={<PrivateRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/campos" element={<CamposPage />} />
              <Route path="/campos/:id" element={<CampoDetailPage />} />
              <Route path="/campos/:campoId/lotes/:loteId" element={<LoteDetailPage />} />
              <Route path="/cultivos" element={<CultivosPage />} />
              <Route path="/siembras" element={<SiembrasPage />} />
              <Route path="/insumos" element={<InsumosPage />} />
              <Route path="/ganado" element={<GanadoPage />} />
              <Route path="/tareas" element={<TareasPage />} />
              <Route path="/reportes" element={<ReportesPage />} />
              <Route path="/finanzas" element={<FinanzasPage />} />
              <Route path="/campanias" element={<CampaniasPage />} />
              <Route path="/rentabilidad" element={<RentabilidadPage />} />
              <Route path="/clima" element={<ClimaPage />} />
              <Route path="/perfil" element={<PerfilPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
