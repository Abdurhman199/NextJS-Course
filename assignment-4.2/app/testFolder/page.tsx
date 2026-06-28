"use client";

import RecipeCard from "../components/RecipeCard";

export default function Page() {
  return (
    <RecipeCard
      id="664c8f193e7aa067e94e86d6"
      title="Pizza"
      publisher="John Doe"
      cookingTime={30}
      servings={4}
      imageUrl="https://images.unsplash.com/photo-1513104890138-7c749659a591"
      status="available"
      notes="Great for dinner"
      onFavorite={(id) =>
        console.log(`Favorited recipe: ${id}`)
      }
    />
  );
}