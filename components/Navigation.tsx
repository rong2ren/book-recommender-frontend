'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();
  
  return (
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
              className={`transition-colors ${
                pathname === "/" 
                  ? "text-blue-500 font-medium" 
                  : "hover:text-blue-500"
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={`transition-colors ${
                pathname === "/about" 
                  ? "text-blue-500 font-medium" 
                  : "hover:text-blue-500"
              }`}
            >
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
} 