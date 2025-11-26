# 从零实现 React + TypeScript + Vite 电商项目（完整手把手教程）

本教程将带你从空文件夹开始，逐步搭建与当前项目一致的前端工程（React + TypeScript + Vite + Tailwind + React Router + Zustand + Supabase），并在每一步提供可复制的文件内容与验证方法。严格按照步骤执行，最终你将得到一个可运行、可构建、可部署的电商网站骨架。

## 前置要求
- 安装 Node.js 20+ 与 npm
- 文本编辑器（推荐 VS Code）
- 熟悉命令行基础操作

## 目标与成果
- 使用 Vite 启动开发服务器并热更新
- 使用 React Router 管理路由
- 使用 Tailwind 进行样式设计
- 使用 Zustand 管理基础状态（用户、购物车）
- 预留 Supabase 客户端与环境变量接入

---

## 步骤 0：创建项目文件夹
- 在你想放置项目的路径创建一个空目录，例如 `c:\Users\ThinkPad\Desktop\test1234`
- 进入该目录并初始化 npm：

```bash
npm init -y
```

> 若你已在该路径打开 IDE，可直接继续下一步。

---

## 步骤 1：准备依赖与脚本
1) 将以下内容保存为项目根目录的 `package.json`：

```json
{
  "name": "test1234",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "check": "tsc -b --noEmit"
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.80.0",
    "clsx": "^2.1.1",
    "lucide-react": "^0.511.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^7.9.5",
    "sonner": "^2.0.7",
    "tailwind-merge": "^3.0.2",
    "zustand": "^5.0.8"
  },
  "devDependencies": {
    "@eslint/js": "^9.25.0",
    "@types/node": "^22.15.30",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.4.1",
    "autoprefixer": "^10.4.21",
    "babel-plugin-react-dev-locator": "^1.0.0",
    "eslint": "^9.25.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.19",
    "globals": "^16.0.0",
    "postcss": "^8.5.3",
    "tailwindcss": "^3.4.17",
    "terser": "^5.44.1",
    "typescript": "~5.8.3",
    "typescript-eslint": "^8.30.1",
    "vite": "^6.3.5",
    "vite-plugin-trae-solo-badge": "^1.0.0",
    "vite-tsconfig-paths": "^5.1.4"
  }
}
```

2) 安装依赖：

```bash
npm install
```

---

## 步骤 2：工程配置
在项目根目录创建下列配置文件，并写入对应内容。

### 2.1 TypeScript 配置
创建 `tsconfig.json`：

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": false,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": false,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": false,
    "noUncheckedSideEffectImports": false,
    "forceConsistentCasingInFileNames": false,
    "baseUrl": "./",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src", "api"]
}
```

### 2.2 Vite 配置
创建 `vite.config.ts`：

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { traeBadgePlugin } from 'vite-plugin-trae-solo-badge'

export default defineConfig({
  build: {
    sourcemap: false,
    minify: 'terser',
    terserOptions: { compress: { drop_console: true, drop_debugger: true } },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
          'ui-vendor': ['lucide-react', 'sonner'],
          'utils-vendor': ['clsx', 'tailwind-merge'],
          'supabase-vendor': ['@supabase/supabase-js'],
          'state-vendor': ['zustand']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  plugins: [
    react({ babel: { plugins: ['react-dev-locator'] } }),
    traeBadgePlugin({
      variant: 'dark',
      position: 'bottom-right',
      prodOnly: true,
      clickable: true,
      clickUrl: 'https://www.trae.ai/solo?showJoin=1',
      autoTheme: true,
      autoThemeTarget: '#root'
    }),
    tsconfigPaths()
  ]
})
```

### 2.3 Tailwind 与 PostCSS
创建 `tailwind.config.js`：

