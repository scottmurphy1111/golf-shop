import React, { useEffect } from 'react';
import CartItem from './CartItem';
import { useHistory } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';

type Props = {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
};

const Cart = ({ isOpen, setIsOpen }: Props) => {
  const cart = useCartStore((state) => state.cart);
  const emptyCart = useCartStore((state) => state.emptyCart);
  let history = useHistory();

  const handleClickCart = (e: any) => {
    const target = e.target;

    if (document.querySelector('.cart')!.contains(target)) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickCart, true);

    return () => {
      window.removeEventListener('click', handleClickCart, true);
    };
  }, []);

  const goToCheckout = () => {
    history.push(`/checkout/${cart.id}`);
    localStorage.setItem('cart-id', cart.id);
    setIsOpen(false);
    // setCheckout(true);
  };

  const renderEmptyCart = () => {
    if (cart.total_items > 0) {
      return;
    }

    return (
      <>
        <p className="cart__none">
          You have no items in your shopping cart, start adding some!
        </p>
        <button onClick={() => setIsOpen(!isOpen)}>Close Cart</button>
      </>
    );
  };

  const renderCart = () => {
    if (cart.total_items === 0) {
      return;
    }

    return (
      <>
        {cart.line_items.map((lineItem: any) => (
          <CartItem item={lineItem} key={lineItem.id} />
        ))}
        <div className="cart__total">
          <p className="cart__total-title">Subtotal:</p>
          <p className="cart__total-price">
            {cart.subtotal.formatted_with_symbol}
          </p>
        </div>
        <button className="cart__btn-empty" onClick={handleEmptyCart}>
          Empty cart
        </button>
        <button onClick={goToCheckout}>Checkout</button>
        <button onClick={() => setIsOpen(!isOpen)}>Close Cart</button>
      </>
    );
  };

  const handleEmptyCart = () => {
    emptyCart();
  };

  return (
    <div className="cart" data-active={isOpen}>
      <h4 className="cart__heading">Your Shopping Cart</h4>
      {renderEmptyCart()}
      {renderCart()}
    </div>
  );
};

export default Cart;
