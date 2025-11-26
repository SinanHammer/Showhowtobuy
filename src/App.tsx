import { Toaster } from 'sonner'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useAuthStore } from '@/stores/auth'

function App() {
  const { checkSession } = useAuthStore()

  useEffect(() => {
    // 检查用户会话
    checkSession()
  }, [checkSession])

  return (
    <div className="min-h-screen bg-primary-white">
      <Header />
      <main className="min-h-[calc(100vh-200px)]">
        <Outlet />
      </main>
      <Footer />
      <Toaster position="top-center" />
    </div>
  )
}

export default App
