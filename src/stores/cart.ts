import { create } from 'zustand'
import { CartItem, AddToCartParams } from '@/lib/supabase'

interface CartState {
  items: CartItem[]
  isLoading: boolean
  addItem: (item: AddToCartParams) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  setItems: (items: CartItem[]) => void
  setLoading: (loading: boolean) => void
}

export const useCartStore = create<CartState>()((set) => ({
  items: [],
  isLoading: false,
  addItem: (item: AddToCartParams) => set((state) => ({
    items: [...state.items, { ...item, id: crypto.randomUUID(), created_at: new Date().toISOString(), updated_at: new Date().toISOString() }]
  })),
  removeItem: (id) => set((state) => ({
    items: state.items.filter(item => item.id !== id)
  })),
  updateQuantity: (id, quantity) => set((state) => ({
    items: state.items.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    )
  })),
  clearCart: () => set({ items: [] }),
  setItems: (items) => set({ items }),
  setLoading: (loading) => set({ isLoading: loading }),
}))