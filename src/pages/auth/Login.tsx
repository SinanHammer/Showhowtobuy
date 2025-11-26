import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/stores/auth'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { setUser } = useAuthStore()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      toast.error('请填写邮箱和密码')
      return
    }

    setIsLoading(true)

    try {
      // 使用Supabase进行用户登录
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        throw authError
      }

      if (authData.user) {
        // 获取用户详细信息
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', authData.user.id)
          .single()

        if (userError) {
          throw userError
        }

        setUser(userData)
        toast.success('登录成功！')
        navigate('/')
      }
    } catch (error) {
      toast.error('登录失败，请检查邮箱和密码')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-gray/5 py-12">
      <div className="max-w-auth w-full mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary-black mb-2">欢迎回来</h1>
          <p className="text-primary-gray">登录您的账户继续购物</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-primary-black mb-2">
              邮箱地址
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-gray" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-primary-gray/30 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none transition-all"
                placeholder="请输入邮箱地址"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-primary-black mb-2">
              密码
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-gray" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-primary-gray/30 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none transition-all"
                placeholder="请输入密码"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-gray hover:text-primary-black"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-primary-gray/30 text-accent-blue focus:ring-accent-blue" />
              <span className="ml-2 text-sm text-primary-gray">记住我</span>
            </label>
            <Link to="/auth/forgot-password" className="text-sm text-accent-blue hover:underline">
              忘记密码？
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary-black text-white py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isLoading ? '登录中...' : '登录'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-primary-gray">
            还没有账户？{' '}
            <Link to="/auth/register" className="text-accent-blue hover:underline font-medium">
              立即注册
            </Link>
          </p>
        </div>

        {/* Social Login */}
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-primary-gray/30" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-primary-gray">或者使用</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center px-4 py-2 border border-primary-gray/30 rounded-lg hover:bg-primary-gray/5 transition-colors">
              <span className="text-sm font-medium">微信登录</span>
            </button>
            <button className="flex items-center justify-center px-4 py-2 border border-primary-gray/30 rounded-lg hover:bg-primary-gray/5 transition-colors">
              <span className="text-sm font-medium">支付宝登录</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}