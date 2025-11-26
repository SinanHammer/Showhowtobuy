import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 用户类型定义
export interface User {
  id: string
  email: string
  name: string
  phone?: string
  avatar_url?: string
  is_verified: boolean
  role: 'user' | 'vip'
  created_at: string
  updated_at: string
}

// 商品类型定义
export interface Product {
  id: string
  name: string
  description: string
  price: number
  original_price?: number
  category: string
  category_id?: string
  brand_id?: string
  images: string[]
  sizes: string[]
  colors: string[]
  stock_quantity: number
  stock?: number
  is_active: boolean
  is_featured?: boolean
  is_new?: boolean
  created_at: string
  updated_at: string
}

// 购物车项类型定义
export interface CartItem {
  id: string
  user_id: string
  product_id: string
  quantity: number
  price: number
  size?: string
  color?: string
  created_at: string
  updated_at: string
  product?: Product
}

// 添加到购物车的参数类型
export interface AddToCartParams {
  product_id: string
  user_id: string
  quantity: number
  price: number
  size?: string
  color?: string
}

// 订单类型定义
export interface Order {
  id: string
  user_id: string
  total_amount: number
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
  shipping_address: Address
  payment_method: string
  payment_status: string
  created_at: string
  updated_at: string
}

// 地址类型定义
export interface Address {
  id: string
  user_id: string
  recipient_name: string
  phone: string
  province: string
  city: string
  district: string
  detail_address: string
  is_default: boolean
}

// 评价类型定义
export interface Review {
  id: string
  product_id: string
  user_id: string
  rating: number
  comment?: string
  images: string[]
  created_at: string
  user?: User
}