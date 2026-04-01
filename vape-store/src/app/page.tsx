import ProductGrid from '@/components/ProductGrid'
import HeroSection from '@/components/HeroSection'
import FeaturesSection from '@/components/FeaturesSection'
import ReviewSection from '@/components/ReviewSection'
import { prisma } from '@/lib/prisma'

export default async function Home() {
  try {
    const featuredProductsRaw = await prisma.product.findMany({
      where: { featured: true },
      take: 8,
      orderBy: { createdAt: 'desc' }
    })

    const dealsRaw = await prisma.product.findMany({
      where: { comparePrice: { not: null } },
      take: 4
    })

    // Transform products safely
    const transformProduct = (product: any) => ({
      ...product,
      images: Array.isArray(product.images) ? product.images : [],
      price: product.price || 0,
      comparePrice: product.comparePrice || null,
      stock: product.stock || 0,
      name: product.name || 'Untitled',
      slug: product.slug || 'product'
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
  } catch (error) {
    console.error('Error loading products:', error)
    return (
      <div>
        <HeroSection />
        <FeaturesSection />
        <section className="container-custom py-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Featured Products</h2>
          <p className="text-center text-red-500">Error loading products. Please check your database connection.</p>
        </section>
        <ReviewSection />
      </div>
    )
  }
}
