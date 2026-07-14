import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Building2, Users, BarChart3, Clock } from 'lucide-react';
import { useAuthStore } from '../../store/auth.store';
import { organizacionesApi } from '../../api/organizations.api';

export default function OrganizationSelectorSidebar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { token, organizacionId, setOrganizacionId, organizaciones } = useAuthStore();

  const { data: orgs = [] } = useQuery({
    queryKey: ['organizaciones', token],
    queryFn: () => organizacionesApi.obtenerTodas(),
    staleTime: 0,
    gcTime: 1000 * 60 * 5,
    enabled: !!token,
    retry: 2,
  });

  const currentOrg = organizaciones.find((o) => o.id === organizacionId) || orgs.find((o) => o.id === organizacionId);

  if (!currentOrg || (organizaciones.length === 0 && orgs.length === 0)) {
    return null;
  }

  return (
    <div className="px-2 py-2 border-b border-white/10 space-y-2 relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-green-100 transition-colors text-sm"
      >
        <Building2 size={13} className="shrink-0" />
        <span className="truncate flex-1 text-left text-xs">{currentOrg.nombre}</span>
        <ChevronDown size={11} className={`shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-20" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-2 right-2 mt-1 bg-green-800 rounded-lg border border-white/10 shadow-xl z-50">
            <div className="p-1">
              {(organizaciones.length > 0 ? organizaciones : orgs).map((org) => (
                <button
                  key={org.id}
                  onClick={() => {
                    setOrganizacionId(org.id);
                    setOpen(false);
                  }}
                  className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-white/10 transition-colors text-xs text-green-100 flex items-center justify-between"
                >
                  <span className="truncate">{org.nombre}</span>
                  {org.id === organizacionId && (
                    <span className="text-green-400 text-xs">✓</span>
                  )}
                </button>
              ))}

              {/* Separator */}
              {(organizaciones.length > 0 ? organizaciones : orgs).length > 0 && (
                <div className="h-px bg-white/10 my-1" />
              )}

              {/* Miembros */}
              {organizacionId && (
                <button
                  onClick={() => {
                    navigate(`/organizaciones/${organizacionId}/miembros`);
                    setOpen(false);
                  }}
                  className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-white/10 transition-colors text-xs text-green-300 flex items-center gap-2"
                >
                  <Users size={12} />
                  <span>Miembros</span>
                </button>
              )}

              {/* Auditoría */}
              {organizacionId && (
                <button
                  onClick={() => {
                    navigate(`/organizaciones/${organizacionId}/auditoria`);
                    setOpen(false);
                  }}
                  className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-white/10 transition-colors text-xs text-green-300 flex items-center gap-2"
                >
                  <BarChart3 size={12} />
                  <span>Auditoría</span>
                </button>
              )}

              {/* Permisos Temporales */}
              {organizacionId && (
                <button
                  onClick={() => {
                    navigate(`/organizaciones/${organizacionId}/permisos-temporales`);
                    setOpen(false);
                  }}
                  className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-white/10 transition-colors text-xs text-green-300 flex items-center gap-2"
                >
                  <Clock size={12} />
                  <span>Permisos Temp.</span>
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
