import React, { useState, useEffect, useMemo } from 'react';
import { RouteComponentProps } from 'react-router';
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
  const [slugs, setSlugs] = useState<(string | null)[]>([]);
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
  }, [params.category, setCurrentCat]);

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
    let didCancel = false;
    setLoadingState(true);
    const fetchProductsByCategory = async () => {
      if (params.category) {
        try {
          await getProducts({
            category_slug: slugs,
          })
            .then((data: Product[]) => {
              if (data) {
                return data;
              }
              return Promise.reject();
            })
            .then((data: Product[]) => {
              if (!didCancel) {
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
  }, [params.category, slugs]);

  const renderProductsList = () => {
    return loadingState ? (
      <span>...loading</span>
    ) : (
      <ProductsList products={products} />
    );
  };

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
            {renderProductsList()}
          </section>
          {JSON.stringify(params)}
        </>
      )}
    </>
  );
};

export default ProductsContainer;
