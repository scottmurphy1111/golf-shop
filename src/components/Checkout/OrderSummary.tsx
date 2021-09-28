import {CheckoutToken} from '@chec/commerce.js/types/checkout-token'
import React from 'react'

interface Props {
  checkoutToken: CheckoutToken
}

const OrderSummary = ({checkoutToken}: Props) => {
  const handlePayNow = () => {
    console.log('pay now')
  }

  return (
    <div>
      <h3>Order Summary</h3>
      <button onClick={handlePayNow}>Pay Now</button>
    </div>
  )
}

export default OrderSummary
