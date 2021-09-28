import {Product} from '@chec/commerce.js/types/product'
import React from 'react'
import {useHistory} from 'react-router-dom'
import {Button, Card, Image} from 'semantic-ui-react'
import {stripHtml} from 'string-strip-html'

import {useStore} from '../../store/store'

const {Header, Content, Meta, Description, Group} = Card

type Props = {
  product: Product
}

const ProductItem = ({product}: Props) => {
  console.log(`product =  ${JSON.stringify(product, null, 2)}`)
  const setSingleProductId = useStore(state => state.setSingleProductId)

  const history = useHistory()

  const {result} = stripHtml(product.description)

  const handleClick = (product: Product) => {
    window.scrollTo(0, 0)
    setSingleProductId(product.id)
    // setProductName(product.name);
    localStorage.setItem('product-id', product.id)
    history.push(`/product/${product.id}`)
  }

  return (
    <Group>
      {product && (
        <>
          <Card raised className="product-card">
            <Image src={product.assets[0].url} />
            <Content>
              <Header>{product.name}</Header>

              <Meta>
                {(product.extra_fields && product.extra_fields.length) > 0
                  ? product.extra_fields[0].name
                  : '\u00A0'}
              </Meta>
              <Description>{result}</Description>
              <Description> {product.price.formatted_with_symbol}</Description>
            </Content>
            <Button primary size="huge" onClick={() => handleClick(product)}>
              Product Details
            </Button>
          </Card>
          {/* <div
            className="product-card"
            // onMouseEnter={handleMouseEnter}
            // onMouseLeave={handleMouseLeave}
          >
            <div className="product__image">
              <img
                src={product.assets[0].url}
                // src={`${process.env.PUBLIC_URL}/placeholder.png`}
                alt={product.name}
              />
            </div>
            <div className="product__info">
              <div className="product__heading">
                <h3 className="product__name">{product.name}</h3>
                {product.extra_fields && product.extra_fields.length > 0 && (
                  <p className="product__brand">
                    {product.extra_fields[0].name}
                  </p>
                )}
              </div>

              <div className="product__details">
                <p className="product__description">{result}</p>
              </div>
            </div>
            <div className="product__actions">
              {product.inventory.available > 0 ? (
                <p>item in Stock</p>
              ) : (
                <p>out of stock!</p>
              )}
              <p className="product__price">
                {product.price.formatted_with_symbol}
              </p>
              <button
                name="product details"
                className="product__btn primary"
                onClick={() => handleClick(product)}
              >
                Product Details
              </button>
            </div>
          </div> */}
        </>
      )}
    </Group>
  )
}

export default ProductItem
