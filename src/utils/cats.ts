import {Filter} from '../models/Filter'

export const storeFrontCats = [
  'apparel',
  'shoes',
  'accessories',
  'equipment',
  'clubs',
  'misc',
]

export const filterCats: Filter[] = [
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
]
