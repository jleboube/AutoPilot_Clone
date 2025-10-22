import React, { useState, useCallback } from 'react';
import { AnalysisResult, TopPick } from '../types';
import { getMarketAnalysis, getTopPicks } from '../services/geminiService';
import AnalysisCard from './AnalysisCard';
import FamousPortfolios from './FamousPortfolios';
import { SparklesIcon } from './Icons';
import { useProfile } from '../context/ProfileContext';

const AIPicksPage: React.FC = () => {
  // State for single portfolio analysis
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // State for top market picks
  const [topPicks, setTopPicks] = useState<TopPick[] | null>(null);
  const [isPicking, setIsPicking] = useState<boolean>(false);
  const [picksError, setPicksError] = useState<string | null>(null);

  const { addHistoricalPicks } = useProfile();

  const handlePortfolioAnalysis = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    // Clear top picks state
    setTopPicks(null);
    setPicksError(null);

    try {
      const result = await getMarketAnalysis(searchQuery);
      setAnalysisResult(result);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const handleAutoPick = useCallback(async () => {
    setIsPicking(true);
    setPicksError(null);
    setTopPicks(null);
    // Clear single-search state
    setAnalysisResult(null);
    setError(null);

    try {
        const result = await getTopPicks();
        setTopPicks(result);
        // Save picks to user's profile history if successful
        if (result.length > 0) {
            addHistoricalPicks(result);
        }
    } catch (err: any) {
        setPicksError(err.message || 'An unexpected error occurred while picking stocks.');
    } finally {
        setIsPicking(false);
    }
  }, [addHistoricalPicks]);

  const isBusy = isLoading || isPicking;

  return (
    <div className="max-w-5xl mx-auto">
       <header>
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            AI-Powered Opportunities
        </h1>
        <p className="mt-2 text-slate-400">
            Discover top market picks or analyze the strategies of famous investors.
        </p>
      </header>

      <div className="mt-8 p-6 bg-slate-800/40 border border-slate-700/50 rounded-lg">
         <h2 className="text-lg font-semibold text-slate-300">Scan The Market</h2>
         <p className="text-sm text-slate-400 mt-1 mb-4">Let our AI find the top 3-5 investment opportunities right now.</p>
         <button 
            onClick={handleAutoPick}
            disabled={isBusy}
            className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-semibold rounded-md hover:bg-emerald-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors duration-200 shadow-md">
            <SparklesIcon className="w-5 h-5 mr-2" />
            {isPicking ? 'Scanning...' : 'Find Top Market Picks'}
        </button>
      </div>

      <FamousPortfolios onSelect={handlePortfolioAnalysis} isDisabled={isBusy} />
      
      <div className="mt-10">
        <AnalysisCard
          isLoading={isBusy}
          result={analysisResult}
          error={error || picksError}
          picks={topPicks}
        />
      </div>
    </div>
  );
};

export default AIPicksPage;
