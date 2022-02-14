import Url from '@/components/const'

// used in wordCard

async function createUserWord(id, token, wordId, diff) {
  const urlString = `${Url}users/${id}/words/${wordId}`
  const body = { difficulty: diff, optional: {} }
  const response = await fetch(urlString, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  })
  return response.status
}

export default createUserWord
