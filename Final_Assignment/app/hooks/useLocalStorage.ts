

import { useEffect, useRef, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const prevValueRef = useRef<T>(initialValue);

  // Load from storage
  useEffect(() => {
    const stored = localStorage.getItem(key);

    if (stored) {
      const parsed = JSON.parse(stored);
      setValue(parsed);
      prevValueRef.current = parsed;
    }
  }, [key]);

  // Save + detect change
  useEffect(() => {
    const prev = prevValueRef.current;

    localStorage.setItem(key, JSON.stringify(value));

    // 🔥 detect add / delete for arrays (most common use case)
    if (Array.isArray(value) && Array.isArray(prev)) {
      if (value.length > prev.length) {
        alert("Added");
      } else if (value.length < prev.length) {
        alert("Deleted");
      }
    }

    prevValueRef.current = value;
  }, [value, key]);

  return [value, setValue] as const;
}