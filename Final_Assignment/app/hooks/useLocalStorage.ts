import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (stored) setValue(JSON.parse(stored));

  }, [key]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));

        console.log("localStorage ------> key: ", key);
        console.log("localStorage ------> value: ", value);

        alert(value);

  }, [value, key]);

  return [value, setValue] as const;
}

