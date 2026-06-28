"use client";

import { useFavorites } from "../context/FavoritesContext";

export default function FavoriteButton({ id }: { id: string }) {
  const { favorites, toggleFavorite } = useFavorites();

  const isFavorite = favorites.includes(id);

  return (
    <button
      onClick={() => toggleFavorite(id)}
      className={`px-4 py-2 rounded ${
        isFavorite
          ? "bg-green-600 text-white"
          : "bg-gray-200 dark:bg-gray-700"
      }`}
    >
      {isFavorite ? "Saved" : "Save"}
    </button>
  );
}