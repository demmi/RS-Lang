import Url from '@/components/const'

async function getUser(id, userToken) {
  const urlString = `${Url}users/${id}`
  const response = await fetch(urlString, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${userToken}`,
      Accept: 'application/json',
    },
  })
  if (response.ok) {
    const user = await response.json()
    return user
  }
  return response.status
}

export default getUser
