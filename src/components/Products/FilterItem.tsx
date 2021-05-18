import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

type Props = {
  filter: string;
  updateFilters: (value: string) => void;
};

const FilterItem = ({ filter, updateFilters }: Props) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleChange = (e: any) => {
    const val = e.target.value;
    setIsChecked(() => !isChecked);
    updateFilters(val);
  };

  // useEffect(() => {}, [isChecked]);
  return (
    <label>
      <input
        name="filter"
        type="checkbox"
        value={filter}
        checked={isChecked}
        onChange={(e) => handleChange(e)}
      />
      {filter}
    </label>
  );
};

export default FilterItem;
