
import React, { useState, useCallback } from 'react';
import Card from './Card';
import Spinner from './Spinner';
import { generateAffirmation } from '../services/geminiService';

const MAX_FEELING_LENGTH = 200;

const AffirmationGenerator: React.FC = () => {
  const [feeling, setFeeling] = useState<string>('');
  const [generatedAffirmation, setGeneratedAffirmation] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleGenerate = useCallback(async () => {
    if (!feeling.trim()) {
      setError('請先分享您的感受。');
      return;
    }
    setIsLoading(true);
    setError('');
    setGeneratedAffirmation('');
    
    const result = await generateAffirmation(feeling);
    
    if (result.startsWith('抱歉') || result.startsWith('API')) {
        setError(result);
    } else {
        setGeneratedAffirmation(result);
    }

    setIsLoading(false);
  }, [feeling]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <div className="animate-fade-in space-y-6">
      <Card>
        <h2 className="text-lg font-semibold text-emerald-700 mb-2">AI 能量補給站</h2>
        <p className="text-slate-500 mb-4">分享您此刻的感受，讓 AI 為您提供一句溫暖的肯定。</p>
        <div className="relative">
          <textarea
            value={feeling}
            onChange={(e) => setFeeling(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="例如：今天感到有些不知所措..."
            className="w-full p-3 pr-4 border rounded-lg transition-shadow duration-200 resize-none bg-stone-100 text-slate-800 placeholder-slate-400 border-stone-300 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
            rows={3}
            maxLength={MAX_FEELING_LENGTH}
            disabled={isLoading}
            aria-label="分享您此刻的感受"
            aria-describedby="char-count"
          />
          <p id="char-count" className="absolute bottom-2 right-3 text-xs text-slate-400">
            {feeling.length} / {MAX_FEELING_LENGTH}
          </p>
        </div>
        <div className="mt-4 text-center">
            <button
              onClick={handleGenerate}
              disabled={isLoading || !feeling.trim()}
              className="inline-flex items-center justify-center bg-emerald-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors duration-300 shadow focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
            >
              {isLoading ? <Spinner /> : '產生專屬肯定'}
            </button>
        </div>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </Card>
      
      {generatedAffirmation && (
        <div className="animate-fade-in">
          <Card>
            <p className="text-2xl font-light text-slate-800 leading-relaxed text-center">
              "{generatedAffirmation}"
            </p>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AffirmationGenerator;
