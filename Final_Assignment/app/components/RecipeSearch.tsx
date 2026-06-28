"use client";

import { useState } from "react";
import Image from "next/image";

type Recipe = {
  recipe_id: string;
  title: string;
  image_url: string;
  publisher: string;
};

export default function RecipeSearch({
  initialRecipes,
}: {
  initialRecipes: Recipe[];
}) {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const searchRecipes = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);

    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/search?q=${query}`
    );

    const data = await res.json();

    setRecipes(data.recipes || []);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <form onSubmit={searchRecipes} className="flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search recipes..."
          className="border p-2 rounded w-full"
        />
        <button className="bg-black text-white px-4 rounded">
          Search
        </button>
      </form>

      {/* Loading state */}
      {loading && (
        <p className="text-gray-500">Loading recipes...</p>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <div
            key={recipe.recipe_id}
            className="border rounded overflow-hidden"
          >
            <Image
              src={recipe.image_url}
              alt={recipe.title}
              width={500}
              height={300}
              className="w-full h-48 object-cover"
            />

            <div className="p-3">
              <h3 className="font-semibold">{recipe.title}</h3>
              <p className="text-sm text-gray-500">
                {recipe.publisher}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}