'use client'

export const StarRating = ({ rating }: { rating?: number }) => {
  if (!rating) return null

  const roundedRating = Math.round(rating * 2) / 2
  const fullStars = Math.floor(roundedRating)
  const hasHalfStar = roundedRating % 1 !== 0

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
      <span className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">
        {rating.toFixed(1)}
      </span>
    </div>
  )
}