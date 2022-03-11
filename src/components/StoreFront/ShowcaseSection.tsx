import {Product} from '@chec/commerce.js/types/product'
import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {
  Button,
  Card,
  Grid,
  Header,
  Placeholder,
  Segment,
} from 'semantic-ui-react'

import {commerce} from '../../lib/commerce'
// import {Product} from '../../models/Product'
import {useStore} from '../../store/store'
import ProductItem from '../Products/ProductItem'

const {Column, Row} = Grid

type ShowcaseProps = {
  headline: string
  slug: string
}

const ShowcaseSection = ({headline, slug}: ShowcaseProps) => {
  const [products, setProducts] = useState<Product[] | any[]>([])
  const setSingleProductId = useStore(state => state.setSingleProductId)

  const history = useHistory()

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      setProducts([{}, {}, {}])
      try {
        const {data} = await commerce.products.list({
          category_slug: [slug],
        })
        if (data) {
          setProducts(data)
        }
      } catch (error) {
        console.log('There was an error fetching products by categories', error)
      }
    }
    fetchProductsByCategory()

    return () => {
      setProducts([])
    }
  }, [slug])

  const handleClick = (product: Product) => {
    window.scrollTo(0, 0)
    setSingleProductId(product.id)
    // setProductName(product.name);
    localStorage.setItem('product-id', product.id)
    history.push(`/product/${product.id}`)
  }

  return (
    <section className="showcase-section component-section">
      <Header size="large">{headline}</Header>

      <Grid columns={3} stackable>
        <Row>
          {products.map((product: Product, i) => (
            <Column key={i} style={{marginBottom: '2.4rem'}}>
              <ProductItem product={product} />
            </Column>
          ))}
        </Row>
      </Grid>
    </section>
  )
}

export default ShowcaseSection
