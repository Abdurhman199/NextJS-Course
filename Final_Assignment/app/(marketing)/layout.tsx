import Link from "next/link";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header className="p-4 border-b flex justify-between">
        <Link href="/" className="font-bold">
          Recipe App
        </Link>
        <Link href="/recipes">Recipes</Link>
      </header>

      <main>{children}</main>
    </div>
  );
}