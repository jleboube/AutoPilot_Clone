import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import { AuthProvider } from './context/AuthContext';
import { WatchlistProvider } from './context/WatchlistContext';
import { ProfileProvider } from './context/ProfileContext';
import PortfolioPage from './components/PortfolioPage';
import StocksPage from './components/StocksPage';
import CryptoPage from './components/CryptoPage';
import AIPicksPage from './components/AIPicksPage';
import ProfilePage from './components/ProfilePage';

type View = 'dashboard' | 'portfolios' | 'stocks' | 'crypto' | 'aiPicks' | 'profile';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('dashboard');

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'portfolios':
        return <PortfolioPage />;
      case 'stocks':
        return <StocksPage />;
      case 'crypto':
        return <CryptoPage />;
      case 'aiPicks':
        return <AIPicksPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AuthProvider>
      <WatchlistProvider>
        <ProfileProvider>
          <div className="flex h-screen bg-slate-900 text-slate-200 font-sans">
            <Sidebar activeView={activeView} setActiveView={setActiveView} />
            <main className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 p-6 md:p-8 lg:p-10 overflow-y-auto">
                {renderContent()}
              </div>
            </main>
          </div>
        </ProfileProvider>
      </WatchlistProvider>
    </AuthProvider>
  );
};

export default App;
