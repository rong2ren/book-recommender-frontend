export interface Book {
  id: string
  title: string
  authors: string
  average_rating?: number
  isbn?: string
  isbn13?: string
  language_code?: string
  num_pages?: number
  publisher?: string
  publish_year?: number
  description?: string
  genre?: string
  cover_url?: string
  similarity?: number
  tags?: string[]
}

export interface RecommendationRequest {
  query: string
  max_results?: number
}

export interface RecommendationResponse {
  results: Book[]
}