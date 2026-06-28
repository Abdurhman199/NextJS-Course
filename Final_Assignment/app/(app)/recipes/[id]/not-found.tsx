import Link from "next/link";

export default function NotFound() {
return ( 
<div className="min-h-screen flex flex-col items-center justify-center text-center px-6"> 
  <h1 className="text-4xl font-bold mb-4 text-black">Recipe Not Found</h1>
  <p className="text-neutral-600 mb-6">
    The 2 3recipe you're looking for doesn't exist or the ID is invalid.
  </p>
  <Link
    href="/recipes"
    className="rounded-md bg-gray-100 px-6 py-3 font-medium text-black shadow-md transition-colors duration-300 hover:bg-black hover:text-white"
  >
    Back to Recipes
  </Link>
</div>
);
}
