import React from 'react';
import { BriefcaseIcon } from './Icons';

interface Portfolio {
  name: string;
  description: string;
  query: string;
  icon: React.ReactNode;
}

const fundIconColors = [
    'text-sky-400', 'text-rose-400', 'text-emerald-400', 'text-blue-400',
    'text-indigo-400', 'text-purple-400', 'text-pink-400', 'text-red-400',
    'text-orange-400', 'text-yellow-400', 'text-green-400', 'text-teal-400',
    'text-cyan-400', 'text-amber-400', 'text-lime-400', 'text-fuchsia-400'
];

const FUNDS_ETFS: Portfolio[] = [
  {
    name: "Berkshire Hathaway",
    description: "Warren Buffett",
    query: "Analyze Berkshire Hathaway's latest 13F filing. What are their largest holdings and recent changes?",
    icon: <BriefcaseIcon className={`w-8 h-8 ${fundIconColors[0]}`} />
  },
  {
    name: "Scion Asset Mgmt",
    description: "Michael Burry",
    query: "Analyze Michael Burry's Scion Asset Management portfolio from the latest 13F filing.",
    icon: <BriefcaseIcon className={`w-8 h-8 ${fundIconColors[1]}`} />
  },
   {
    name: "Bridgewater Associates",
    description: "Ray Dalio",
    query: "Analyze Ray Dalio's Bridgewater Associates portfolio based on the latest 13F filing.",
    icon: <BriefcaseIcon className={`w-8 h-8 ${fundIconColors[2]}`} />
  },
  {
    name: "Pershing Square",
    description: "Bill Ackman",
    query: "Analyze Bill Ackman's Pershing Square Capital Management portfolio based on the latest 13F filing.",
    icon: <BriefcaseIcon className={`w-8 h-8 ${fundIconColors[3]}`} />
  },
  {
    name: "Icahn Enterprises",
    description: "Carl Icahn",
    query: "Analyze Carl Icahn's Icahn Enterprises portfolio based on the latest 13F filing.",
    icon: <BriefcaseIcon className={`w-8 h-8 ${fundIconColors[4]}`} />
  },
  {
    name: "Greenlight Capital",
    description: "David Einhorn",
    query: "Analyze David Einhorn's Greenlight Capital portfolio based on the latest 13F filing.",
    icon: <BriefcaseIcon className={`w-8 h-8 ${fundIconColors[5]}`} />
  },
  {
    name: "Appaloosa Mgmt",
    description: "David Tepper",
    query: "Analyze David Tepper's Appaloosa Management portfolio based on the latest 13F filing.",
    icon: <BriefcaseIcon className={`w-8 h-8 ${fundIconColors[6]}`} />
  },
  {
    name: "Duquesne Family Office",
    description: "Stan Druckenmiller",
    query: "Analyze Stanley Druckenmiller's Duquesne Family Office portfolio based on the latest 13F filing.",
    icon: <BriefcaseIcon className={`w-8 h-8 ${fundIconColors[7]}`} />
  },
  {
    name: "Baupost Group",
    description: "Seth Klarman",
    query: "Analyze Seth Klarman's Baupost Group portfolio based on the latest 13F filing.",
    icon: <BriefcaseIcon className={`w-8 h-8 ${fundIconColors[8]}`} />
  },
  {
    name: "Citadel Advisors",
    description: "Ken Griffin",
    query: "Analyze Ken Griffin's Citadel Advisors portfolio based on the latest 13F filing.",
    icon: <BriefcaseIcon className={`w-8 h-8 ${fundIconColors[9]}`} />
  },
  {
    name: "Third Point",
    description: "Dan Loeb",
    query: "Analyze Dan Loeb's Third Point portfolio based on the latest 13F filing.",
    icon: <BriefcaseIcon className={`w-8 h-8 ${fundIconColors[10]}`} />
  },
  {
    name: "Soros Fund Mgmt",
    description: "George Soros",
    query: "Analyze George Soros's Soros Fund Management portfolio based on the latest 13F filing.",
    icon: <BriefcaseIcon className={`w-8 h-8 ${fundIconColors[11]}`} />
  },
  {
    name: "ARK Innovation ETF",
    description: "ARKK | Cathie Wood",
    query: "Analyze the holdings and recent performance of Cathie Wood's ARK Innovation ETF (ARKK).",
    icon: <BriefcaseIcon className={`w-8 h-8 ${fundIconColors[12]}`} />
  },
  {
    name: "SPDR S&P 500 ETF",
    description: "SPY | S&P 500 Index",
    query: "Analyze the holdings, sector allocation, and recent performance of the SPDR S&P 500 ETF (SPY).",
    icon: <BriefcaseIcon className={`w-8 h-8 ${fundIconColors[13]}`} />
  },
  {
    name: "Invesco QQQ Trust",
    description: "QQQ | Nasdaq-100",
    query: "Analyze the holdings, sector allocation, and recent performance of the Invesco QQQ Trust (QQQ).",
    icon: <BriefcaseIcon className={`w-8 h-8 ${fundIconColors[14]}`} />
  },
  {
    name: "Vanguard Total Market",
    description: "VTI | Total US Market",
    query: "Analyze the holdings, sector allocation, and recent performance of the Vanguard Total Stock Market ETF (VTI).",
    icon: <BriefcaseIcon className={`w-8 h-8 ${fundIconColors[15]}`} />
  },
];


