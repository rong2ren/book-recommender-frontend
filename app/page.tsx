"use client";

import { useState, FormEvent } from "react";
import { Book } from '@/types/books'
import BookCard from '@/components/BookCard'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export default function Home() {
  const [query, setQuery] = useState("");
  const [recommendations, setRecommendations] = useState<Book[]>([]);
  const [isRecommending, setIsRecommending] = useState(false);
  const [recommendError, setRecommendError] = useState<string | null>(null);
  const [showRecommendations, setShowRecommendations] = useState(false);
  
  const handleRecommendation = async (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    try {
      setIsRecommending(true);
      setRecommendError(null);
      setShowRecommendations(true);
      
      const response = await fetch(`${API_BASE}/recommend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query, max_results: 12 }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || 'Failed to fetch recommendations');
      
      setRecommendations(data.results || []);
    } catch (err) {
      setRecommendError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsRecommending(false);
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16 lg:py-20">
      <header className="mb-16 text-center">
        <div className="max-w-4xl mx-auto mb-10">
          <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Don&apos;t know what to read next?
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
          Let our AI match you with perfect book recommendations based on your unique preferences.
          </p>
        </div>
        
        <form onSubmit={handleRecommendation} className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row gap-3 relative">
            <div className="flex-grow relative group">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., 'Fantasy books with dragons'"
                className="w-full px-6 py-5 text-lg border-2 border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl focus:ring-4 focus:ring-blue-400/20 focus:border-blue-500 dark:bg-gray-900 dark:text-white transition-all duration-300 pr-16 hover:border-gray-300"
                required
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
              </div>
            </div>
            <button
              type="submit"
              disabled={isRecommending}
              className="md:self-stretch px-8 py-5 text-lg font-semibold rounded-2xl text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-blue-400/30 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isRecommending ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/50 rounded-full animate-bounce" />
                  <span>Searching...</span>
                </div>
              ) : (
                'Find Books'
              )}
            </button>
          </div>
        </form>
      </header>
      
      {showRecommendations && (
        <section className="animate-fadeInUp">
          <div className="flex items-center mb-8 p-4 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Results for <span className="text-blue-600">&quot;{query}&quot;</span>
            </h2>
            <button
              onClick={() => setShowRecommendations(false)}
              className="ml-auto flex items-center space-x-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="font-medium">Reset</span>
            </button>
          </div>
          
          {isRecommending ? (
            <div className="flex flex-col items-center justify-center min-h-[400px] bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-blue-500/20 rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-blue-500 rounded-full animate-ping" />
                </div>
              </div>
              <p className="mt-6 text-lg font-medium text-gray-700 dark:text-gray-300">
                Scanning thousands of books...
              </p>
            </div>
          ) : recommendError ? (
            <div className="bg-red-50/80 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-400 p-6 rounded-xl shadow-sm">
              <div className="flex items-start space-x-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <h3 className="font-semibold mb-2">Search Error</h3>
                  <p className="text-sm opacity-90">{recommendError}</p>
                  <p className="mt-3 text-sm opacity-75">Please try adjusting your search terms or check your connection.</p>
                </div>
              </div>
            </div>
          ) : recommendations.length === 0 ? (
            <div className="bg-amber-50/80 dark:bg-amber-900/20 border-l-4 border-amber-500 text-amber-700 dark:text-amber-400 p-6 rounded-xl shadow-sm">
              <div className="flex items-start space-x-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="font-semibold mb-2">No Matches Found</h3>
                  <p className="text-sm opacity-90">Try being more specific or use different keywords. Example: &quot;Coming-of-age fantasy with strong female protagonist&quot;</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recommendations.map((book) => (
                <BookCard 
                  key={book.id} 
                  book={book}
                />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}