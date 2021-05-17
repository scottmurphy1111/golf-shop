import React, { useState, useEffect, useMemo } from 'react';
import { RouteComponentProps } from 'react-router';
import { extractParams } from '../../utils/extractParams';
import CategoriesSection from '../Shared/CategoriesSection';
import FilterContainer from './FilterContainer';
import ProductsHero from './ProductsHero';
import ProductsList from './ProductsList';

const ProductsContainer = (props: RouteComponentProps) => {
  const [params, setParams] = useState({});
  const [isEquipment, setIsEquipment] = useState(false);

  const extractedParams = useMemo(() => extractParams(props), [props]);

  useEffect(() => {
    console.log('running');
    setParams(extractedParams);

    return () => {
      setParams({});
    };
  }, [props, extractedParams]);

  useEffect(() => {
    console.log('running2');
    setIsEquipment(props.location.search.includes('equipment'));

    return () => {
      setIsEquipment(false);
    };
  }, [props.location.search]);
  return (
    <>
      {isEquipment ? (
        <p>Call Golf Shop for Club Fittings and Equipment Availability</p>
      ) : (
        <>
          <ProductsHero />
          <section>
            <>
              <CategoriesSection />
              <FilterContainer />
            </>
            <ProductsList />
          </section>
          {JSON.stringify(params)}
        </>
      )}
    </>
  );
};

export default ProductsContainer;
