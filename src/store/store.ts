import create from 'zustand';
import { commerce } from '../lib/commerce';
import { Category } from '../models/Category';
import { getPaginatedCats } from '../utils/getPaginatedCats';

type StoreState = {
  allCats: Category[];
  setAllCats: () => void;
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
}));
