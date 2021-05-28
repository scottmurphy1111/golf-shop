import create from 'zustand';
import { Category } from '../models/Category';
import { Filter } from '../models/Filter';
import { Product } from '../models/Product';
import { getPaginatedCats } from '../utils/getPaginatedCats';

type StoreState = {
  allCats: Category[];
  setAllCats: () => void;
  currentCat: string;
  setCurrentCat: (cat: string) => void;
  filterCats: Filter[];
  resetFilterCats: boolean;
  setResetFilterCats: (reset: boolean) => void;
  checkedFilterVals: string[];
  setCheckedFilterVals: (val: string) => void;
  clearCheckedFilterVals: () => void;
  singleProductId: string;
  setSingleProductId: (id: string) => void;
};

const removeFilter = (currentVals: string[], val: string) => {
  console.log('remove filter checkedVals', currentVals);
  return currentVals.filter((item: string) => (item !== val ? item : null));
};

export const useStore = create<StoreState>((set) => ({
  allCats: [],
  setAllCats: async () => {
    getPaginatedCats()
      .then((categories) => {
        set({ allCats: categories });
      })
      .catch((error) => {
        console.log('There was an error concatenating all categories', error);
      });
  },
  currentCat: '',
  setCurrentCat: (cat) => {
    set(() => ({ currentCat: cat }));
  },
  filterCats: [
    {
      category: 'apparel',
      filters: [
        {
          name: 'tops',
          checked: false,
        },
        {
          name: 'bottoms',
          checked: false,
        },
        {
          name: 'outerwear',
          checked: false,
        },
        {
          name: 'headwear',
          checked: false,
        },
        {
          name: 'mens',
          checked: false,
        },
        {
          name: 'womens',
          checked: false,
        },
        {
          name: 'juniors',
          checked: false,
        },
      ],
      status: [
        {
          name: 'new',
          checked: false,
        },
        {
          name: 'bestseller',
          checked: false,
        },
        {
          name: 'online-exclusive',
          checked: false,
        },
        {
          name: 'sale',
          checked: false,
        },
      ],
    },
    {
      category: 'shoes',
      filters: [
        {
          name: 'mens',
          checked: false,
        },
        {
          name: 'womens',
          checked: false,
        },
        {
          name: 'juniors',
          checked: false,
        },
      ],
      status: [
        {
          name: 'new',
          checked: false,
        },
        {
          name: 'bestseller',
          checked: false,
        },
        {
          name: 'online-exclusive',
          checked: false,
        },
        {
          name: 'sale',
          checked: false,
        },
      ],
    },
    {
      category: 'accessories',
      filters: [
        {
          name: 'headcovers',
          checked: false,
        },
        {
          name: 'towels',
          checked: false,
        },
        {
          name: 'headwear',
          checked: false,
        },
        {
          name: 'misc',
          checked: false,
        },
      ],
      status: [
        {
          name: 'new',
          checked: false,
        },
        {
          name: 'bestseller',
          checked: false,
        },
        {
          name: 'online-exclusive',
          checked: false,
        },
        {
          name: 'sale',
          checked: false,
        },
      ],
    },
    {
      category: 'equipment',
      filters: [
        {
          name: 'balls',
          checked: false,
        },
        {
          name: 'gloves',
          checked: false,
        },
        {
          name: 'misc',
          checked: false,
        },
      ],
      status: [
        {
          name: 'new',
          checked: false,
        },
        {
          name: 'bestseller',
          checked: false,
        },
        {
          name: 'online-exclusive',
          checked: false,
        },
        {
          name: 'sale',
          checked: false,
        },
      ],
    },
    {
      category: 'clubs',
      filters: [],
      status: [],
    },
    {
      category: 'misc',
      filters: [
        {
          name: 'memerobilia',
          checked: false,
        },
        {
          name: 'umbrellas',
          checked: false,
        },
      ],
      status: [
        {
          name: 'new',
          checked: false,
        },
        {
          name: 'bestseller',
          checked: false,
        },
        {
          name: 'online-exclusive',
          checked: false,
        },
        {
          name: 'sale',
          checked: false,
        },
      ],
    },
  ],
  resetFilterCats: false,
  setResetFilterCats: (reset) => {
    set(() => ({ resetFilterCats: reset }));
  },
  checkedFilterVals: [],
  setCheckedFilterVals: (val) => {
    set((state) => {
      return !state.checkedFilterVals.some((item: string) => {
        return item === val;
      })
        ? { checkedFilterVals: [...state.checkedFilterVals, val] }
        : { checkedFilterVals: removeFilter(state.checkedFilterVals, val) };
    });
  },
  clearCheckedFilterVals: () => {
    set(() => ({ checkedFilterVals: [] }));
  },
  singleProductId: '',
  setSingleProductId: (id) => {
    set(() => ({
      singleProductId: id,
    }));
  },
}));
