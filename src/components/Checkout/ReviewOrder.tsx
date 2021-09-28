import {CheckoutToken} from '@chec/commerce.js/types/checkout-token'
import {LineItem} from '@chec/commerce.js/types/line-item'
import React from 'react'

import {useCartStore} from '../../store/cartStore'
import CartItem from '../Cart/CartItem'

interface Props {
  checkoutToken: CheckoutToken
}

const ReviewOrder = ({checkoutToken}: Props) => {
  console.log(`checkoutToken =  ${JSON.stringify(checkoutToken, null, 2)}`)
  const cart = useCartStore(state => state.cart)

  return (
    <>
      <div className="checkout__review-order">
        <h3>
          1. Review Order
          {cart.total_items && (
            <span>
              ({cart.total_items} {cart.total_items > 1 ? 'items' : 'item'})
            </span>
          )}
        </h3>
        {cart.line_items.map((item: LineItem) => (
          <CartItem item={item} key={item.id} />
        ))}
        <h4>Subtotal: {cart.subtotal.formatted_with_symbol}</h4>
      </div>
      <div className="checkout__shipping-info">
        <h4>Shipping to:</h4>
        <select>
          <option>United States</option>
          <option>Canada</option>
        </select>
        <h4>Shipping to (State or Province)</h4>
        <select>
          <option>states</option>
          <option>provinces</option>
        </select>
        <h4>Select Delivery</h4>
        <select>
          <option>Regular</option>
          <option>Express</option>
        </select>
      </div>
    </>
  )
}

export default ReviewOrder
