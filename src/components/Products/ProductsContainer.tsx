import React, { useState, useEffect, useMemo } from 'react';
import { RouteComponentProps } from 'react-router';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';
import { PageParams } from '../../models/PageParams';
import { Product } from '../../models/Product';
import { useStore } from '../../store/store';
import { extractParams } from '../../utils/extractParams';
import { getProducts } from '../../utils/getProducts';
import CategoriesSection from '../Shared/CategoriesSection';
import FeaturedBanner from '../StoreFront/FeaturedBanner';
import ProductsFiltersContainer from './ProductsFiltersContainer';
import ProductsHero from './ProductsHero';
import ProductsList from './ProductsList';

const ProductsContainer = (props: RouteComponentProps) => {
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const [productsExist, setProductsExist] = useState<boolean>(false);
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
    setProductsExist(false);
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
              setProductsExist(true);
            })
            .finally(() => {
              setLoadingState(false);
            });
        } catch (error) {
          console.log(
            'There was an error fetching products by categories',
            error
          );
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
    return (
      <>
        <Dimmer.Dimmable as={Segment} dimmed={loadingState}>
          <Dimmer active={loadingState} inverted>
            <Loader size="huge">Loading...</Loader>
          </Dimmer>
          <div className="products-list-wrapper">
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
          </div>
          {/* <Loader size="huge" inverted inline /> */}
        </Dimmer.Dimmable>
      </>
    );
  };

  return (
    <>
      <ProductsHero />

      <>
        <div className="main-container container">
          <section className="products-container">
            <div className="products-filters-container">
              <CategoriesSection type="cat-page" />
              <ProductsFiltersContainer category={currentCat} />
            </div>
            {renderProductsList()}
          </section>
        </div>
      </>
    </>
  );
};

export default ProductsContainer;
