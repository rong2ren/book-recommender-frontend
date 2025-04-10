'use client'

import Image from 'next/image'
import { Book } from '@/types/books'
import { StarRating } from '@/components/StarRating'
import { useState } from 'react'

export default function BookCard({ book }: { book: Book }) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showAllGenres, setShowAllGenres] = useState(false);
  
  const displayGenres = showAllGenres ? book.genres : book.genres.slice(0, 3);
  const shortDescription = book.description.slice(0, 150);
  const isLongDescription = book.description.length > 150;

  return (
    <div className="book-card group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="h-56 sm:h-64 relative bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
        {book.cover_url ? (
          <Image
            src={book.cover_url}
            alt={`Cover of ${book.title}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400 dark:text-gray-600">
            <span className="text-sm font-medium">No cover available</span>
          </div>
        )}
        {book.primary_genre && (
          <span className="absolute top-3 right-3 inline-block bg-blue-600/90 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm shadow-sm">
            {book.primary_genre}
          </span>
        )}
      </div>

      <div className="flex-grow p-6 flex flex-col gap-3">
        <div>
          <h3 className="font-bold text-xl text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2 mb-1">
            {book.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm italic">
            by {book.authors}
          </p>
        </div>

        <StarRating rating={book.average_rating} />

        <div className="mt-1 min-h-[120px]">
          <div className="text-gray-600 dark:text-gray-300 text-sm">
            <p className={`${showFullDescription ? '' : 'line-clamp-5'}`}>
              {showFullDescription ? book.description : shortDescription}
            </p>
            {isLongDescription && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm mt-1 transition-colors"
              >
                {showFullDescription ? 'Show less' : 'Read more'}
              </button>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center mt-2 text-sm">
          <span className="text-gray-500 dark:text-gray-400">
            Published: {new Date(book.publication_date).toLocaleDateString()}
          </span>
          {book.num_pages && (
            <span className="text-gray-500 dark:text-gray-400">
              📖 {book.num_pages} pages
            </span>
          )}
        </div>

        <div className="mt-2">
          <div className="flex flex-wrap gap-2">
            {displayGenres.map(genre => (
              <span 
                key={genre} 
                className="px-3 py-1 text-xs font-medium rounded-full 
                         bg-blue-50 text-blue-700 border border-blue-100
                         hover:bg-blue-100 transition-colors duration-200"
              >
                {genre}
              </span>
            ))}
            {book.genres.length > 3 && (
              <button 
                onClick={() => setShowAllGenres(!showAllGenres)}
                className="px-3 py-1 text-xs font-medium rounded-full
                         bg-gray-50 text-gray-600 border border-gray-200
                         hover:bg-gray-100 transition-colors duration-200"
              >
                {showAllGenres 
                  ? 'Show less' 
                  : `+${book.genres.length - 3}`
                }
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}