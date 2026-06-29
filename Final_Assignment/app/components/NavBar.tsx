"use client";

import Link from "next/link";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

export default function NavBar() {
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();

  return (
    <header className="bg-gray p-4 border-b flex justify-between">
      <nav className="space-x-4 text-sm font-medium">
        <Link href="/">{t("home")}</Link>
        <Link href="/recipes">{t("recipes")}</Link>
        <Link href="/recipes/new">{t("newRecipe")}</Link>
        <Link href="/recipes/submitted">{t("submitted")}</Link>
        <Link href="/favorites">{t("favorites")}</Link>
        <Link href="/recipe-card">{t("recipeCard")}</Link>
        <Link href="/contact">{t("contact")}</Link>
      </nav>

      <div className="flex gap-3 items-center">
        <button type="button" onClick={toggleTheme}>
          {theme}
        </button>

        <select
          value={lang}
          onChange={(e) => setLang(e.target.value as "en" | "ar")}
          className="border px-2 py-1"
        >
          <option value="en">EN</option>
          <option value="ar">AR</option>
        </select>
      </div>
    </header>
  );
}