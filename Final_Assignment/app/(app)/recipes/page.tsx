import "tailwindcss";
import Link from "next/link";
import { fetchRecipes } from "../../lib/fetchRecipe";
import RecipeSearch from "../../components/RecipeSearch";




interface RecipeSummary {
  id: string;
  title: string;
  publisher: string;
  image_url: string;
}

interface ForkifySearchResponse {
  status: string;
  results: number;
  data: {
    recipes: RecipeSummary[];
  };
}

export default async function RecipesPage({searchParams}: {
  searchParams: Promise<{ search?: string }>;
}) {

    const { search = "pizza" } = await searchParams;


  await new Promise((resolve) => setTimeout(resolve, 2000));

  
  const response = await fetch(
    `https://forkify-api.jonas.io/api/v2/recipes?search=${search}`,
  );

  if (!response.ok) {
    throw new Error(`Forkify search failed with status ${response.status}`);
  }



  const json: ForkifySearchResponse = await response.json();
  const recipes = json.data.recipes;
  //const initialRecipes = await fetchRecipes("pizza");
      console.log("recipe ----> ");
      console.log(recipes);

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold tracking-tight text-black">{search} Recipes</h1>



      <form className="mt-4">
        <label className="text-black" htmlFor="search">Choose a recipe:</label>
        <select
          id="search"
          name="search"
          defaultValue={search}
          className="ml-2 rounded border px-3 py-2 text-black"
        >




          <option value="pizza">Pizza 🍕</option>
          <option value="pasta">Pasta 🍝</option>
          <option value="burger">Burger 🍔</option>
          <option value="salad">Salad 🥗</option>
        </select>
        <button
          type="submit"
          className="ml-2 rounded bg-blue-500 px-4 py-2 text-white"
        >
          Search
        </button>
      </form>




      <p className="text-sm text-neutral-500 mt-1">{json.results} recipes found</p>

<ul className="mt-6 space-y-3">
    {recipes.map((recipe) => (
    <Link
      key={recipe.id}
      href={`/recipes/${recipe.id}`}
    >
      <li className="p-3 border rounded-lg bg-white flex items-center gap-4 text-black">
        <img
          src={recipe.image_url}
          alt={recipe.title}
          className="w-16 h-16 object-cover rounded-md"
        />
        <div>
          <p className="font-semibold">{recipe.title}</p>
          <p className="text-sm text-neutral-500">{recipe.publisher}</p>
        </div>
      </li>
    </Link>
  ))}
</ul>
    </main>
  );
}