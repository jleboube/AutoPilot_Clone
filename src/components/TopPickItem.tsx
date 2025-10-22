import React from 'react';
import { TopPick } from '../types';

export const TopPickItem: React.FC<{ pick: TopPick }> = ({ pick }) => (
    <div className="bg-slate-900/70 border border-slate-700 rounded-lg p-4 transition-transform hover:scale-[1.02] hover:border-emerald-500/50 shadow-lg">
        <div className="flex justify-between items-start">
            <div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${pick.type === 'Stock' ? 'bg-blue-900 text-blue-300' : 'bg-orange-900 text-orange-300'}`}>
                    {pick.type}
                </span>
                <h4 className="text-lg font-bold text-white mt-2">{pick.assetName} ({pick.ticker})</h4>
            </div>
            <div className="text-right flex-shrink-0 ml-4">
                 <p className="text-slate-400 text-sm">AI Score</p>
                 <p className="text-3xl font-bold text-emerald-400">{pick.score}<span className="text-xl text-slate-500">/10</span></p>
            </div>
        </div>
        <p className="text-slate-300 mt-3 text-sm">{pick.justification}</p>
    </div>
);
