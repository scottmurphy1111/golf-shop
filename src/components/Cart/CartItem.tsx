import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'

import {useCartStore} from '../../store/cartStore'

type Props = {
  item: any //todo use lineItem model when chec updates
}

const CartItem = ({item}: Props) => {
  const [editMode, setEditMode] = useState(false)
  const updateCartQty = useCartStore(state => state.updateCartQty)
  const removeFromCart = useCartStore(state => state.removeFromCart)
  const history = useHistory()
  //setCheckout // TODO

  const editItem = (id: string) => {
    history.push(`/product/${id}`)
    setEditMode(true)
  }

  useEffect(() => {
    // const productId = getSingleProductId(singleProductId, props)
    // let results
    // const fetchVariants = async() => {
    //   results = await commerce.
    // }
  }, [editMode])

  return (
    <div className="cart-item">
      <img
        className="cart-item__image"
        src={item.media.source}
        alt={item.name}
      />
      <div className="cart-item__details">
        <h4 className="cart-item__details-name">{item.name}</h4>

        {
          /*item quantity*/
          editMode ? (
            <div className="cart-item__details-qty">
              <button
                type="button"
                onClick={() => updateCartQty(item.id, item.quantity - 1)}
                title="Reduce quantity"
              >
                -
              </button>
              <p>{item.quantity}</p>
              <button
                type="button"
                onClick={() => updateCartQty(item.id, item.quantity + 1)}
                title="Increase quantity"
              >
                +
              </button>
            </div>
          ) : (
            <p>{item.quantity}</p>
          )
        }
        {item.selected_options.map((option: any, i: number) => (
          <span key={option.option_id}>
            {option.option_name}
            {item.selected_options.length > i + 1 && <span>, </span>}
          </span>
        ))}
        <div className="cart-item__details-price">
          {item.line_total.formatted_with_symbol}
        </div>
      </div>
      <button
        className="cart-item__remove-button remove"
        type="button"
        onClick={() => removeFromCart(item.id)}
      >
        Remove
      </button>
      <button className="link" onClick={() => editItem(item.id)}>
        Change
      </button>
    </div>
  )
}

export default CartItem
