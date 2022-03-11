import create from 'zustand'

import {Category} from '../models/Category'
import {Filter} from '../models/Filter'
import {filterCats} from '../utils/cats'
import {getPaginatedCats} from '../utils/getPaginatedCats'

type StoreState = {
  allCats: Category[]
  setAllCats: () => void
  currentCat: string
  setCurrentCat: (cat: string) => void
  filterCats: Filter[]
  resetFilterCats: boolean
  setResetFilterCats: (reset: boolean) => void
  checkedFilterVals: string[]
  setCheckedFilterVals: (val: string) => void
  clearCheckedFilterVals: () => void
  singleProductId: string
  setSingleProductId: (id: string) => void
}

const removeFilter = (currentVals: string[], val: string) => {
  return currentVals.filter((item: string) => (item !== val ? item : null))
}

export const useStore = create<StoreState>(set => ({
  allCats: [],
  setAllCats: async () => {
    try {
      const result = await getPaginatedCats()
      set({allCats: result})
    } catch (error) {
      console.log('There was an error concatenating all categories', error)
    }
  },
  currentCat: '',
  setCurrentCat: cat => {
    set(() => ({currentCat: cat}))
  },
  filterCats: filterCats,
  resetFilterCats: false,
  setResetFilterCats: reset => {
    set(() => ({resetFilterCats: reset}))
  },
  checkedFilterVals: [],
  setCheckedFilterVals: val => {
    set(state => {
      return !state.checkedFilterVals.some((item: string) => {
        return item === val
      })
        ? {checkedFilterVals: [...state.checkedFilterVals, val]}
        : {checkedFilterVals: removeFilter(state.checkedFilterVals, val)}
    })
  },
  clearCheckedFilterVals: () => {
    set(() => ({checkedFilterVals: []}))
  },
  singleProductId: '',
  setSingleProductId: id => {
    set(() => ({
      singleProductId: id,
    }))
  },
}))
