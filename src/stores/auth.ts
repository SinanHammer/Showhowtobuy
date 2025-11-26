import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabase, User } from '@/lib/supabase'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  logout: () => Promise<void>
  checkSession: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setLoading: (loading) => set({ isLoading: loading }),
      logout: async () => {
        await supabase.auth.signOut()
        set({ user: null, isAuthenticated: false })
      },
      checkSession: async () => {
        try {
          const { data: { session } } = await supabase.auth.getSession()
          
          if (session?.user) {
            // 获取用户详细信息
            const { data: userData, error } = await supabase
              .from('users')
              .select('*')
              .eq('id', session.user.id)
              .single()

            if (!error && userData) {
              get().setUser(userData)
            }
          } else {
            get().setUser(null)
          }
        } catch (error) {
          console.error('检查会话失败:', error)
          get().setUser(null)
        } finally {
          get().setLoading(false)
        }
      }
    }),
    {
      name: 'auth-storage',
    }
  )
)

// 监听认证状态变化
supabase.auth.onAuthStateChange(async (event, session) => {
  const { checkSession, setUser } = useAuthStore.getState()
  
  if (event === 'SIGNED_IN' && session?.user) {
    await checkSession()
  } else if (event === 'SIGNED_OUT') {
    setUser(null)
  }
})