import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Heart, ShoppingCart, Star, Minus, Plus, ChevronLeft, Share2, Shield, Truck } from 'lucide-react'
import { toast } from 'sonner'
import { useCartStore } from '@/stores/cart'
import type { Product } from '@/lib/supabase'

// 模拟商品数据
const mockProducts: Product[] = [
  {
    id: '1',
    name: '优雅连衣裙 - 春季新款',
    description: '精致的春季连衣裙，采用高品质面料，舒适透气，展现女性优雅魅力。这款连衣裙采用经典的A字版型设计，能够很好地修饰身材曲线，适合各种体型的女性穿着。面料选用优质的聚酯纤维混纺材质，手感柔软舒适，穿着体验极佳。',
    price: 299,
    original_price: 399,
    category: '连衣裙',
    category_id: '1',
    brand_id: '1',
    images: [
      'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=elegant%20spring%20dress%20for%20women%20minimalist%20style%20soft%20colors%20flowing%20fabric&image_size=square',
      'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=women%20dress%20side%20view%20elegant%20design%20soft%20lighting&image_size=square',
      'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=women%20dress%20back%20view%20detailed%20craftsmanship%20quality%20fabric&image_size=square'
    ],
    colors: ['白色', '粉色', '蓝色'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock_quantity: 50,
    stock: 50,
    is_active: true,
    is_featured: true,
    is_new: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { addItem } = useCartStore()
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 模拟加载商品数据
    setTimeout(() => {
      const foundProduct = mockProducts.find(p => p.id === id)
      if (foundProduct) {
        setProduct(foundProduct)
        setSelectedColor(foundProduct.colors[0])
        setSelectedSize(foundProduct.sizes[0])
      }
      setIsLoading(false)
    }, 500)
  }, [id])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="aspect-square bg-gray-200 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-primary-black mb-4">商品不存在</h1>
        <button
          onClick={() => navigate('/products')}
          className="bg-primary-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
          返回商品列表
        </button>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error('请选择颜色和尺码')
      return
    }

    addItem({
      product_id: product.id,
      user_id: '1',
      quantity,
      price: product.price,
      color: selectedColor,
      size: selectedSize
    })

    toast.success('已添加到购物车')
  }

  const handleBuyNow = () => {
    handleAddToCart()
    navigate('/cart')
  }

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 面包屑导航 */}
      <div className="flex items-center gap-2 text-sm text-primary-gray mb-6">
        <button onClick={() => navigate('/')} className="hover:text-accent-blue">
          首页
        </button>
        <span>/</span>
        <button onClick={() => navigate('/products')} className="hover:text-accent-blue">
          商品列表
        </button>
        <span>/</span>
        <span className="text-primary-black">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 商品图片 */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                  selectedImage === index ? 'border-accent-blue' : 'border-transparent'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* 商品信息 */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-primary-black mb-2">{product.name}</h1>
            <p className="text-primary-gray">{product.description}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-accent-blue">¥{product.price}</span>
              {product.original_price && (
                <span className="text-lg text-primary-gray line-through">¥{product.original_price}</span>
              )}
            </div>
            {product.original_price && (
              <span className="inline-block bg-accent-blue text-white text-sm px-2 py-1 rounded">
                节省 ¥{product.original_price - product.price}
              </span>
            )}
          </div>

          {/* 颜色选择 */}
          <div>
            <h3 className="text-lg font-semibold text-primary-black mb-3">颜色</h3>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                    selectedColor === color
                      ? 'border-accent-blue bg-accent-blue/5'
                      : 'border-primary-gray/30 hover:border-primary-gray/50'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* 尺码选择 */}
          <div>
            <h3 className="text-lg font-semibold text-primary-black mb-3">尺码</h3>
            <div className="flex gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                    selectedSize === size
                      ? 'border-accent-blue bg-accent-blue/5'
                      : 'border-primary-gray/30 hover:border-primary-gray/50'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* 数量选择 */}
          <div>
            <h3 className="text-lg font-semibold text-primary-black mb-3">数量</h3>
            <div className="flex items-center gap-4">
              <button
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className="w-10 h-10 rounded-lg border border-primary-gray/30 flex items-center justify-center hover:border-accent-blue disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
              <button
                onClick={incrementQuantity}
                disabled={quantity >= product.stock}
                className="w-10 h-10 rounded-lg border border-primary-gray/30 flex items-center justify-center hover:border-accent-blue disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-primary-gray mt-2">库存：{product.stock} 件</p>
          </div>

          {/* 操作按钮 */}
          <div className="space-y-3">
            <button
              onClick={handleAddToCart}
              className="w-full bg-primary-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              加入购物车
            </button>
            <button
              onClick={handleBuyNow}
              className="w-full bg-accent-blue text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              立即购买
            </button>
          </div>

          {/* 其他操作 */}
          <div className="flex items-center justify-between pt-4 border-t border-primary-gray/20">
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="flex items-center gap-2 text-primary-gray hover:text-accent-blue transition-colors"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current text-red-500' : ''}`} />
              {isWishlisted ? '已收藏' : '收藏'}
            </button>
            <button className="flex items-center gap-2 text-primary-gray hover:text-accent-blue transition-colors">
              <Share2 className="w-5 h-5" />
              分享
            </button>
          </div>

          {/* 服务承诺 */}
          <div className="bg-primary-gray/5 rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2 text-sm text-primary-gray">
              <Shield className="w-4 h-4" />
              <span>正品保证</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-primary-gray">
              <Truck className="w-4 h-4" />
              <span>满299元包邮</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}