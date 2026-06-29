"use client";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { useFavorites } from "../../context/FavoritesContext";

export default function FavoritesPage2() {
  const { favorites } = useFavorites();
  const [recipes, setRecipes] = useState<any[]>([]);

  useEffect(() => {
    const loadRecipes = async () => {
      const arr = [];

      for (let i = 0; i < favorites.length; i++) {

        if (favorites[i].length === 24){

          const response = await fetch(
          `https://forkify-api.jonas.io/api/v2/recipes/${favorites[i]}`
        );
        const json = await response.json();
        if (!json.data || !json.data.recipe) {
          console.warn("Invalid recipe response:", json);
          return;
        }
        arr.push(json.data.recipe);

        }

      }

      setRecipes(arr);
    };

    if (favorites.length > 0) {
      loadRecipes();
    }else{
      notFound();
        }
  }, [favorites]);
  
  return (
    <div>
      {recipes.map((recipe) => (


<div key={recipe.id}>

      <h1 className="text-2xl font-bold text-black">{recipe.title}</h1>
      <p className="text-sm text-neutral-500">By {recipe.publisher}</p>
      <p className="mt-1 text-neutral-500">{recipe.servings} servings · {recipe.cooking_time} minutes</p>
      <img src={recipe.image_url} alt={recipe.title} className="w-200 h-50 object-cover rounded-md" />

</div>


      ))}
    </div>
  );
}