import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChevronDown, Building2, Check } from 'lucide-react';
import { useAuthStore } from '../../store/auth.store';
import { organizacionesApi } from '../../api/organizations.api';

export default function OrganizationSelector() {
  const [open, setOpen] = useState(false);
  const { organizacionId, setOrganizacionId, setOrganizaciones, organizaciones } = useAuthStore();

  const { data: orgs = [] } = useQuery({
    queryKey: ['organizaciones'],
    queryFn: () => organizacionesApi.obtenerTodas(),
    staleTime: 1000 * 60 * 5, // 5 min
  });

  useEffect(() => {
    if (orgs.length > 0) {
      setOrganizaciones(orgs);
      // Si no hay org seleccionada, usar la primera
      if (!organizacionId) {
        setOrganizacionId(orgs[0].id);
      }
    }
  }, [orgs, organizacionId, setOrganizacionId, setOrganizaciones]);

  const currentOrg = organizaciones.find((o) => o.id === organizacionId);

  if (!currentOrg || organizaciones.length === 0) {
    return null;
  }

  const handleSelectOrg = (orgId: number) => {
    setOrganizacionId(orgId);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <Building2 size={16} />
        <span className="max-w-[120px] truncate">{currentOrg.nombre}</span>
        <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg z-50">
            <div className="p-2">
              {organizaciones.map((org) => (
                <button
                  key={org.id}
                  onClick={() => handleSelectOrg(org.id)}
                  className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-between group"
                >
                  <div className="flex flex-col min-w-0">
                    <span className="font-medium text-gray-900 dark:text-white truncate">
                      {org.nombre}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {org.email}
                    </span>
                  </div>
                  {org.id === organizacionId && (
                    <Check size={16} className="text-green-600 dark:text-green-400 flex-shrink-0 ml-2" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}