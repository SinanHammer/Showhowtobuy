import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-primary-black text-primary-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4">FASHION</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              为追求时尚的中国女性提供便捷的在线购物平台，专注于快时尚女装销售。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">快速链接</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products" className="text-gray-300 hover:text-white transition-colors">所有商品</Link></li>
              <li><Link to="/cart" className="text-gray-300 hover:text-white transition-colors">购物车</Link></li>
              <li><Link to="/orders" className="text-gray-300 hover:text-white transition-colors">我的订单</Link></li>
              <li><Link to="/profile" className="text-gray-300 hover:text-white transition-colors">个人中心</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">客户服务</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">联系我们</Link></li>
              <li><span className="text-gray-300">客服邮箱: service@fashion.com</span></li>
              <li><span className="text-gray-300">工作时间: 9:00-18:00</span></li>
            </ul>
          </div>

          {/* Social & Payment */}
          <div>
            <h4 className="font-semibold mb-4">支付方式</h4>
            <div className="flex space-x-2 mb-4">
              <div className="bg-white text-black px-3 py-1 rounded text-xs font-medium">支付宝</div>
              <div className="bg-white text-black px-3 py-1 rounded text-xs font-medium">微信</div>
            </div>
            <p className="text-gray-300 text-xs">
              安全支付保障，支持多种支付方式
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300 text-sm">
            © 2024 FASHION. 保留所有权利。
          </p>
        </div>
      </div>
    </footer>
  )
}