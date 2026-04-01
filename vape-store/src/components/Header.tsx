'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { ShoppingBagIcon, UserIcon } from '@heroicons/react/24/outline'
import SearchBar from './SearchBar'

export default function Header() {
  const { data: session } = useSession()
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCartCount(cart.reduce((sum: number, item: any) => sum + item.quantity, 0))
  }, [])

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Vape Store
          </Link>

          <div className="flex-1 max-w-xl">
            <SearchBar />
          </div>

          <nav className="flex items-center gap-6">
            <Link href="/products" className="text-gray-600 hover:text-purple-600 transition">
              Shop
            </Link>
            <Link href="/deals" className="text-gray-600 hover:text-purple-600 transition">
              Deals
            </Link>
            
            <Link href="/cart" className="relative">
              <ShoppingBagIcon className="w-6 h-6 text-gray-600 hover:text-purple-600 transition" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {session ? (
              <div className="relative group">
                <UserIcon className="w-6 h-6 text-gray-600 cursor-pointer hover:text-purple-600 transition" />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block z-50">
                  <Link href="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    My Account
                  </Link>
                  {session.user?.role === 'ADMIN' && (
                    <Link href="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Admin Panel
                    </Link>
                  )}
                  <button onClick={() => signOut()} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/auth/signin" className="text-gray-600 hover:text-purple-600 transition">
                Sign In
              </Link>
            )}
          </nav>
        </div>

        <div className="mt-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-2 rounded-lg">
          <span className="text-sm font-medium">✨ Free Next Day Delivery on orders over ₹999 | Same Day Dispatch up to 10PM ✨</span>
        </div>
      </div>
    </header>
  )
}
