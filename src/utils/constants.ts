export const CHEC_BASE_URL = 'https://api.chec.io/v1'

export const HEADERS: HeadersInit = {
  'X-Authorization': process.env.REACT_APP_CHEC_SANDBOX_KEY as string,
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
}
