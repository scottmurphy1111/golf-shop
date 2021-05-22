import React, { useEffect, useRef } from 'react';
import { FilterItem } from '../../models/Filter';
import { useStore } from '../../store/store';

type Props = {
  filter: FilterItem;
  updateFilters: (value: string) => void;
};

const ProductsFilterItem = React.memo(({ filter, updateFilters }: Props) => {
  const resetFilterCats = useStore((state) => state.resetFilterCats);
  const checkboxRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: any) => {
    const val = e.target.value;
    updateFilters(val);
    filter.checked = !filter.checked;
  };

  useEffect(() => {
    if (resetFilterCats) {
      filter.checked = false;
    }
  }, [filter, resetFilterCats]);

  return (
    <>
      <label style={{ display: 'block' }}>
        <input
          ref={checkboxRef}
          name="filter"
          type="checkbox"
          value={filter.name}
          checked={filter.checked}
          onChange={(e) => handleChange(e)}
        />
        {filter.name}
      </label>
    </>
  );
});

export default ProductsFilterItem;
