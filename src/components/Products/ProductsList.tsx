import {Product} from '@chec/commerce.js/types/product'
import React from 'react'
import {Grid} from 'semantic-ui-react'

import ProductItem from './ProductItem'

const {Row, Column} = Grid
type Props = {
  products: Product[]
  loadingState: boolean
  productsExist: boolean
}

const ProductsList = ({products, loadingState, productsExist}: Props) => {
  return (
    <Grid columns={3} stackable container>
      <Row>
        {!loadingState && productsExist && products.length === 0 && (
          <span>Sorry, No products match these selections</span>
        )}
        {!loadingState &&
          products &&
          products.map(product => (
            <Column key={product.id} stretched style={{marginBottom: '1.6rem'}}>
              <ProductItem product={product} />
            </Column>
          ))}
      </Row>
    </Grid>
  )
}

export default ProductsList
