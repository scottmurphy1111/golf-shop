import React from 'react';
import { Product } from '../../models/Product';
import ProductItem from './ProductItem';

type Props = {
  products: Product[];
};

const ProductsList = ({ products }: Props) => {
  return (
    <div>
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsList;
