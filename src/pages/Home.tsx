import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

// 轮播图数据
const bannerImages = [
  {
    id: 1,
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=fashionable%20asian%20woman%20modeling%20elegant%20dress%20in%20modern%20studio%20setting%2C%20professional%20fashion%20photography%2C%20clean%20background&image_size=landscape_16_9',
    title: '春季新品上市',
    subtitle: '优雅女装，尽显女性魅力'
  },
  {
    id: 2,
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20chinese%20woman%20in%20casual%20chic%20outfit%2C%20street%20fashion%20photography%2C%20urban%20background%2C%20confident%20pose&image_size=landscape_16_9',
    title: '都市时尚风',
    subtitle: '简约不简单，都市女性的选择'
  },
  {
    id: 3,
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=elegant%20evening%20dress%20fashion%20shoot%2C%20asian%20model%2C%20sophisticated%20lighting%2C%20luxury%20fashion%20style&image_size=landscape_16_9',
    title: '晚宴系列',
    subtitle: '闪耀每一个重要时刻'
  }
]

// 模拟商品数据
const newProducts = [
  {
    id: '1',
    name: '优雅连衣裙',
    price: 299,
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=elegant%20women%20dress%2C%20flowing%20fabric%2C%20soft%20colors%2C%20fashion%20photography%2C%20clean%20background&image_size=portrait_4_3',
    rating: 4.8
  },
  {
    id: '2',
    name: '时尚上衣',
    price: 199,
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=stylish%20women%20blouse%2C%20modern%20design%2C%20professional%20photography&image_size=portrait_4_3',
    rating: 4.6
  },
  {
    id: '3',
    name: '休闲裤装',
    price: 249,
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=women%20casual%20pants%2C%20comfortable%20fit%2C%20fashion%20photography&image_size=portrait_4_3',
    rating: 4.7
  },
  {
    id: '4',
    name: '精致外套',
    price: 399,
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=elegant%20women%20coat%2C%20sophisticated%20design%2C%20fashion%20photography&image_size=portrait_4_3',
    rating: 4.9
  }
]

const hotProducts = [
  {
    id: '5',
    name: '热销毛衣',
    price: 179,
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=cozy%20women%20sweater%2C%20warm%20fabric%2C%20fashionable%20design&image_size=portrait_4_3',
    rating: 4.5,
    sales: 1200
  },
  {
    id: '6',
    name: '经典牛仔裤',
    price: 269,
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=classic%20women%20jeans%2C%20perfect%20fit%2C%20denim%20texture&image_size=portrait_4_3',
    rating: 4.8,
    sales: 980
  },
  {
    id: '7',
    name: '优雅半身裙',
    price: 189,
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=elegant%20women%20skirt%2C%20flowing%20design%2C%20feminine%20style&image_size=portrait_4_3',
    rating: 4.6,
    sales: 856
  },
  {
    id: '8',
    name: '舒适T恤',
    price: 99,
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=comfortable%20women%20t-shirt%2C%20soft%20fabric%2C%20casual%20style&image_size=portrait_4_3',
    rating: 4.4,
    sales: 2100
  }
]

export default function Home() {
  const [currentBanner, setCurrentBanner] = useState(0)
  const [showWelcomeModal, setShowWelcomeModal] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerImages.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % bannerImages.length)
  }

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + bannerImages.length) % bannerImages.length)
  }

  const ProductCard = ({ product }: { product: any }) => (
    <Link to={`/products/${product.id}`} className="group">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="aspect-[3/4] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h3 className="font-medium text-primary-black mb-2">{product.name}</h3>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-accent-blue">¥{product.price}</span>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-primary-gray ml-1">{product.rating}</span>
            </div>
          </div>
          {product.sales && (
            <p className="text-xs text-primary-gray mt-1">已售 {product.sales} 件</p>
          )}
        </div>
      </div>
    </Link>
  )

  return (
    <div className="bg-primary-gray/5">
      {/* Welcome Modal */}
      {showWelcomeModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">欢迎来到 FASHION</h2>
            <p className="text-primary-gray mb-6">
              新用户专享优惠券已发放到您的账户，首次购物满300元立减50元！
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowWelcomeModal(false)}
                className="flex-1 bg-primary-black text-white py-2 rounded hover:bg-gray-800 transition-colors"
              >
                立即购物
              </button>
              <button
                onClick={() => setShowWelcomeModal(false)}
                className="flex-1 border border-primary-gray text-primary-gray py-2 rounded hover:bg-primary-gray/10 transition-colors"
              >
                稍后再说
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Banner Carousel */}
      <div className="relative h-carousel-mobile md:h-carousel-desktop overflow-hidden">
        {bannerImages.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentBanner ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">{banner.title}</h1>
                <p className="text-lg md:text-xl mb-8">{banner.subtitle}</p>
                <Link
                  to="/products"
                  className="inline-block bg-accent-blue text-white px-8 py-3 rounded hover:bg-blue-800 transition-colors"
                >
                  立即购买
                </Link>
              </div>
            </div>
          </div>
        ))}
        
        {/* Banner Controls */}
        <button
          onClick={prevBanner}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextBanner}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Banner Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {bannerImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentBanner ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* New Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-black mb-4">新品推荐</h2>
            <p className="text-primary-gray">最新上架的时尚单品</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-card">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Hot Products Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-black mb-4">热销商品</h2>
            <p className="text-primary-gray">最受欢迎的精选单品</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-card">
            {hotProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}