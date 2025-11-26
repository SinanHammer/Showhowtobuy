import { Search, ShoppingCart, User, Menu, X, LogOut, Settings, Package } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuthStore()
  const { items } = useCartStore()

  const isAuthPage = location.pathname.startsWith('/auth')

  const handleLogout = async () => {
    await logout()
    toast.success('已退出登录')
    navigate('/')
  }

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="bg-primary-white border-b border-primary-gray/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary-black">
            FASHION
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/products" className="text-primary-gray hover:text-primary-black transition-colors">
              商品
            </Link>
            <Link to="/contact" className="text-primary-gray hover:text-primary-black transition-colors">
              联系我们
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-primary-gray/10 rounded-lg px-4 py-2 w-80">
            <Search className="w-4 h-4 text-primary-gray mr-2" />
            <input
              type="text"
              placeholder="搜索商品..."
              className="bg-transparent outline-none flex-1 text-sm"
            />
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <Link to="/profile" className="flex items-center space-x-2 text-primary-gray hover:text-primary-black">
                <User className="w-5 h-5" />
                <span className="hidden md:inline text-sm">{user?.name}</span>
              </Link>
            ) : (
              <>
                <Link to="/auth/login" className="text-primary-gray hover:text-primary-black">
                  登录
                </Link>
                <Link
                  to="/auth/register"
                  className="bg-primary-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  注册
                </Link>
              </>
            )}
            
            <Link to="/cart" className="relative text-primary-gray hover:text-primary-black">
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-primary-gray hover:text-primary-black"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-primary-gray/20 py-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/products" className="text-primary-gray hover:text-primary-black">
                商品
              </Link>
              <Link to="/contact" className="text-primary-gray hover:text-primary-black">
                联系我们
              </Link>
              <div className="flex items-center bg-primary-gray/10 rounded-lg px-4 py-2">
                <Search className="w-4 h-4 text-primary-gray mr-2" />
                <input
                  type="text"
                  placeholder="搜索商品..."
                  className="bg-transparent outline-none flex-1 text-sm"
                />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}