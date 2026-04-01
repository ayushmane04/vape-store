'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useQueryClient } from '@tanstack/react-query'

interface ProductFormData {
  name: string
  description: string
  price: number
  comparePrice?: number
  stock: number
  category: string
  images: string
  featured: boolean
}

export default function AdminProductForm() {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProductFormData>()
  const queryClient = useQueryClient()

  const onSubmit = async (data: ProductFormData) => {
    setLoading(true)
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          images: data.images ? data.images.split(',').map(url => url.trim()) : [],
          slug: data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        })
      })

      if (response.ok) {
        toast.success('Product added successfully!')
        reset()
        queryClient.invalidateQueries({ queryKey: ['products'] })
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to add product')
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Add New Product</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Product Name *</label>
          <input
            {...register('name', { required: 'Product name is required' })}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description *</label>
          <textarea
            {...register('description', { required: 'Description is required' })}
            rows={4}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500"
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Price (₹) *</label>
            <input
              type="number"
              step="0.01"
              {...register('price', { required: 'Price is required', min: 0 })}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500"
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Compare Price (₹)</label>
            <input
              type="number"
              step="0.01"
              {...register('comparePrice')}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Stock *</label>
            <input
              type="number"
              {...register('stock', { required: 'Stock is required', min: 0 })}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500"
            />
            {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category *</label>
            <select {...register('category', { required: 'Category is required' })} className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500">
              <option value="">Select category</option>
              <option value="pod-systems">Pod Systems</option>
              <option value="vape-kits">Vape Kits</option>
              <option value="disposables">Disposables</option>
              <option value="e-liquids">E-Liquids</option>
              <option value="accessories">Accessories</option>
            </select>
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Image URLs (comma separated)</label>
          <input
            {...register('images')}
            placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500"
          />
          <p className="text-xs text-gray-500 mt-1">Enter full URLs separated by commas</p>
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" {...register('featured')} className="w-4 h-4 text-purple-600" />
          <label className="text-sm font-medium">Featured Product</label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 transition"
        >
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  )
}
