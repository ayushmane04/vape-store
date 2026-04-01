'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'

interface Product {
  id: string
  name: string
  price: number
  images: string[]
  stock: number
}

export default function AddToCartButton({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1)
  const [adding, setAdding] = useState(false)

  const addToCart = () => {
    if (product.stock === 0) {
      toast.error('This product is out of stock')
      return
    }

    setAdding(true)
    
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existingItem = cart.find((item: any) => item.id === product.id)
    
    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity
      if (newQuantity > product.stock) {
        toast.error(`Only ${product.stock} items available`)
        setAdding(false)
        return
      }
      existingItem.quantity = newQuantity
    } else {
      cart.push({ ...product, quantity })
    }
    
    localStorage.setItem('cart', JSON.stringify(cart))
    window.dispatchEvent(new Event('cartUpdated'))
    toast.success(`${product.name} added to cart!`)
    
    setAdding(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center border rounded-lg">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-2 hover:bg-gray-100 transition"
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="w-12 text-center">{quantity}</span>
          <button
            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
            className="px-4 py-2 hover:bg-gray-100 transition"
            disabled={quantity >= product.stock}
          >
            +
          </button>
        </div>
        
        <button
          onClick={addToCart}
          disabled={adding || product.stock === 0}
          className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition disabled:opacity-50 font-semibold"
        >
          {adding ? 'Adding...' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
      
      {product.stock > 0 && product.stock < 10 && (
        <p className="text-orange-600 text-sm">⚠️ Only {product.stock} left in stock - order soon</p>
      )}
    </div>
  )
}
