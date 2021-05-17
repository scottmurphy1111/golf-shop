import { useState, useEffect } from 'react';
import { Category } from '../models/Category';

const useSetCats = (allCats: Category[], catNames: string[]): Category[] => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const getCats = allCats.reduce((acc: Category[], category: Category) => {
      catNames.forEach((cat: string, i: number) => {
        return category.slug === cat ? (acc[i] = category) : null;
      });

      return acc;
    }, []);

    setCategories(getCats);
  }, [allCats, catNames]);

  return categories;
};

export default useSetCats;
