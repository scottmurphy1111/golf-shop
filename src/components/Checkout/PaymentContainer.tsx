import {CheckoutToken} from '@chec/commerce.js/types/checkout-token'
import React from 'react'

interface Props {
  checkoutToken: CheckoutToken
}

const PaymentContainer = ({checkoutToken}: Props) => {
  return (
    <div>
      <h3>3. Select Payment Method</h3>
      PAYMENT INFO
    </div>
  )
}

export default PaymentContainer
