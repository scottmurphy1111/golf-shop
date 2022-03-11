import {Cart} from '@chec/commerce.js/types/cart'
import create from 'zustand'

import {commerce} from '../lib/commerce'

type CartStoreState = {
  cart: Cart //TODO change to Cart Model
  setCart: (cart: Cart) => void
  addToCart: (productId: any, quantity: any, variantData: any) => void
  updateCartQty: (lineItemId: any, quantity: any) => void
  removeFromCart: (lineItemId: any) => void
  emptyCart: () => void
}

export const useCartStore = create<CartStoreState>(set => ({
  cart: <Cart>{},
  setCart: cart => {
    set(() => ({cart: cart}))
  },
  addToCart: async (productId: string, quantity: number, variantData: any) => {
    try {
      const {cart} = await commerce.cart.add(productId, quantity, variantData)
      set(() => ({cart: cart}))
    } catch (error) {
      console.error('There was an error adding the item to the cart', error)
    }
  },
  updateCartQty: async (lineItemId: string, quantity: number) => {
    try {
      const {cart} = await commerce.cart.update(lineItemId, {quantity})
      set(() => ({cart: cart}))
      if (!cart.line_items.length) {
        localStorage.removeItem('cart-id')
      }
    } catch (error) {
      console.log('There was an error updating the cart items', error)
    }
  },
  removeFromCart: async lineItemId => {
    try {
      const {cart} = await commerce.cart.remove(lineItemId)
      set(() => ({cart: cart}))
      if (!cart.line_items.length) {
        localStorage.removeItem('cart-id')
      }
    } catch (error) {
      console.error('There was an error removing the item from the cart', error)
    }
  },
  emptyCart: async () => {
    try {
      const {cart} = await commerce.cart.empty()
      set(() => ({cart: cart}))
      if (!cart.line_items.length) {
        localStorage.removeItem('cart-id')
      }
    } catch (error) {
      console.error('There was an error emptying the cart', error)
    }
  },
}))
