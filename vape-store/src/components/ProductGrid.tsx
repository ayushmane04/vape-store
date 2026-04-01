'use client'

import Image from 'next/image'
import Link from 'next/link'
import toast from 'react-hot-toast'

interface Product {
  id: string
  name: string
  slug: string
  price: number
  comparePrice?: number | null
  images: string[]
  stock: number
}

export default function ProductGrid({ products, showDiscount = false }: { products: Product[], showDiscount?: boolean }) {
  const calculateDiscount = (price: number, comparePrice?: number | null) => {
    if (!comparePrice || comparePrice <= price) return null
    return Math.round(((comparePrice - price) / comparePrice) * 100)
  }

  const addToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existingItem = cart.find((item: any) => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({ ...product, quantity: 1 })
    }
    
    localStorage.setItem('cart', JSON.stringify(cart))
    toast.success(`${product.name} added to cart!`)
    window.dispatchEvent(new Event('cartUpdated'))
  }

  if (products.length === 0) {
    return <p className="text-center text-gray-500 py-8">No products found.</p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => {
        const discount = showDiscount ? calculateDiscount(product.price, product.comparePrice) : null
        
        return (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group">
            <Link href={`/products/${product.slug}`}>
              <div className="relative h-64 bg-gray-100">
                {product.images && product.images[0] ? (
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No image
                  </div>
                )}
                {discount && (
                  <span className="absolute top-2 right-2 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">
                    {discount}% OFF
                  </span>
                )}
                {product.stock === 0 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-bold">Out of Stock</span>
                  </div>
                )}
              </div>
            </Link>
            <div className="p-4">
              <Link href={`/products/${product.slug}`}>
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-purple-600 transition">
                  {product.name}
                </h3>
              </Link>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-purple-600">₹{product.price.toLocaleString()}</span>
                {product.comparePrice && (
                  <span className="text-sm text-gray-400 line-through">₹{product.comparePrice.toLocaleString()}</span>
                )}
              </div>
              <button
                onClick={() => addToCart(product)}
                disabled={product.stock === 0}
                className="mt-3 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