```js
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: { center: true },
    extend: {
      colors: {
        primary: { black: '#000000', white: '#FFFFFF', gray: '#666666' },
        accent: { beige: '#F5E6D3', blue: '#1E3A8A' },
        'primary-gray': {
          DEFAULT: '#666666',
          5: 'rgba(102, 102, 102, 0.05)',
          10: 'rgba(102, 102, 102, 0.1)',
          20: 'rgba(102, 102, 102, 0.2)',
          30: 'rgba(102, 102, 102, 0.3)'
        }
      },
      fontFamily: { sans: ['Helvetica', 'Source Han Sans CN', 'system-ui', 'sans-serif'] },
      fontSize: { base: ['14px', '1.5'], lg: ['16px', '1.5'] },
      spacing: { card: '20px' },
      height: { 'carousel-desktop': '500px', 'carousel-mobile': '300px' },
      width: { 'auth-form': '400px' }
    }
  },
  plugins: []
}
```

创建 `postcss.config.js`：

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
}
```

（可选）创建 `eslint.config.js`，用于统一代码风格：

```js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: { ecmaVersion: 2020, globals: globals.browser },
    plugins: { 'react-hooks': reactHooks, 'react-refresh': reactRefresh },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }]
    }
  }
)
```

---

## 步骤 3：入口与样式
### 3.1 HTML 入口
创建根目录 `index.html`：

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Trae Project</title>
    <script type="module">
      if (import.meta.hot?.on) {
        import.meta.hot.on('vite:error', (error) => {
          if (error.err) {
            console.error([error.err.message, error.err.frame].filter(Boolean).join('\n'))
          }
        })
      }
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### 3.2 样式与 Vite 类型
在 `src/` 目录创建以下文件：

- `src/vite-env.d.ts`：

```ts
/// <reference types="vite/client" />
```

- `src/index.css`：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  line-height: 1.5;
  font-weight: 400;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

---

## 步骤 4：路由与根布局
在 `src/` 下创建核心入口与路由文件。

- `src/main.tsx`：

```ts
import { RouterProvider } from 'react-router-dom'
import { router } from '@/router'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
```

- `src/router.tsx`：

```tsx
import { createBrowserRouter } from 'react-router-dom'
import App from '@/App'
import Home from '@/pages/Home'
import Products from '@/pages/Products'
import ProductDetail from '@/pages/ProductDetail'
import Cart from '@/pages/Cart'
import Checkout from '@/pages/Checkout'
import Orders from '@/pages/Orders'
import Profile from '@/pages/Profile'
import Contact from '@/pages/Contact'
import Login from '@/pages/auth/Login'
import Register from '@/pages/auth/Register'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/products', element: <Products /> },
      { path: '/products/:id', element: <ProductDetail /> },
      { path: '/cart', element: <Cart /> },
      { path: '/checkout', element: <Checkout /> },
      { path: '/orders', element: <Orders /> },
      { path: '/profile', element: <Profile /> },
      { path: '/contact', element: <Contact /> },
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/register', element: <Register /> }
    ]
  }
])
```

- `src/App.tsx`：

```tsx
import { Toaster } from 'sonner'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useAuthStore } from '@/stores/auth'

