import React, { useState, useEffect } from 'react';
import { commerce } from '../../lib/commerce';
import { Product } from '../../models/Product';

type ShowcaseProps = {
  headline: string;
  slug: string;
};

const ShowcaseSection = ({ headline, slug }: ShowcaseProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const { data } = await commerce.products.list({
          category_slug: [slug],
        });
        if (data) {
          setProducts(data);
        }
      } catch (error) {
        console.log('There was an error fetch products by categories', error);
      }
    };
    fetchProductsByCategory();

    return () => {
      setProducts([]);
    };
  }, [slug]);

  return (
    <div>
      <h2>{headline}</h2>
      <ul>
        {products.map((product: Product) => (
          <li key={product.id}>
            <p>{product.name}</p>
            <p>{product.price.formatted_with_symbol}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowcaseSection;
