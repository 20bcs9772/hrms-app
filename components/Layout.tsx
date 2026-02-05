
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  CalendarCheck, 
  Settings, 
  LogOut,
  ChevronRight
} from 'lucide-react';

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ to, icon, label, active }) => (
  <Link 
    to={to} 
    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      active 
        ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' 
        : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800'
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
    {active && <ChevronRight className="ml-auto w-4 h-4" />}
  </Link>
);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  
  // Only the root landing page should hide the sidebar
  const isLandingPage = location.pathname === '/';

  if (isLandingPage) return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800 hidden md:flex flex-col p-6 sticky top-0 h-screen">
        <div className="flex items-center gap-2 mb-10 px-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="font-bold text-white text-sm">H</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
              HRMS Lite
            </h1>
          </Link>
        </div>

        <nav className="space-y-2 flex-1">
          <SidebarItem 
            to="/dashboard" 
            icon={<LayoutDashboard className="w-5 h-5" />} 
            label="Dashboard" 
            active={location.pathname === '/dashboard'}
          />
          <SidebarItem 
            to="/employees" 
            icon={<Users className="w-5 h-5" />} 
            label="Employees" 
            active={location.pathname === '/employees'}
          />
          <SidebarItem 
            to="/attendance" 
            icon={<CalendarCheck className="w-5 h-5" />} 
            label="Attendance" 
            active={location.pathname === '/attendance'}
          />
        </nav>

        <div className="pt-6 border-t border-zinc-800 space-y-2">
          <button 
            type="button" 
            onClick={() => alert('Settings panel coming soon!')}
            className="flex items-center gap-3 px-4 py-3 w-full text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-xl transition-colors"
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
          <Link to="/" className="flex items-center gap-3 px-4 py-3 w-full text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Exit Dashboard</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
