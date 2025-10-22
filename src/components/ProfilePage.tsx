import React from 'react';
import { useProfile } from '../context/ProfileContext';
import { useAuth } from '../context/AuthContext';
import { TopPickItem } from './TopPickItem';
import { SparklesIcon, UserIcon } from './Icons';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { historicalPicks } = useProfile();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <UserIcon className="w-16 h-16 text-slate-600" />
        <h1 className="mt-6 text-3xl font-bold text-white">Please Sign In</h1>
        <p className="mt-2 text-slate-400 max-w-md">
          Sign in to view your profile and saved AI picks history.
        </p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  }

  return (
    <div className="max-w-5xl mx-auto">
      <header className="flex items-center space-x-4 mb-10">
        <img src={user.picture} alt={user.name} className="w-16 h-16 rounded-full" />
        <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                {user.name}'s Profile
            </h1>
            <p className="mt-1 text-slate-400">{user.email}</p>
        </div>
      </header>

      <div>
        <h2 className="text-2xl font-bold text-white mb-6">AI Picks History</h2>
        {historicalPicks.length === 0 ? (
           <div className="text-center py-16 bg-slate-800/50 border border-slate-700/50 rounded-lg">
                <SparklesIcon className="w-12 h-12 mx-auto text-slate-600" />
                <h3 className="mt-4 text-xl font-semibold text-white">No History Found</h3>
                <p className="mt-2 text-slate-400">Your saved AI-generated market picks will appear here.</p>
            </div>
        ) : (
            <div className="space-y-8">
                {historicalPicks.map((historyItem, index) => (
                    <div key={index} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-emerald-400 mb-4">
                            Picks from {formatDate(historyItem.date)}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {historyItem.picks.map((pick, pickIndex) => (
                                <TopPickItem key={pickIndex} pick={pick} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
