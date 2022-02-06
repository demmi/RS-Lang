import Url from '@/components/const'

async function getTokens(id) {
  const urlString = `${Url}users/${id}/tokens`
  const response = await fetch(urlString, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.demmiUserToken}`,
      Accept: 'application/json',
    },
  })
  if (response.ok) {
    const tokens = await response.json()
    return tokens
  } if (response.status === 403) {
    const error = await response.text()
    return error
  }
  return response.status
}

export default getTokens
