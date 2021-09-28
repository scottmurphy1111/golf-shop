import axios from 'axios'

import {Category} from '../models/Category'
import {CHEC_BASE_URL} from './constants'

type reqHeaders = {
  'X-Authorization': string | undefined
  'Accept': string
  'Content-Type': string
}

const catsUrl = `${CHEC_BASE_URL}/categories`
const headers: reqHeaders = {
  'X-Authorization': process.env.REACT_APP_CHEC_SANDBOX_KEY,
  'Accept': 'application/json',
  'Content-Type': 'application/json',
}

export const getPaginatedCats = async (page = 1): Promise<Category[]> => {
  const query = `${catsUrl}?page=${page}`
  const response = await axios.get(query, {headers})
  const data = response.data
  const meta = data.meta

  if (meta.pagination.total_pages > page) {
    return data.data.concat(await getPaginatedCats(page + 1))
  } else {
    return data.data
  }
}
