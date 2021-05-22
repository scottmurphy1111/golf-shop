import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Category } from '../../models/Category';
import { useStore } from '../../store/store';

type Props = {
  category: Category;
};

const CategoryItem = ({ category }: Props) => {
  const clearCheckedFilterVals = useStore(
    (state) => state.clearCheckedFilterVals
  );

  const setResetFilterCats = useStore((state) => state.setResetFilterCats);
  const history = useHistory();
  const location = useLocation();

  const clearFilterParams = () => {
    const filterParams = new URLSearchParams(location.search);
    filterParams.delete('filters');
  };

  const handleClick = () => {
    history.push(`/products?category=${category.slug}`);
    clearCheckedFilterVals();
    clearFilterParams();
    setResetFilterCats(true);
  };

  return <li onClick={handleClick}>{category.name}</li>;
};

export default CategoryItem;
