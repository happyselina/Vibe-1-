import React, { useState, useCallback, useEffect } from 'react';
import { View } from './types';
import Header from './components/Header';
import DailyAffirmation from './components/DailyAffirmation';
import AffirmationGenerator from './components/AffirmationGenerator';
import GratitudeJournal from './components/GratitudeJournal';
import Favorites from './components/Favorites';
import Footer from './components/Footer';
import { DAILY_AFFIRMATIONS } from './constants';

type Affirmation = { zh: string; en: string };

const loadFromStorage = (key: string): Affirmation[] => {
    try {
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : [];
    } catch (error) {
        console.error(`Failed to load ${key} from localStorage`, error);
        return [];
    }
};

const saveToStorage = (key: string, data: Affirmation[]) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error(`Failed to save ${key} to localStorage`, error);
    }
};

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>(View.Daily);
  const [favorites, setFavorites] = useState<Affirmation[]>(() => loadFromStorage('favoriteAffirmations'));
  const [seenAffirmations, setSeenAffirmations] = useState<Affirmation[]>(() => loadFromStorage('seenAffirmations'));
  const [currentAffirmation, setCurrentAffirmation] = useState<Affirmation | null>(null);

  useEffect(() => {
    saveToStorage('favoriteAffirmations', favorites);
  }, [favorites]);

  useEffect(() => {
    saveToStorage('seenAffirmations', seenAffirmations);
  }, [seenAffirmations]);
  
  const selectNewAffirmation = useCallback(() => {
    let currentSeen = seenAffirmations;
    const unavailableZh = new Set([
        ...favorites.map(f => f.zh), 
        ...currentSeen.map(s => s.zh)
    ]);
    
    let available = DAILY_AFFIRMATIONS.filter(a => !unavailableZh.has(a.zh));

    if (available.length === 0 && DAILY_AFFIRMATIONS.length > favorites.length) {
      // Reset seen if exhausted and there are non-favorited affirmations available.
      currentSeen = [];
      setSeenAffirmations([]);
      const favoritesZh = new Set(favorites.map(f => f.zh));
      available = DAILY_AFFIRMATIONS.filter(a => !favoritesZh.has(a.zh));
    }
    
    // Avoid picking the same one that is currently displayed.
    let filteredAvailable = available.filter(a => a.zh !== currentAffirmation?.zh);
    if (filteredAvailable.length === 0) {
        filteredAvailable = available; // If only one option left, allow it.
    }
    
    if (filteredAvailable.length > 0) {
        const newAffirmation = filteredAvailable[Math.floor(Math.random() * filteredAvailable.length)];
        setCurrentAffirmation(newAffirmation);
        setSeenAffirmations([...currentSeen, newAffirmation]);
    } else if (favorites.length >= DAILY_AFFIRMATIONS.length) {
        setCurrentAffirmation({ zh: "您已將所有提醒加入收藏！", en: "You have favorited all affirmations!" });
    } else {
        setCurrentAffirmation({ zh: "您已看過所有提醒。休息一下，感受內心的平靜吧。", en: "You've seen all the reminders. Take a rest and feel the peace within." });
    }
  }, [favorites, seenAffirmations, currentAffirmation]);

  useEffect(() => {
    if (activeView === View.Daily && !currentAffirmation) {
        selectNewAffirmation();
    }
  }, [activeView, currentAffirmation, selectNewAffirmation]);


  const addFavorite = (affirmation: Affirmation) => {
    if (!favorites.some(fav => fav.zh === affirmation.zh)) {
      setFavorites([...favorites, affirmation]);
    }
  };

  const removeFavorite = (affirmation: Affirmation) => {
    setFavorites(favorites.filter(fav => fav.zh !== affirmation.zh));
  };


  const renderView = useCallback(() => {
    switch (activeView) {
      case View.Daily:
        return <DailyAffirmation 
                    affirmation={currentAffirmation}
                    handleRefresh={selectNewAffirmation}
                    favorites={favorites} 
                    addFavorite={addFavorite} 
                    removeFavorite={removeFavorite} 
                />;
      case View.Generator:
        return <AffirmationGenerator />;
      case View.Journal:
        return <GratitudeJournal />;
      case View.Favorites:
        return <Favorites favorites={favorites} removeFavorite={removeFavorite} />;
      default:
        return <DailyAffirmation
                    affirmation={currentAffirmation}
                    handleRefresh={selectNewAffirmation}
                    favorites={favorites} 
                    addFavorite={addFavorite} 
                    removeFavorite={removeFavorite}
                />;
    }
  }, [activeView, favorites, currentAffirmation, selectNewAffirmation]);

  return (
    <div className="flex flex-col min-h-screen font-sans text-slate-700">
      <div className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-2xl mx-auto">
          <Header activeView={activeView} setActiveView={setActiveView} />
          <main className="mt-6">
            {renderView()}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;