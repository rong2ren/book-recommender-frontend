"use client";

import { useState, FormEvent } from "react";
import { Book } from '@/types/books'
import BookCard from '@/components/BookCard'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export default function Home() {
  // Recommendation state
  const [query, setQuery] = useState("");
  const [recommendations, setRecommendations] = useState<Book[]>([]);
  const [isRecommending, setIsRecommending] = useState(false);
  const [recommendError, setRecommendError] = useState<string | null>(null);
  const [showRecommendations, setShowRecommendations] = useState(false);
  
  // Handle recommendation form submission
  const handleRecommendation = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) return;
    
    try {
      setIsRecommending(true);
      setRecommendError(null);
      setShowRecommendations(true);
      
      const response = await fetch(`${API_BASE}/books`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query, max_results: 5 }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Failed to fetch recommendations');
      }
      
      setRecommendations(data.results || []);
    } catch (err) {
      setRecommendError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Failed to get recommendations:', err);
    } finally {
      setIsRecommending(false);
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <h2 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white">
          Don&apos;t know what to read next?
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 mx-auto">
        Let our AI match you with perfect book recommendations based on your unique preferences.
        </p>
        
        {/* Search form */}
        <form onSubmit={handleRecommendation} className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-grow">
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="What kind of book are you looking for?"
                  className="w-full p-4 pl-5 pr-12 border border-gray-300 dark:border-gray-700 rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-all"
                  required
                />
                <div className="absolute right-4 top-0 h-full flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={isRecommending}
              className="md:self-start px-6 py-4 rounded-full font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isRecommending ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Finding...
                </div>
              ) : (
                'Recommend'
              )}
            </button>
          </div>
        </form>
      </header>
      
      {/* Recommendations section */}
      {showRecommendations && (
        <section className="animate-fadeIn">
          <div className="flex items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              Books for you based on: &quot;{query}&quot;
            </h2>
            <button
              onClick={() => setShowRecommendations(false)}
              className="ml-auto text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear
            </button>
          </div>
          
          {isRecommending ? (
            <div className="flex flex-col justify-center items-center h-60 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin mb-4"></div>
              <p className="text-lg text-gray-700 dark:text-gray-300">Finding the perfect books for you...</p>
            </div>
          ) : recommendError ? (
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-400 p-5 rounded-lg">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <strong className="font-medium">Oops! Something went wrong.</strong>
              </div>
              <p className="mt-2 ml-9">{recommendError}</p>
              <p className="mt-2 ml-9 text-sm">Please check your connection and try again.</p>
            </div>
          ) : recommendations.length === 0 ? (
            <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 text-amber-700 dark:text-amber-400 p-5 rounded-lg">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <strong className="font-medium">No recommendations found</strong>
              </div>
              <p className="mt-2 ml-9">Try a different search term or be more specific about what you&apos;re looking for.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
