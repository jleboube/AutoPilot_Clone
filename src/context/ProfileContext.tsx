import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback } from 'react';
import { HistoricalPicks, TopPick } from '../types';
import { useAuth } from './AuthContext';

interface ProfileContextType {
  historicalPicks: HistoricalPicks[];
  addHistoricalPicks: (picks: TopPick[]) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [historicalPicks, setHistoricalPicks] = useState<HistoricalPicks[]>([]);

  const getStorageKey = useCallback(() => {
    if (!user) return null;
    return `historicalPicks_${user.id}`;
  }, [user]);

  useEffect(() => {
    const storageKey = getStorageKey();
    if (storageKey) {
        try {
            const storedPicks = localStorage.getItem(storageKey);
            if (storedPicks) {
                setHistoricalPicks(JSON.parse(storedPicks));
            } else {
                setHistoricalPicks([]); // Clear if no data for this user
            }
        } catch (error) {
            console.error("Failed to parse historical picks from localStorage", error);
            setHistoricalPicks([]);
        }
    } else {
        // If user logs out, clear the state
        setHistoricalPicks([]);
    }
  }, [user, getStorageKey]);

  const addHistoricalPicks = (picks: TopPick[]) => {
    const storageKey = getStorageKey();
    if (!storageKey || picks.length === 0) return;

    const newHistoricalEntry: HistoricalPicks = {
      date: new Date().toISOString(),
      picks: picks,
    };

    setHistoricalPicks(prevPicks => {
      // Add new picks to the beginning of the array
      const updatedPicks = [newHistoricalEntry, ...prevPicks];
      localStorage.setItem(storageKey, JSON.stringify(updatedPicks));
      return updatedPicks;
    });
  };

  return (
    <ProfileContext.Provider value={{ historicalPicks, addHistoricalPicks }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
