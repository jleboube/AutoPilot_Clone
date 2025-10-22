import React from 'react';
import { TopPick } from '../types';
import { TrashIcon } from './Icons';

interface WatchlistItemProps {
  asset: TopPick;
  onRemove: () => void;
}

export const WatchlistItem: React.FC<WatchlistItemProps> = ({ asset, onRemove }) => {
  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-5 shadow-lg relative group">
      <div className="flex justify-between items-start">
        <div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${asset.type === 'Stock' ? 'bg-blue-900 text-blue-300' : 'bg-orange-900 text-orange-300'}`}>
            {asset.type}
          </span>
          <h3 className="text-xl font-bold text-white mt-2">{asset.assetName}</h3>
          <p className="text-sm text-slate-400">{asset.ticker}</p>
        </div>
        <div className="text-right flex-shrink-0 ml-4">
          <p className="text-slate-400 text-sm">AI Score</p>
          <p className="text-3xl font-bold text-emerald-400">{asset.score}<span className="text-xl text-slate-500">/10</span></p>
        </div>
      </div>
      <p className="text-slate-300 mt-4 text-sm border-t border-slate-700 pt-3">{asset.justification}</p>
      
      <button 
        onClick={onRemove}
        aria-label={`Remove ${asset.assetName} from watchlist`}
        className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-700/50 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-900/70 hover:text-white"
      >
        <TrashIcon className="w-4 h-4" />
      </button>
    </div>
  );
};
