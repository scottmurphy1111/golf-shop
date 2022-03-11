import {Product} from '@chec/commerce.js/types/product'
import React from 'react'
import {useHistory} from 'react-router-dom'
import {Button, Card, Image, Placeholder} from 'semantic-ui-react'
import {stripHtml} from 'string-strip-html'

import {useStore} from '../../store/store'

const {Header, Content, Meta, Description, Group} = Card

type Props = {
  product: Product
}

const ProductItem = ({product}: Props) => {
  // console.log(`product =  ${JSON.stringify(product, null, 2)}`)
  const setSingleProductId = useStore(state => state.setSingleProductId)

  const history = useHistory()

  let description
  if (product.description) {
    // console.log(
    //   `stripHtml(product.description) =  ${JSON.stringify(
    //     stripHtml(product.description).result,
    //     null,
    //     2
    //   )}`
    // )
    description = stripHtml(product.description).result
    console.log(`description =  ${stripHtml(product.description).result}`)
  }

  const handleClick = (product: Product) => {
    window.scrollTo(0, 0)
    setSingleProductId(product.id)
    // setProductName(product.name);
    localStorage.setItem('product-id', product.id)
    history.push(`/product/${product.id}`)
  }

  return (
    <>
      {product && (
        <>
          <Card
            raised
            fluid
            className="product-card"
            style={{alignItems: 'stretch'}}
          >
            <>
              {product.id ? (
                <Image src={product.assets[0].url} />
              ) : (
                <Placeholder fluid>
                  <Placeholder.Image rectangular />
                </Placeholder>
              )}
              <Content>
                {product.id ? (
                  <>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Header>{product.name}</Header>
                      <Description>
                        {product.price.formatted_with_symbol}
                      </Description>
                    </div>
                    <Meta>
                      {(product.extra_fields && product.extra_fields.length) > 0
                        ? product.extra_fields[0].name
                        : '\u00A0'}
                    </Meta>
                    <Description>{description}</Description>
                  </>
                ) : (
                  <Placeholder style={{marginBottom: '1.6rem'}}>
                    <Placeholder.Header>
                      <Placeholder.Line />
                      <Placeholder.Line />
                    </Placeholder.Header>
                  </Placeholder>
                )}
              </Content>
              <Content>
                <Button
                  primary
                  fluid
                  size="huge"
                  disabled={!product.id}
                  onClick={() => handleClick(product)}
                >
                  Product Details
                </Button>
              </Content>
            </>
          </Card>
        </>
      )}
    </>
  )
}

export default ProductItem
