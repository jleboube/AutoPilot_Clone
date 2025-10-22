import React from 'react';
import { ChartPieIcon } from './Icons';

const PortfolioPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <ChartPieIcon className="w-16 h-16 text-slate-600" />
      <h1 className="mt-6 text-3xl font-bold text-white">Your Portfolios</h1>
      <p className="mt-2 text-slate-400 max-w-md">
        Track your investment portfolios in one place. Connect your accounts or create a manual portfolio to get started.
      </p>
      <button className="mt-8 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-md hover:bg-emerald-500 transition-colors duration-200 shadow-md">
        Create New Portfolio
      </button>
    </div>
  );
};

export default PortfolioPage;
