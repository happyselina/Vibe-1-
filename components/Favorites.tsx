import React from 'react';
import Card from './Card';

type Affirmation = { zh: string; en: string };

interface FavoritesProps {
    favorites: Affirmation[];
    removeFavorite: (affirmation: Affirmation) => void;
}

const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const Favorites: React.FC<FavoritesProps> = ({ favorites, removeFavorite }) => {
    return (
        <div className="animate-fade-in space-y-6">
            <Card>
                <h2 className="text-lg font-semibold text-emerald-700 mb-4">我的收藏</h2>
                {favorites.length > 0 ? (
                    <ul className="space-y-4">
                        {favorites.map((item) => (
                            <li 
                                key={item.zh} 
                                className="group flex items-start justify-between gap-4 text-slate-700 bg-stone-50 p-4 rounded-lg border border-stone-200/80"
                            >
                                <div className="flex-grow">
                                    <p className="font-light text-slate-800 leading-relaxed">"{item.zh}"</p>
                                    <p className="mt-2 text-sm font-light text-slate-500 leading-relaxed">{item.en}</p>
                                </div>
                                <button
                                    onClick={() => removeFavorite(item)}
                                    className="p-2 -mr-2 -mt-2 flex-shrink-0 rounded-full text-slate-400 hover:bg-rose-100/80 hover:text-rose-500 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all"
                                    aria-label="移除收藏"
                                >
                                    <TrashIcon className="w-5 h-5" />
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-slate-500 text-center py-8">您尚未收藏任何提醒。</p>
                )}
            </Card>
        </div>
    );
};

export default Favorites;
