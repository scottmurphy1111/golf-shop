import React, { useState, useEffect, useMemo } from 'react';
import { RouteComponentProps } from 'react-router';
import { commerce } from '../../lib/commerce';
import { CommerceResponse } from '../../models/CommerceResponse';
import { PageParams } from '../../models/PageParams';
import { Product } from '../../models/Product';
import { useStore } from '../../store/store';
import { extractParams } from '../../utils/extractParams';
import { getProducts } from '../../utils/getProducts';
import CategoriesSection from '../Shared/CategoriesSection';
import ProductsFiltersContainer from './ProductsFiltersContainer';
import ProductsHero from './ProductsHero';
import ProductsList from './ProductsList';

const ProductsContainer = (props: RouteComponentProps) => {
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const [params, setParams] = useState<PageParams>({});
  const [isClubs, setIsClubs] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [slugs, setSlugs] = useState<string[]>([]);
  const currentCat = useStore((state) => state.currentCat);
  const setCurrentCat = useStore((state) => state.setCurrentCat);
  const checkedFilterVals = useStore((state) => state.checkedFilterVals);

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

  useMemo(() => {
    let slugsArray = [];
    if (checkedFilterVals) {
      slugsArray = [params.category, checkedFilterVals].flat();
      setSlugs(slugsArray);
    } else {
      if (params.category) {
        setSlugs([params.category]);
      }
    }
  }, [params.category, checkedFilterVals]);

  useEffect(() => {
    console.log('slugs', slugs);
    let didCancel = false;
    setLoadingState(true);

    const fetchProductsByCategory = async () => {
      if (params.category) {
        try {
          await getProducts({
            category_slug: slugs,
          })
            .then((response: any) => {
              console.log('response', response);
              if (response.data) {
                return response.data;
              }
              return Promise.reject();
            })
            .then((data: Product[]) => {
              if (!didCancel) {
                console.log('data', data);
                setProducts(data);
              }
            })
            .finally(() => {
              setLoadingState(false);
            });
        } catch (error) {
          console.log('There was an error fetch products by categories', error);
        }
      }
    };
    fetchProductsByCategory();

    return () => {
      setProducts([]);
      didCancel = true;
    };
  }, [params, slugs]);

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
            {loadingState ? (
              <span>...loading</span>
            ) : (
              <ProductsList products={products} />
            )}
          </section>
          {JSON.stringify(params)}
        </>
      )}
    </>
  );
};

export default ProductsContainer;
