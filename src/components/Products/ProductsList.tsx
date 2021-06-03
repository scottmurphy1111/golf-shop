import React from 'react';
import { Product } from '../../models/Product';
import ProductItem from './ProductItem';

type Props = {
  products: Product[];
  loadingState: boolean;
  productsExist: boolean;
};

const ProductsList = ({ products, loadingState, productsExist }: Props) => {
  return (
    <div>
      {!loadingState && productsExist && products.length === 0 && (
        <span>Sorry, No products match these selections</span>
      )}
      {!loadingState &&
        products &&
        products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
    </div>
  );
};

export default ProductsList;
