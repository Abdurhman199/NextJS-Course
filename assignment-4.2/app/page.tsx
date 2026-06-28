"use client";
import { useRouter } from 'next/navigation';


export default function DynamicButton() {
  const router = useRouter();
  return (


<div className="flex min-h-[70dvh] w-full flex-col items-center justify-center gap-4">
  <h1 className="text-4xl font-bold text-black">
    Welcome to our Restaurant
  </h1>

<p className="font-bold">
Enjoy fresh pizza, delicious pasta, juicy burgers, and crisp salads made with quality ingredients. Great taste, generous portions, and something for everyone all served with a smile.
  </p>

  <button
    className="rounded-md bg-blue-400 px-6 py-3 font-medium text-black shadow-md transition hover:bg-blue-700 hover:text-white"
    onClick={() => router.push('/recipes?search=pizza')}
  >
    Show the Menu
  </button>
</div>



  );
}
