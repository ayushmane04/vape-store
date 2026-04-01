export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  comparePrice: number | null
  stock: number
  images: string[]  // We'll ensure this is always string[]
  category: string
  tags: string[] | null
  featured: boolean
  createdAt: Date
  updatedAt: Date
}
