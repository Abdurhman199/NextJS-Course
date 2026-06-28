"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { recipeSchema, RecipeFormInput } from "../../../lib/schemas/recipe";

export default function NewRecipePage() {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RecipeFormInput>({
    resolver: zodResolver(recipeSchema),
  });

  const onSubmit = async (data: RecipeFormInput) => {
    console.log("Called");
    setSuccess(false);

    const res = await fetch("/api/recipes/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      // map server field errors → inputs
      if (result?.errors) {
        Object.entries(result.errors).forEach(([field, message]) => {
          setError(field as any, {
            type: "server",
            message: (message as string[])?.[0] ?? "Invalid value",
          });
        });
      }
      return;
    }

    setSuccess(true);
    reset();
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Submit a Recipe</h1>

      {success && (
        <div className="p-3 bg-green-100 text-green-800 rounded">
          Recipe created successfully!
        </div>
      )}

      <form   onSubmit={handleSubmit(
    onSubmit,
    (errors) => {
      console.log("Validation errors:", errors);
    }
  )} className="space-y-4">
        {/* Title */}
        <div>
          <input
            placeholder="Title"
            {...register("title")}
            disabled={isSubmitting}
            className="w-full border p-2 rounded"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Publisher */}
        <div>
          <input
            placeholder="Publisher"
            {...register("publisher")}
            disabled={isSubmitting}
            className="w-full border p-2 rounded"
          />
          {errors.publisher && (
            <p className="text-red-500 text-sm">
              {errors.publisher.message}
            </p>
          )}
        </div>

        {/* Cooking Time */}
        <div>
          <input
            type="number"
            placeholder="Cooking Time (minutes)"
            {...register("cookingTime", { valueAsNumber: true })}
            disabled={isSubmitting}
            className="w-full border p-2 rounded"
          />
          {errors.cookingTime && (
            <p className="text-red-500 text-sm">
              {errors.cookingTime.message}
            </p>
          )}
        </div>

        {/* Servings */}
        <div>
          <input
            type="number"
            placeholder="Servings"
            {...register("servings", { valueAsNumber: true })}
            disabled={isSubmitting}
            className="w-full border p-2 rounded"
          />
          {errors.servings && (
            <p className="text-red-500 text-sm">
              {errors.servings.message}
            </p>
          )}
        </div>

        <div>
          <input
    placeholder="Image URL"
    {...register("imageUrl")}
    disabled={isSubmitting}
    className="w-full border p-2 rounded"
  />
  {errors.imageUrl && (
    <p className="text-red-500 text-sm">
      {errors.imageUrl.message}
    </p>
  )}
</div>

        <button
        type="submit"
          disabled={isSubmitting}
          className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit Recipe"}
        </button>
      </form>
    </div>
  );
}