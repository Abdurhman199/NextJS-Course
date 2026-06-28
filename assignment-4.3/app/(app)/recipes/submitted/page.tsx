"use client";

import { useEffect, useState } from "react";

interface StoredRecipe {
  id: string;
  title: string;
  publisher: string;
  cookingTime: number;
  servings: number;
  imageUrl: string;
  submittedAt: string;
}

interface ApiResponse {
  count: number;
  recipes: StoredRecipe[];
}

export default function SubmittedRecipesPage() {
  const [recipes, setRecipes] = useState<StoredRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await fetch("/api/recipes/submissions");

        if (!response.ok) {
          throw new Error("Failed to fetch recipes.");
        }

        const data: ApiResponse = await response.json();

        setRecipes(data.recipes);
      } catch {
        setError("Unable to load submitted recipes.");
      } finally {
        setLoading(false);
      }
    }

    fetchRecipes();
  }, []);

  if (loading) {
    return (
      <main className="p-6">
        <h1 className="text-3xl font-bold mb-4">
          Submitted Recipes
        </h1>

        <p>Loading recipes...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-6">
        <h1 className="text-3xl font-bold mb-4">
          Submitted Recipes
        </h1>

        <p className="text-red-600">{error}</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Submitted Recipes
      </h1>

      {recipes.length === 0 ? (
        <p>No recipes have been submitted yet.</p>
      ) : (
        <div className="space-y-4">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="rounded-lg border bg-white p-4 shadow"
            >
              <h2 className="text-xl font-semibold">
                {recipe.title}
              </h2>

              <p>
                <strong>Publisher:</strong> {recipe.publisher}
              </p>

              <p>
                <strong>Cooking Time:</strong>{" "}
                {recipe.cookingTime} minutes
              </p>

              <p>
                <strong>Servings:</strong> {recipe.servings}
              </p>

              <p className="text-sm text-gray-500 mt-2">
                Submitted on{" "}
                {new Date(
                  recipe.submittedAt
                ).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}