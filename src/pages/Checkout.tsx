import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CreditCard, Truck, Shield, ChevronRight, Plus, MapPin, Phone, Mail } from 'lucide-react'
import { toast } from 'sonner'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'

interface Address {
  id: string
  name: string
  phone: string
  address: string
  is_default: boolean
}

interface PaymentMethod {
  id: string
  name: string
  type: 'alipay' | 'wechat' | 'bank'
  icon: string
  description: string
}

const mockAddresses: Address[] = [
  {
    id: '1',
    name: '张小明',
    phone: '138****8888',
    address: '北京市朝阳区建国门外大街1号',
    is_default: true
  },
  {
    id: '2',
    name: '李小红',
    phone: '139****9999',
    address: '上海市浦东新区陆家嘴环路1000号',
    is_default: false
  }
]

const paymentMethods: PaymentMethod[] = [
  {
    id: 'alipay',
    name: '支付宝',
    type: 'alipay',
    icon: '支',
    description: '推荐使用支付宝支付'
  },
  {
    id: 'wechat',
    name: '微信支付',
    type: 'wechat',
    icon: '微',
    description: '使用微信支付'
  },
  {
    id: 'bank',
    name: '银行卡',
    type: 'bank',
    icon: '银',
    description: '支持储蓄卡、信用卡'
  }
]

