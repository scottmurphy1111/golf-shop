import React from 'react';
import { useCartStore } from '../../store/cartStore';

type Props = {
  item: any; //todo cart item model
};

const CartItem = ({ item }: Props) => {
  const updateCartQty = useCartStore((state) => state.updateCartQty);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  //setCheckout // TODO
  return (
    <div className="cart-item">
      <img
        className="cart-item__image"
        src={`${process.env.PUBLIC_URL}/blueprint-irons.png`}
        alt={item.name}
      />
      <div className="cart-item__details">
        <h4 className="cart-item__details-name">{item.name}</h4>
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
        <div className="cart-item__details-price">
          {item.line_total.formatted_with_symbol}
        </div>
      </div>
      <button type="button" onClick={() => removeFromCart(item.id)}>
        Remove
      </button>
    </div>
  );
};

export default CartItem;
