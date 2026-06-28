"use client";

import { useState } from "react";
import RecipeTimer from "../components/RecipeTimer";

export default function TimerDemoPage() {
  const [recipeId, setRecipeId] = useState("pasta");

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">
        Recipe Timer Demo
      </h1>

      <div className="flex gap-4">
        <button
          onClick={() => setRecipeId("pasta")}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Pasta
        </button>

        <button
          onClick={() => setRecipeId("pizza")}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Pizza
        </button>
      </div>

      <p className="font-medium">
        Current Recipe: {recipeId}
      </p>

      <RecipeTimer
        recipeId={recipeId}
        cookingTime={1}
      />
    </div>
  );
}