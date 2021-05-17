import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useSetCats from '../../hooks/useSetCats';
import { Category } from '../../models/Category';
import { storeFrontCats } from '../../utils/cats';
import { useStore } from '../../store/store';

type Props = {
  headline?: string;
};

const CategoriesSection = ({ headline }: Props) => {
  const [localCats, setLocalCats] = useState<Category[]>([]);

  const fetchCats = useStore((state) => state.setAllCats);

  const categories = useStore((state) => state.allCats);

  const cats = useSetCats(categories, storeFrontCats);

  useEffect(() => {
    fetchCats();
  }, [fetchCats]);

  useEffect(() => {
    setLocalCats(cats);
  }, [cats]);
  return (
    <section>
      {headline && <h2>{headline}</h2>}
      <ul>
        {localCats.map((category: Category) => (
          <li key={category.id}>
            <Link to={`/products?category=${category.slug}`}>
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CategoriesSection;
