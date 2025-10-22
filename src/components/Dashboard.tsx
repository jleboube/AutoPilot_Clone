import React, { useState, useCallback } from 'react';
import { AnalysisResult } from '../types';
import { getMarketAnalysis } from '../services/geminiService';
import SearchBar from './SearchBar';
import AnalysisCard from './AnalysisCard';
import Header from './Header';

const PRESET_QUERIES = [
  "Bitcoin (BTC)",
  "NVIDIA Corporation (NVDA)",
  "Tesla (TSLA)",
  "Ethereum (ETH)",
];

const Dashboard: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await getMarketAnalysis(searchQuery);
      setAnalysisResult(result);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const handlePresetClick = (presetQuery: string) => {
    setQuery(presetQuery);
    handleSearch(presetQuery);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <Header />
      <div className="mt-8">
        <SearchBar
          query={query}
          setQuery={setQuery}
          onSearch={handleSearch}
          isLoading={isLoading}
        />
        <div className="flex flex-wrap items-center mt-4 gap-2">
            <span className="text-sm text-slate-400">Try:</span>
            {PRESET_QUERIES.map(preset => (
                 <button 
                    key={preset}
                    onClick={() => handlePresetClick(preset)}
                    disabled={isLoading}
                    className="px-3 py-1 text-xs bg-slate-700 text-slate-300 rounded-full hover:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    {preset}
                </button>
            ))}
        </div>
      </div>
      
      <div className="mt-10">
        <AnalysisCard
          isLoading={isLoading}
          result={analysisResult}
          error={error}
          picks={null}
        />
      </div>
    </div>
  );
};

export default Dashboard;
