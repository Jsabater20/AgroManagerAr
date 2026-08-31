import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from './store/auth.store';
import { getProfile } from './api/users.api';
import { queryClient } from './lib/queryClient';

import PrivateRoute from './components/layout/PrivateRoute';
import Layout from './components/layout/Layout';
import HomePage from './pages/home/HomePage';
import ContactoPage from './pages/contacto/ContactoPage';
import SobreNosotrosPage from './pages/sobre-nosotros/SobreNosotrosPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import AceptarInvitacionPage from './pages/auth/AceptarInvitacionPage';
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
import MaquinariasPage from './pages/maquinarias/MaquinariasPage';
import MaquinariaDetailPage from './pages/maquinarias/MaquinariaDetailPage';
import ReportesPage from './pages/reportes/ReportesPage';
import FinanzasPage from './pages/finanzas/FinanzasPage';
import CampaniasPage from './pages/campanias/CampaniasPage';
import RentabilidadPage from './pages/rentabilidad/RentabilidadPage';
import ClimaPage from './pages/clima/ClimaPage';
import PreciosPage from './pages/precios/PreciosPage';
import PerfilPage from './pages/perfil/PerfilPage';
import AdminPage from './pages/admin/AdminPage';
import SuscripcionExitosaPage from './pages/plan/SuscripcionExitosaPage';
import AuditoriaPage from './pages/organizaciones/AuditoriaPage';
import PermisosTemporalesPage from './pages/organizaciones/PermisosTemporalesPage';
import RolesPage from './pages/organizaciones/RolesPage';
import MiembrosPage from './pages/miembros/MiembrosPage';
import InvitarMiembrosPage from './pages/miembros/InvitarMiembrosPage';
import AdministracionPersonalPage from './pages/miembros/AdministracionPersonalPage';
import AsignarTrabajoPage from './pages/miembros/AsignarTrabajoPage';
import MiembrosTrabajosPage from './pages/miembros/MiembrosTrabajosPage';
import EmpresasPage from './pages/empresas/EmpresasPage';
import EmpresaDashboardPage from './pages/empresas/EmpresaDashboardPage';
import EmpresaMiembrosPage from './pages/empresas/EmpresaMiembrosPage';
import EmpresaOperacionPage from './pages/empresas/EmpresaOperacionPage';
import EmpresaFinanzasPage from './pages/empresas/EmpresaFinanzasPage';
import EmpresaRentabilidadPage from './pages/empresas/EmpresaRentabilidadPage';
import EmpresaAuditoriaPage from './pages/empresas/EmpresaAuditoriaPage';
import EmpresaExportacionesPage from './pages/empresas/EmpresaExportacionesPage';

export default function App() {
  const { token, setAuth, setIsLoading, logout } = useAuthStore();

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    let mounted = true;

    setIsLoading(true);

    getProfile()
      .then((profile) => {
        if (!mounted) return;

        const organizaciones = profile.organizaciones ?? [];

        const activeOrgId =
          profile.usuarioOrganizacionId ??
          (organizaciones.length === 1 ? organizaciones[0]?.id : null);

        setAuth(
          {
            id: profile.id,
            email: profile.email,
            nombre: profile.nombre,
            apellido: profile.apellido,
            rol: profile.rol || 'OPERADOR',
            plan: (profile.plan || 'FREE') as 'FREE' | 'PRO',
            rolGlobal: profile.rolGlobal,
            usuarioOrganizacionId: activeOrgId ?? null,
            organizaciones,
          },
          token,
        );

        setIsLoading(false);
      })
      .catch(() => {
        if (!mounted) return;
        logout();
        setIsLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [token, setAuth, setIsLoading, logout]);

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
          <Route path="/aceptar-invitacion" element={<AceptarInvitacionPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/suscripcion-exitosa" element={<SuscripcionExitosaPage />} />
          <Route path="/terminos" element={<TermsPage />} />
          <Route path="/privacidad" element={<PrivacyPage />} />

          <Route element={<PrivateRoute />}>
            <Route element={<Layout />}>
              <Route path="/org/:orgId/dashboard" element={<DashboardPage />} />
              <Route path="/org/:orgId/campos" element={<CamposPage />} />
              <Route path="/org/:orgId/campos/:id" element={<CampoDetailPage />} />
              <Route path="/org/:orgId/campos/:campoId/lotes/:loteId" element={<LoteDetailPage />} />
              <Route path="/org/:orgId/cultivos" element={<CultivosPage />} />
              <Route path="/org/:orgId/siembras" element={<SiembrasPage />} />
              <Route path="/org/:orgId/insumos" element={<InsumosPage />} />
              <Route path="/org/:orgId/ganado" element={<GanadoPage />} />
              <Route path="/org/:orgId/tareas" element={<TareasPage />} />
              <Route path="/org/:orgId/miembros" element={<MiembrosPage />} />
              <Route path="/org/:orgId/miembros/invitar" element={<InvitarMiembrosPage />} />
              <Route path="/org/:orgId/miembros/administracion" element={<AdministracionPersonalPage />} />
              <Route path="/org/:orgId/miembros/asignar-trabajo" element={<AsignarTrabajoPage />} />
              <Route path="/org/:orgId/miembros/trabajos" element={<MiembrosTrabajosPage />} />
              <Route path="/org/:orgId/maquinarias" element={<MaquinariasPage />} />
              <Route path="/org/:orgId/maquinarias/:id" element={<MaquinariaDetailPage />} />
              <Route path="/org/:orgId/reportes" element={<ReportesPage />} />
              <Route path="/org/:orgId/finanzas" element={<FinanzasPage />} />
              <Route path="/org/:orgId/campanias" element={<CampaniasPage />} />
              <Route path="/org/:orgId/rentabilidad" element={<RentabilidadPage />} />
              <Route path="/org/:orgId/clima" element={<ClimaPage />} />
              <Route path="/org/:orgId/auditoria" element={<AuditoriaPage />} />
              <Route path="/org/:orgId/permisos-temporales" element={<PermisosTemporalesPage />} />
              <Route path="/org/:orgId/roles" element={<RolesPage />} />
              <Route path="/empresas" element={<EmpresasPage />} />
              <Route path="/empresas/:empresaId/dashboard" element={<EmpresaDashboardPage />} />
              <Route path="/empresas/:empresaId/miembros" element={<EmpresaMiembrosPage />} />
              <Route path="/empresas/:empresaId/actividades" element={<EmpresaOperacionPage seccion="actividades" />} />
              <Route path="/empresas/:empresaId/maquinarias" element={<EmpresaOperacionPage seccion="maquinarias" />} />
              <Route path="/empresas/:empresaId/ganaderia" element={<EmpresaOperacionPage seccion="ganaderia" />} />
              <Route path="/empresas/:empresaId/finanzas" element={<EmpresaFinanzasPage />} />
              <Route path="/empresas/:empresaId/rentabilidad" element={<EmpresaRentabilidadPage />} />
              <Route path="/empresas/:empresaId/auditoria" element={<EmpresaAuditoriaPage />} />
              <Route path="/empresas/:empresaId/exportaciones" element={<EmpresaExportacionesPage />} />
              <Route path="/perfil" element={<PerfilPage />} />
            </Route>

            <Route path="/admin" element={<AdminPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
