import Link from "next/link";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="border-b p-4">
        <nav className="flex gap-4 text-balck">
          <a href="/" className="hover:text-blue-600 text-black">Home</a>
          <a href="/contact" className="hover:text-blue-600 text-black">Contact</a>
        </nav>
      </header>

      <main>{children}</main>
    </>
  );
}