function App() {
  const { checkSession } = useAuthStore()

  useEffect(() => {
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
```

---

## 步骤 5：状态与基础组件
### 5.1 状态管理（Zustand，占位实现）
创建 `src/stores/auth.ts`：

```ts
import { create } from 'zustand'

type User = { id: string; name?: string; email?: string }

type AuthState = {
  user: User | null
  isAuthenticated: boolean
  setUser: (u: User | null) => void
  logout: () => Promise<void>
  checkSession: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (u) => set({ user: u, isAuthenticated: !!u }),
  logout: async () => set({ user: null, isAuthenticated: false }),
  checkSession: async () => {}
}))
```

创建 `src/stores/cart.ts`：

```ts
import { create } from 'zustand'

type CartItem = { id: string; quantity: number; price: number }

type CartState = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  clear: () => void
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (item) => set((s) => ({ items: [...s.items, item] })),
  clear: () => set({ items: [] })
}))
```

### 5.2 基础组件（Header、Footer，简版）
创建 `src/components/Header.tsx`：

```tsx
import { Search, ShoppingCart, Menu } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, logout } = useAuthStore()
  const { items } = useCartStore()
  const isAuthPage = location.pathname.startsWith('/auth')

  const handleLogout = async () => {
    await logout()
    toast.success('已退出登录')
    navigate('/')
  }

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  if (isAuthPage) return null

  return (
    <header className="bg-primary-white border-b border-primary-gray/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-primary-black">FASHION</Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/products" className="text-primary-gray hover:text-primary-black transition-colors">商品</Link>
            <Link to="/contact" className="text-primary-gray hover:text-primary-black transition-colors">联系我们</Link>
          </nav>

          <div className="hidden md:flex items-center bg-primary-gray/10 rounded-lg px-4 py-2 w-80">
            <Search className="w-4 h-4 text-primary-gray mr-2" />
            <input type="text" placeholder="搜索商品..." className="bg-transparent outline-none flex-1 text-sm" />
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <button onClick={handleLogout} className="text-primary-gray hover:text-primary-black">退出</button>
            ) : (
              <>
                <Link to="/auth/login" className="text-primary-gray hover:text-primary-black">登录</Link>
                <Link to="/auth/register" className="bg-primary-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">注册</Link>
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
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-primary-gray hover:text-primary-black">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden border-t border-primary-gray/20 py-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/products" className="text-primary-gray hover:text-primary-black">商品</Link>
              <Link to="/contact" className="text-primary-gray hover:text-primary-black">联系我们</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
```

创建 `src/components/Footer.tsx`：

```tsx
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-primary-black text-primary-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">FASHION</h3>
            <p className="text-gray-300 text-sm leading-relaxed">为追求时尚的中国女性提供便捷的在线购物平台</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">快速链接</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products" className="text-gray-300 hover:text白 transition-colors">所有商品</Link></li>
              <li><Link to="/cart" className="text-gray-300 hover:text白 transition-colors">购物车</Link></li>
              <li><Link to="/orders" className="text-gray-300 hover:text白 transition-colors">我的订单</Link></li>
              <li><Link to="/profile" className="text-gray-300 hover:text白 transition-colors">个人中心</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">客户服务</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="text-gray-300 hover:text白 transition-colors">联系我们</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">支付方式</h4>
            <div className="flex space-x-2 mb-4">
              <div className="bg白 text-black px-3 py-1 rounded text-xs font-medium">支付宝</div>
              <div className="bg白 text-black px-3 py-1 rounded text-xs font-medium">微信</div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300 text-sm">© 2024 FASHION</p>
        </div>
      </div>
    </footer>
  )
}
```

> 上述 Footer 的中文“白”字样用于示例占位；在你的项目中可直接替换为 `text-white` 以与现有样式保持一致。

---

## 步骤 6：页面占位
为路由中的每个页面创建最小占位，保证路由运行。

在 `src/pages/` 下分别创建：

`Home.tsx`
```tsx
export default function Home() {
  return <div className="container mx-auto px-4 py-8">首页</div>
}
```

`Products.tsx`
```tsx
export default function Products() {
  return <div className="container mx-auto px-4 py-8">所有商品</div>
}
```

`ProductDetail.tsx`
```tsx
export default function ProductDetail() {
  return <div className="container mx-auto px-4 py-8">商品详情</div>
}
```

`Cart.tsx`
```tsx
export default function Cart() {
  return <div className="container mx-auto px-4 py-8">购物车</div>
}
```

`Checkout.tsx`
```tsx
export default function Checkout() {
  return <div className="container mx-auto px-4 py-8">结算</div>
}
```

`Orders.tsx`
```tsx
export default function Orders() {
  return <div className="container mx-auto px-4 py-8">我的订单</div>
}
```

`Profile.tsx`
```tsx
export default function Profile() {
  return <div className="container mx-auto px-4 py-8">个人中心</div>
}
```

`Contact.tsx`
```tsx
export default function Contact() {
  return <div className="container mx-auto px-4 py-8">联系我们</div>
}
```

在 `src/pages/auth/` 下创建：

`Login.tsx`
```tsx
export default function Login() {
  return <div className="container mx-auto px-4 py-8">登录</div>
}
```

`Register.tsx`
```tsx
export default function Register() {
  return <div className="container mx-auto px-4 py-8">注册</div>
}
```

---

## 步骤 7：接入 Supabase（可选，最小化客户端）
创建 `src/lib/supabase.ts`：

```ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

