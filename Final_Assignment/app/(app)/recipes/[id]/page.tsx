import { notFound } from "next/navigation";

export default async function RecipeDetailPage({ params }: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

    await new Promise((r) => setTimeout(r, 2000));

  const response = await fetch(`https://forkify-api.jonas.io/api/v2/recipes/${id}`);
  
  if (response.status === 404 || response.status === 400) {
    notFound();
  }else {
        console.log("correct status ");
  }

  if (!response.ok) {
    throw new Error(`Failed to load recipe: ${response.status}`);
  }
  
  const json = await response.json();
  const recipe = json.data.recipe;


  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-black">{recipe.title}</h1>
      <p className="text-sm text-neutral-500">By {recipe.publisher}</p>
      <p className="mt-1 text-neutral-500">{recipe.servings} servings · {recipe.cooking_time} minutes</p>

      <img src={recipe.image_url} alt={recipe.title} className="w-250 h-80 object-cover rounded-md" />

    </main>
  );
}
