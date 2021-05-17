import create from 'zustand';
import { commerce } from '../lib/commerce';
import { Category } from '../models/Category';

type StoreState = {
  allCats: Category[];
  setAllCats: () => void;
};

export const useStore = create<StoreState>((set) => ({
  allCats: [],
  setAllCats: async () => {
    try {
      const { data } = await commerce.categories.list();
      set({ allCats: await data });
    } catch (error) {
      console.log('There was an error fetching categories', error);
    }
  },
}));
