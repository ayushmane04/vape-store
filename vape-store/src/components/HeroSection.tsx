'use client'

import Link from 'next/link'

export default function HeroSection() {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
      <div className="container-custom py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Premium Vape Products
        </h1>
        <p className="text-xl mb-8 opacity-90">
          Free Next Day Delivery on orders over ₹999
        </p>
        <Link
          href="/products"
          className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Shop Now
        </Link>
      </div>
    </div>
  )
}