const CONGRESS_MEMBERS_RAW = [
    "Nancy Pelosi", "Mark Green", "Josh Gottheimer", "Michael McCaul", "Daniel Goldman", "Kevin Hern", 
    "William Keating", "Ro Khanna", "Lois Frankel", "John Curtis", "Nicholas Van Taylor", "Susie Lee", 
    "Garret Graves", "Kathy Manning", "Douglas Lamborn", "Michael Garcia", "Scott Franklin", "Earl Blumenauer", 
    "Dwight Evans", "Blake Moore", "Deborah Ross", "John Rutherford", "Rick Larsen", "David Rouzer"
];

const congressIconColors = ['text-indigo-400', 'text-teal-400', 'text-purple-400', 'text-lime-400', 'text-cyan-400', 'text-fuchsia-400'];

const CONGRESS_MEMBERS: Portfolio[] = CONGRESS_MEMBERS_RAW.map((name, index) => ({
    name: name,
    description: "Analyze trades by this Congress member.",
    query: `Analyze the latest publicly disclosed stock trades made by Congress member ${name}.`,
    icon: <BriefcaseIcon className={`w-8 h-8 ${congressIconColors[index % congressIconColors.length]}`} />
}));


interface FamousPortfoliosProps {
    onSelect: (query: string) => void;
    isDisabled: boolean;
}

const PortfolioCard: React.FC<{ portfolio: Portfolio; onSelect: (query: string) => void; isDisabled: boolean; }> = ({ portfolio, onSelect, isDisabled }) => (
    <button 
        key={portfolio.name}
        onClick={() => onSelect(portfolio.query)}
        disabled={isDisabled}
        className="p-4 bg-slate-800/60 border border-slate-700/80 rounded-lg text-left h-full hover:bg-slate-700/60 hover:border-emerald-500/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-slate-700/80 group"
    >
        <div className="flex items-center justify-center w-12 h-12 bg-slate-900/50 rounded-lg mb-3 group-hover:bg-slate-800 transition-colors">
            {portfolio.icon}
        </div>
        <h3 className="font-semibold text-white">{portfolio.name}</h3>
        <p className="text-xs text-slate-400 mt-1">{portfolio.description}</p>
    </button>
);

const FamousPortfolios: React.FC<FamousPortfoliosProps> = ({ onSelect, isDisabled }) => {
    return (
        <div className="mt-10 space-y-10">
            <div>
                <h2 className="text-lg font-semibold text-slate-300 mb-4">Analyze Top Funds & ETFs</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {FUNDS_ETFS.map((portfolio) => (
                        <PortfolioCard key={portfolio.name} portfolio={portfolio} onSelect={onSelect} isDisabled={isDisabled} />
                    ))}
                </div>
            </div>
            <div>
                 <h2 className="text-lg font-semibold text-slate-300 mb-4">Analyze US Congress Member Trades</h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {CONGRESS_MEMBERS.map((portfolio) => (
                       <PortfolioCard key={portfolio.name} portfolio={portfolio} onSelect={onSelect} isDisabled={isDisabled} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FamousPortfolios;