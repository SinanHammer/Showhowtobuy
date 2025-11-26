import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/stores/auth'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { setUser } = useAuthStore()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name || !email || !password || !confirmPassword) {
      toast.error('请填写所有必填字段')
      return
    }

    if (password !== confirmPassword) {
      toast.error('两次输入的密码不一致')
      return
    }

    if (password.length < 6) {
      toast.error('密码长度至少6位')
      return
    }

    setIsLoading(true)

    try {
      // 使用Supabase进行用户注册
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
          }
        }
      })

      if (authError) {
        throw authError
      }

      if (authData.user) {
        // 在users表中创建用户记录
        const { data: userData, error: userError } = await supabase
          .from('users')
          .insert([
            {
              id: authData.user.id,
              email: email,
              name: name,
              is_verified: false,
              role: 'user'
            }
          ])
          .select()
          .single()

        if (userError) {
          throw userError
        }

        setUser(userData)
        toast.success('注册成功！欢迎加入我们！')
        navigate('/')
      }
    } catch (error) {
      toast.error('注册失败，请重试')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-gray/5 py-12">
      <div className="max-w-auth w-full mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary-black mb-2">创建账户</h1>
          <p className="text-primary-gray">加入我们，开启时尚购物之旅</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-primary-black mb-2">
              姓名
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-gray" />
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-primary-gray/30 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none transition-all"
                placeholder="请输入姓名"
                required
              />
            </div>
          </div>

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
                placeholder="请输入密码（至少6位）"
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

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-primary-black mb-2">
              确认密码
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-gray" />
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-primary-gray/30 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none transition-all"
                placeholder="请再次输入密码"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-gray hover:text-primary-black"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <input type="checkbox" className="rounded border-primary-gray/30 text-accent-blue focus:ring-accent-blue" required />
            <span className="ml-2 text-sm text-primary-gray">
              我同意{' '}
              <Link to="/terms" className="text-accent-blue hover:underline">
                服务条款
              </Link>
              {' '}和{' '}
              <Link to="/privacy" className="text-accent-blue hover:underline">
                隐私政策
              </Link>
            </span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary-black text-white py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isLoading ? '注册中...' : '创建账户'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-primary-gray">
            已有账户？{' '}
            <Link to="/auth/login" className="text-accent-blue hover:underline font-medium">
              立即登录
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}