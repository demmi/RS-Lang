import Url from '@/components/const'

async function getAllUserWords(userId, userToken) {
  const urlString = `${Url}users/${userId}/words`
  const response = await fetch(urlString, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${userToken}`,
      Accept: 'application/json',
    },
  })
  const words = await response.json()
  return words
}

export default getAllUserWords
