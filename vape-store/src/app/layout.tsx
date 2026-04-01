import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AgeVerificationModal from '@/components/AgeVerificationModal'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vape Store - Premium Vape Products',
  description: 'Premium vape products with free next-day delivery',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AgeVerificationModal />
          <Header />
          <main className="min-h-screen bg-gray-50">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
