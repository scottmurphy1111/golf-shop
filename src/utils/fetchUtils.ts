import Commerce from '@chec/commerce.js'

export const apiFetch = async (
  url: RequestInfo,
  props?: RequestInit
): Promise<Response> => {
  if (props === undefined) props = {}
  const response = await fetch(url, props)
  return response
}
