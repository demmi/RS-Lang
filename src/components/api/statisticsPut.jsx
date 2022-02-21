import Url from '@/components/const'

async function statisticsPut(id, token, text) {
  const urlString = `${Url}users/${id}/statistics`
  const body = {
    learnedWords: 0,
    optional: {
      test: JSON.stringify([{ text: text }]),
      test2: { text: text },
    },
  }
  const response = await fetch(urlString, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  // if (response.ok) {
  //   const user = await response.json()
  //   return user
  // } if (response.status === 401 || response.status === 400) {
  //   const error = await response.text()
  //   return error
  // }
  return response.status
}

export default statisticsPut
