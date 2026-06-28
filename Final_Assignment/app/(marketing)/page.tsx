import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-4xl font-bold mb-4">
        Discover & Share Recipes
      </h1>

      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mb-8">
        A simple recipe platform where you can explore delicious meals,
        save your favorites, and share your own creations.
      </p>

      <Link
        href="/recipes"
        className="px-6 py-3 rounded bg-black text-white dark:bg-white dark:text-black"
      >
        Explore Recipes
      </Link>
    </main>
  );
}