import Image from 'next/image';
import profilePic from '../public/next.svg';
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Next.js App",
  description: "Built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
        
        <header className="bg-white p-4 shadow-sm border-b border-slate-100">
          <div className="mx-auto max-w-4xl flex justify-between items-center">


            <Image src={profilePic} alt="Logo" width={100} height={100} />
      

                  <nav className="space-x-4 text-sm font-medium">
              <a href="/" className="hover:text-blue-600 text-black">Home</a>
              <a href="/recipes" className="hover:text-blue-600 text-black">Menu</a>
              <a href="/contact" className="hover:text-blue-600 text-black">Contact</a>




            </nav>
          </div>
        </header>






        <main className="flex-grow mx-auto max-w-4xl w-full p-6 bg-white">
          {children}
        </main>

        {/* Simple Bottom/Footer Text */}
        <footer className="bg-white p-4 text-center text-sm text-slate-500 border-t border-slate-100">
          <p>© {new Date().getFullYear()} My Company. All rights reserved.</p>
        </footer>

      </body>
    </html>
  );
}
