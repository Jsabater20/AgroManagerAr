import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Moon, Sun, Search, Menu } from 'lucide-react';
import Sidebar from './Sidebar';
import NotificationBell from './NotificationBell';
import OrganizationSelector from './OrganizationSelector';
import GlobalSearch, { useGlobalSearch } from './GlobalSearch';
import OnboardingWizard, { useOnboarding } from './OnboardingWizard';
import { useThemeStore } from '../../store/theme.store';
import AiChat from '../ui/AiChat';
import DemoBanner from '../ui/DemoBanner';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, toggle } = useThemeStore();
  const { open: searchOpen, setOpen: setSearchOpen } = useGlobalSearch();
  const { show: showOnboarding, dismiss: dismissOnboarding } = useOnboarding();

  return (
    <div className="min-h-screen bg-[#edf2ed] dark:bg-gray-950">
      <DemoBanner />
      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
      {showOnboarding && <OnboardingWizard onClose={dismissOnboarding} />}

      {/* Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Topbar */}
      <header className="sticky top-0 z-20 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }} className="h-14 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
            aria-label="Abrir menú"
          >
            <Menu size={20} />
          </button>

          {/* Organization Selector */}
          <OrganizationSelector />

          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Search size={14} />
              <span>Buscar</span>
              <kbd className="text-[10px] bg-gray-100 dark:bg-gray-800 px-1 rounded border border-gray-200 dark:border-gray-600">⌘K</kbd>
            </button>
            <button
              onClick={() => setSearchOpen(true)}
              className="sm:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Search size={18} />
            </button>
            <button
              onClick={toggle}
              title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <NotificationBell />
          </div>
        </div>
      </header>

      {/* Contenido centrado */}
      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 24px' }}>
        <Outlet />
      </main>

      <AiChat />
    </div>
  );
}