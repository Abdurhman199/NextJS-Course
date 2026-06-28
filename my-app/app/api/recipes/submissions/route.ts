import { NextRequest, NextResponse } from "next/server";
import { recipeSchema, RecipeFormOutput } from "../../../lib/schemas/recipe";

export interface StoredRecipe extends RecipeFormOutput {
  id: string;
  submittedAt: string;
}

// Temporary in-memory storage
const submittedRecipes: StoredRecipe[] = [];

/**
 * GET /api/recipes/submissions
 */
export async function GET() {
  return NextResponse.json(
    {
      count: submittedRecipes.length,
      recipes: submittedRecipes,
    },
    { status: 200 }
  );
}

/**
 * POST /api/recipes/submissions
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = recipeSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          errors: result.error.flatten().fieldErrors,
        },
        {
          status: 422,
        }
      );
    }

    const recipe: StoredRecipe = {
      ...result.data,
      id: crypto.randomUUID(),
      submittedAt: new Date().toISOString(),
    };

    submittedRecipes.push(recipe);

    return NextResponse.json(recipe, {
      status: 201,
    });
  } catch {
    return NextResponse.json(
      {
        message: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}