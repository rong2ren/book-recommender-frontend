import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PageTurn AI - Book Recommender",
  description: "Find your next favorite book with AI-powered recommendations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800`}>
        <nav className="bg-white dark:bg-gray-900 sticky top-0 z-10 p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <Link 
              href="/" 
              className="flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13c-1.168-.776-2.754-1.253-4.5-1.253-1.746 0-3.332.477-4.5 1.253" 
                />
              </svg>
              <span className="text-2xl font-bold text-gradient">PageTurn AI</span>
            </Link>
            <ul className="flex space-x-4">
              <li>
                <Link
                  href="/"
                  className="hover:text-blue-500 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-blue-500 transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <main className="flex-grow container mx-auto p-8">
          {children}
        </main>
        <footer className="bg-white dark:bg-gray-900 p-6 mt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="container mx-auto">
            <div className="flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13c-1.168-.776-2.754-1.253-4.5-1.253-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className="font-semibold text-gradient">PageTurn AI</span>
            </div>
            <p className="text-center text-sm">
              © {new Date().getFullYear()} PageTurn AI. Find your next favorite book with AI-powered recommendations.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
