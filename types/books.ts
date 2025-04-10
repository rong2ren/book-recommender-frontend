export interface Book {
  id: string
  isbn: string
  title: string
  authors: string
  description: string
  cover_url: string
  genres: string[]
  num_pages: number
  primary_genre: string
  created_at: string
  isbn13: string
  language_code: string
  embedding: string
  average_rating: number
  publication_date: string
  ratings_count: number
  publisher: string
}

export interface RecommendationRequest {
  query: string
  max_results?: number
}

export interface RecommendationResponse {
  results: Book[]
}