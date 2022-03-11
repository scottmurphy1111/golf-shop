/* eslint-disable node/no-unsupported-features/node-builtins */
import {Product} from '@chec/commerce.js/types/product'
import React, {useEffect, useMemo, useState} from 'react'
import {RouteComponentProps, useHistory} from 'react-router-dom'
import {Container, Grid} from 'semantic-ui-react'

import {PageParams} from '../../models/PageParams'
import {useStore} from '../../store/store'
import {extractParams} from '../../utils/extractParams'
import {getProducts} from '../../utils/getProducts'
import CategoriesSection from '../Shared/CategoriesSection'
import ProductsFiltersContainer from './ProductsFiltersContainer'
import ProductsHero from './ProductsHero'
import ProductsList from './ProductsList'

const {Row, Column} = Grid
const ProductsContainer = (props: RouteComponentProps) => {
  const [loadingState, setLoadingState] = useState<boolean>(false)
  const [productsExist, setProductsExist] = useState<boolean>(false)
  const [params, setParams] = useState<any>({})
  const [isClubs, setIsClubs] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [slugs, setSlugs] = useState<(string | null | undefined)[]>([])
  const currentCat = useStore(state => state.currentCat)
  const setCurrentCat = useStore(state => state.setCurrentCat)
  const checkedFilterVals = useStore(state => state.checkedFilterVals)

  const extractedParams = useMemo(() => extractParams(props), [props])

  const history = useHistory()

  useEffect(() => {
    if (extractedParams === null) {
      const currentUrlParams = new URLSearchParams(window.location.search)
      currentUrlParams.set('category', 'apparel')
      history.push(`${window.location.pathname}?${currentUrlParams.toString()}`)
      setCurrentCat('apparel')
      setParams(currentUrlParams)
    } else {
      setParams(extractedParams)
    }

    return () => {
      setParams({})
    }
  }, [extractedParams, window.location.search])

  useEffect(() => {
    if (params.category) {
      setCurrentCat(params.category)
    }
  }, [params.category, setCurrentCat])

  useEffect(() => {
    setIsClubs(props.location.search.includes('clubs'))

    return () => {
      setIsClubs(false)
    }
  }, [props.location.search])

  useMemo(() => {
    let slugsArray = []
    if (checkedFilterVals) {
      slugsArray = [params.category, checkedFilterVals].flat()
      setSlugs(slugsArray)
    } else {
      if (params.category) {
        setSlugs([params.category])
      }
    }
  }, [params.category, checkedFilterVals])

  useEffect(() => {
    let didCancel = false
    setLoadingState(true)
    setProductsExist(false)
    const fetchProductsByCategory = async () => {
      if (params.category) {
        try {
          await getProducts({
            category_slug: slugs,
          })
            .then(data => {
              if (!data) return Promise.reject()
              return data
            })
            .then((data: any[]) => {
              if (!didCancel) {
                setProducts(data)
              }
              if (!data) {
                setProductsExist(false)
                return
              }
              setLoadingState(false)
              setProductsExist(true)
            })
        } catch (error) {
          console.log(
            'There was an error fetching products by categories',
            error
          )
        }
      }
    }
    fetchProductsByCategory()

    return () => {
      setProducts([])
      didCancel = true
    }
  }, [params.category, slugs])

  const renderProductsList = () => {
    return (
      <>
        {isClubs ? (
          <p>
            Call the Golf Shop at 888-555-1122 for Club Fittings and
            Availability
          </p>
        ) : (
          <ProductsList
            products={products}
            loadingState={loadingState}
            productsExist={productsExist}
          />
        )}
      </>
    )
  }

  return (
    <>
      <ProductsHero />
      <Container>
        <Grid>
          <Row>
            <Column width={3}>
              <CategoriesSection type="cat-page" />
              <ProductsFiltersContainer category={currentCat} />
            </Column>
            <Column width={13}>{renderProductsList()}</Column>
          </Row>
        </Grid>
      </Container>

      {/* <>
        <div className="main-container container">
          <section className="products-container">
            <div className="products-filters-container">
              <CategoriesSection type="cat-page" />
              <ProductsFiltersContainer category={currentCat} />
            </div>
            {renderProductsList()}
          </section>
        </div>
      </> */}
    </>
  )
}

export default ProductsContainer
