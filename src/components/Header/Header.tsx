import React, {useEffect, useState} from 'react'
import {
  Container,
  Form,
  Grid,
  Icon,
  Image,
  Input,
  Segment,
  Sticky,
  Visibility,
} from 'semantic-ui-react'

import {commerce} from '../../lib/commerce'
import {useCartStore} from '../../store/cartStore'
import Cart from '../Cart/Cart'
import {AppHeader} from './Header.style'
import ProductSearch from './ProductSearch/ProductSearch'

const {Row, Column} = Grid

const Header = () => {
  const cart = useCartStore(state => state.cart)
  const setCart = useCartStore(state => state.setCart)

  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await commerce.cart.retrieve()
        setCart(response)
      } catch (error) {
        console.error('There was an error fetching the cart', error)
      }
    }

    fetchCart()
  }, [setCart])

  return (
    <Sticky>
      <AppHeader>
        <Container fluid>
          <Grid>
            <Row verticalAlign="middle">
              <Column width={4}>
                <Image
                  src={`${process.env.PUBLIC_URL}/golf-shop-logo.svg`}
                  size="small"
                  onClick={() => (window.location.href = '/')}
                />
              </Column>
              <Column width={11} textAlign="right">
                <ProductSearch />
              </Column>
              <Column width={1}>
                <div
                  className={`cart-item ${cart.total_items ? 'has-items' : ''}`}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <div className="cart-icon">
                    <Icon name="shopping cart" />
                    {cart.total_items ? (
                      <span className="cart-count">{cart.total_items}</span>
                    ) : null}
                  </div>
                </div>
                {cart.id && (
                  <Cart
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    // setCheckout={setCheckout}
                  />
                )}
              </Column>
            </Row>
          </Grid>
        </Container>

        {/* <div className="cart-container">


        </div> */}
      </AppHeader>
    </Sticky>
  )
}

export default Header
