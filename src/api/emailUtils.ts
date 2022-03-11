import serverURL from './serverUtils'

export const fetchEmails = async () => {
  const response = await fetch(`${serverURL}`, {
    headers: {'Content-Type': 'application/json'},
    method: 'GET',
  })
  return response.json()
}
