import axios from 'axios';
import { Product } from '../models/Product';
import { CHEC_BASE_URL, HEADERS } from './constants';

type Options = {
  [key: string]: string[];
};

const buildUrlParams = (options: Options) => {
  let paramsString = '';
  Object.entries(options).forEach(([key, value]: [string, string[]]) => {
    if (key === 'category_slug') {
      value.forEach((item: string) => {
        paramsString += `${key}[]=${item}&`;
      });
    }
  });

  return paramsString;
};

const productsUrl: string = `${CHEC_BASE_URL}/products`;

export const getProducts = async (
  options = {},
  page = 1
): Promise<Product[]> => {
  const params = buildUrlParams(options);
  const query = `${productsUrl}?page=${page}&${params}`;
  const response = await axios.get(query, { headers: HEADERS });
  const data = response.data;
  const meta = data.meta;

  if (meta.pagination.total_pages > page) {
    return data.data.concat(await getProducts(options, page + 1));
  } else {
    return data.data;
  }
};