export default function Checkout() {
  const { items, clearCart } = useCartStore()
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const [selectedAddress, setSelectedAddress] = useState(mockAddresses[0])
  const [paymentMethod, setPaymentMethod] = useState('alipay')
  const [isLoading, setIsLoading] = useState(false)
  const [orderNote, setOrderNote] = useState('')
  const [showAddressModal, setShowAddressModal] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)

  // 计算总价
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal >= 299 ? 0 : 15
  const total = subtotal + shipping

  const handleSubmitOrder = async () => {
    if (!selectedAddress) {
      toast.error('请选择收货地址')
      return
    }

    if (!agreeToTerms) {
      toast.error('请同意服务条款')
      return
    }

    setIsLoading(true)

    try {
      // 模拟订单提交
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // 清空购物车
      clearCart()
      
      toast.success('订单提交成功！')
      // 跳转到订单详情页
      navigate('/orders')
    } catch (error) {
      toast.error('订单提交失败，请重试')
    } finally {
      setIsLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold text-primary-black mb-4">购物车为空</h2>
          <p className="text-primary-gray mb-8">请先添加商品到购物车</p>
          <Link
            to="/products"
            className="bg-primary-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
          >
            去购物
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-primary-gray mb-6">
        <Link to="/cart" className="hover:text-accent-blue">
          购物车
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-primary-black">结算</span>
      </div>

      <h1 className="text-3xl font-bold text-primary-black mb-8">结算</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左侧：地址和支付方式 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 收货地址 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-primary-black flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                收货地址
              </h2>
              <button 
                onClick={() => setShowAddressModal(true)}
                className="text-accent-blue hover:underline text-sm"
              >
                管理地址
              </button>
            </div>

            <div className="space-y-3">
              {mockAddresses.map((address) => (
                <div
                  key={address.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedAddress.id === address.id
                      ? 'border-accent-blue bg-accent-blue/5'
                      : 'border-primary-gray/30 hover:border-primary-gray/50'
                  }`}
                  onClick={() => setSelectedAddress(address)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-primary-black">
                          {address.name}
                        </span>
                        <span className="text-primary-gray">{address.phone}</span>
                        {address.is_default && (
                          <span className="bg-accent-blue text-white text-xs px-2 py-1 rounded">
                            默认
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-primary-gray">
                        {address.address}
                      </p>
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        selectedAddress.id === address.id
                          ? 'border-accent-blue bg-accent-blue'
                          : 'border-primary-gray/30'
                      }`}
                    >
                      {selectedAddress.id === address.id && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setShowAddressModal(true)}
              className="mt-4 w-full border-2 border-dashed border-primary-gray/30 rounded-lg py-3 text-accent-blue hover:border-accent-blue transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              添加新地址
            </button>
          </div>

          {/* 支付方式 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-primary-black flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5" />
              支付方式
            </h2>

            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    paymentMethod === method.id
                      ? 'border-accent-blue bg-accent-blue/5'
                      : 'border-primary-gray/30 hover:border-primary-gray/50'
                  }`}
                  onClick={() => setPaymentMethod(method.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded flex items-center justify-center text-white text-xs font-bold ${
                        method.type === 'alipay' ? 'bg-blue-500' :
                        method.type === 'wechat' ? 'bg-green-500' : 'bg-gray-600'
                      }`}>
                        {method.icon}
                      </div>
                      <div>
                        <span className="font-medium text-primary-black block">{method.name}</span>
                        <span className="text-xs text-primary-gray">{method.description}</span>
                      </div>
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === method.id
                          ? 'border-accent-blue bg-accent-blue'
                          : 'border-primary-gray/30'
                      }`}
                    >
                      {paymentMethod === method.id && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 订单备注 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-primary-black mb-4">订单备注</h3>
            <textarea
              value={orderNote}
              onChange={(e) => setOrderNote(e.target.value)}
              placeholder="请输入订单备注（选填）"
              className="w-full p-3 border border-primary-gray/30 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none resize-none"
              rows={3}
            />
          </div>

          {/* 服务条款 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="rounded border-primary-gray/30 text-accent-blue focus:ring-accent-blue mt-1"
              />
              <label htmlFor="terms" className="text-sm text-primary-gray">
                我已阅读并同意{' '}
                <Link to="/terms" className="text-accent-blue hover:underline">
                  服务条款
                </Link>
                {' '}和{' '}
                <Link to="/privacy" className="text-accent-blue hover:underline">
                  隐私政策
                </Link>
                ，并确认订单信息无误
              </label>
            </div>
          </div>
        </div>

        {/* 右侧：订单摘要 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
            <h3 className="text-lg font-semibold text-primary-black mb-4">订单摘要</h3>

            {/* 商品列表 */}
            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <div className="flex-1">
                    <p className="text-primary-black font-medium">时尚女装单品</p>
                    <p className="text-primary-gray">
                      {item.color} | {item.size} × {item.quantity}
                    </p>
                  </div>
                  <p className="text-primary-black font-medium">
                    ¥{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <hr className="border-primary-gray/20 my-4" />

            {/* 费用明细 */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-primary-gray">商品小计</span>
                <span className="text-primary-black">¥{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-primary-gray">运费</span>
                <span className="text-primary-black">
                  {shipping === 0 ? '免费' : `¥${shipping.toFixed(2)}`}
                </span>
              </div>
            </div>

            <hr className="border-primary-gray/20 my-4" />

            {/* 总计 */}
            <div className="flex justify-between font-semibold text-lg mb-6">
              <span className="text-primary-black">总计</span>
              <span className="text-primary-black">¥{total.toFixed(2)}</span>
            </div>

            {/* 收货信息预览 */}
            <div className="bg-primary-gray/5 rounded-lg p-4 mb-4">
              <h4 className="text-sm font-semibold text-primary-black mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                收货信息
              </h4>
              <p className="text-sm text-primary-gray mb-1">
                {selectedAddress.name} {selectedAddress.phone}
              </p>
              <p className="text-sm text-primary-gray">
                {selectedAddress.address}
              </p>
            </div>

            {/* 支付方式预览 */}
            <div className="bg-primary-gray/5 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-semibold text-primary-black mb-2 flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                支付方式
              </h4>
              <p className="text-sm text-primary-gray">
                {paymentMethods.find(m => m.id === paymentMethod)?.name}
              </p>
            </div>

            {/* 安全提示 */}
            <div className="flex items-center gap-2 text-sm text-primary-gray mb-4">
              <Shield className="w-4 h-4" />
              <span>您的支付信息受到安全保护</span>
            </div>

            {/* 提交订单按钮 */}
            <button
              onClick={handleSubmitOrder}
              disabled={isLoading || !agreeToTerms}
              className="w-full bg-accent-blue text-white py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {isLoading ? '提交中...' : '提交订单'}
            </button>

            {/* 支付说明 */}
            <div className="mt-4 text-xs text-primary-gray text-center">
              <p>点击提交订单即表示您同意我们的</p>
              <Link to="/terms" className="text-accent-blue hover:underline">
                服务条款
              </Link>
              {' '}和{' '}
              <Link to="/privacy" className="text-accent-blue hover:underline">
                隐私政策
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}