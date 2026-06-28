import { z } from "zod";

export const recipeSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters.")
    .max(80, "Title cannot exceed 80 characters."),

  publisher: z
    .string()
    .min(2, "Publisher must be at least 2 characters."),

  cookingTime: z.coerce
    .number()
    .min(1, "Cooking time must be at least 1 minute.")
    .max(300, "Cooking time cannot exceed 300 minutes."),

  servings: z.coerce
    .number()
    .min(1, "Servings must be at least 1.")
    .max(20, "Servings cannot exceed 20."),

  imageUrl: z
    .string()
    .url("Please enter a valid URL."),
});

export type RecipeFormInput = z.input<typeof recipeSchema>;
export type RecipeFormOutput = z.output<typeof recipeSchema>;