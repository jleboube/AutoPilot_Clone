import React from 'react';
import { ChartPieIcon, CurrencyDollarIcon, CubeIcon, CollectionIcon, HomeIcon, SparklesIcon, UserIcon } from './Icons';
import { useAuth } from '../context/AuthContext';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive = false, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
      isActive
        ? 'bg-emerald-500 text-white shadow-lg'
        : 'text-slate-400 hover:bg-slate-700 hover:text-slate-100'
    }`}
  >
    {icon}
    <span className="ml-3 hidden lg:inline">{label}</span>
  </button>
);

interface SidebarProps {
  activeView: string;
  setActiveView: (view: 'dashboard' | 'portfolios' | 'stocks' | 'crypto' | 'aiPicks') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  const { user, logout } = useAuth();
  
  return (
    <aside className="w-16 lg:w-64 bg-slate-800/50 border-r border-slate-700/50 p-4 flex flex-col justify-between transition-all duration-300">
      <div>
        <div className="flex items-center justify-center lg:justify-start px-2 lg:px-4 py-4 mb-6">
          <CubeIcon className="w-8 h-8 text-emerald-500" />
          <h1 className="ml-3 text-xl font-bold text-white hidden lg:inline">Autopilot</h1>
        </div>
        <nav className="space-y-2">
          <NavItem icon={<HomeIcon className="w-6 h-6" />} label="Dashboard" isActive={activeView === 'dashboard'} onClick={() => setActiveView('dashboard')} />
          <NavItem icon={<SparklesIcon className="w-6 h-6" />} label="AI Picks" isActive={activeView === 'aiPicks'} onClick={() => setActiveView('aiPicks')} />
          <div className="pt-4 mt-4 border-t border-slate-700/50">
            <NavItem icon={<ChartPieIcon className="w-6 h-6" />} label="Portfolios" isActive={activeView === 'portfolios'} onClick={() => setActiveView('portfolios')} />
            <NavItem icon={<CurrencyDollarIcon className="w-6 h-6" />} label="Stocks" isActive={activeView === 'stocks'} onClick={() => setActiveView('stocks')} />
            <NavItem icon={<CollectionIcon className="w-6 h-6" />} label="Crypto" isActive={activeView === 'crypto'} onClick={() => setActiveView('crypto')} />
          </div>
        </nav>
      </div>
      <div className="border-t border-slate-700/50 pt-4">
         {user ? (
            <div className="p-2">
                <div className="flex items-center">
                    <img src={user.picture} alt={user.name} className="w-10 h-10 rounded-full" />
                    <div className="ml-3 hidden lg:inline">
                        <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                        <p className="text-xs text-slate-400 truncate">{user.email}</p>
                    </div>
                </div>
                <button onClick={logout} className="w-full mt-3 text-center text-xs text-slate-400 hover:text-white transition-colors">
                    Sign Out
                </button>
            </div>
         ) : (
            <div className="flex flex-col items-center lg:items-start p-2">
                <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                        <UserIcon className="w-6 h-6 text-slate-400" />
                    </div>
                    <div className="ml-3 hidden lg:inline">
                        <p className="text-sm font-semibold text-white">Guest User</p>
                    </div>
                </div>
                {/* The login button is rendered by the AuthContext component */}
                <div id="signInDiv" className="mt-3 w-full"></div>
            </div>
         )}
      </div>
    </aside>
  );
};

export default Sidebar;