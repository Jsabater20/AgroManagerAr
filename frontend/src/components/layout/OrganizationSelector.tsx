import { useState } from 'react';
import { ChevronDown, Building2, Check } from 'lucide-react';
import { useAuthStore, type Organizacion } from '../../store/auth.store';

export default function OrganizationSelector() {
  const [open, setOpen] = useState(false);
  const usuario = useAuthStore((s) => s.usuario);
  const currentOrg = useAuthStore((s) => s.currentOrg());

  const organizations = usuario?.organizaciones ?? [];
  const currentOrgId =
    currentOrg?.id ??
    (organizations.length === 1 ? organizations[0]?.id : null);

  if (!currentOrg || !currentOrgId) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
        <Building2 size={16} />
        <span className="text-xs">Sin organización</span>
      </div>
    );
  }

  if (organizations.length <= 1) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300">
        <Building2 size={16} />
        <span className="max-w-[120px] truncate">{currentOrg.nombre}</span>
      </div>
    );
  }

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
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg z-50">
            <div className="p-2">
              {organizations.map((org: Organizacion) => (
                <div
                  key={org.id}
                  className="px-3 py-2.5 rounded-lg flex items-center justify-between text-gray-700 dark:text-gray-300"
                >
                  <div className="flex flex-col min-w-0">
                    <span className="font-medium text-gray-900 dark:text-white truncate">
                      {org.nombre}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {org.email ?? 'Sin email'}
                    </span>
                  </div>
                  {org.id === currentOrgId && (
                    <Check size={16} className="text-green-600 dark:text-green-400 flex-shrink-0 ml-2" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}