import React, { useState, useEffect } from 'react';
import useSetCats from '../../hooks/useSetCats';
import { Category } from '../../models/Category';
import { storeFrontCats } from '../../utils/cats';
import { useStore } from '../../store/store';
import CategoryItem from './CategoryItem';

type Props = {
  headline?: string;
  type: string;
};

const CategoriesSection = ({ headline, type }: Props) => {
  const [localCats, setLocalCats] = useState<Category[]>([]);
  const fetchCats = useStore((state) => state.setAllCats);
  const categories = useStore((state) => state.allCats);
  const cats = useSetCats(categories, storeFrontCats);
  const currentCat = useStore((state) => state.currentCat);

  useEffect(() => {
    fetchCats();
  }, [fetchCats]);

  useEffect(() => {
    setLocalCats(cats);
  }, [cats]);
  return (
    <section className={`categories-container component-section ${type}`}>
      {headline && <h2>{headline}</h2>}
      <ul>
        {localCats.map((category: Category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </ul>
    </section>
  );
};

export default CategoriesSection;
