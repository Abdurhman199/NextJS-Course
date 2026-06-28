import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/app/components/NavBar";
import { ThemeProvider } from "@/app/context/ThemeContext";
import { LanguageProvider } from "@/app/context/LanguageContext";
import { FavoritesProvider } from "@/app/context/FavoritesContext";

export const metadata: Metadata = {
  title: "My Next.js App",
  description: "Built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-white">
        <ThemeProvider>
          <LanguageProvider>
            <FavoritesProvider>
              <NavBar />

              <main className="flex-grow mx-auto max-w-4xl w-full p-6 bg-white dark:bg-slate-800">
                {children}
              </main>

              <footer className="bg-white dark:bg-slate-900 p-4 text-center text-sm text-slate-500 border-t">
                <p>© {new Date().getFullYear()} My Company. All rights reserved.</p>
              </footer>
            </FavoritesProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}