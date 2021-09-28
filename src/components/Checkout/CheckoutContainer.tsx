import {CheckoutToken} from '@chec/commerce.js/types/checkout-token'
import React, {useEffect, useState} from 'react'

import {commerce} from '../../lib/commerce'
import {useCartStore} from '../../store/cartStore'
import OrderSummary from './OrderSummary'
import PaymentContainer from './PaymentContainer'
import ReviewOrder from './ReviewOrder'
import ShippingForm from './ShippingForm'

const CheckoutContainer = () => {
  const cart = useCartStore(state => state.cart)

  const [checkoutToken, setCheckoutToken] = useState<CheckoutToken>(null)

  useEffect(() => {
    const generateCheckoutToken = async () => {
      let cartId
      const storageCartId = localStorage.getItem('cart-id')
      if (storageCartId) {
        cartId = storageCartId
      } else {
        if (cart) {
          cartId = cart.id
        }
      }
      try {
        if (Object.keys(cart).length && cartId && cart.line_items.length) {
          const token = await commerce.checkout.generateToken(cartId, {
            type: 'cart',
          })

          console.log('token', token)
          setCheckoutToken(token)
        }
      } catch (error) {
        console.log('There was an error generating checkout token: ', error)
      }
    }

    generateCheckoutToken()
  }, [cart])

  return (
    <div className="checkout-form-wrapper container">
      {Object.keys(cart).length && (
        <>
          <h2>Secure Checkout</h2>
          <ReviewOrder checkoutToken={checkoutToken} />
          <ShippingForm checkoutToken={checkoutToken} />
          <PaymentContainer checkoutToken={checkoutToken} />
          <OrderSummary checkoutToken={checkoutToken} />
        </>
      )}
    </div>
  )
}

export default CheckoutContainer
