import Url from '@/components/const'

// used in hardCard

async function deleteUserWord(id, token, wordId) {
  const urlString = `${Url}users/${id}/words/${wordId}`
  const response = await fetch(urlString, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  return response.status
}

export default deleteUserWord
