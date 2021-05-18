import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Filter } from '../../models/Filter';
import { useStore } from '../../store/store';
import { filterCats } from '../../utils/cats';
import FilterItem from './FilterItem';
import { useLocation } from 'react-router';

type Props = {
  category: string | null;
};

const FilterContainer = ({ category }: Props) => {
  const [filters, setFilters] = useState<Filter[]>([
    { category: '', filters: [], status: [] },
  ]);
  const [checkedVals, setCheckedVals] = useState<string[]>([]);

  const location = useLocation();
  // const categories = useStore((state) => state.allCats);

  useEffect(() => {
    if (category) {
      const getFilters = () => {
        return filterCats.filter(
          (currentItem: Filter) =>
            currentItem.category === category && currentItem
        );
      };
      setFilters(getFilters());
    }
  }, [category]);

  const updateFilters = (val: string) => {
    if (!checkedVals.some((item) => item === val)) {
      setCheckedVals((values) => [...values, val]);
    } else {
      const newChecked = checkedVals.filter((item) => {
        if (item !== val) {
          return item;
        }
      });

      setCheckedVals(newChecked);
    }
    console.log('val updated', val);
    // console.log('locationl', location);
    // }
  };

  useEffect(() => {
    console.log('lkjfa', checkedVals);
  }, [checkedVals]);

  return (
    <div>
      <h2>Filter By:</h2>
      {filters &&
        filters[0].filters.map((filter) => (
          <FilterItem
            key={filter}
            filter={filter}
            updateFilters={updateFilters}
          />
        ))}
      <h2>Status: </h2>
      {filters[0].status.map((status) => (
        <FilterItem
          key={status}
          filter={status}
          updateFilters={updateFilters}
        />
      ))}
    </div>
  );
};

export default FilterContainer;
