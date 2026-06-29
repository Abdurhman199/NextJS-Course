// hooks/useFavorites.ts
'use client';

import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

interface SavedRecipe {
  id: string;
  title: string;
}

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<SavedRecipe[]>(
    'recipe-favorites',
    []
  );

  const addFavorite = useCallback((recipe: SavedRecipe) => {
    setFavorites(prev => {
      if (prev.some(f => f.id === recipe.id)) return prev; // prevent duplicates
      return [...prev, recipe];
    });
  }, [setFavorites]);

  const removeFavorite = useCallback((id: string) => {
    setFavorites(prev => prev.filter(f => f.id !== id));
  }, [setFavorites]);

  const isFavorite = useCallback(
    (id: string) => favorites.some(f => f.id === id),
    [favorites]
  );

  return { favorites, addFavorite, removeFavorite, isFavorite };
}