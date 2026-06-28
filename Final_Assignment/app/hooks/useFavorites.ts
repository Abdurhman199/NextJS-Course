"use client";

import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }

  const {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
  } = context;

  const isFavorite = (id: string) => {
    return favorites.includes(id);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
  };
}