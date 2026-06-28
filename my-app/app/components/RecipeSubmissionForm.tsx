"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  recipeSchema,
  RecipeFormInput,
} from "../lib/schemas/recipe";

export default function RecipeSubmissionForm() {
  const [success, setSuccess] = useState("");
  const [generalError, setGeneralError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RecipeFormInput>({
    resolver: zodResolver(recipeSchema),
  });

  async function onSubmit(data: RecipeFormInput) {
    setSuccess("");
    setGeneralError("");

    try {
      const response = await fetch("/api/recipes/submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Validation errors (422)
      if (response.status === 422) {
        const result = await response.json();

        Object.entries(result.errors).forEach(([field, messages]) => {
          setError(field as keyof RecipeFormInput, {
            type: "server",
            message: (messages as string[])[0],
          });
        });

        return;
      }

      // General server error
      if (!response.ok) {
        setGeneralError("Something went wrong. Please try again.");
        return;
      }

      // Success
      setSuccess("Recipe submitted successfully!");

      reset();
    } catch {
      setGeneralError("Unable to connect to the server.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 max-w-xl"
    >
      {generalError && (
        <div className="rounded bg-red-100 p-3 text-red-700">
          {generalError}
        </div>
      )}

      {success && (
        <div className="rounded bg-green-100 p-3 text-green-700">
          {success}
        </div>
      )}

      {/* Title */}

      <div>
        <label className="block mb-1 font-medium">
          Title
        </label>

        <input
          {...register("title")}
          disabled={isSubmitting}
          className="w-full rounded border p-2"
        />

        <p className="text-red-500 text-sm">
          {errors.title?.message}
        </p>
      </div>

      {/* Publisher */}

      <div>
        <label className="block mb-1 font-medium">
          Publisher
        </label>

        <input
          {...register("publisher")}
          disabled={isSubmitting}
          className="w-full rounded border p-2"
        />

        <p className="text-red-500 text-sm">
          {errors.publisher?.message}
        </p>
      </div>

      {/* Cooking Time */}

      <div>
        <label className="block mb-1 font-medium">
          Cooking Time
        </label>

        <input
          type="number"
          {...register("cookingTime")}
          disabled={isSubmitting}
          className="w-full rounded border p-2"
        />

        <p className="text-red-500 text-sm">
          {errors.cookingTime?.message}
        </p>
      </div>

      {/* Servings */}

      <div>
        <label className="block mb-1 font-medium">
          Servings
        </label>

        <input
          type="number"
          {...register("servings")}
          disabled={isSubmitting}
          className="w-full rounded border p-2"
        />

        <p className="text-red-500 text-sm">
          {errors.servings?.message}
        </p>
      </div>

      {/* Image URL */}

      <div>
        <label className="block mb-1 font-medium">
          Image URL
        </label>

        <input
          {...register("imageUrl")}
          disabled={isSubmitting}
          className="w-full rounded border p-2"
        />

        <p className="text-red-500 text-sm">
          {errors.imageUrl?.message}
        </p>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded bg-blue-600 px-5 py-2 text-white disabled:opacity-50"
      >
        {isSubmitting
          ? "Submitting..."
          : "Submit Recipe"}
      </button>
    </form>
  );
}