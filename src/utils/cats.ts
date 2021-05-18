import { Filter } from '../models/Filter';

export const storeFrontCats = [
  'apparel',
  'shoes',
  'accessories',
  'equipment',
  'clubs',
  'misc',
];

export const filterCats: Filter[] = [
  {
    category: 'apparel',
    filters: [
      'tops',
      'bottoms',
      'outerwear',
      'headwear',
      'mens',
      'womens',
      'juniors',
    ],
    status: ['new', 'bestseller', 'online-exclusive', 'sale'],
  },
  {
    category: 'shoes',
    filters: ['mens', 'womens', 'juniors'],
    status: ['new', 'bestseller', 'online-exclusive', 'sale'],
  },
  {
    category: 'accessories',
    filters: ['headcovers', 'towels', 'headwear', 'misc'],
    status: ['new', 'bestseller', 'online-exclusive', 'sale'],
  },
  {
    category: 'equipment',
    filters: ['balls', 'gloves', 'misc'],
    status: ['new', 'bestseller', 'online-exclusive', 'sale'],
  },
  {
    category: 'clubs',
    filters: [],
    status: [],
  },
  {
    category: 'misc',
    filters: ['memerobilia', 'umbrellas'],
    status: ['new', 'bestseller', 'online-exclusive', 'sale'],
  },
];

//   filters: [
//     'tops',
//     'bottoms',
//     'outerwear',
//     'shoes',
//     'sale',
//     'accessories',
//     'clubs',
//     'balls',
//     'misc',
//   ],
//   apparel: ['tops', 'bottoms', 'outerwear', 'shoes', 'sale', 'accessories'],
//   equipment: ['clubs', 'balls', 'misc', 'sale'],
//   all: [
//     'shop-all',
//     'mens-clothing',
//     'womens-clothing',
//     'juniors-clothing',
//     'equipment',
//     'sale',
//     'tops',
//     'bottoms',
//     'outerwear',
//     'shoes',
//     'accessories',
//     'clubs',
//     'balls',
//     'misc',
//   ],
// };

// export const catTypes = {
//   'shop-all': 'all',
//   'mens-clothing': 'apparel',
//   'womens-clothing': 'apparel',
//   'juniors-clothing': 'apparel',
//   equipment: 'equipment',
//   sale: 'all',
// };
