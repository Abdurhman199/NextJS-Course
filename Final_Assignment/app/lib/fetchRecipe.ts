export interface Ingredient {
  quantity: number | null;
  unit: string;
  description: string;
}

export interface RecipeDetail {
  id: string;
  title: string;
  publisher: string;
  image_url: string;
  servings: number;
  cooking_time: number;
  source_url: string;
  ingredients: Ingredient[];
}

interface RecipeApiResponse {
  status: string;
  data: {
    recipe: RecipeDetail;
  };
}


export async function fetchRecipes(query: string) {
  const res = await fetch(
    `https://forkify-api.herokuapp.com/api/search?q=${query}`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch recipes");
  }

  const data = await res.json();

  return data.recipes as {
    recipe_id: string;
    title: string;
    image_url: string;
    publisher: string;
  }[];
}


export async function fetchRecipeById(
  id: string
): Promise<RecipeDetail> {
  const response = await fetch(
    `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch recipe");
  }

  const data: RecipeApiResponse =
    await response.json();

  return data.data.recipe;
}