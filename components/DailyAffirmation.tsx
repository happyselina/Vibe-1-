import React, { useState, useEffect } from 'react';
import Card from './Card';

type Affirmation = { zh: string; en: string };

interface DailyAffirmationProps {
    affirmation: Affirmation | null;
    handleRefresh: () => void;
    favorites: Affirmation[];
    addFavorite: (affirmation: Affirmation) => void;
    removeFavorite: (affirmation: Affirmation) => void;
}

const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const RefreshIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 4 23 10 17 10"></polyline>
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
    </svg>
);

const HeartIcon: React.FC<{ className?: string, isFilled?: boolean }> = ({ className, isFilled }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill={isFilled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
    </svg>
);


const DailyAffirmation: React.FC<DailyAffirmationProps> = ({ affirmation, handleRefresh, favorites, addFavorite, removeFavorite }) => {
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    setIsCompleted(false);
  }, [affirmation]);

  if (!affirmation) {
    return (
        <Card>
            <p className="text-slate-500 text-center py-10">正在為您準備今日的肯定...</p>
        </Card>
    );
  }

  const isFavorite = favorites.some(fav => fav.zh === affirmation.zh);

  const handleToggleCompletion = () => {
    setIsCompleted(prevState => !prevState);
  };
  
  const handleToggleFavorite = () => {
      if (!affirmation.zh) return;
      if (isFavorite) {
          removeFavorite(affirmation);
      } else {
          addFavorite(affirmation);
      }
  };

  return (
    <div className="animate-fade-in">
      <Card>
        <div className="flex justify-between items-start mb-4">
            <h2 className="text-lg font-semibold text-emerald-700 pt-1">今日的溫柔提醒</h2>
            <div className="flex items-center gap-1">
                <button
                    onClick={handleToggleFavorite}
                    className={`p-2 rounded-full transition-colors ${isFavorite ? 'text-rose-500 hover:bg-rose-100/60' : 'text-slate-500 hover:bg-stone-200/60 hover:text-slate-600'}`}
                    aria-label={isFavorite ? '從收藏移除' : '加入收藏'}
                    disabled={affirmation.zh.includes('所有提醒')}
                >
                    <HeartIcon className="w-5 h-5" isFilled={isFavorite} />
                </button>
                <button
                    onClick={handleRefresh}
                    className="p-2 rounded-full text-slate-500 hover:bg-stone-200/60 hover:text-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 transition-colors"
                    aria-label="換一句溫柔提醒"
                >
                    <RefreshIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
        <div>
            <p className="text-2xl font-light text-slate-800 leading-relaxed">
              "{affirmation.zh}"
            </p>
            <p className="mt-3 text-lg font-light text-slate-500 leading-relaxed">
              {affirmation.en}
            </p>
        </div>
        <div className="mt-6 border-t border-stone-200/80 pt-5">
          <div className="text-sm text-slate-600 leading-relaxed mb-6 p-4 bg-emerald-50/50 rounded-lg">
            <p>根據心理學的<b>自我肯定理論 (Self-affirmation theory)</b> 與<b>言語化效應 (Verbalization effect)</b>，把文字念出來，比默讀更能強化記憶與自我信念。請輕聲朗讀今日的溫柔提醒，讓力量在聲音中展現。</p>
          </div>
          <div className="text-center">
            <button
              onClick={handleToggleCompletion}
              className={`inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-3 text-base font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isCompleted
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500 shadow-sm'
                  : 'bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50 focus:ring-emerald-400'
              }`}
              aria-pressed={isCompleted}
            >
              <CheckCircleIcon className={`w-6 h-6 transition-transform duration-300 ${isCompleted ? 'transform scale-110' : ''}`} />
              <span>
                {isCompleted ? '今日肯定已完成 (點此撤銷)' : '我已輕聲朗讀'}
              </span>
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DailyAffirmation;