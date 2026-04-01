import ProductGrid from '@/components/ProductGrid'
import HeroSection from '@/components/HeroSection'
import FeaturesSection from '@/components/FeaturesSection'
import ReviewSection from '@/components/ReviewSection'
import { prisma } from '@/lib/prisma'

export default async function Home() {
  const featuredProducts = await prisma.product.findMany({
    where: { featured: true },
    take: 8,
    orderBy: { createdAt: 'desc' }
  })

  const deals = await prisma.product.findMany({
    where: { comparePrice: { not: null } },
    take: 4
  })

  // Transform products to ensure images is always an array
  const transformedFeatured = featuredProducts.map(product => ({
    ...product,
    images: Array.isArray(product.images) ? product.images : []
  }))

  const transformedDeals = deals.map(product => ({
    ...product,
    images: Array.isArray(product.images) ? product.images : []
  }))

  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      
      <section className="container-custom py-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Featured Products</h2>
        {transformedFeatured.length > 0 ? (
          <ProductGrid products={transformedFeatured} />
        ) : (
          <p className="text-center text-gray-500">No products yet. Add some in the admin panel!</p>
        )}
      </section>
      
      {transformedDeals.length > 0 && (
        <section className="bg-gradient-to-r from-purple-50 to-pink-50 py-12">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Multi-buy Deals & Clearance</h2>
            <ProductGrid products={transformedDeals} showDiscount />
          </div>
        </section>
      )}
      
      <ReviewSection />
    </div>
  )
}
