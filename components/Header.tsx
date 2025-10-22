
import React from 'react';

const Header: React.FC = () => {
  return (
    <header>
      <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
        AI Investment Analyst
      </h1>
      <p className="mt-2 text-slate-400">
        Get real-time, AI-powered analysis of stocks, crypto, and portfolios.
      </p>
    </header>
  );
};

export default Header;