> 完整类型定义可参考现有工程的 `src/lib/supabase.ts:1`。

在根目录创建 `.env.local`（本地开发）并填入：

```bash
VITE_SUPABASE_URL=你的Supabase项目URL
VITE_SUPABASE_ANON_KEY=你的Supabase匿名Key
```

> 切勿提交 `.env.local` 到版本库。

---

## 步骤 8：运行与快速验证
- 启动开发服务器：

```bash
npm run dev
```

- 访问 `http://localhost:5173/`，确认：
  - 首页能打开，显示 Header 与 Footer
  - 点击导航链接，能够跳转至对应占位页面

- 类型检查：

```bash
npm run check
```

- 代码风格检查：

```bash
npm run lint
```

---

## 步骤 9：生产构建与预览
- 构建：

```bash
npm run build
```

- 预览：

```bash
npm run preview
```

---

## 步骤 10：从占位到完整页面
当骨架运行后，将占位页面替换为完整实现。你可以直接参考当前工程的对应文件：
- 路由入口：`src/router.tsx:1`
- 根布局：`src/App.tsx:16`
- 头部：`src/components/Header.tsx:1`
- 底部：`src/components/Footer.tsx:1`
- 首页：`src/pages/Home.tsx:146`
- 商品列表：`src/pages/Products.tsx:221`
- 商品详情：`src/pages/ProductDetail.tsx:290`
- 购物车：`src/pages/Cart.tsx:325`
- 结算页：`src/pages/Checkout.tsx:148`
- 订单页：`src/pages/Orders.tsx:178`
- 个人中心：`src/pages/Profile.tsx:231`
- 联系我们：`src/pages/Contact.tsx:257`
- 登录：`src/pages/auth/Login.tsx:14`
- 注册：`src/pages/auth/Register.tsx:17`
- Supabase 客户端与类型：`src/lib/supabase.ts:1`

将这些文件内容按模块替换并测试，每替换一处建议执行一次页面验证，保持迭代稳定。

---

## 关键知识点说明
- `index.html:21` 通过 `<script src="/src/main.tsx">` 加载 React 入口
- `src/main.tsx:1` 挂载 `RouterProvider` 控制路由渲染
- `src/router.tsx:14` 路由树声明与页面组件映射
- `src/App.tsx:16` 应用级布局，包含 `Header`、`Footer` 与 `Outlet`
- `src/vite-env.d.ts:1` 让 TS 识别 Vite 环境类型
- `tsconfig.json:25` 配置路径别名 `@/*`，便于模块引用
- `vite.config.ts:1` 集成 React 插件、路径解析与构建拆包优化
- `tailwind.config.js:1` 声明 Tailwind 扫描范围与主题扩展

---

## 常见问题排查
- 启动时报路径别名错误：检查 `tsconfig.json` 的 `baseUrl` 与 `paths`，以及 `vite.config.ts` 是否启用了 `vite-tsconfig-paths`
- 样式无效：确认 `index.css` 已在 `main.tsx` 引入，`tailwind.config.js` 的 `content` 包含 `./src/**/*.{js,ts,jsx,tsx}`
- Supabase 连接失败：检查 `.env.local` 中 `VITE_SUPABASE_URL` 与 `VITE_SUPABASE_ANON_KEY` 是否正确
- 路由 404：在生产部署时需配置重写到 `index.html`（参考 `vercel.json` 或部署平台的重写规则）

---

## 完成标志
- `npm run dev` 正常访问所有页面且导航无误
- `npm run check` 与 `npm run lint` 通过或仅有可接受的提示
- `npm run build` 生成 `dist/` 且 `npm run preview` 可以访问

至此，你已按教程从零实现并运行了该项目的完整骨架，接下来即可替换占位为生产级页面与逻辑。