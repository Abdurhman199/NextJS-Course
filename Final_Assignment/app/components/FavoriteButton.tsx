// components/FavoriteButton.tsx
'use client';

import { useFavorites } from '../hooks/useFavorites';

export function FavoriteButton({ id, title }: { id: string; title: string }) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorited = isFavorite(id);

  return (
    <button
      onClick={() =>
        favorited ? removeFavorite(id) : addFavorite({ id, title })
      }
      className={`px-3 py-1.5 rounded text-xs font-semibold ${
        favorited ? 'bg-amber-500 text-white' : 'bg-neutral-100 text-neutral-700'
      }`}
    >
      {favorited ? 'Saved' : 'Save recipe'}
    </button>
  );
}