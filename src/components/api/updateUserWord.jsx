import Url from '@/components/const'

// used in hardCard

async function updateUserWord(id, token, wordId, diff) {
  const urlString = `${Url}users/${id}/words/${wordId}`
  const body = { difficulty: diff, optional: { testFieldString: 'test', testFieldBoolean: true } }
  const response = await fetch(urlString, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  return response.status
}

export default updateUserWord
