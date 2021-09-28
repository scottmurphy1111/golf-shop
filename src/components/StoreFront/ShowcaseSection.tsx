import {Product} from '@chec/commerce.js/types/product'
import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'

import {commerce} from '../../lib/commerce'
// import {Product} from '../../models/Product'
import {useStore} from '../../store/store'

type ShowcaseProps = {
  headline: string
  slug: string
}

const ShowcaseSection = ({headline, slug}: ShowcaseProps) => {
  const [products, setProducts] = useState<Product[]>([])
  const setSingleProductId = useStore(state => state.setSingleProductId)

  const history = useHistory()

  useEffect(() => {
    const fetchProductsByCategory = async () => {
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
      <h2>{headline}</h2>
      <ul>
        {products.map((product: Product) => (
          <li key={product.id}>
            <img src={product.assets[0].url} alt={product.name} />
            <p>{product.name}</p>
            <p>{product.price.formatted_with_symbol}</p>
            <button
              name="product details"
              className="product__btn primary"
              onClick={() => handleClick(product)}
            >
              Product Details
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ShowcaseSection
