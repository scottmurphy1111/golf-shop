import axios from 'axios';
import { Product } from '../models/Product';

type reqHeaders = {
  'X-Authorization': string | undefined;
  Accept: string;
  'Content-Type': string;
};

const productsUrl: string = 'https://api.chec.io/v1/products';
const headers: reqHeaders = {
  'X-Authorization': process.env.REACT_APP_CHEC_SANDBOX_KEY,
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const getProducts = async (
  options = {},
  page = 1
): Promise<Product[]> => {
  const query = `${productsUrl}?page=${page}&${options}`;
  const response = await axios.get(query, { headers });
  const data = response.data;
  const meta = data.meta;

  if (meta.pagination.total_pages > page) {
    return data.data.concat(await getProducts(options, page + 1));
  } else {
    return data.data;
  }
};
