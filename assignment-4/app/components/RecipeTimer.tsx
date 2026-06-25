"use client";

import { useEffect, useState } from "react";

type RecipeTimerProps = {
  recipeId: string;
  cookingTime: number; // minutes
};

export default function RecipeTimer({
  recipeId,
  cookingTime,
}: RecipeTimerProps) {
  const [remainingSeconds, setRemainingSeconds] = useState(
    cookingTime * 60
  );

  useEffect(() => {
    console.log(`Timer started for recipe: ${recipeId}`);

    // Reset timer when recipe changes
    setRemainingSeconds(cookingTime * 60);

    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          console.log(`Timer finished for recipe: ${recipeId}`);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      console.log(`Cleaning up timer for recipe: ${recipeId}`);
      clearInterval(interval);
    };
  }, [recipeId, cookingTime]);

  if (remainingSeconds === 0) {
    return (
      <div className="text-xl font-bold text-green-600">
        Done ✅
      </div>
    );
  }

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  const formattedTime = `${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;

  return (
    <div className="text-3xl font-bold">
      {formattedTime}
    </div>
  );
}