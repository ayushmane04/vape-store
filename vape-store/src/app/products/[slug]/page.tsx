import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import AddToCartButton from '@/components/AddToCartButton'

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug }
  })

  if (!product) {
    notFound()
  }

  const relatedProducts = await prisma.product.findMany({
    where: {
      category: product.category,
      id: { not: product.id }
    },
    take: 4
  })

  const discount = product.comparePrice 
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : null

  return (
    <div className="container-custom py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-purple-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-purple-600">Products</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="bg-gray-100 rounded-lg overflow-hidden relative h-96">
            {product.images && product.images[0] ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-contain"
                priority
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                No image available
              </div>
            )}
          </div>
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(1, 5).map((image: string, index: number) => (
                <div key={index} className="bg-gray-100 rounded-lg overflow-hidden relative h-20 cursor-pointer hover:opacity-75">
                  <Image
                    src={image}
                    alt={`${product.name} view ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
          
          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-block bg-purple-100 text-purple-600 text-sm px-3 py-1 rounded-full">
              {product.category.replace('-', ' ').toUpperCase()}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-purple-600">₹{product.price.toLocaleString()}</span>
            {product.comparePrice && (
              <>
                <span className="text-xl text-gray-400 line-through">₹{product.comparePrice.toLocaleString()}</span>
                {discount && (
                  <span className="bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">
                    {discount}% OFF
                  </span>
                )}
              </>
            )}
          </div>

          {/* Stock Status */}
          <div className="mb-4">
            {product.stock > 0 ? (
              <span className="text-green-600 text-sm font-medium">
                ✓ In Stock ({product.stock} available)
              </span>
            ) : (
              <span className="text-red-600 text-sm font-medium">
                ✗ Out of Stock
              </span>
            )}
          </div>

          {/* Description */}
          <div className="border-t border-b py-4 my-4">
            <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
            <p className="text-gray-600 whitespace-pre-wrap">{product.description}</p>
          </div>

          {/* Add to Cart */}
          <AddToCartButton product={product} />

          {/* Shipping Info */}
          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Shipping Information</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>✓ Free Next Day Delivery on orders over ₹999</li>
              <li>✓ Same Day Dispatch up to 10PM</li>
              <li>✓ 7 Days Return Policy</li>
              <li>✓ 100% Authentic Products</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((related) => (
              <Link key={related.id} href={`/products/${related.slug}`} className="group">
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
                  <div className="relative h-48 bg-gray-100">
                    {related.images && related.images[0] ? (
                      <Image
                        src={related.images[0]}
                        alt={related.name}
                        fill
                        className="object-cover group-hover:scale-105 transition"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{related.name}</h3>
                    <p className="text-purple-600 font-bold">₹{related.price.toLocaleString()}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
