import ProductGrid from '@/components/ProductGrid'
import HeroSection from '@/components/HeroSection'
import FeaturesSection from '@/components/FeaturesSection'
import ReviewSection from '@/components/ReviewSection'
import { prisma } from '@/lib/prisma'
import { Product } from '@/types/product'

export default async function Home() {
  const featuredProductsRaw = await prisma.product.findMany({
    where: { featured: true },
    take: 8,
    orderBy: { createdAt: 'desc' }
  })

  const dealsRaw = await prisma.product.findMany({
    where: { comparePrice: { not: null } },
    take: 4
  })

  // Transform products to ensure images is always string[]
  const transformProduct = (product: any): Product => ({
    ...product,
    images: Array.isArray(product.images) ? product.images : [],
    tags: Array.isArray(product.tags) ? product.tags : null,
    comparePrice: product.comparePrice ?? null,
  })

  const featuredProducts = featuredProductsRaw.map(transformProduct)
  const deals = dealsRaw.map(transformProduct)

  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      
      <section className="container-custom py-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Featured Products</h2>
        {featuredProducts.length > 0 ? (
          <ProductGrid products={featuredProducts} />
        ) : (
          <p className="text-center text-gray-500">No products yet. Add some in the admin panel!</p>
        )}
      </section>
      
      {deals.length > 0 && (
        <section className="bg-gradient-to-r from-purple-50 to-pink-50 py-12">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Multi-buy Deals & Clearance</h2>
            <ProductGrid products={deals} showDiscount />
          </div>
        </section>
      )}
      
      <ReviewSection />
    </div>
  )
}
