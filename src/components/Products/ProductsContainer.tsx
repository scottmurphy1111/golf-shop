import React, { useState, useEffect, useMemo } from 'react';
import { RouteComponentProps } from 'react-router';
import { commerce } from '../../lib/commerce';
import { PageParams } from '../../models/PageParams';
import { Product } from '../../models/Product';
import { useStore } from '../../store/store';
import { extractParams } from '../../utils/extractParams';
import CategoriesSection from '../Shared/CategoriesSection';
import ProductsFiltersContainer from './ProductsFiltersContainer';
import ProductsHero from './ProductsHero';
import ProductsList from './ProductsList';

const ProductsContainer = (props: RouteComponentProps) => {
  const [params, setParams] = useState<PageParams>({});
  const [isClubs, setIsClubs] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const currentCat = useStore((state) => state.currentCat);
  const setCurrentCat = useStore((state) => state.setCurrentCat);

  const extractedParams = useMemo(() => extractParams(props), [props]);

  useEffect(() => {
    setParams(extractedParams);

    return () => {
      setParams({});
    };
  }, [extractedParams]);

  useEffect(() => {
    if (params.category) {
      setCurrentCat(params.category);
    }
  }, [params, setCurrentCat]);

  useEffect(() => {
    setIsClubs(props.location.search.includes('clubs'));

    return () => {
      setIsClubs(false);
    };
  }, [props.location.search]);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      if (params.category) {
        try {
          const { data } = await commerce.products.list({
            category_slug: [params.category],
          });
          if (data) {
            setProducts(data);
          }
        } catch (error) {
          console.log('There was an error fetch products by categories', error);
        }
      }
    };
    fetchProductsByCategory();

    return () => {
      setProducts([]);
    };
  }, [params]);
  return (
    <>
      {isClubs ? (
        <p>
          Call the Golf Shop at 888-555-1122 for Club Fittings and Availability
        </p>
      ) : (
        <>
          <ProductsHero />
          <section>
            <>
              <CategoriesSection />
              <ProductsFiltersContainer category={currentCat} />
            </>
            <ProductsList products={products} />
          </section>
          {JSON.stringify(params)}
        </>
      )}
    </>
  );
};

export default ProductsContainer;
