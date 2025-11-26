import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Mail as MailIcon, Phone as PhoneIcon } from 'lucide-react'
import { toast } from 'sonner'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // 模拟提交
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success('消息发送成功！我们会尽快回复您。')
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
    } catch (error) {
      toast.error('发送失败，请重试')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary-black mb-4">联系我们</h1>
          <p className="text-lg text-primary-gray max-w-2xl mx-auto">
            有任何问题或建议？我们很乐意为您提供帮助。请通过以下方式联系我们，我们会尽快回复您。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* 联系信息 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-primary-black mb-6">联系方式</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-accent-blue/10 rounded-lg">
                    <MapPin className="w-5 h-5 text-accent-blue" />
                  </div>
                  <div>
                    <h3 className="font-medium text-primary-black mb-1">公司地址</h3>
                    <p className="text-sm text-primary-gray">
                      北京市朝阳区建国门外大街1号<br />
                      国贸大厦A座15层
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-accent-blue/10 rounded-lg">
                    <Phone className="w-5 h-5 text-accent-blue" />
                  </div>
                  <div>
                    <h3 className="font-medium text-primary-black mb-1">客服热线</h3>
                    <p className="text-sm text-primary-gray">
                      400-888-8888<br />
                      周一至周日 9:00-21:00
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-accent-blue/10 rounded-lg">
                    <Mail className="w-5 h-5 text-accent-blue" />
                  </div>
                  <div>
                    <h3 className="font-medium text-primary-black mb-1">邮箱地址</h3>
                    <p className="text-sm text-primary-gray">
                      service@fashion.com<br />
                      我们会在24小时内回复
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-accent-blue/10 rounded-lg">
                    <Clock className="w-5 h-5 text-accent-blue" />
                  </div>
                  <div>
                    <h3 className="font-medium text-primary-black mb-1">工作时间</h3>
                    <p className="text-sm text-primary-gray">
                      周一至周五：9:00-18:00<br />
                      周六至周日：10:00-17:00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 在线客服 */}
            <div className="bg-gradient-to-br from-accent-blue to-blue-600 rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-3">需要即时帮助？</h3>
              <p className="text-sm mb-4 opacity-90">
                我们的在线客服团队随时为您提供帮助
              </p>
              <button 
                onClick={() => toast.info('在线客服功能开发中...')}
                className="w-full bg-white text-accent-blue py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                在线客服
              </button>
            </div>
          </div>

          {/* 右侧：联系表单 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-primary-black mb-6">发送消息</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-primary-black mb-2">
                      姓名 *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-primary-gray/30 rounded-lg px-4 py-3 focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none transition-colors"
                      placeholder="请输入您的姓名"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-primary-black mb-2">
                      邮箱地址 *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-primary-gray/30 rounded-lg px-4 py-3 focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none transition-colors"
                      placeholder="请输入您的邮箱"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-primary-black mb-2">
                      联系电话
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full border border-primary-gray/30 rounded-lg px-4 py-3 focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none transition-colors"
                      placeholder="请输入您的联系电话"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-primary-black mb-2">
                      主题 *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-primary-gray/30 rounded-lg px-4 py-3 focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none transition-colors"
                    >
                      <option value="">请选择主题</option>
                      <option value="order">订单问题</option>
                      <option value="product">商品咨询</option>
                      <option value="shipping">物流配送</option>
                      <option value="return">退换货</option>
                      <option value="payment">支付问题</option>
                      <option value="other">其他问题</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-primary-black mb-2">
                    消息内容 *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full border border-primary-gray/30 rounded-lg px-4 py-3 focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none transition-colors resize-none"
                    placeholder="请详细描述您的问题或建议..."
                  />
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-primary-gray">
                    我们会尽快回复您的消息，通常在24小时内。
                  </p>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-accent-blue text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  >
                    {isLoading ? (
                      '发送中...'
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        发送消息
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* 常见问题 */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
              <h3 className="text-xl font-semibold text-primary-black mb-6">常见问题</h3>
              
              <div className="space-y-4">
                <div className="border border-primary-gray/20 rounded-lg">
                  <button 
                    onClick={() => toast.info('订单查询功能开发中...')}
                    className="w-full text-left p-4 hover:bg-gray-50 transition-colors"
                  >
                    <h4 className="font-medium text-primary-black mb-1">如何查询我的订单？</h4>
                    <p className="text-sm text-primary-gray">
                      登录您的账户，点击"我的订单"即可查看所有订单状态和物流信息。
                    </p>
                  </button>
                </div>

                <div className="border border-primary-gray/20 rounded-lg">
                  <button 
                    onClick={() => toast.info('退换货政策功能开发中...')}
                    className="w-full text-left p-4 hover:bg-gray-50 transition-colors"
                  >
                    <h4 className="font-medium text-primary-black mb-1">退换货政策是什么？</h4>
                    <p className="text-sm text-primary-gray">
                      我们提供7天无理由退换货服务，商品需保持原包装和吊牌完整。
                    </p>
                  </button>
                </div>

                <div className="border border-primary-gray/20 rounded-lg">
                  <button 
                    onClick={() => toast.info('配送时间功能开发中...')}
                    className="w-full text-left p-4 hover:bg-gray-50 transition-colors"
                  >
                    <h4 className="font-medium text-primary-black mb-1">配送需要多长时间？</h4>
                    <p className="text-sm text-primary-gray">
                      一般情况下，订单会在1-3个工作日内发货，3-7个工作日内送达。
                    </p>
                  </button>
                </div>

                <div className="border border-primary-gray/20 rounded-lg">
                  <button 
                    onClick={() => toast.info('支付方式功能开发中...')}
                    className="w-full text-left p-4 hover:bg-gray-50 transition-colors"
                  >
                    <h4 className="font-medium text-primary-black mb-1">支持哪些支付方式？</h4>
                    <p className="text-sm text-primary-gray">
                      我们支持支付宝、微信支付、银行卡等多种支付方式。
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 地图区域 */}
        <div className="mt-12">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-primary-black mb-6">门店位置</h2>
            <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-primary-gray mx-auto mb-2" />
                <p className="text-primary-gray">地图功能开发中...</p>
                <p className="text-sm text-primary-gray mt-1">北京市朝阳区建国门外大街1号</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}