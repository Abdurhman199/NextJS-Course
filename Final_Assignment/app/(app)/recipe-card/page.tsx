"use client";

import { id } from "zod/locales";
import RecipeCard from "../../components/RecipeCard";
import { useFavorites } from "../../context/FavoritesContext";

export default function RecipeCardPage() {
  const { toggleFavorite, favorites } = useFavorites();
  const idString = String(id);  
  
  return (
    <main className="flex max-w-full">
      <div className="px-3">
      <RecipeCard
        id="5ed6604591c37cdc054bc886"
        title="Pizza"
        publisher="John Doe"
        cookingTime={30}
        servings={4}
        imageUrl="http://forkify-api.herokuapp.com/images/FlatBread21of1a180.jpg"
        status="unavailable"
        notes="Great for dinner!"
        onFavorite={toggleFavorite}
      />
</div>
      <div className="px-3">
            <RecipeCard
        id="664c8f193e7aa067e94e8684"
        title="Pasta"
        publisher="Maike Jo"
        cookingTime={40}
        servings={2}
        imageUrl="http://forkify-api.herokuapp.com/images/pestoa0e7.jpg"
        status="available"
        notes="Great for Lanch!"
        onFavorite={toggleFavorite}
        
      />
      </div>
    </main>
  );
}

