"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";

// Define Book type based on the backend API
interface Book {
  id: number;
  isbn: string;
  title: string;
  author: string;
  publish_year: number;
  description?: string;
  cover_url?: string;
  genre?: string;
  rating?: number;
  page_count?: number;
  tags?: string[];
}

export default function Home() {
  // Recommendation state
  const [query, setQuery] = useState("");
  const [recommendations, setRecommendations] = useState<Book[]>([]);
  const [isRecommending, setIsRecommending] = useState(false);
  const [recommendError, setRecommendError] = useState<string | null>(null);
  const [showRecommendations, setShowRecommendations] = useState(false);
  
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  
  // Handle recommendation form submission
  const handleRecommendation = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      return;
    }
    
    try {
      setIsRecommending(true);
      setRecommendError(null);
      setShowRecommendations(true);
      
      const response = await fetch(`${apiUrl}/books`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query,
          max_results: 5
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      setRecommendations(data.results || []);
    } catch (err) {
      setRecommendError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Failed to get recommendations:', err);
    } finally {
      setIsRecommending(false);
    }
  };
  
  // Generate star rating display
  const StarRating = ({ rating }: { rating?: number }) => {
    if (!rating) return null;
    
    // Round to nearest half
    const roundedRating = Math.round(rating * 2) / 2;
    const fullStars = Math.floor(roundedRating);
    const hasHalfStar = roundedRating % 1 !== 0;
    
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-lg">
            {i < fullStars ? (
              <span className="text-yellow-400">★</span>
            ) : i === fullStars && hasHalfStar ? (
              <span className="text-yellow-400">⯨</span>
            ) : (
              <span className="text-gray-300 dark:text-gray-600">★</span>
            )}
          </span>
        ))}
        <span className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">{rating.toFixed(1)}</span>
      </div>
    );
  };
  
  // Book card component with improved styling
  const BookCard = ({ book }: { book: Book }) => (
    <div className="book-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-md">
      <div className="h-56 sm:h-64 relative bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
        {book.cover_url ? (
          <Image
            src={book.cover_url}
            alt={`Cover of ${book.title}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            className="object-cover cover-image"
          />
        ) : (
          <div className="h-full flex items-center justify-center">
            <span className="text-gray-400">No cover available</span>
          </div>
        )}
        {book.genre && (
          <span className="absolute top-2 right-2 inline-block bg-blue-600/80 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
            {book.genre}
          </span>
        )}
      </div>
      
      <div className="flex-grow p-5 flex flex-col">
        <h3 className="font-bold text-xl mb-1 line-clamp-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          {book.title}
        </h3>
        
        <p className="text-gray-700 dark:text-gray-300 mb-3 italic">
          by {book.author}
        </p>
        
        <StarRating rating={book.rating} />
        
        {book.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mt-3 mb-3">
            {book.description}
          </p>
        )}
        
        <div className="mt-auto flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {book.publish_year}
          </span>
          
          {book.page_count && (
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {book.page_count} pages
            </span>
          )}
        </div>
        
        {book.tags && book.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
            {book.tags.map((tag, index) => (
              <span key={index} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
  
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-16 text-center">
          <h2 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">Don&apos;t know what to read?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-3xl mx-auto">
            Ask PageTurn AI for personalized book recommendations!
          </p>
          
          {/* Search form with enhanced styling */}
          <form onSubmit={handleRecommendation} className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row md:justify-center gap-4">
              <div className="w-full md:max-w-xl">
                <div className="relative">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="What kind of book are you looking for?"
                    className="w-full p-4 pl-5 pr-12 border-2 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    required
                  />
                  <div className="absolute right-4 top-0 h-full flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                <p className="mt-2 text-sm text-left text-gray-500 dark:text-gray-400 pl-6">
                  Try: &quot;Fantasy books for a 9 years old boy who loves Harry Potter&quot;
                </p>
              </div>
              <div className="md:self-start">
                <button
                  type="submit"
                  disabled={isRecommending}
                  className="w-full md:w-auto px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transform transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed"
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
            </div>
          </form>
        </header>
        
        <main>
          {/* Recommendations section */}
          {showRecommendations && (
            <section className="mb-16 animate-fadeIn">
              <div className="flex items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Books for you based on: &quot;{query}&quot;
                </h2>
                <button
                  onClick={() => setShowRecommendations(false)}
                  className="ml-auto text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear results
                </button>
              </div>
              
              {isRecommending ? (
                <div className="flex flex-col justify-center items-center h-64 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                  <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mb-4"></div>
                  <p className="text-xl text-gray-700 dark:text-gray-300">Finding the perfect books for you...</p>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {recommendations.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              )}
            </section>
          )}
        </main>
        
        
      </div>
      
      {/* Add global styles for animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
