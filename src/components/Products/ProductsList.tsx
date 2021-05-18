import React from 'react';
import { Product } from '../../models/Product';

type Props = {
  products: Product[];
};

const ProductsList = ({ products }: Props) => {
  return (
    <div>
      {products.map((product) => (
        <p key={product.id}>{product.name}</p>
      ))}
    </div>
  );
};

export default ProductsList;
