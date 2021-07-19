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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goToCheckout = () => {
    localStorage.setItem('cart-id', cart.id);
    history.push(`/checkout`);
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
        <div className="cart_ctas">
          <button className="remove" onClick={() => setIsOpen(!isOpen)}>
            Close Cart
          </button>
        </div>
      </>
    );
  };

  const renderCart = () => {
    if (cart.total_items === 0) {
      return;
    }

    return (
      <>
        <button className="close_btn" onClick={() => setIsOpen(!isOpen)}>
          X
        </button>
        {cart.line_items.map((lineItem: any) => (
          <CartItem item={lineItem} key={lineItem.id} />
        ))}
        <div className="cart__total">
          <p className="cart__total-title">Subtotal:</p>
          <p className="cart__total-price">
            {cart.subtotal.formatted_with_symbol}
          </p>
        </div>
        <div className="cart_ctas">
          <button className="cart__btn-empty link" onClick={handleEmptyCart}>
            Empty cart
          </button>
          <button className="advance" onClick={goToCheckout}>
            Checkout
          </button>
        </div>
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
