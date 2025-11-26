import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Heart, Tag } from 'lucide-react'
import { toast } from 'sonner'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'

interface CartItem {
  id: string
  product_id: string
  user_id: string
  quantity: number
  price: number
  color: string
  size: string
  created_at: string
}

export default function Cart() {
  const { items, updateQuantity, removeItem, clearCart } = useCartStore()
  const { isAuthenticated } = useAuthStore()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set(items.map(item => item.id)))
  const [promoCode, setPromoCode] = useState('')
  const [discount, setDiscount] = useState(0)

  // 计算选中的商品总价
  const selectedItemsArray = items.filter(item => selectedItems.has(item.id))
  const subtotal = selectedItemsArray.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal >= 299 ? 0 : 15 // 满299免运费
  const total = subtotal + shipping - discount

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId)
      setSelectedItems(prev => {
        const newSet = new Set(prev)
        newSet.delete(itemId)
        return newSet
      })
      toast.success('商品已从购物车移除')
    } else {
      updateQuantity(itemId, newQuantity)
    }
  }

  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId)
    setSelectedItems(prev => {
      const newSet = new Set(prev)
      newSet.delete(itemId)
      return newSet
    })
    toast.success('商品已从购物车移除')
  }

  const handleItemSelect = (itemId: string) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(itemId)) {
        newSet.delete(itemId)
      } else {
        newSet.add(itemId)
      }
      return newSet
    })
  }

  const handleSelectAll = () => {
    if (selectedItems.size === items.length) {
      setSelectedItems(new Set())
    } else {
      setSelectedItems(new Set(items.map(item => item.id)))
    }
  }

  const handleApplyPromoCode = () => {
    if (promoCode.toUpperCase() === 'NEW10') {
      setDiscount(subtotal * 0.1)
      toast.success('优惠码应用成功！享受9折优惠')
    } else if (promoCode.toUpperCase() === 'SAVE20') {
      setDiscount(20)
      toast.success('优惠码应用成功！减免20元')
    } else {
      toast.error('优惠码无效')
    }
  }

  const handleCheckout = () => {
    if (selectedItemsArray.length === 0) {
      toast.error('请选择要结算的商品')
      return
    }

    if (!isAuthenticated) {
      toast.error('请先登录后再结算')
      return
    }

    setIsLoading(true)
    // 模拟结算流程
    setTimeout(() => {
      setIsLoading(false)
      navigate('/checkout')
    }, 1000)
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <ShoppingBag className="w-16 h-16 text-primary-gray mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-primary-black mb-2">购物车是空的</h2>
          <p className="text-primary-gray mb-8">快去添加一些心仪的商品吧！</p>
          <Link
            to="/products"
            className="bg-primary-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
          >
            去购物
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary-black mb-8">购物车</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 商品列表 */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-primary-gray/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={selectedItems.size === items.length && items.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-primary-gray/30 text-accent-blue focus:ring-accent-blue"
                  />
                  <h2 className="text-lg font-semibold text-primary-black">
                    商品 ({items.length})
                  </h2>
                </div>
                <button
                  onClick={clearCart}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  清空购物车
                </button>
              </div>
            </div>

            <div className="divide-y divide-primary-gray/20">
              {items.map((item) => (
                <div key={item.id} className="p-6">
                  <div className="flex gap-4">
                    <input
                      type="checkbox"
                      checked={selectedItems.has(item.id)}
                      onChange={() => handleItemSelect(item.id)}
                      className="rounded border-primary-gray/30 text-accent-blue focus:ring-accent-blue mt-1"
                    />
                    
                    {/* 商品图片 */}
                    <div className="w-20 h-20 bg-primary-gray/10 rounded-lg flex-shrink-0">
                      <img
                        src="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=fashion%20clothing%20item%20minimalist%20style%20elegant%20design&image_size=square"
                        alt="商品图片"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    {/* 商品信息 */}
                    <div className="flex-1">
                      <h3 className="font-medium text-primary-black mb-1">
                        时尚女装单品
                      </h3>
                      <p className="text-sm text-primary-gray mb-2">
                        颜色: {item.color} | 尺码: {item.size}
                      </p>
                      <p className="text-accent-blue font-semibold">
                        ¥{item.price}
                      </p>
                    </div>

                    {/* 数量控制 */}
                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-primary-gray hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full border border-primary-gray/30 flex items-center justify-center hover:bg-primary-gray/5 disabled:opacity-50"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full border border-primary-gray/30 flex items-center justify-center hover:bg-primary-gray/5"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 优惠码 */}
          <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-5 h-5 text-accent-blue" />
              <h3 className="text-lg font-semibold text-primary-black">优惠码</h3>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="输入优惠码（如：NEW10, SAVE20）"
                className="flex-1 px-3 py-2 border border-primary-gray/30 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none"
              />
              <button
                onClick={handleApplyPromoCode}
                className="px-4 py-2 bg-accent-blue text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                应用
              </button>
            </div>
          </div>

          {/* 继续购物 */}
          <div className="mt-6">
            <Link
              to="/products"
              className="text-accent-blue hover:underline inline-flex items-center gap-1"
            >
              ← 继续购物
            </Link>
          </div>
        </div>

        {/* 订单摘要 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
            <h3 className="text-lg font-semibold text-primary-black mb-4">
              订单摘要
            </h3>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-primary-gray">商品小计 ({selectedItemsArray.length}件)</span>
                <span className="text-primary-black">¥{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-primary-gray">运费</span>
                <span className="text-primary-black">
                  {shipping === 0 ? '免费' : `¥${shipping.toFixed(2)}`}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-primary-gray">优惠</span>
                  <span className="text-green-600">-¥{discount.toFixed(2)}</span>
                </div>
              )}
              {shipping > 0 && (
                <div className="text-xs text-accent-blue bg-accent-blue/10 p-2 rounded">
                  满¥299免运费，还差¥{(299 - subtotal).toFixed(2)}
                </div>
              )}
              <hr className="border-primary-gray/20" />
              <div className="flex justify-between font-semibold text-lg">
                <span className="text-primary-black">总计</span>
                <span className="text-primary-black">¥{total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isLoading || selectedItemsArray.length === 0}
              className="w-full bg-primary-black text-white py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {isLoading ? '处理中...' : '去结算'}
            </button>

            {!isAuthenticated && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
                请先登录后再结算
              </div>
            )}

            {selectedItemsArray.length === 0 && isAuthenticated && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800">
                请选择要结算的商品
              </div>
            )}

            <div className="mt-6 text-center">
              <p className="text-xs text-primary-gray">
                安全支付保障
              </p>
              <div className="flex justify-center gap-2 mt-2">
                <div className="w-8 h-8 bg-primary-gray/10 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-blue-600">支</span>
                </div>
                <div className="w-8 h-8 bg-primary-gray/10 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-green-600">微</span>
                </div>
                <div className="w-8 h-8 bg-primary-gray/10 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-blue-800">银</span>
                </div>
              </div>
            </div>
          </div>

          {/* 推荐商品 */}
          <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
            <h4 className="text-lg font-semibold text-primary-black mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              猜你喜欢
            </h4>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex gap-3">
                  <div className="w-16 h-16 bg-primary-gray/10 rounded-lg flex-shrink-0">
                    <img
                      src="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=fashion%20item%20minimalist%20style%20elegant&image_size=square"
                      alt="推荐商品"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-sm font-medium text-primary-black mb-1">时尚单品</h5>
                    <p className="text-sm text-accent-blue font-semibold">¥199</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}