"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type Lang = "en" | "ar";

const dictionary = {
  en: {
    home: "Home",
    recipes: "Recipes",
    submitted: "Submitted",
    favorites: "Favorites",
    newRecipe: "New Recipe",
    login: "Login",
    theme: "Theme",
    contact: "Contact",
  },
  ar: {
    home: "الرئيسية",
    recipes: "الوصفات",
    submitted: "المحفوظات",
    favorites: "المفضلة",
    newRecipe: "وصفة جديدة",
    login: "تسجيل الدخول",
    theme: "الوضع",
    contact: "تواصل",
  },
} as const;

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof dictionary.en) => string;
}>({
  lang: "en",
  setLang: () => {},
  t: (k) => k,
});

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lang, setLang] = useState<Lang>("en");

  // load saved language
  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved) setLang(saved);
  }, []);

  // persist language
  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  const t = (key: keyof typeof dictionary.en) => {
    return dictionary[lang][key];
  };

  const value = useMemo(
    () => ({ lang, setLang, t }),
    [lang]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);