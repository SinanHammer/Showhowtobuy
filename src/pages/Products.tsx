import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShoppingCart, Filter, Search, Grid, List } from 'lucide-react'
import { toast } from 'sonner'
import { useCartStore } from '@/stores/cart'
import type { Product } from '@/lib/supabase'

// 模拟商品数据
const mockProducts: Product[] = [
  {
    id: '1',
    name: '优雅连衣裙 - 春季新款',
    description: '精致的春季连衣裙，采用高品质面料，舒适透气，展现女性优雅魅力',
    price: 299,
    original_price: 399,
    category: '连衣裙',
    category_id: '1',
    brand_id: '1',
    images: ['https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=elegant%20spring%20dress%20for%20women%20minimalist%20style%20soft%20colors&image_size=square'],
    colors: ['白色', '粉色', '蓝色'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock_quantity: 50,
    stock: 50,
    is_active: true,
    is_featured: true,
    is_new: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    name: '时尚西装外套',
    description: '经典西装外套，剪裁精良，适合职场和正式场合',
    price: 599,
    original_price: 799,
    category: '外套',
    category_id: '2',
    brand_id: '2',
    images: ['https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=women%20blazer%20jacket%20professional%20style%20navy%20blue%20tailored&image_size=square'],
    colors: ['黑色', '海军蓝', '灰色'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock_quantity: 30,
    stock: 30,
    is_active: true,
    is_featured: false,
    is_new: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: '休闲牛仔裤',
    description: '舒适休闲牛仔裤，经典版型，百搭单品',
    price: 199,
    original_price: 259,
    category: '裤装',
    category_id: '3',
    brand_id: '3',
    images: ['https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=women%20casual%20jeans%20classic%20fit%20denim%20blue%20comfortable&image_size=square'],
    colors: ['浅蓝', '深蓝', '黑色'],
    sizes: ['26', '27', '28', '29', '30'],
    stock_quantity: 80,
    stock: 80,
    is_active: true,
    is_featured: true,
    is_new: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    name: '丝绸衬衫',
    description: '高品质丝绸衬衫，光滑舒适，展现优雅气质',
    price: 399,
    original_price: 499,
    category: '衬衫',
    category_id: '4',
    brand_id: '1',
    images: ['https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=women%20silk%20blouse%20elegant%20white%20luxury%20fabric%20professional&image_size=square'],
    colors: ['白色', '米色', '粉色'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock_quantity: 25,
    stock: 25,
    is_active: true,
    is_featured: false,
    is_new: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '5',
    name: '针织毛衣',
    description: '温暖舒适的针织毛衣，适合秋冬季节',
    price: 259,
    original_price: 329,
    category: '毛衣',
    category_id: '5',
    brand_id: '4',
    images: ['https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=women%20knit%20sweater%20cozy%20beige%20autumn%20winter%20warm&image_size=square'],
    colors: ['米色', '灰色', '粉色'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock_quantity: 40,
    stock: 40,
    is_active: true,
    is_featured: false,
    is_new: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '6',
    name: '运动套装',
    description: '时尚运动套装，舒适透气，适合运动和日常穿着',
    price: 359,
    original_price: 459,
    category: '运动装',
    category_id: '6',
    brand_id: '5',
    images: ['https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=women%20athletic%20set%20sportswear%20stylish%20comfortable%20modern&image_size=square'],
    colors: ['黑色', '灰色', '紫色'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock_quantity: 60,
    stock: 60,
    is_active: true,
    is_featured: true,
    is_new: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]

const categories = [
  { id: '1', name: '连衣裙' },
  { id: '2', name: '外套' },
  { id: '3', name: '裤装' },
  { id: '4', name: '衬衫' },
  { id: '5', name: '毛衣' },
  { id: '6', name: '运动装' }
]

const brands = [
  { id: '1', name: '优雅时尚' },
  { id: '2', name: '职场精英' },
  { id: '3', name: '休闲舒适' },
  { id: '4', name: '经典品质' },
  { id: '5', name: '活力运动' }
]

export default function Products() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedBrand, setSelectedBrand] = useState<string>('')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [sortBy, setSortBy] = useState<string>('default')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const { addItem } = useCartStore()

  // 过滤和排序逻辑
  useEffect(() => {
    let filtered = products

    // 搜索过滤
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // 分类过滤
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // 品牌过滤
    if (selectedBrand) {
      filtered = filtered.filter(product => product.brand_id === selectedBrand)
    }

    // 价格过滤
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )

    // 排序
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        break
    }

    setFilteredProducts(filtered)
  }, [products, searchTerm, selectedCategory, selectedBrand, priceRange, sortBy])

  const handleAddToCart = (product: Product) => {
    addItem({
      product_id: product.id,
      user_id: '1',
      quantity: 1,
      price: product.price,
      color: product.colors[0],
      size: product.sizes[0]
    })
    toast.success(`已添加 ${product.name} 到购物车`)
  }

  const clearFilters = () => {
    setSelectedCategory('')
    setSelectedBrand('')
    setPriceRange([0, 1000])
    setSearchTerm('')
    setSortBy('default')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 页面标题 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary-black mb-2">所有商品</h1>
        <p className="text-primary-gray">发现最新时尚单品</p>
      </div>

      {/* 搜索和控制栏 */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-gray" />
          <input
            type="text"
            placeholder="搜索商品..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-primary-gray/30 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none"
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center gap-2 px-4 py-2 border border-primary-gray/30 rounded-lg hover:bg-primary-gray/5"
          >
            <Filter className="w-4 h-4" />
            筛选
          </button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-primary-gray/30 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none"
          >
            <option value="default">默认排序</option>
            <option value="price-low">价格从低到高</option>
            <option value="price-high">价格从高到低</option>
            <option value="newest">最新上架</option>
            <option value="name">名称排序</option>
          </select>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-accent-blue text-white' : 'bg-primary-gray/10 text-primary-gray'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-accent-blue text-white' : 'bg-primary-gray/10 text-primary-gray'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        {/* 筛选侧边栏 */}
        <div className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-64 bg-white rounded-lg shadow-sm p-6`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-primary-black">筛选条件</h3>
            <button
              onClick={clearFilters}
              className="text-sm text-accent-blue hover:underline"
            >
              清除全部
            </button>
          </div>

          {/* 分类筛选 */}
          <div className="mb-6">
            <h4 className="font-medium text-primary-black mb-3">分类</h4>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === ''}
                  onChange={() => setSelectedCategory('')}
                  className="mr-2 text-accent-blue"
                />
                <span className="text-sm">全部分类</span>
              </label>
              {categories.map(category => (
                <label key={category.id} className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === category.id}
                    onChange={() => setSelectedCategory(category.id)}
                    className="mr-2 text-accent-blue"
                  />
                  <span className="text-sm">{category.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 品牌筛选 */}
          <div className="mb-6">
            <h4 className="font-medium text-primary-black mb-3">品牌</h4>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="brand"
                  checked={selectedBrand === ''}
                  onChange={() => setSelectedBrand('')}
                  className="mr-2 text-accent-blue"
                />
                <span className="text-sm">全部品牌</span>
              </label>
              {brands.map(brand => (
                <label key={brand.id} className="flex items-center">
                  <input
                    type="radio"
                    name="brand"
                    checked={selectedBrand === brand.id}
                    onChange={() => setSelectedBrand(brand.id)}
                    className="mr-2 text-accent-blue"
                  />
                  <span className="text-sm">{brand.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 价格范围 */}
          <div className="mb-6">
            <h4 className="font-medium text-primary-black mb-3">价格范围</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                  className="w-20 px-2 py-1 border border-primary-gray/30 rounded text-sm"
                  placeholder="最低"
                />
                <span className="text-primary-gray">-</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 1000])}
                  className="w-20 px-2 py-1 border border-primary-gray/30 rounded text-sm"
                  placeholder="最高"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 商品列表 */}
        <div className="flex-1">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-primary-gray">
              找到 {filteredProducts.length} 件商品
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-primary-gray mb-4">没有找到符合条件的商品</p>
              <button
                onClick={clearFilters}
                className="text-accent-blue hover:underline"
              >
                清除筛选条件
              </button>
            </div>
          ) : (
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
            }>
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow ${
                    viewMode === 'list' ? 'flex gap-4 p-4' : 'overflow-hidden'
                  }`}
                >
                  <Link to={`/products/${product.id}`} className={viewMode === 'list' ? 'w-32 h-32 flex-shrink-0' : ''}>
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className={`object-cover ${
                        viewMode === 'list' 
                          ? 'w-full h-full rounded-lg' 
                          : 'w-full h-64 rounded-t-lg'
                      }`}
                    />
                  </Link>

                  <div className={viewMode === 'list' ? 'flex-1' : 'p-4'}>
                    <Link to={`/products/${product.id}`}>
                      <h3 className="font-semibold text-primary-black mb-2 hover:text-accent-blue">
                        {product.name}
                      </h3>
                    </Link>

                    <p className="text-primary-gray text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold text-accent-blue">
                        ¥{product.price}
                      </span>
                      {product.original_price && (
                        <span className="text-sm text-primary-gray line-through">
                          ¥{product.original_price}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex gap-1">
                        {product.colors.slice(0, 3).map((color, index) => (
                          <div
                            key={index}
                            className="w-4 h-4 rounded-full border border-primary-gray/30"
                            style={{ backgroundColor: color === '白色' ? '#ffffff' : color === '黑色' ? '#000000' : color === '灰色' ? '#6b7280' : color === '蓝色' ? '#3b82f6' : color === '粉色' ? '#ec4899' : '#8b5cf6' }}
                            title={color}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-primary-gray">
                        {product.colors.length} 种颜色
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 bg-primary-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                      >
                        <ShoppingCart className="w-4 h-4 inline mr-1" />
                        加入购物车
                      </button>
                      <button className="p-2 border border-primary-gray/30 rounded-lg hover:bg-primary-gray/5 transition-colors">
                        <Heart className="w-4 h-4 text-primary-gray hover:text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}