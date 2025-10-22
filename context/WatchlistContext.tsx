import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { TopPick } from '../types';

interface WatchlistContextType {
  watchedStocks: TopPick[];
  watchedCryptos: TopPick[];
  addAssets: (assets: TopPick[]) => void;
  removeAsset: (ticker: string, type: 'Stock' | 'Crypto') => void;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export const WatchlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [watchedStocks, setWatchedStocks] = useState<TopPick[]>([]);
  const [watchedCryptos, setWatchedCryptos] = useState<TopPick[]>([]);

  useEffect(() => {
    try {
      const storedStocks = localStorage.getItem('watchedStocks');
      if (storedStocks) {
        setWatchedStocks(JSON.parse(storedStocks));
      }
      const storedCryptos = localStorage.getItem('watchedCryptos');
      if (storedCryptos) {
        setWatchedCryptos(JSON.parse(storedCryptos));
      }
    } catch (error) {
      console.error("Failed to parse watchlist from localStorage", error);
    }
  }, []);

  const addAssets = (assets: TopPick[]) => {
    const newStocks = assets.filter(asset => asset.type === 'Stock');
    const newCryptos = assets.filter(asset => asset.type === 'Crypto');

    setWatchedStocks(prevStocks => {
      const updatedStocks = [...prevStocks];
      newStocks.forEach(stock => {
        if (!updatedStocks.some(s => s.ticker === stock.ticker)) {
          updatedStocks.push(stock);
        }
      });
      localStorage.setItem('watchedStocks', JSON.stringify(updatedStocks));
      return updatedStocks;
    });

    setWatchedCryptos(prevCryptos => {
      const updatedCryptos = [...prevCryptos];
      newCryptos.forEach(crypto => {
        if (!updatedCryptos.some(c => c.ticker === crypto.ticker)) {
          updatedCryptos.push(crypto);
        }
      });
      localStorage.setItem('watchedCryptos', JSON.stringify(updatedCryptos));
      return updatedCryptos;
    });
  };

  const removeAsset = (ticker: string, type: 'Stock' | 'Crypto') => {
    if (type === 'Stock') {
      setWatchedStocks(prevStocks => {
        const updatedStocks = prevStocks.filter(stock => stock.ticker !== ticker);
        localStorage.setItem('watchedStocks', JSON.stringify(updatedStocks));
        return updatedStocks;
      });
    } else {
      setWatchedCryptos(prevCryptos => {
        const updatedCryptos = prevCryptos.filter(crypto => crypto.ticker !== ticker);
        localStorage.setItem('watchedCryptos', JSON.stringify(updatedCryptos));
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