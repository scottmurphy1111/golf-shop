import React, { ChangeEvent, useEffect, useRef } from 'react';
import { FilterItem } from '../../models/Filter';
import { useStore } from '../../store/store';

type Props = {
  filter: FilterItem;
  updateFilters: (value: string) => void;
};

const ProductsFilterItem = React.memo(({ filter, updateFilters }: Props) => {
  const resetFilterCats = useStore((state) => state.resetFilterCats);
  const checkboxRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = (e.target as HTMLInputElement).value;
    updateFilters(val);
    filter.checked = !filter.checked;
  };

  useEffect(() => {
    if (resetFilterCats) {
      filter.checked = false;
    }
  }, [filter, resetFilterCats]);

  return (
    <li>
      <label style={{ display: 'block' }}>
        <input
          ref={checkboxRef}
          name="filter"
          type="checkbox"
          value={filter.name}
          checked={filter.checked}
          onChange={handleChange}
        />
        {filter.name}
      </label>
    </li>
  );
});

export default ProductsFilterItem;
