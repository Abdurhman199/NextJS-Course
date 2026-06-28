"use client";

import { useState } from "react";

export interface RecipeCardProps {
  id: string;
  title: string;
  publisher: string;
  cookingTime: number;
  servings: number;
  imageUrl: string;
  status: "available" | "unavailable";
  onFavorite: (id: string) => void;
  notes?: string;
}

export default function RecipeCard({
  id,
  title,
  publisher,
  cookingTime,
  servings,
  imageUrl,
  status,
  onFavorite,
  notes,
}: RecipeCardProps) {
  const [noteText, setNoteText] = useState("");

  const handleNoteChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNoteText(event.target.value);
  };

  return (
    <div className="rounded-xl border bg-white p-4 shadow-md">
      <img
        src={imageUrl}
        alt={title}
        className="mb-4 h-48 w-full rounded-lg object-cover"
      />

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{title}</h2>

        <span
          className={`rounded-full px-3 py-1 text-sm font-medium text-white ${
            status === "available"
              ? "bg-green-500"
              : "bg-red-500"
          }`}
        >
          {status}
        </span>
      </div>

      <p className="mt-2 text-gray-600">
        Publisher: {publisher}
      </p>

      <p className="text-gray-600">
        Cooking Time: {cookingTime} min
      </p>

      <p className="text-gray-600">
        Servings: {servings}
      </p>

      {notes && (
        <div className="mt-3 rounded bg-gray-100 p-2">
          <p className="text-sm">
            <strong>Notes:</strong> {notes}
          </p>
        </div>
      )}

      <div className="mt-4">
        <label className="mb-1 block text-sm font-medium">
          Quick Note
        </label>

        <input
          type="text"
          value={noteText}
          onChange={handleNoteChange}
          placeholder="Add a note..."
          className="w-full rounded border p-2"
        />
      </div>

      <button
        onClick={() => onFavorite(id)}
        className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Favorite
      </button>
    </div>
  );
}