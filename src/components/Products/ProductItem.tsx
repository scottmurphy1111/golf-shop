import React from 'react';
import { useHistory } from 'react-router-dom';
import { Product } from '../../models/Product';
import { stripHtml } from 'string-strip-html';
import { useStore } from '../../store/store';

type Props = {
  product: Product;
};

const ProductItem = ({ product }: Props) => {
  const setSingleProductId = useStore((state) => state.setSingleProductId);

  let history = useHistory();

  const { result } = stripHtml(product.description);

  const handleClick = (product: Product) => {
    window.scrollTo(0, 0);
    setSingleProductId(product.id);
    // setProductName(product.name);
    localStorage.setItem('product-id', product.id);
    history.push(`/product/${product.id}`);
  };

  return (
    <>
      {product && (
        <div
          className="product-card"
          // onMouseEnter={handleMouseEnter}
          // onMouseLeave={handleMouseLeave}
        >
          <div className="product__image">
            <img
              // src={product.media.source}
              src={`${process.env.PUBLIC_URL}/placeholder.png`}
              alt={product.name}
            />
          </div>
          <div className="product__info">
            <div className="product__heading">
              <h3 className="product__name">{product.name}</h3>
              {product.extra_fields && product.extra_fields.length > 0 && (
                <p className="product__brand">{product.extra_fields[0].name}</p>
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
        </div>
      )}
    </>
  );
};

export default ProductItem;
