export interface Book {
    id: number
    isbn: string
    title: string
    author: string
    publish_year: number
    description?: string
    cover_url?: string
    genre?: string
    rating?: number
    page_count?: number
    tags?: string[]
  }