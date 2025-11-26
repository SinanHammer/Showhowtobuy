import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Package, Clock, CheckCircle, XCircle, Truck, Eye, Download } from 'lucide-react'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/stores/auth'

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  color: string
  size: string
}

interface Order {
  id: string
  order_number: string
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  total_amount: number
  created_at: string
  items: OrderItem[]
  shipping_address: string
  payment_method: string
  tracking_number?: string
}

export default function Orders() {
  const { user } = useAuthStore()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

const getStatusConfig = (status: Order['status']) => {
  switch (status) {
    case 'pending':
      return {
        label: '待确认',
        icon: Clock,
        color: 'text-yellow-600 bg-yellow-50',
        action: '取消订单'
      }
    case 'confirmed':
      return {
        label: '已确认',
        icon: CheckCircle,
        color: 'text-blue-600 bg-blue-50',
        action: null
      }
    case 'shipped':
      return {
        label: '已发货',
        icon: Truck,
        color: 'text-purple-600 bg-purple-50',
        action: '查看物流'
      }
    case 'delivered':
      return {
        label: '已送达',
        icon: Package,
        color: 'text-green-600 bg-green-50',
        action: '申请售后'
      }
    case 'cancelled':
      return {
        label: '已取消',
        icon: XCircle,
        color: 'text-red-600 bg-red-50',
        action: null
      }
    default:
      return {
        label: '未知',
        icon: Clock,
        color: 'text-gray-600 bg-gray-50',
        action: null
      }
  }
}

  useEffect(() => {
    if (user) {
      fetchOrders()
    }
  }, [user])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select(`
          *,
          order_items(
            *,
            products(
              name,
              images,
              price
            )
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (ordersError) throw ordersError

      const formattedOrders: Order[] = ordersData.map(order => ({
        id: order.id,
        order_number: order.order_number,
        status: order.status,
        total_amount: order.total_amount,
        created_at: new Date(order.created_at).toLocaleString('zh-CN'),
        items: order.order_items.map((item: any) => ({
          id: item.id,
          name: item.products.name,
          price: item.products.price,
          quantity: item.quantity,
          image: item.products.images[0] || '',
          color: item.color,
          size: item.size
        })),
        shipping_address: order.shipping_address,
        payment_method: order.payment_method,
        tracking_number: order.tracking_number
      }))

      setOrders(formattedOrders)
    } catch (error) {
      console.error('获取订单失败:', error)
      toast.error('获取订单失败')
    } finally {
      setLoading(false)
    }
  }

  const filteredOrders = selectedStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === selectedStatus)

  const handleOrderAction = async (order: Order, action: string) => {
    switch (action) {
      case '取消订单':
        try {
          const { error } = await supabase
            .from('orders')
            .update({ status: 'cancelled' })
            .eq('id', order.id)
            .eq('user_id', user.id)

          if (error) throw error

          toast.success('订单已取消')
          fetchOrders()
        } catch (error) {
          console.error('取消订单失败:', error)
          toast.error('取消订单失败')
        }
        break
      case '查看物流':
        if (order.tracking_number) {
          toast.info(`物流单号：${order.tracking_number}`)
        } else {
          toast.info('暂无物流信息')
        }
        break
      case '申请售后':
        toast.info('请联系客服申请售后服务')
        break
      default:
        break
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-gray/5 pt-20">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue mx-auto mb-4"></div>
            <p className="text-primary-gray">加载中...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-primary-gray/5 pt-20">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-primary-black mb-4">请先登录</h2>
            <p className="text-primary-gray mb-6">登录后查看您的订单</p>
            <Link
              to="/auth/login"
              className="inline-block bg-primary-black text-white px-6 py-2 rounded-md hover:bg-primary-gray transition-colors"
            >
              立即登录
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const OrderCard = ({ order }: { order: Order }) => {
    const statusConfig = getStatusConfig(order.status)
    const StatusIcon = statusConfig.icon

    return (
      <div className="bg-white rounded-lg shadow-sm border border-primary-gray/20 overflow-hidden">
        {/* 订单头部 */}
        <div className="p-4 border-b border-primary-gray/20">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-4">
              <span className="text-sm text-primary-gray">订单号：</span>
              <span className="font-mono text-sm text-primary-black">
                {order.order_number}
              </span>
            </div>
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${statusConfig.color}`}>
              <StatusIcon className="w-4 h-4" />
              <span>{statusConfig.label}</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm text-primary-gray">
            <span>下单时间：{order.created_at}</span>
            <span>共{order.items.length}件商品</span>
          </div>
        </div>

        {/* 商品列表 */}
        <div className="p-4">
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-primary-black mb-1">
                    {item.name}
                  </h4>
                  <p className="text-xs text-primary-gray">
                    {item.color} | {item.size} | ×{item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-primary-black">
                    ¥{item.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-primary-gray/20">
            <div className="flex items-center justify-between">
              <div className="text-sm text-primary-gray">
                <p>收货地址：{order.shipping_address}</p>
                <p>支付方式：{order.payment_method}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-primary-gray mb-1">订单金额</p>
                <p className="text-lg font-semibold text-primary-black">
                  ¥{order.total_amount.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="px-4 py-3 bg-gray-50 border-t border-primary-gray/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedOrder(order)}
                className="flex items-center gap-1 text-sm text-accent-blue hover:underline"
              >
                <Eye className="w-4 h-4" />
                查看详情
              </button>
              {order.tracking_number && (
                <button
                  onClick={() => toast.info(`物流单号：${order.tracking_number}`)}
                  className="flex items-center gap-1 text-sm text-accent-blue hover:underline"
                >
                  <Truck className="w-4 h-4" />
                  查看物流
                </button>
              )}
            </div>
            {statusConfig.action && (
              <button
                onClick={() => handleOrderAction(order, statusConfig.action!)}
                className="px-4 py-2 bg-primary-black text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
              >
                {statusConfig.action}
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-primary-black">我的订单</h1>
        <button className="flex items-center gap-2 px-4 py-2 border border-primary-gray/30 rounded-lg hover:bg-gray-50 transition-colors">
          <Download className="w-4 h-4" />
          导出订单
        </button>
      </div>

      {/* 状态筛选 */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedStatus('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedStatus === 'all'
                ? 'bg-primary-black text-white'
                : 'bg-white border border-primary-gray/30 text-primary-black hover:bg-gray-50'
            }`}
          >
            全部订单
          </button>
          {[
            { key: 'pending', label: '待确认' },
            { key: 'confirmed', label: '已确认' },
            { key: 'shipped', label: '已发货' },
            { key: 'delivered', label: '已送达' },
            { key: 'cancelled', label: '已取消' }
          ].map((status) => (
            <button
              key={status.key}
              onClick={() => setSelectedStatus(status.key)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedStatus === status.key
                  ? 'bg-primary-black text-white'
                  : 'bg-white border border-primary-gray/30 text-primary-black hover:bg-gray-50'
              }`}
            >
              {status.label}
            </button>
          ))}
        </div>
      </div>

      {/* 订单列表 */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-primary-gray mx-auto mb-4" />
            <h3 className="text-lg font-medium text-primary-black mb-2">暂无订单</h3>
            <p className="text-primary-gray mb-6">您还没有任何订单记录</p>
            <Link
              to="/products"
              className="bg-primary-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
            >
              去购物
            </Link>
          </div>
        ) : (
          filteredOrders.map((order) => <OrderCard key={order.id} order={order} />)
        )}
      </div>

      {/* 订单详情弹窗 */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-primary-gray/20">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-primary-black">订单详情</h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-primary-gray hover:text-primary-black"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {/* 订单信息 */}
                <div>
                  <h3 className="text-lg font-medium text-primary-black mb-3">订单信息</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-primary-gray">订单号：</span>
                      <span className="text-primary-black">{selectedOrder.order_number}</span>
                    </div>
                    <div>
                      <span className="text-primary-gray">下单时间：</span>
                      <span className="text-primary-black">{selectedOrder.created_at}</span>
                    </div>
                    <div>
                      <span className="text-primary-gray">订单状态：</span>
                      <span className="text-primary-black">
                        {getStatusConfig(selectedOrder.status).label}
                      </span>
                    </div>
                    <div>
                      <span className="text-primary-gray">支付方式：</span>
                      <span className="text-primary-black">{selectedOrder.payment_method}</span>
                    </div>
                  </div>
                </div>

                {/* 收货地址 */}
                <div>
                  <h3 className="text-lg font-medium text-primary-black mb-3">收货地址</h3>
                  <p className="text-sm text-primary-black">{selectedOrder.shipping_address}</p>
                </div>

                {/* 商品列表 */}
                <div>
                  <h3 className="text-lg font-medium text-primary-black mb-3">商品列表</h3>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 p-3 border border-primary-gray/20 rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-primary-black">{item.name}</h4>
                          <p className="text-sm text-primary-gray">
                            {item.color} | {item.size} | ×{item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-primary-gray">单价：¥{item.price.toFixed(2)}</p>
                          <p className="font-medium text-primary-black">
                            小计：¥{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 费用明细 */}
                <div>
                  <h3 className="text-lg font-medium text-primary-black mb-3">费用明细</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-primary-gray">商品总价：</span>
                      <span className="text-primary-black">¥{selectedOrder.total_amount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-primary-gray">运费：</span>
                      <span className="text-primary-black">¥0.00</span>
                    </div>
                    <hr className="border-primary-gray/20" />
                    <div className="flex justify-between font-semibold">
                      <span className="text-primary-black">订单总额：</span>
                      <span className="text-primary-black">¥{selectedOrder.total_amount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}