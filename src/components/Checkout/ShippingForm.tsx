import {CheckoutToken} from '@chec/commerce.js/types/checkout-token'
import React from 'react'

interface Props {
  checkoutToken: CheckoutToken
}

const ShippingForm = ({checkoutToken}: Props) => {
  const handleSubmit = () => {
    console.log('submission')
  }

  return (
    <div>
      <h3>2. Delivery Address *All fields are required</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="shipping,,," />
        <button type="submit">Submit Delivery Address</button>
      </form>
    </div>
  )
}

export default ShippingForm
