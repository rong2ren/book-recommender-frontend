'use client'

import Image from 'next/image'
import { Book } from '@/types/books'
import { StarRating } from '@/components/StarRating'

export default function BookCard({ book }: { book: Book }) {
  return (
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
  )
}