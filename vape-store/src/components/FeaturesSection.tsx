import { TruckIcon, ClockIcon, CurrencyRupeeIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'

const features = [
  {
    icon: TruckIcon,
    title: 'Free Next-Day Delivery',
    description: 'Free next-day India delivery on orders over ₹999',
  },
  {
    icon: ClockIcon,
    title: 'Same Day Dispatch',
    description: 'Order by 10pm Monday to Friday for same-day dispatch',
  },
  {
    icon: CurrencyRupeeIcon,
    title: 'Rewards Club',
    description: 'Earn up to 7% cashback on every purchase',
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: 'Customer Support',
    description: 'India-based support available seven days a week',
  },
]

export default function FeaturesSection() {
  return (
    <section className="bg-gray-50 py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="inline-block p-3 bg-purple-100 rounded-full mb-4">
                <feature.icon className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
