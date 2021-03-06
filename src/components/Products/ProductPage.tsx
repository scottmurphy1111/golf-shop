import {Product} from '@chec/commerce.js/types/product'
import axios from 'axios'
import React, {useEffect, useRef, useState} from 'react'
import {Link, RouteComponentProps} from 'react-router-dom'
import {Button, Icon} from 'semantic-ui-react'
import {stripHtml} from 'string-strip-html'

import {commerce} from '../../lib/commerce'
import {useCartStore} from '../../store/cartStore'
import {useStore} from '../../store/store'
import {CHEC_BASE_URL, HEADERS} from '../../utils/constants'
import {getSingleProductId} from '../../utils/getSingleProductId'

const ProductPage = (props: RouteComponentProps) => {
  const [product, setProduct] = useState<Product>()
  const singleProductId = useStore(state => state.singleProductId)
  const [fetchError, setFetchError] = useState(false)
  const [colorVars, setColorVars] = useState<any>([])
  const [selectedColor, setSelectedColor] = useState<any>({})
  const [sizeVars, setSizeVars] = useState<any>([])
  const [selectedSize, setSelectedSize] = useState<any>({})
  const [quantity, setQuantity] = useState(1)
  const [selectionsError, setSelectionsError] = useState<boolean>(false)
  const [productImages, setProductImages] = useState([])
  const [selectedImage, setSelectedImage] = useState<any>(null)

  const addToCart = useCartStore(state => state.addToCart)

  const imageThumbRef = useRef(null)

  //fetch single product
  useEffect(() => {
    const productId = getSingleProductId(singleProductId, props)
    if (productId) {
      commerce.products
        .retrieve(productId)
        .then((res: Product) => {
          setProduct(res)
        })

        .catch((error: any) => {
          console.error(`Cannot get product ${productId}`, error)
        })

      return () => {
        localStorage.removeItem('product-id')
      }
    } else {
      setFetchError(true)
    }

    return () => {
      setFetchError(false)
    }
  }, [props, singleProductId])

  useEffect(() => {
    if (!product) return null
    setProductImages([...product.assets])
    setSelectedImage(product.assets[0])
  }, [product])

  //fetch all variants for product
  useEffect(() => {
    const productId = getSingleProductId(singleProductId, props)

    const url = `${CHEC_BASE_URL}/products/${productId}/variants`
    axios
      .get(url, {
        headers: HEADERS,
      })
      .then(res => res.data)
      .then(json => console.log(json))
  }, [props, singleProductId])

  //fetch colors and sizes
  useEffect(() => {
    const productId = getSingleProductId(singleProductId, props)

    const url = `${CHEC_BASE_URL}/products/${productId}/variant_groups`
    axios
      .get(url, {
        headers: HEADERS,
      })
      .then(res => res.data)
      .then(json => {
        const {data} = json
        if (data) {
          const colors = data.find((group: any) => {
            if (group.name.toLowerCase().includes('color')) {
              return group
            }
            return null
          })
          const sizes = data.find((group: any) => {
            if (group.name.toLowerCase().includes('size')) {
              return group
            }
            return null
          })

          setColorVars(colors)
          setSizeVars(sizes)
        }
      })
      .catch(err =>
        console.log('There was an error getting product options', err)
      )
  }, [props, singleProductId])

  const findVariantGroups = (product: any) => {
    let groups: any[] = []
    product.variant_groups.forEach((group: any) => {
      groups = [...groups, group.id].sort()
    })

    return groups
  }

  const handleAddToCart = (
    id: any,
    quantity: number,
    variantData: any = {}
  ) => {
    setSelectionsError(false)
    let data = {}
    const reqGroups = findVariantGroups(product)

    const colorData = variantData.selectedColor
    const sizeData = variantData.selectedSize

    if (Object.keys(colorData).length) {
      const colorGroup = colorData.groupId
      const colorOption = colorData.color.id
      data = {
        ...data,
        [colorGroup]: colorOption,
      }
    }

    if (Object.keys(sizeData).length) {
      const sizeGroup = sizeData.groupId
      const sizeOption = sizeData.size.id
      data = {
        ...data,
        [sizeGroup]: sizeOption,
      }
    }

    const selectionsValid =
      reqGroups.join(',') === Object.keys(data).sort().join(',')

    if (selectionsValid) {
      addToCart(id, quantity, data)
    } else {
      setSelectionsError(true)
    }
  }

  const handleQuantityClick = (quantity: any, type: any) => {
    if (type === 'decrease' && quantity > 1) {
      setQuantity(quantity - 1)
    }
    if (type === 'increase') {
      setQuantity(quantity + 1)
    }
  }

  const handleColorClick = (groupId: any, color: any) => {
    setSelectionsError(false)
    setSelectedColor({groupId, color})
  }

  const handleSizeClick = (groupId: any, size: any) => {
    setSelectionsError(false)
    setSelectedSize({groupId, size})
  }

  const handleImageSelect = (key: any) => {
    const imageSelection = productImages.find(image => {
      return image.id === key
    })

    setSelectedImage(imageSelection)
  }

  return (
    <div>
      <div className="main-container container">
        {fetchError && (
          <span>
            There was a problem getting product info, please
            <a href="/">start over</a>
          </span>
        )}

        {product && (
          <>
            <div className="product-page__wrapper">
              <div className="image-viewer">
                <ul>
                  {productImages.map(image => (
                    <li
                      key={image.id}
                      ref={imageThumbRef}
                      data-image={image.id}
                      onClick={() => handleImageSelect(image.id)}
                    >
                      <img src={image.url} alt={image.filename} />
                    </li>
                  ))}
                </ul>
                <div
                  className="product-page__active-image"
                  data-active-image={selectedImage}
                >
                  {selectedImage && (
                    <img src={selectedImage.url} alt={selectedImage.filename} />
                  )}
                </div>
              </div>
              <div className="product-page__details">
                {product.inventory.available > 0 ? (
                  <p>item in Stock</p>
                ) : (
                  <p>out of stock!</p>
                )}
                <h2>{product.name}</h2>
                <h3 className="price">{product.price.formatted_with_symbol}</h3>
                <br />
                <div className="product-page__make-selections">
                  <h3>Make Your Selections:</h3>
                  {selectionsError && (
                    <span style={{color: 'tomato'}}>
                      All product selections must be picked, please choose below
                    </span>
                  )}
                  {colorVars &&
                    colorVars.options &&
                    colorVars.options.length > 0 && (
                      <div className="colors">
                        {colorVars.options.map((color: any) => (
                          <span
                            data-active={`${
                              selectedColor === color ? true : false
                            }`}
                            key={color.id}
                            data-value={color.name.toLowerCase()}
                            title={color.name}
                            style={{
                              backgroundColor: color.name
                                .toLowerCase()
                                .replace(' ', ''),
                            }}
                            onClick={() =>
                              handleColorClick(colorVars.id, color)
                            }
                          ></span>
                        ))}
                        {selectedColor.color && (
                          <div className="product-page__selection">
                            {selectedColor.color.name}
                          </div>
                        )}
                      </div>
                    )}
                  {sizeVars && sizeVars.options && sizeVars.options.length > 0 && (
                    <div className="sizes">
                      {sizeVars.options.map((size: any) => (
                        <span
                          data-active={`${
                            selectedSize === size ? true : false
                          }`}
                          key={size.id}
                          data-value={size.name}
                          onClick={() => handleSizeClick(sizeVars.id, size)}
                        >
                          {size.name}
                        </span>
                      ))}
                      {selectedSize.size && (
                        <div className="product-page__selection">
                          {selectedSize.size.name}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="product-page__actions">
                  <div className="quantity-container">
                    <Button
                      className="quantity-button"
                      onClick={() => handleQuantityClick(quantity, 'decrease')}
                      title="Reduce quantity"
                    >
                      -
                    </Button>
                    <p className="quantity-display">{quantity}</p>
                    <Button
                      className="quantity-button"
                      onClick={() => handleQuantityClick(quantity, 'increase')}
                      title="Increase quantity"
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    fluid
                    primary
                    size="massive"
                    onClick={() =>
                      handleAddToCart(product.id, quantity, {
                        selectedColor,
                        selectedSize,
                      })
                    }
                  >
                    <Icon name="lock" />
                    Add to Cart
                  </Button>
                </div>
                <hr />
                <p>{stripHtml(product.description).result}</p>
              </div>
            </div>
            <Link to={'/products?category=apparel'}>back to products</Link>
          </>
        )}
      </div>
    </div>
  )
}

export default ProductPage
