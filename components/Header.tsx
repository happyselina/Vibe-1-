import React from 'react';
import { View } from '../types';

interface HeaderProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

const LeafIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c-2.8 2.34-2.2 6.42-5 9.24" />
    <path d="M12 15V12c0-3 2-5 5-5" />
  </svg>
);

const HeartIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
    </svg>
);


const Header: React.FC<HeaderProps> = ({ activeView, setActiveView }) => {
  const navItems = [
    { view: View.Daily, label: '每日肯定' },
    { view: View.Generator, label: 'AI 能量補給' },
    { view: View.Journal, label: '感恩角落' },
  ];

  const getButtonClass = (view: View): string => {
    const baseClass = "px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2";
    if (activeView === view) {
      return `${baseClass} bg-emerald-600 text-white shadow-sm`;
    }
    return `${baseClass} text-slate-600 hover:bg-emerald-100`;
  };

  return (
    <header className="text-center">
      <div className="relative">
        <div className="flex items-center justify-center gap-3 mb-6">
          <LeafIcon className="w-8 h-8 text-emerald-600" />
          <h1 className="text-3xl sm:text-4xl font-bold text-emerald-700 tracking-tight">
            心靈綠洲
          </h1>
        </div>
        <button
          onClick={() => setActiveView(View.Favorites)}
          className="absolute top-1/2 right-0 -translate-y-1/2 -mt-3 p-2 rounded-full text-slate-500 hover:bg-stone-200/60 hover:text-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 transition-colors"
          aria-label="查看收藏的提醒"
        >
          <HeartIcon className="w-6 h-6" />
        </button>
      </div>
      <p className="text-slate-500 max-w-md mx-auto">一個專為高敏感族的寧靜空間，滋養您的內心世界。</p>
      <nav className="mt-8 flex justify-center items-center gap-2 sm:gap-4 p-2 bg-stone-100 rounded-full">
        {navItems.map(item => (
          <button
            key={item.view}
            onClick={() => setActiveView(item.view)}
            className={getButtonClass(item.view)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
};

export default Header;