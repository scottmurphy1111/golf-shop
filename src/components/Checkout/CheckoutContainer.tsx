import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { commerce } from '../../lib/commerce';
import { useCartStore } from '../../store/cartStore';
import CartItem from '../Cart/CartItem';
import ReviewOrder from './ReviewOrder';

const CheckoutContainer = (props: RouteComponentProps) => {
  const cart = useCartStore((state) => state.cart);

  const [checkoutToken, setCheckoutToken] = useState({});

  useEffect(() => {
    const generateCheckoutToken = async () => {
      let cartId;
      const storageCartId = localStorage.getItem('cart-id');
      if (storageCartId) {
        cartId = storageCartId;
      } else {
        if (cart) {
          cartId = cart.id;
        }
      }
      try {
        if (Object.keys(cart).length && cartId && cart.line_items.length) {
          const token = await commerce.checkout.generateToken(cartId, {
            type: 'cart',
          });

          console.log('token', token);
          setCheckoutToken(token);
        }
      } catch (error) {
        console.log('There was an error generating checkout token: ', error);
      }
    };

    generateCheckoutToken();
  }, [cart]);

  return (
    <div className="checkout-form-wrapper container">
      {Object.keys(cart).length && (
        <>
          <h2>Secure Checkout</h2>
          <ReviewOrder />
          <h3>2. Delivery Address *All fields are required</h3>
          <form>
            <input type="text" placeholder="shipping,,," />
          </form>
          <h3>3. Select Payment Method</h3>
          PAYMENT INFO
          <button>Pay Now</button>
        </>
      )}
    </div>
  );
};

export default CheckoutContainer;
