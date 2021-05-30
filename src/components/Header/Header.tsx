import React, { useEffect, useState } from 'react';
import { Form, Input } from 'semantic-ui-react';
import { commerce } from '../../lib/commerce';
import { useCartStore } from '../../store/cartStore';
import Cart from '../Cart/Cart';

const Header = () => {
  const cart = useCartStore((state) => state.cart);
  const setCart = useCartStore((state) => state.setCart);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await commerce.cart.retrieve();
        console.log('response', response);
        setCart(response);
      } catch (error) {
        console.error('There was an error fetching the cart', error);
      }
    };

    fetchCart();
  }, []);

  return (
    <div className="header-container">
      <header className="container">
        <div
          className="logo"
          onClick={() => (window.location.href = '/')}
        ></div>
        <div className="cart-container">
          <Form>
            <Input icon="search" size="huge" placeholder="Search..." />
          </Form>
          <div
            className={`cart-item ${
              cart.total_unique_items ? 'has-items' : ''
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="cart-icon"></div>
            {cart.total_unique_items ? (
              <span className="cart-count">{cart.total_unique_items}</span>
            ) : null}
          </div>
        </div>
      </header>
      {cart.id && (
        <Cart
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          // setCheckout={setCheckout}
        />
      )}
    </div>
  );
};

export default Header;
