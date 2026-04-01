'use client'

import { useState, useEffect } from 'react'

export default function AgeVerificationModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const verified = localStorage.getItem('ageVerified')
    if (!verified) {
      setIsOpen(true)
    }
  }, [])

  const verifyAge = () => {
    localStorage.setItem('ageVerified', 'true')
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] animate-fadeIn">
      <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Age Verification</h2>
        <p className="text-gray-600 mb-6">
          You must be of legal smoking age in your location to enter this site.
        </p>
        <div className="flex gap-4">
          <button
            onClick={verifyAge}
            className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
          >
            I am of legal age
          </button>
          <button
            onClick={() => window.location.href = 'https://www.google.com'}
            className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
          >
            I am underage
          </button>
        </div>
      </div>
    </div>
  )
}
