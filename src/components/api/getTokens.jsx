import Url from '@/components/const'

async function getTokens(id, userToken) {
  const urlString = `${Url}users/${id}/tokens`
  const response = await fetch(urlString, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${userToken}`,
      Accept: 'application/json',
    },
  })
  if (response.ok) {
    const tokens = await response.json()
    return tokens
  }
  return response.status
}

export default getTokens
