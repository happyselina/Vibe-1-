
import React, { useState, useEffect, useCallback } from 'react';
import Card from './Card';

interface GratitudeEntry {
  id: number;
  text: string;
  date: string;
}

const GratitudeJournal: React.FC = () => {
  const [entry, setEntry] = useState('');
  const [entries, setEntries] = useState<GratitudeEntry[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    try {
      const savedEntries = localStorage.getItem('gratitudeEntries');
      if (savedEntries) {
        const parsed = JSON.parse(savedEntries);
        // Basic validation to ensure it's the new format
        if (Array.isArray(parsed) && parsed.every(item => typeof item === 'object' && 'text' in item && 'id' in item)) {
          setEntries(parsed);
        }
      }
    } catch (error) {
      console.error("Failed to load entries from localStorage", error);
    }
  }, []);

  const handleAddEntry = useCallback(() => {
    if (entry.trim()) {
      const newEntry: GratitudeEntry = {
        id: Date.now(),
        text: entry.trim(),
        date: new Date().toLocaleDateString('zh-TW', { month: 'long', day: 'numeric' }),
      };
      const newEntries = [newEntry, ...entries.slice(0, 4)]; // Keep latest 5
      setEntries(newEntries);
      try {
        localStorage.setItem('gratitudeEntries', JSON.stringify(newEntries));
      } catch (error) {
        console.error("Failed to save entry to localStorage", error);
      }
      setEntry('');
      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 2000);
    }
  }, [entry, entries]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      handleAddEntry();
    }
  };


  return (
    <div className="animate-fade-in space-y-6">
      <Card>
        <h2 className="text-lg font-semibold text-emerald-700 mb-2">感恩角落</h2>
        <p className="text-slate-500 mb-4">寫下今天值得感謝的一件事，無論多小，都是一份禮物。</p>
        <textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="今天，我感謝..."
            className="w-full p-3 border rounded-lg transition-shadow duration-200 resize-none bg-stone-100 text-slate-800 placeholder-slate-400 border-stone-300 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
            rows={3}
            aria-label="寫下感恩事項"
          />
        <div className="mt-3 text-center">
          <button
            onClick={handleAddEntry}
            disabled={!entry.trim()}
            className="inline-flex bg-emerald-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors duration-300 shadow focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
          >
            儲存我的感謝
          </button>
        </div>
        {showConfirmation && (
          <p className="text-green-600 mt-3 text-center animate-fade-in">感謝已被珍藏。</p>
        )}
      </Card>
      
      {entries.length > 0 && (
        <Card>
          <h3 className="text-md font-semibold text-slate-600 mb-4">最近的感謝</h3>
          <ul className="space-y-4">
            {entries.map((item) => (
              <li key={item.id} className="text-slate-700 bg-stone-50 p-4 rounded-lg border border-stone-200/80 animate-fade-in">
                <p className="mb-1 whitespace-pre-wrap">{item.text}</p>
                <p className="text-xs text-slate-400 text-right">{item.date}</p>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
};

export default GratitudeJournal;
