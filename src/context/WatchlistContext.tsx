import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback } from 'react';
import { TopPick } from '../types';
import { useAuth } from './AuthContext';

interface WatchlistContextType {
  watchedStocks: TopPick[];
  watchedCryptos: TopPick[];
  addAssets: (assets: TopPick[]) => void;
  removeAsset: (ticker: string, type: 'Stock' | 'Crypto') => void;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export const WatchlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [watchedStocks, setWatchedStocks] = useState<TopPick[]>([]);
  const [watchedCryptos, setWatchedCryptos] = useState<TopPick[]>([]);

  const getStorageKey = useCallback((type: 'Stock' | 'Crypto') => {
    if (!user) return null;
    return type === 'Stock' ? `watchedStocks_${user.id}` : `watchedCryptos_${user.id}`;
  }, [user]);

  useEffect(() => {
    const stockKey = getStorageKey('Stock');
    const cryptoKey = getStorageKey('Crypto');

    if (stockKey && cryptoKey) {
        try {
            const storedStocks = localStorage.getItem(stockKey);
            setWatchedStocks(storedStocks ? JSON.parse(storedStocks) : []);
            
            const storedCryptos = localStorage.getItem(cryptoKey);
            setWatchedCryptos(storedCryptos ? JSON.parse(storedCryptos) : []);
        } catch (error) {
            console.error("Failed to parse watchlist from localStorage", error);
            setWatchedStocks([]);
            setWatchedCryptos([]);
        }
    } else {
        // Clear watchlists when user logs out
        setWatchedStocks([]);
        setWatchedCryptos([]);
    }
  }, [user, getStorageKey]);

  const addAssets = (assets: TopPick[]) => {
    if (!user) return; // Do not save for guest users
    const stockKey = getStorageKey('Stock');
    const cryptoKey = getStorageKey('Crypto');

    const newStocks = assets.filter(asset => asset.type === 'Stock');
    const newCryptos = assets.filter(asset => asset.type === 'Crypto');

    if (newStocks.length > 0 && stockKey) {
        setWatchedStocks(prevStocks => {
            const updatedStocks = [...prevStocks];
            newStocks.forEach(stock => {
                if (!updatedStocks.some(s => s.ticker === stock.ticker)) {
                updatedStocks.push(stock);
                }
            });
            localStorage.setItem(stockKey, JSON.stringify(updatedStocks));
            return updatedStocks;
        });
    }

    if (newCryptos.length > 0 && cryptoKey) {
        setWatchedCryptos(prevCryptos => {
            const updatedCryptos = [...prevCryptos];
            newCryptos.forEach(crypto => {
                if (!updatedCryptos.some(c => c.ticker === crypto.ticker)) {
                updatedCryptos.push(crypto);
                }
            });
            localStorage.setItem(cryptoKey, JSON.stringify(updatedCryptos));
            return updatedCryptos;
        });
    }
  };

  const removeAsset = (ticker: string, type: 'Stock' | 'Crypto') => {
    if (!user) return;
    const key = getStorageKey(type);
    if (!key) return;

    if (type === 'Stock') {
      setWatchedStocks(prevStocks => {
        const updatedStocks = prevStocks.filter(stock => stock.ticker !== ticker);
        localStorage.setItem(key, JSON.stringify(updatedStocks));
        return updatedStocks;
      });
    } else {
      setWatchedCryptos(prevCryptos => {
        const updatedCryptos = prevCryptos.filter(crypto => crypto.ticker !== ticker);
        localStorage.setItem(key, JSON.stringify(updatedCryptos));
        return updatedCryptos;
      });
    }
  };

  return (
    <WatchlistContext.Provider value={{ watchedStocks, watchedCryptos, addAssets, removeAsset }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
};
