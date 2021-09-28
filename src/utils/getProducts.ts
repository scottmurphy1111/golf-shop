import axios from 'axios'

import {Product} from '../models/Product'
import {CHEC_BASE_URL, HEADERS} from './constants'
import {apiFetch} from './fetchUtils'

type Options = {
  [key: string]: string[]
}

const buildUrlParams = (options: Options) => {
  let paramsString = ''
  Object.entries(options).forEach(([key, value]: [string, string[]]) => {
    if (key === 'category_slug') {
      value.forEach((item: string) => {
        paramsString += `${key}[]=${item}&`
      })
    }
  })

  return paramsString
}

const productsUrl = `${CHEC_BASE_URL}/products`

export const getProducts = async (
  options = {},
  page = 1
): Promise<Product[] | any> => {
  const params = buildUrlParams(options)
  const query = `${productsUrl}?page=${page}&${params}`

  let response
  try {
    response = await apiFetch(query, {method: 'GET', headers: HEADERS})
  } catch (e) {
    return {
      success: false,
      data: {},
      message: `Could not fetch products, ${e}`,
    }
  }

  const payload = await response.json()

  const meta = payload.meta

  return meta.pagination.total_pages > page
    ? payload.data.concat(await getProducts(options, page + 1))
    : payload.data
}
