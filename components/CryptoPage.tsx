import React from 'react';
import { CollectionIcon } from './Icons';
import { useWatchlist } from '../context/WatchlistContext';
import { WatchlistItem } from './WatchlistItem';

const CryptoPage: React.FC = () => {
  const { watchedCryptos, removeAsset } = useWatchlist();

  if (watchedCryptos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <CollectionIcon className="w-16 h-16 text-slate-600" />
        <h1 className="mt-6 text-3xl font-bold text-white">Your Crypto Watchlist is Empty</h1>
        <p className="mt-2 text-slate-400 max-w-md">
           Use the "Pick Stocks" or "Analyze" features on the Dashboard to find and add cryptocurrencies you want to track.
        </p>
      </div>
    );
  }

  return (
     <div>
       <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
        My Watched Crypto
      </h1>
      <p className="mt-2 text-slate-400 mb-8">
        Here are the cryptocurrencies you're currently tracking based on AI recommendations.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {watchedCryptos.map(crypto => (
            <WatchlistItem 
                key={crypto.ticker}
                asset={crypto}
                onRemove={() => removeAsset(crypto.ticker, 'Crypto')}
            />
        ))}
      </div>
    </div>
  );
};

export default CryptoPage;