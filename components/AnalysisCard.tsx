import React, { useState } from 'react';
import { AnalysisResult, TopPick } from '../types';
import { LinkIcon, SparklesIcon, CubeIcon, CheckCircleIcon } from './Icons';
import { useWatchlist } from '../context/WatchlistContext';

interface AnalysisCardProps {
  isLoading: boolean;
  result: AnalysisResult | null;
  error: string | null;
  picks: TopPick[] | null;
}

const SkeletonLoader: React.FC = () => (
    <div className="animate-pulse space-y-6">
      <div className="h-6 bg-slate-700 rounded-md w-1/3"></div>
      <div className="space-y-3">
        <div className="h-4 bg-slate-700 rounded-md w-full"></div>
        <div className="h-4 bg-slate-700 rounded-md w-5/6"></div>
      </div>
      <div className="h-6 bg-slate-700 rounded-md w-1/4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-slate-700 rounded-md w-full"></div>
        <div className="h-4 bg-slate-700 rounded-md w-full"></div>
        <div className="h-4 bg-slate-700 rounded-md w-3/4"></div>
      </div>
    </div>
);

const WelcomeMessage: React.FC = () => (
    <div className="text-center py-16">
        <h2 className="text-2xl font-semibold text-white">Ready for Insights?</h2>
        <p className="mt-2 text-slate-400">Enter a stock ticker, cryptocurrency, or portfolio name to begin your AI-powered analysis.</p>
    </div>
);

const FormattedAnalysis: React.FC<{ text: string }> = ({ text }) => {
    const formattedText = text
        .replace(/### (.*?)\n/g, '<h3 class="text-xl font-semibold text-emerald-400 mt-6 mb-3">$1</h3>')
        .replace(/\*\*AI-Powered Recommendation: (.*?)\*\*/g, '<strong class="text-emerald-300">$1</strong>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br />');

    return <div className="prose prose-invert prose-p:text-slate-300 prose-strong:text-slate-100" dangerouslySetInnerHTML={{ __html: formattedText }} />;
};

const TopPickItem: React.FC<{ pick: TopPick }> = ({ pick }) => (
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

const TopPicksDisplay: React.FC<{ picks: TopPick[] }> = ({ picks }) => {
    const { addAssets } = useWatchlist();
    const [added, setAdded] = useState(false);

    const handleAddPicks = () => {
        addAssets(picks);
        setAdded(true);
        setTimeout(() => setAdded(false), 3000); // Reset after 3 seconds
    };

    if (picks.length === 0) {
        return (
            <div className="text-center py-16">
                <CubeIcon className="w-12 h-12 mx-auto text-slate-600" />
                <h2 className="mt-4 text-2xl font-semibold text-white">No High-Conviction Picks Found</h2>
                <p className="mt-2 text-slate-400">The AI analyst scanned the markets but did not find any assets meeting the high-score criteria (8+/10) at this time. Check back later for new opportunities.</p>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center mb-6">
                 <SparklesIcon className="w-8 h-8 text-emerald-400" />
                 <h3 className="text-2xl font-bold text-white ml-3">AI's Top Investment Picks</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {picks.map((pick, index) => <TopPickItem key={index} pick={pick} />)}
            </div>
            <div className="mt-8 text-center">
                 <button
                    onClick={handleAddPicks}
                    disabled={added}
                    className={`inline-flex items-center justify-center px-6 py-3 font-semibold rounded-md transition-colors duration-200 shadow-md ${
                        added
                            ? 'bg-green-700 text-white cursor-not-allowed'
                            : 'bg-emerald-600 text-white hover:bg-emerald-500'
                    }`}
                >
                    {added ? (
                        <>
                            <CheckCircleIcon className="w-5 h-5 mr-2" />
                            Added!
                        </>
                    ) : (
                        "Add Picks to Watchlists"
                    )}
                </button>
            </div>
        </div>
    );
};

const AnalysisCard: React.FC<AnalysisCardProps> = ({ isLoading, result, error, picks }) => {

  const renderContent = () => {
    if (isLoading) return <SkeletonLoader />;
    if (error) return <div className="text-red-400 bg-red-900/50 p-4 rounded-md">{error}</div>;
    
    // Prioritize showing top picks if they exist
    if (picks !== null) return <TopPicksDisplay picks={picks} />;
    
    // Then show single analysis result
    if (result) {
      return (
        <>
          <FormattedAnalysis text={result.analysisText} />
          {result.sources.length > 0 && (
            <div className="mt-8 border-t border-slate-700 pt-4">
              <h4 className="text-sm font-semibold text-slate-400 mb-3">Data Sources</h4>
              <ul className="space-y-2">
                {result.sources.map((source, index) => (
                  <li key={index} className="flex items-start">
                    <LinkIcon className="w-4 h-4 text-slate-500 mr-2 mt-1 flex-shrink-0" />
                    <a
                      href={source.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 text-xs truncate transition-colors"
                      title={source.title}
                    >
                      {source.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      );
    }
    
    // Fallback to the welcome message
    return <WelcomeMessage />;
  }

  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 md:p-8 min-h-[300px] shadow-2xl shadow-slate-950/30">
      {renderContent()}
    </div>
  );
};

export default AnalysisCard;