"use client";

import Link from "next/link";
import { useFavorites } from "../../context/FavoritesContext";

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Favorites</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-500">No favorites yet.</p>
      ) : (
        <ul className="space-y-3">
          {favorites.map((id) => (
            <li
              key={id}
              className="flex items-center justify-between border p-3 rounded"
            >
              <Link
                href={`/recipes/${id}`}
                className="text-blue-600 underline"
              >
                Recipe ID: {id}
              </Link>

              <button
                onClick={() => removeFavorite(id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}